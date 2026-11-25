import { createClient } from "@/lib/supabase/server";
import { validate, safeNext } from "@/lib/auth";
import { guard, json, readJson, mapAuthError } from "@/lib/authApi";

export const dynamic = "force-dynamic";

// POST /api/auth/login  { email, password, next? }
export async function POST(request) {
  const blocked = guard(request);
  if (blocked) return blocked;

  const body = await readJson(request);
  if (!body) return json(400, { ok: false, code: "BAD_REQUEST", message: "Invalid request." });

  const values = { email: String(body.email ?? "").trim().toLowerCase(), password: String(body.password ?? "") };
  const errors = validate("login", values);
  if (Object.keys(errors).length) return json(400, { ok: false, code: "VALIDATION", errors });

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(values); // sets session cookies
  if (error) return mapAuthError(error, "login");

  return json(200, { ok: true, redirectTo: safeNext(body.next) });
}
