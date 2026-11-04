"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { plans } from "@/data/pricing";
import { site } from "@/data/site";

// No backend: the form composes a pre-filled email in the visitor's mail app.
export default function ContactForm() {
  const params = useSearchParams();
  const initialPlan = params.get("plan") || "";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profile: "long-term",
    plan: initialPlan,
    message: "",
    consent: false,
  });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Profile: ${form.profile}`,
      `Package of interest: ${form.plan || "Not sure"}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent("Enquiry from website")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">Full name</label>
          <input id="name" required className="input" value={form.name} onChange={set("name")} />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" type="email" required className="input" value={form.email} onChange={set("email")} />
        </div>
        <div>
          <label className="label" htmlFor="phone">Phone (optional)</label>
          <input id="phone" type="tel" className="input" value={form.phone} onChange={set("phone")} />
        </div>
        <div>
          <label className="label" htmlFor="profile">I am a…</label>
          <select id="profile" className="input" value={form.profile} onChange={set("profile")}>
            <option value="beginner">Beginner investor</option>
            <option value="long-term">Long-term investor</option>
            <option value="active">Active trader</option>
            <option value="swing">Swing / positional trader</option>
            <option value="advanced">Advanced participant</option>
          </select>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="plan">Package of interest</label>
        <select id="plan" className="input" value={form.plan} onChange={set("plan")}>
          <option value="">Not sure yet</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="message">How can we help?</label>
        <textarea id="message" rows={5} className="input" value={form.message} onChange={set("message")} />
      </div>
      <label className="flex gap-3 text-xs leading-relaxed text-muted">
        <input type="checkbox" required checked={form.consent} onChange={set("consent")} className="mt-0.5 h-4 w-4 accent-royal" />
        <span>
          I understand this is a general enquiry, that no advisory relationship exists, and that nothing here is investment advice.
          I have read the privacy policy.
        </span>
      </label>
      <button type="submit" className="w-full rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-royal sm:w-auto">
        Send enquiry
      </button>
      {sent && (
        <p className="text-sm text-steel-dark" role="status">
          Your email app should open with a pre-filled message. If it did not, write to {site.contact.email}.
        </p>
      )}
    </form>
  );
}
