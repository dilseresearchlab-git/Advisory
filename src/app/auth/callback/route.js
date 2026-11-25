import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { safeNext } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Email-confirmation / magic-link landing route.
// Supabase redirects here with either ?code= (PKCE) or ?token_hash=&type=.
// Add `${SITE_URL}/auth/callback` to Supabase → Authentication → URL Configuration → Redirect URLs.
export async function GET(request) {
  const url = new URL(request.url);
  const base = (process.env.NEXT_PUBLIC_SITE_URL || url.origin).replace(/\/$/, "");
  const next = safeNext(url.searchParams.get("next"));
  const fail = NextResponse.redirect(`${base}/login?error=callback`);

  if (!supabaseConfigured) return fail;

  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");

  const supabase = await createClient();
  let error = null;
  if (code) {
    ({ error } = await supabase.auth.exchangeCodeForSession(code));
  } else if (tokenHash && type) {
    ({ error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash }));
  } else {
    return fail;
  }

  return error ? fail : NextResponse.redirect(`${base}${next}`);
}
