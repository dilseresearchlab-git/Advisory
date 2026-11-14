"use client";

import Link from "next/link";
import { useState } from "react";
import { plans } from "@/data/pricing";
import { formatINR } from "./ui";

export default function PlanCards({ compact = false }) {
  const [billing, setBilling] = useState("monthly");

  return (
    <div>
      {/* Billing selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="inline-flex rounded-full border border-line bg-white p-1"
          role="group"
          aria-label="Billing period"
        >
          {["monthly", "annual"].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBilling(b)}
              aria-pressed={billing === b}
              className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition ${
                billing === b
                  ? "bg-navy text-white shadow-sm"
                  : "text-steel-dark hover:text-navy"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {billing === "annual" && (
          <span className="text-xs font-medium text-emerald-700">
            Save up to 2 months with annual billing
          </span>
        )}
      </div>

      {/* Package cards - strict vertical grid alignment */}
      <div
        className={`mt-8 grid items-stretch gap-6 ${
          compact
            ? "sm:grid-cols-2 xl:grid-cols-4"
            : "md:grid-cols-2 xl:grid-cols-4"
        }`}
      >
        {plans.map((p) => {
          const price = billing === "monthly" ? p.monthly : p.annual;
          const recommended = p.recommended;

          return (
            <article
              key={p.id}
              className={`relative flex min-w-0 flex-col rounded-2xl border transition duration-300 ${
                compact ? "p-5 sm:p-6" : "p-6 sm:p-7"
              } ${
                recommended
                  ? "border-royal bg-linear-to-b from-ice-100/70 to-white shadow-lg ring-1 ring-royal/20"
                  : "border-line bg-white shadow-soft hover:-translate-y-1 hover:shadow-lift"
              }`}
            >
              {/* Recommended badge */}
              {recommended && (
                <span className="absolute -top-3 left-5 rounded-full bg-royal px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
                  Recommended
                </span>
              )}

              {/* 1. FIXED HEADER BLOCK (Ensures titles & audiences align horizontally) */}
              <div className="min-h-22.5">
                <h3 className="font-serif text-2xl tracking-tight text-navy">
                  {p.name}
                </h3>
                <p className="mt-2 text-xs font-medium leading-snug text-royal line-clamp-2">
                  {p.audience}
                </p>
              </div>

              {/* 2. FIXED PRICING BLOCK */}
              <div className="mt-3 border-t border-slate-300 pt-4">
                <div className="flex items-baseline gap-x-1">
                  <span
                    className={`font-serif text-3xl tracking-tight ${
                      recommended ? "text-emerald-600" : "text-navy"
                    }`}
                  >
                    {formatINR(price)}
                  </span>
                  <span className="text-sm text-steel">
                    /{billing === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-steel">
                  Proposed price · excl. GST
                </p>
              </div>

              {/* 3. FIXED SUMMARY BLOCK */}
              <div className="mt-4 min-h-[64px]">
                <p className="text-sm leading-relaxed text-muted line-clamp-3">
                  {p.summary}
                </p>
              </div>

              {/* Full details - pricing page */}
              {!compact && (
                <div className="mt-6 flex flex-1 flex-col justify-between border-t border-slate-100 pt-5">
                  <div>
                    {/* Includes section */}
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-navy">
                      Includes
                    </h4>
                    <ul className="mt-2.5 space-y-2 text-xs text-slate-700">
                      {p.includes.slice(0, 5).map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
                          <span className="line-clamp-2">{item}</span>
                        </li>
                      ))}
                      {p.includes.length > 5 && (
                        <li className="text-[11px] font-medium text-royal italic">
                          + {p.includes.length - 5} more advanced perks
                        </li>
                      )}
                    </ul>

                    {/* Coverage section */}
                    <h4 className="mt-5 text-[11px] font-bold uppercase tracking-wider text-navy">
                      Coverage
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 line-clamp-2">
                      {p.coverage}
                    </p>

                    {/* Limitations (condensed) */}
                    <h4 className="mt-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Exclusions
                    </h4>
                    <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                      {p.limitations[0]} {p.limitations.length > 1 ? `(+${p.limitations.length - 1} more)` : ""}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Button pinned to bottom */}
              <Link
                href={`/contact?plan=${p.id}`}
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition ${
                  recommended
                    ? "bg-navy text-white hover:bg-royal shadow-sm"
                    : "border border-slate-400 text-navy hover:border-royal hover:text-royal bg-white"
                }`}
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