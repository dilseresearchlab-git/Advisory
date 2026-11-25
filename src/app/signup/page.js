import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import AuthForm from "@/components/auth/AuthForm";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { safeNext } from "@/lib/auth";

export const metadata = { title: "Create account", robots: { index: false } };

export default async function SignupPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const next = safeNext(sp.next);

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
    <AuthShell mode="signup">
      <AuthForm mode="signup" next={next} />
    </AuthShell>
  );
}
