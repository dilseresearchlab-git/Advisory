// Session refresh for the Next.js proxy (Next 16's replacement for middleware).
// Refreshes an expiring Supabase session and forwards the updated cookies.
// Keep getUser() directly after client creation, as Supabase requires.

import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { supabaseUrl, supabaseKey, supabaseConfigured } from "./config";

export async function updateSession(request) {
  let response = NextResponse.next({ request });
  if (!supabaseConfigured) return { response, user: null };

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}
