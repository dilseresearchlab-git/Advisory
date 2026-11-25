import { createClient } from "@/lib/supabase/server";
import { validate, safeNext } from "@/lib/auth";
import { guard, json, readJson, mapAuthError } from "@/lib/authApi";

export const dynamic = "force-dynamic";

// POST /api/auth/signup  { name, email, password, consent, next? }
export async function POST(request) {
  const blocked = guard(request);
  if (blocked) return blocked;

  const body = await readJson(request);
  if (!body) return json(400, { ok: false, code: "BAD_REQUEST", message: "Invalid request." });

  const values = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim().toLowerCase(),
    password: String(body.password ?? ""),
    consent: body.consent === true,
  };
  const errors = validate("signup", values);
  if (Object.keys(errors).length) return json(400, { ok: false, code: "VALIDATION", errors });

  const next = safeNext(body.next);
  // Origin was verified by guard(); NEXT_PUBLIC_SITE_URL wins when set (e.g. behind a proxy).
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || request.headers.get("origin") || "").replace(/\/$/, "");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: { full_name: values.name, terms_accepted_at: new Date().toISOString() },
      emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    // Don't reveal whether an email is already registered.
    if (error.code === "user_already_exists") return json(200, { ok: true, needsConfirmation: true });
    return mapAuthError(error, "signup");
  }

  // With email confirmation enabled there is no session yet; the user must confirm first.
  if (!data.session) return json(200, { ok: true, needsConfirmation: true });
  return json(200, { ok: true, redirectTo: next });
}
