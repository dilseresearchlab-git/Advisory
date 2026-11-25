// Helpers for the /api/auth route handlers.

import { supabaseConfigured } from "./supabase/config";
import { isSameOrigin } from "./auth";

export const json = (status, body) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

// Returns an early Response when the request must not proceed, otherwise null.
export function guard(request) {
  if (!supabaseConfigured) {
    return json(503, { ok: false, code: "NOT_CONFIGURED", message: "Authentication is not configured yet." });
  }
  if (!isSameOrigin(request)) {
    return json(403, { ok: false, code: "FORBIDDEN", message: "Request not allowed." });
  }
  return null;
}

export async function readJson(request) {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? body : {};
  } catch {
    return null;
  }
}

// Map Supabase auth errors to safe, non-enumerating responses.
export function mapAuthError(error, mode) {
  const code = error?.code || "";
  const status = error?.status;
  if (status === 429 || code === "over_request_rate_limit" || code === "over_email_send_rate_limit") {
    return json(429, { ok: false, code: "RATE_LIMITED", message: "Too many attempts. Please wait a moment and try again." });
  }
  if (code === "email_not_confirmed") {
    return json(403, { ok: false, code: "EMAIL_NOT_CONFIRMED", message: "Please confirm your email address first. Check your inbox for the link." });
  }
  if (code === "weak_password") {
    return json(422, { ok: false, code: "WEAK_PASSWORD", errors: { password: "Choose a stronger password." } });
  }
  if (mode === "login") {
    // Same message for unknown email and wrong password.
    if (status && status >= 500) return json(502, { ok: false, code: "UPSTREAM", message: "Sign-in is temporarily unavailable. Please try again shortly." });
    return json(401, { ok: false, code: "INVALID_CREDENTIALS", message: "Invalid email or password." });
  }
  return json(502, { ok: false, code: "UPSTREAM", message: "We couldn't create your account right now. Please try again shortly." });
}
