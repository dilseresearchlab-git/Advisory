// Shared auth helpers: validation (used by the forms AND the API routes), redirect
// safety and request guards. Pure functions, no Supabase dependency.

export const PASSWORD_MIN = 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function passwordChecks(pw = "") {
  return [
    { id: "len", label: `At least ${PASSWORD_MIN} characters`, ok: pw.length >= PASSWORD_MIN },
    { id: "letter", label: "A letter", ok: /[A-Za-z]/.test(pw) },
    { id: "num", label: "A number", ok: /\d/.test(pw) },
  ];
}

// mode: "login" | "signup". Returns { field: message } (empty object when valid).
export function validate(mode, v) {
  const e = {};
  const email = String(v.email ?? "").trim();
  const password = String(v.password ?? "");

  if (mode === "signup" && String(v.name ?? "").trim().length < 2) e.name = "Enter your full name.";
  if (!email) e.email = "Enter your email address.";
  else if (email.length > 254 || !EMAIL_RE.test(email)) e.email = "Enter a valid email address.";

  if (!password) e.password = "Enter your password.";
  else if (password.length > 72) e.password = "Password must be 72 characters or fewer.";
  else if (mode === "signup" && passwordChecks(password).some((c) => !c.ok)) e.password = "Password does not meet the requirements.";

  if (mode === "signup" && v.consent !== true) e.consent = "Please accept to continue.";
  return e;
}

// Only allow same-site relative paths ("/x"), never "//host", "/\host" or absolute URLs.
export function safeNext(next, fallback = "/") {
  if (typeof next !== "string" || !next.startsWith("/") || next.startsWith("//") || next.includes("\\")) return fallback;
  if (/^\/(login|signup)(\/|\?|$)/.test(next)) return fallback; // avoid redirect loops
  return next;
}

// Basic CSRF defence for cookie-setting POST routes: the browser always sends Origin
// on same-origin fetch POSTs, so a missing or mismatched Origin is rejected.
export function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
