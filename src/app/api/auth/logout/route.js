import { createClient } from "@/lib/supabase/server";
import { guard, json } from "@/lib/authApi";

export const dynamic = "force-dynamic";

// POST /api/auth/logout
export async function POST(request) {
  const blocked = guard(request);
  if (blocked) return blocked;

  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return json(500, { ok: false, code: "UPSTREAM", message: "Couldn't sign out. Please try again." });
  return json(200, { ok: true });
}
