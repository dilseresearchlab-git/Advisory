
"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui";
import { financialStoryExample as example } from "@/data/learning";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(value);

const initialExpenses = example.operatingExpenses;

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"
      stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

function FinancialStory() {
  const [operatingExpenses, setOperatingExpenses] = useState(initialExpenses);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const grossProfit = example.revenue - example.costOfGoodsSold;
  const ebitda = grossProfit - operatingExpenses;
  const ebit = ebitda - example.depreciationAndAmortisation;
  const profitBeforeTax = ebit - example.financeCosts;

  const tax =
    Math.max(profitBeforeTax, 0) *
    (example.illustrativeTaxRate / 100);

  const netProfit = profitBeforeTax - tax;

  const operatingMargin =
    example.revenue > 0 ? (ebit / example.revenue) * 100 : 0;

  const netMargin =
    example.revenue > 0 ? (netProfit / example.revenue) * 100 : 0;

  const steps = [
    {
      label: "Sales revenue",
      description: "Total sales earned",
      value: example.revenue,
      type: "opening",
    },
    {
      label: "Cost of goods sold",
      description: "Direct product costs",
      value: -example.costOfGoodsSold,
      type: "deduction",
    },
    {
      label: "Gross profit",
      description: "Revenue after product costs",
      formula: "Revenue − COGS",
      value: grossProfit,
      type: "subtotal",
    },
    {
      label: "Operating expenses",
      description: "Staff, rent and administration",
      value: -operatingExpenses,
      type: "deduction",
    },
    {
      label: "EBITDA",
      description: "Earnings before D&A, interest and tax",
      formula: "Gross profit − operating expenses",
      value: ebitda,
      type: "subtotal",
    },
    {
      label: "Depreciation & amortisation",
      description: "Cost of using long-term assets",
      value: -example.depreciationAndAmortisation,
      type: "deduction",
    },
    {
      label: "EBIT",
      description: "Operating profit after D&A",
      formula: "EBITDA − D&A",
      value: ebit,
      type: "subtotal",
    },
    {
      label: "Finance costs",
      description: "Borrowing-related costs",
      value: -example.financeCosts,
      type: "deduction",
    },
    {
      label: "Profit before tax",
      description: "Earnings before income tax",
      formula: "EBIT − finance costs",
      value: profitBeforeTax,
      type: "subtotal",
    },
    {
      label: "Illustrative tax",
      description: `Assumed tax rate of ${example.illustrativeTaxRate}%`,
      value: -tax,
      type: "deduction",
    },
    {
      label: "Net profit (PAT)",
      description: "Earnings remaining after tax",
      formula: "Profit before tax − tax",
      value: netProfit,
      type: "final",
    },
  ];

  const isCorrect = selectedAnswer === "EBIT";

  const getStepStyle = (type) => {
    if (type === "opening") {
      return {
        surface: "bg-[#173454] border-[#173454]",
        number: "text-sky-200",
        label: "text-white",
        description: "text-blue-100/65",
        value: "text-white",
        bar: "bg-sky-300",
        track: "bg-white/15",
      };
    }

    if (type === "deduction") {
      return {
        surface: "bg-amber-50/65 border-amber-100/80",
        number: "text-amber-600",
        label: "text-amber-950",
        description: "text-amber-900/55",
        value: "text-amber-800",
        bar: "bg-amber-400",
        track: "bg-amber-100",
      };
    }

    if (type === "final") {
      return {
        surface: "bg-emerald-50/80 border-emerald-200/80",
        number: "text-emerald-700",
        label: "text-emerald-950",
        description: "text-emerald-800/65",
        value: "text-emerald-800",
        bar: "bg-emerald-500",
        track: "bg-emerald-100",
      };
    }

    return {
      surface: "bg-sky-50/65 border-sky-100/80",
      number: "text-sky-700",
      label: "text-sky-950",
      description: "text-sky-900/55",
      value: "text-sky-800",
      bar: "bg-sky-500",
      track: "bg-sky-100",
    };
  };

  return (
    <Section tone="ice">
      <div id="financial-story" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Financial story · 01"
          title="Meet ABC Ltd. Follow the money."
        >
          See how sales turn into profit, explore the costs along the way
          and experiment with the numbers yourself.
        </SectionHeading>

        <div className="mt-9 grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-9">

          {/* LEFT: Company + experiment */}
          <div className="flex flex-col gap-5">

            {/* Company introduction */}
            <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/90 to-white p-5 sm:p-6">

              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-700">
                  Your fictional business
                </span>

                <span className="rounded-full border border-sky-200/80 bg-white/70 px-2.5 py-1 text-[10px] text-sky-700/75">
                  Case study 01
                </span>
              </div>

              <h3 className="mt-6 font-serif text-2xl text-navy">
                {example.company}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                {example.description} You are the owner, exploring how
                your business earns and spends money.
              </p>

              <div className="mt-6 rounded-xl border border-sky-100/80 bg-white/75 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-700">
                  Total sales
                </p>

                <p className="mt-1 text-3xl font-semibold tracking-tight text-navy tabular-nums">
                  {money(example.revenue)}
                </p>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sky-100">
                  <div className="h-full w-full rounded-full bg-sky-500" />
                </div>

                <p className="mt-2 text-[11px] text-muted">
                  The starting point: 100% of sales revenue.
                </p>
              </div>
            </div>

            {/* Teaching note */}
            <div className="flex items-start gap-3 px-1">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-sky-100 bg-sky-50 text-sky-700">
                <InfoIcon />
              </div>

              <div>
                <p className="text-sm font-semibold text-navy">
                  Revenue isn't profit.
                </p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Sales show what a business earns. Profit shows what
                  remains after its costs.
                </p>
              </div>
            </div>

            {/* Interactive experiment */}
            <div className="rounded-2xl border border-amber-100 bg-white p-5 sm:p-6">

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-700">
                    Try it yourself
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-navy">
                    Change the expenses
                  </h3>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4"
                    fill="none" stroke="currentColor" strokeWidth="1.7"
                    aria-hidden="true">
                    <path d="M3 17 9 11l4 4 8-9" />
                    <path d="M15 6h6v6" />
                  </svg>
                </div>
              </div>

              <p className="mt-2 text-xs leading-5 text-muted">
                Increase or reduce operating expenses to see how
                earnings respond.
              </p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <label
                  htmlFor="operating-expenses"
                  className="text-xs font-medium text-navy"
                >
                  Operating expenses
                </label>

                <span className="text-base font-semibold tabular-nums text-amber-800">
                  {money(operatingExpenses)}
                </span>
              </div>

              <input
                id="operating-expenses"
                type="range"
                min="10000"
                max="35000"
                step="1000"
                value={operatingExpenses}
                onChange={(event) =>
                  setOperatingExpenses(Number(event.target.value))
                }
                className="mt-4 w-full cursor-pointer accent-amber-500"
              />

              <div className="mt-1 flex justify-between text-[10px] text-muted">
                <span>₹10,000</span>
                <span>₹35,000</span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-700">
                    EBITDA
                  </p>
                  <p className="mt-1 text-lg font-semibold tabular-nums text-sky-900">
                    {money(ebitda)}
                  </p>
                </div>

                <div className="rounded-xl border border-violet-100 bg-violet-50/70 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-700">
                    EBIT
                  </p>
                  <p className="mt-1 text-lg font-semibold tabular-nums text-violet-900">
                    {money(ebit)}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-muted">
                {operatingExpenses > initialExpenses
                  ? "Higher expenses leave less operating earnings."
                  : operatingExpenses < initialExpenses
                    ? "Lower expenses leave more operating earnings."
                    : "Original example. Move the slider to experiment."}
              </p>

              <button
                type="button"
                onClick={() => setOperatingExpenses(initialExpenses)}
                className="mt-3 text-xs font-semibold text-amber-800 transition hover:text-amber-950"
              >
                Reset example ↺
              </button>
            </div>
          </div>

          {/* RIGHT: Financial breakdown */}
          <div className="min-w-0">

            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-700">
                  The financial breakdown
                </p>
                <h3 className="mt-1 font-serif text-2xl text-navy">
                  Where does the money go?
                </h3>
              </div>

              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-steel">
                11 stages
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_5px_24px_rgba(15,42,77,0.035)] sm:p-4">
              <div className="space-y-2">
                {steps.map((step, index) => {
                  const style = getStepStyle(step.type);
                  const barWidth = Math.min(
                    (Math.abs(step.value) / example.revenue) * 100,
                    100
                  );

                  return (
                    <div
                      key={step.label}
                      className={`rounded-xl border px-3 py-2.5 ${style.surface}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <span className={`font-serif text-[10px] ${style.number}`}>
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="min-w-0">
                            <p className={`text-xs font-semibold ${style.label}`}>
                              {step.label}
                            </p>
                            <p className={`mt-0.5 text-[10px] ${style.description}`}>
                              {step.description}
                            </p>
                          </div>
                        </div>

                        <p className={`shrink-0 text-xs font-semibold tabular-nums sm:text-sm ${style.value}`}>
                          {step.type === "deduction" ? "−" : ""}
                          {money(Math.abs(step.value))}
                        </p>
                      </div>

                      <div className={`mt-2 h-1 overflow-hidden rounded-full ${style.track}`}>
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${style.bar}`}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>

                      {step.formula && (
                        <p className="mt-1.5 text-[9px] text-steel/80">
                          {step.formula}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Profit margins */}
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-violet-100 bg-violet-50/70 p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-violet-700">
                    Operating margin
                  </p>
                  <p className="mt-1 text-xl font-semibold tabular-nums text-violet-900">
                    {operatingMargin.toFixed(1)}%
                  </p>
                  <p className="mt-1 text-[10px] text-violet-700/75">
                    EBIT ÷ Revenue
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-emerald-700">
                    Net profit margin
                  </p>
                  <p className="mt-1 text-xl font-semibold tabular-nums text-emerald-900">
                    {netMargin.toFixed(1)}%
                  </p>
                  <p className="mt-1 text-[10px] text-emerald-700/75">
                    PAT ÷ Revenue
                  </p>
                </div>
              </div>
            </div>

            {/* Key distinction */}
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50/60 p-4">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500" />

              <div>
                <p className="text-xs font-semibold text-sky-900">
                  EBITDA, EBIT and net profit are different.
                </p>
                <p className="mt-1 text-xs leading-5 text-sky-900/65">
                  EBIT includes depreciation and amortisation.
                  Net profit also accounts for finance costs and tax.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge check */}
        <div className="mt-10 rounded-2xl border border-slate-200/80 bg-[#173454] p-5 text-white sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-200">
                Quick knowledge check
              </p>

              <h3 className="mt-2 font-serif text-2xl text-white">
                Which profit measure comes next?
              </h3>

              <p className="mt-2 max-w-lg text-sm leading-6 text-blue-100/70">
                Depreciation and amortisation have been deducted from
                EBITDA, but interest and tax haven't. What is this measure?
              </p>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-blue-200/75">
                Choose your answer
              </p>

              <div className="grid gap-2">
                {["EBITDA", "EBIT", "PAT"].map((option) => {
                  const active = selectedAnswer === option;
                  const correct = option === "EBIT";

                  let style =
                    "border-white/15 bg-white/[0.05] text-white hover:bg-white/10";

                  if (active && correct) {
                    style =
                      "border-emerald-300/40 bg-emerald-400/15 text-emerald-100";
                  } else if (active && !correct) {
                    style =
                      "border-amber-300/40 bg-amber-400/10 text-amber-100";
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedAnswer(option)}
                      aria-pressed={active}
                      className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition ${style}`}
                    >
                      {option}
                      <span className="text-[10px] opacity-75">
                        {active
                          ? correct
                            ? "✓ Correct"
                            : "Try again"
                          : "Select →"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedAnswer && (
                <p
                  aria-live="polite"
                  className={`mt-3 rounded-lg px-3 py-2.5 text-xs leading-5 ${
                    isCorrect
                      ? "bg-emerald-400/10 text-emerald-100"
                      : "bg-amber-300/10 text-amber-100"
                  }`}
                >
                  {isCorrect
                    ? "Exactly. EBIT is earnings after depreciation and amortisation, but before interest and tax."
                    : "Not quite. EBITDA is before depreciation and amortisation. EBIT is after them, but before interest and tax."}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Assumptions */}
        <details className="mt-4 rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3">
          <summary className="cursor-pointer text-xs font-semibold text-steel">
            Assumptions behind this example
          </summary>

          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs leading-5 text-muted">
            {example.assumptions.map((assumption) => (
              <li key={assumption}>{assumption}</li>
            ))}
          </ul>
        </details>
      </div>
    </Section>
  );
}

export default FinancialStory;
