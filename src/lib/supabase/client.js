"use client";

// Supabase client for Client Components (e.g. onAuthStateChange, future account UI).
// The login/signup forms use the /api/auth/* routes instead, so credentials never
// need to touch client-side Supabase code.

import { createBrowserClient } from "@supabase/ssr";
import { supabaseUrl, supabaseKey } from "./config";

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}
