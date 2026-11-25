"use client";

import Link from "next/link";
import { useState } from "react";
import { validate, passwordChecks } from "@/lib/auth";

const callbackMessages = {
  callback: "That confirmation link is invalid or has expired. Please sign in, or create your account again.",
};

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      {children}
      {hint}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-700" role="alert">{error}</p>
      )}
    </div>
  );
}

const Eye = ({ off }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M3 3l18 18" />}
  </svg>
);

export default function AuthForm({ mode, next = "/", initialError }) {
  const isSignup = mode === "signup";
  const [values, setValues] = useState({ name: "", email: "", password: "", consent: false });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [banner, setBanner] = useState(initialError ? { tone: "error", text: callbackMessages[initialError] || "Something went wrong. Please try again." } : null);
  const [sentTo, setSentTo] = useState(null);

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    setBanner(null);
    const clientErrors = validate(mode, values);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      document.getElementById(Object.keys(clientErrors)[0])?.focus();
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, next }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        if (data.needsConfirmation) {
          setSentTo(values.email.trim());
          setValues((s) => ({ ...s, password: "" }));
        } else {
          window.location.assign(data.redirectTo || "/"); // full load so the server sees the new session cookie
        }
        return;
      }
      if (data.errors) setErrors(data.errors);
      if (data.code === "NOT_CONFIGURED") {
        setBanner({ tone: "info", text: "Accounts aren't open yet. Please check back soon, or get in touch and we'll let you know." });
      } else if (!data.errors || data.message) {
        setBanner({ tone: "error", text: data.message || "Something went wrong. Please try again." });
      }
    } catch {
      setBanner({ tone: "error", text: "We couldn't reach the server. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  }

  if (sentTo) {
    return (
      <div role="status" className="rounded-xl border border-ice-300 bg-ice-50 p-6">
        <h2 className="text-2xl">Check your email</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          If <span className="font-medium text-navy">{sentTo}</span> can be registered, a confirmation link is on its way.
          Open it to finish creating your account. Check your spam folder if you don&apos;t see it.
        </p>
        <Link href="/login" className="mt-5 inline-block text-sm font-medium text-royal hover:text-navy">Back to sign in →</Link>
      </div>
    );
  }

  const checks = isSignup ? passwordChecks(values.password) : [];

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <h2 className="sr-only">{isSignup ? "Create account" : "Sign in"}</h2>

      {banner && (
        <p
          role={banner.tone === "error" ? "alert" : "status"}
          className={`rounded-lg border px-4 py-3 text-sm ${banner.tone === "error" ? "border-rose-200 bg-rose-50 text-rose-800" : "border-ice-300 bg-ice-50 text-steel-dark"}`}
        >
          {banner.text}
          {banner.tone === "info" && (
            <>{" "}<Link href="/contact" className="font-medium text-royal underline underline-offset-2">Contact us</Link></>
          )}
        </p>
      )}

      {isSignup && (
        <Field id="name" label="Full name" error={errors.name}>
          <input id="name" className="input" autoComplete="name" value={values.name} onChange={set("name")}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        </Field>
      )}

      <Field id="email" label="Email" error={errors.email}>
        <input id="email" type="email" inputMode="email" className="input" autoComplete="email" value={values.email} onChange={set("email")}
          aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
      </Field>

      <Field
        id="password"
        label="Password"
        error={errors.password}
        hint={
          isSignup && (
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs" aria-label="Password requirements">
              {checks.map((c) => (
                <li key={c.id} className={c.ok ? "text-royal" : "text-steel"}>
                  <span aria-hidden="true">{c.ok ? "✓" : "○"}</span> {c.label}
                </li>
              ))}
            </ul>
          )
        }
      >
        <div className="relative">
          <input id="password" type={show ? "text" : "password"} className="input pr-11"
            autoComplete={isSignup ? "new-password" : "current-password"} value={values.password} onChange={set("password")}
            aria-invalid={!!errors.password} aria-describedby={errors.password ? "password-error" : undefined} />
          <button type="button" onClick={() => setShow((s) => !s)} aria-pressed={show}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-steel transition hover:text-navy">
            <Eye off={show} />
          </button>
        </div>
      </Field>

      {isSignup ? (
        <div>
          <label className="flex gap-3 text-xs leading-relaxed text-muted">
            <input id="consent" type="checkbox" checked={values.consent} onChange={set("consent")}
              className="mt-0.5 h-4 w-4 shrink-0 accent-royal" aria-invalid={!!errors.consent} />
            <span>
              I agree to the <Link href="/terms" className="text-royal underline underline-offset-2">Terms of Use</Link> and{" "}
              <Link href="/privacy" className="text-royal underline underline-offset-2">Privacy Policy</Link>, and understand that
              nothing on this website is investment advice.
            </span>
          </label>
          {errors.consent && <p className="mt-1.5 text-xs text-rose-700" role="alert">{errors.consent}</p>}
        </div>
      ) : (
        <div className="flex justify-end text-sm">
          <Link href="/contact" className="text-royal hover:text-navy">Need help signing in?</Link>
        </div>
      )}

      <button type="submit" disabled={busy}
        className="w-full rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-royal disabled:cursor-not-allowed disabled:opacity-60">
        {busy ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
      </button>

      <p className="text-center text-sm text-muted">
        {isSignup ? (
          <>Already have an account? <Link href="/login" className="font-medium text-royal hover:text-navy">Sign in</Link></>
        ) : (
          <>New to Meridian? <Link href="/signup" className="font-medium text-royal hover:text-navy">Create an account</Link></>
        )}
      </p>
    </form>
  );
}
