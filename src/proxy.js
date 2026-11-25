import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Runs ONLY on the paths in `config.matcher`, so the marketing pages stay fully static
// and no Supabase call is made for them. Add protected sections (e.g. "/account/:path*")
// to the matcher as the product grows.
export async function proxy(request) {
  const { response, user } = await updateSession(request);

  // Example guard for a future signed-in area:
  if (request.nextUrl.pathname.startsWith("/account") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/login", "/signup", "/account/:path*"],
};
