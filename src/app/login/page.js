import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { safeNext } from "@/lib/auth";

export const metadata = { title: "Sign in", robots: { index: false } };

export default async function LoginPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const next = safeNext(sp.next);

  // Already signed in? Skip the form.
  if (supabaseConfigured) {
    let user = null;
    try {
      const supabase = await createClient();
      ({ data: { user } } = await supabase.auth.getUser());
    } catch {
      /* treat as signed out */
    }
    if (user) redirect(next);
  }

  return (
    <AuthShell mode="login">
      <AuthForm mode="login" next={next} initialError={typeof sp.error === "string" ? sp.error : undefined} />
    </AuthShell>
  );
}
