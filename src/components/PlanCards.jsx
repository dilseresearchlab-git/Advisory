"use client";

import Link from "next/link";
import { useState } from "react";
import { plans } from "@/data/pricing";
import { formatINR } from "./ui";

export default function PlanCards({ compact = false }) {
  const [billing, setBilling] = useState("monthly");

  return (
    <div>
      <div className="inline-flex rounded-full border border-line bg-white p-1 text-sm" role="group" aria-label="Billing period">
        {["monthly", "annual"].map((b) => (
          <button
            key={b}
            onClick={() => setBilling(b)}
            aria-pressed={billing === b}
            className={`rounded-full px-5 py-1.5 capitalize transition ${
              billing === b ? "bg-navy text-white" : "text-steel-dark hover:text-navy"
            }`}
          >
            {b}
          </button>
        ))}
      </div>
      {billing === "annual" && <p className="mt-2 text-xs text-steel">Annual shown as ~2 months free (draft).</p>}

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {plans.map((p) => {
          const price = billing === "monthly" ? p.monthly : p.annual;
          return (
            <article
              key={p.id}
              className={`relative flex flex-col rounded-2xl border p-6 transition duration-300 ${
                p.recommended
                  ? "border-royal bg-gradient-to-b from-ice-100 to-white shadow-lift xl:-mt-3 xl:pb-9"
                  : "border-line bg-white shadow-soft hover:shadow-lift"
              }`}
            >
              {p.recommended && (
                <span className="absolute -top-3 left-6 rounded-full bg-royal px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  Recommended
                </span>
              )}
              <h3 className="text-2xl">{p.name}</h3>
              <p className="mt-1 text-xs font-medium text-royal">{p.audience}</p>
              <div className="mt-5">
                <span className="font-serif text-4xl text-navy">{formatINR(price)}</span>
                <span className="ml-1 text-sm text-steel">/{billing === "monthly" ? "mo" : "yr"}</span>
                <p className="mt-0.5 text-[11px] text-steel">Draft price · excl. GST</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{p.summary}</p>

              {!compact && (
                <>
                  <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-navy">Includes</h4>
                  <ul className="mt-2 space-y-2 text-sm text-ink">
                    {p.includes.map((i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-navy">Coverage</h4>
                  <p className="mt-2 text-sm text-muted">{p.coverage}</p>
                  <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-navy">Limitations</h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted">
                    {p.limitations.map((l) => (
                      <li key={l} className="flex gap-2">
                        <span className="mt-2 h-px w-2 shrink-0 bg-steel" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <Link
                href={`/contact?plan=${p.id}`}
                className={`mt-auto inline-flex justify-center rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  p.recommended ? "bg-navy text-white hover:bg-royal" : "border border-ice-300 text-navy hover:border-royal hover:text-royal"
                } ${compact ? "mt-6" : "mt-8"}`}
              >
                Register interest
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
