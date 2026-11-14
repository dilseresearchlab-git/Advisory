"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { plans } from "@/data/pricing";
import { site } from "@/data/site";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const profileLabels = {
  beginner: "Beginner investor",
  "long-term": "Long-term investor",
  active: "Active trader",
  swing: "Swing / positional trader",
  advanced: "Advanced participant",
};

export default function ContactForm() {
  const params = useSearchParams();

  const initialPlan = params.get("plan") || "";

  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || site.contact.email;

  const whatsappNumber = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""
  ).replace(/\D/g, "");

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profile: "long-term",
    plan: initialPlan,
    message: "",
    consent: false,
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const captchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");

  const set = (key) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const selectedPlan =
    plans.find((p) => p.id === form.plan)?.name || "Not sure";

  const whatsappMessage = [
    "Hello, I would like to make an enquiry.",
    "",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone || "Not provided"}`,
    `Profile: ${profileLabels[form.profile] || form.profile}`,
    `Package of interest: ${selectedPlan}`,
    "",
    "Enquiry:",
    form.message || "I would like more information.",
  ].join("\n");

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage,
      )}`
    : "";

  const onSubmit = async (e) => {
    e.preventDefault();

    setStatus("submitting");
    setErrorMessage("");

    if (!accessKey) {
      setErrorMessage("The online enquiry form is not configured yet.");
      setStatus("error");
      return;
    }

    if (!captchaToken) {
      setErrorMessage("Please complete the CAPTCHA verification.");
      setStatus("error");
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);

      formData.set("access_key", accessKey);
      formData.set("subject", "New website enquiry");
      formData.set("from_name", form.name);
      formData.set("email", form.email);
      formData.set("profile", profileLabels[form.profile] || form.profile);
      formData.set("plan", selectedPlan);
      formData.set("consent", "Yes");
      formData.set("h-captcha-response", captchaToken);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setForm({
          name: "",
          email: "",
          phone: "",
          profile: "long-term",
          plan: initialPlan,
          message: "",
          consent: false,
        });

        captchaRef.current?.resetCaptcha();
        setCaptchaToken("");
        setStatus("success");
      } else {
        const reason = result.message || result.error || "";

        const isLimitError = /quota|limit|monthly/i.test(reason);

        setErrorMessage(
          isLimitError
            ? "Our online enquiry service has reached its current submission limit."
            : "We couldn't submit your enquiry through the online form.",
        );

        setStatus("error");
        captchaRef.current?.resetCaptcha();
        setCaptchaToken("");
      }
    } catch (error) {
      console.error("Web3Forms submission failed:", error);

      setErrorMessage(
        "We couldn't connect to the online enquiry service. Please try WhatsApp instead.",
      );

      setStatus("error");
      captchaRef.current?.resetCaptcha();
      setCaptchaToken("");
    }
  };

  return (
    <form onSubmit={onSubmit} className="card border-royal/25 space-y-5 p-4 sm:p-8 w-full max-w-full overflow-hidden">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">
            Full name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="input w-full"
            value={form.name}
            onChange={set("name")}
          />
        </div>

        <div>
          <label className="label" htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input w-full"
            value={form.email}
            onChange={set("email")}
          />
        </div>

        <div>
          <label className="label" htmlFor="phone">
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="input w-full"
            value={form.phone}
            onChange={set("phone")}
          />
        </div>

        <div>
          <label className="label" htmlFor="profile">
            I am a…
          </label>
          <select
            id="profile"
            name="profile"
            className="input w-full"
            value={form.profile}
            onChange={set("profile")}
          >
            {Object.entries(profileLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="plan">
          Package of interest
        </label>
        <select
          id="plan"
          name="plan"
          className="input w-full"
          value={form.plan}
          onChange={set("plan")}
        >
          <option value="">Not sure yet</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="message">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="input w-full resize-y"
          value={form.message}
          onChange={set("message")}
        />
      </div>

      {/* Web3Forms honeypot spam protection */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      <label className="flex items-start gap-3 text-xs leading-relaxed text-muted cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          required
          checked={form.consent}
          onChange={set("consent")}
          className="mt-0.5 h-4 w-4 shrink-0 accent-royal"
        />
        <span className="select-none">
          I understand this is a general enquiry, that no advisory relationship
          exists, and that nothing here is investment advice. I have read the
          privacy policy.
        </span>
      </label>

      {/* Responsive wrapper to prevent hCaptcha from overflowing on small screens */}
      <div className="space-y-2 overflow-x-auto py-1 max-w-full">
        <div className="min-w-[300px]">
          <HCaptcha
            ref={captchaRef}
            sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
            reCaptchaCompat={false}
            onVerify={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken("")}
            onError={() => setCaptchaToken("")}
          />
        </div>

        {!captchaToken && (
          <p className="text-xs text-steel">
            Please complete the security verification before submitting.
          </p>
        )}
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          disabled={
            status === "submitting" || status === "success" || !captchaToken
          }
          className="w-full sm:w-auto rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-royal disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting"
            ? "Sending enquiry..."
            : status === "success"
              ? "Enquiry submitted"
              : !captchaToken
                ? "Complete verification"
                : "Send enquiry"}
        </button>

        {status === "success" && (
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
            role="status"
          >
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                Enquiry submitted successfully.
              </p>
              <p className="mt-1 text-xs leading-relaxed text-emerald-700">
                Thank you for reaching out. We'll get back to you soon.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="w-full sm:w-auto shrink-0 rounded-full border border-emerald-300 px-4 py-1.5 text-xs font-medium text-emerald-800 transition hover:bg-emerald-100 text-center"
            >
              OK
            </button>
          </div>
        )}

        {status === "error" && (
          <div
            className="space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-4"
            role="alert"
          >
            <p className="text-sm leading-relaxed text-amber-900">
              {errorMessage}
            </p>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#16845B] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#116C49]"
              >
                Send WhatsApp Query
              </a>
            ) : (
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                  "Website enquiry",
                )}&body=${encodeURIComponent(whatsappMessage)}`}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-royal"
              >
                Send enquiry by email
              </a>
            )}
          </div>
        )}
      </div>
    </form>
  );
}