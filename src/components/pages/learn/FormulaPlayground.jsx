
"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui";
import { financialStatementsExample as example } from "@/data/learning";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const number = (value) => Number(value) || 0;

function NumberField({ label, value, onChange }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-steel">
        {label}
      </span>
      <input
        type="number"
        min="0"
        step="any"
        value={value}
        onChange={(event) => onChange(number(event.target.value))}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold tabular-nums text-navy outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      />
    </label>
  );
}

const equityFromExample = example.balance.equity.reduce(
  (total, item) => total + item.value,
  0
);

const debtFromExample = example.balance.liabilities
  .filter((item) => item.name.toLowerCase().includes("borrow"))
  .reduce((total, item) => total + item.value, 0);

const assetsFromExample = example.balance.assets.reduce(
  (total, item) => total + item.value,
  0
);

const formulas = [
  {
    id: "margin",
    label: "Net profit margin",
    description: "How much profit remains from every rupee of sales.",
    formula: "Net profit ÷ Revenue × 100",
  },
  {
    id: "roe",
    label: "Return on equity",
    description: "How efficiently the business generates profit from shareholders' funds.",
    formula: "Net profit ÷ Shareholders' equity × 100",
  },
  {
    id: "debt",
    label: "Debt-to-equity",
    description: "How much borrowing the business uses relative to shareholders' funds.",
    formula: "Total debt ÷ Shareholders' equity",
  },
  {
    id: "roce",
    label: "ROCE",
    description: "How efficiently the business uses its capital.",
    formula: "EBIT ÷ Capital employed × 100",
  },
  {
    id: "interest",
    label: "Interest coverage",
    description: "How comfortably operating earnings cover interest costs.",
    formula: "EBIT ÷ Finance costs",
  },
  {
    id: "asset",
    label: "Asset turnover",
    description: "How efficiently assets generate revenue.",
    formula: "Revenue ÷ Total assets",
  },
];

export default function FormulaPlayground() {
  const [active, setActive] = useState("margin");

  const [profit, setProfit] = useState(example.income.netProfit);
  const [revenue, setRevenue] = useState(example.income.revenue);
  const [equity, setEquity] = useState(equityFromExample);
  const [debt, setDebt] = useState(debtFromExample);

  const [ebit, setEbit] = useState(example.income.ebit);
  const [financeCosts, setFinanceCosts] = useState(
    example.income.financeCosts
  );
  const [capitalEmployed, setCapitalEmployed] = useState(
    equityFromExample + debtFromExample
  );
  const [totalAssets, setTotalAssets] = useState(assetsFromExample);

  const selected = formulas.find((item) => item.id === active);

  let result = null;
  let suffix = "%";
  let interpretation = "";
  let application = "";

  if (active === "margin") {
    result = revenue > 0 ? (profit / revenue) * 100 : null;
    interpretation =
      result === null
        ? "Revenue must be greater than zero."
        : `ABC Ltd. retains ${result.toFixed(2)} paise as net profit for every ₹1 of revenue.`;
    application =
      `${money(profit)} ÷ ${money(revenue)} × 100 = ${result === null ? "—" : `${result.toFixed(2)}%`}`;
  }

  if (active === "roe") {
    result = equity > 0 ? (profit / equity) * 100 : null;
    interpretation =
      result === null
        ? "Shareholders' equity must be greater than zero."
        : `The company generates ₹${result.toFixed(2)} of profit for every ₹100 of shareholders' equity.`;
    application =
      `${money(profit)} ÷ ${money(equity)} × 100 = ${result === null ? "—" : `${result.toFixed(2)}%`}`;
  }

  if (active === "debt") {
    result = equity > 0 ? debt / equity : null;
    suffix = "x";
    interpretation =
      result === null
        ? "Shareholders' equity must be greater than zero."
        : `ABC Ltd. has ₹${result.toFixed(2)} of debt for every ₹1 of shareholders' equity.`;
    application =
      `${money(debt)} ÷ ${money(equity)} = ${result === null ? "—" : `${result.toFixed(2)}x`}`;
  }

  if (active === "roce") {
    result = capitalEmployed > 0 ? (ebit / capitalEmployed) * 100 : null;
    interpretation =
      result === null
        ? "Capital employed must be greater than zero."
        : `The business generates ₹${result.toFixed(2)} of operating profit for every ₹100 of capital employed.`;
    application =
      `${money(ebit)} ÷ ${money(capitalEmployed)} × 100 = ${result === null ? "—" : `${result.toFixed(2)}%`}`;
  }

  if (active === "interest") {
    result = financeCosts > 0 ? ebit / financeCosts : null;
    suffix = "x";
    interpretation =
      result === null
        ? "Finance costs must be greater than zero."
        : `Operating earnings cover the company's finance costs ${result.toFixed(2)} times.`;
    application =
      `${money(ebit)} ÷ ${money(financeCosts)} = ${result === null ? "—" : `${result.toFixed(2)}x`}`;
  }

  if (active === "asset") {
    result = totalAssets > 0 ? revenue / totalAssets : null;
    suffix = "x";
    interpretation =
      result === null
        ? "Total assets must be greater than zero."
        : `Every ₹1 invested in assets generates ₹${result.toFixed(2)} in revenue.`;
    application =
      `${money(revenue)} ÷ ${money(totalAssets)} = ${result === null ? "—" : `${result.toFixed(2)}x`}`;
  }

  return (
    <Section tone="ice">
      <div id="formula-playground" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Formula playground · 02"
          title="Turn financial figures into useful ratios."
        >
          Experiment with essential calculations using ABC Ltd.'s figures.
          Change the numbers and see what they reveal.
        </SectionHeading>

        <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
          <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-slate-50/70 p-3">
            {formulas.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                aria-pressed={active === item.id}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  active === item.id
                    ? "bg-[#173454] text-white"
                    : "text-steel hover:bg-white hover:text-navy"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-[1fr_0.8fr] lg:gap-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-700">
                ABC Ltd. · Illustrative figures
              </p>
              <h3 className="mt-1 font-serif text-xl text-navy">
                {selected.label}
              </h3>
              <p className="mt-1 text-xs leading-5 text-muted">
                {selected.description}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(active === "margin" || active === "roe") && (
                  <NumberField
                    label="Net profit (₹)"
                    value={profit}
                    onChange={setProfit}
                  />
                )}

                {(active === "margin" || active === "asset") && (
                  <NumberField
                    label="Revenue (₹)"
                    value={revenue}
                    onChange={setRevenue}
                  />
                )}

                {(active === "roe" || active === "debt") && (
                  <NumberField
                    label="Shareholders' equity (₹)"
                    value={equity}
                    onChange={setEquity}
                  />
                )}

                {active === "debt" && (
                  <NumberField
                    label="Total debt (₹)"
                    value={debt}
                    onChange={setDebt}
                  />
                )}

                {active === "roce" && (
                  <>
                    <NumberField
                      label="EBIT (₹)"
                      value={ebit}
                      onChange={setEbit}
                    />
                    <NumberField
                      label="Capital employed (₹)"
                      value={capitalEmployed}
                      onChange={setCapitalEmployed}
                    />
                  </>
                )}

                {active === "interest" && (
                  <>
                    <NumberField
                      label="EBIT (₹)"
                      value={ebit}
                      onChange={setEbit}
                    />
                    <NumberField
                      label="Finance costs (₹)"
                      value={financeCosts}
                      onChange={setFinanceCosts}
                    />
                  </>
                )}

                {active === "asset" && (
                  <NumberField
                    label="Total assets (₹)"
                    value={totalAssets}
                    onChange={setTotalAssets}
                  />
                )}
              </div>

              <div className="mt-4 rounded-lg border border-sky-200/80 bg-sky-50/80 px-3 py-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="shrink-0 rounded-md bg-sky-100 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-sky-800">
                    Formula
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-[#173454]">
                    {selected.formula}
                  </span>
                </div>
                <p className="mt-2 border-t border-sky-200/70 pt-2 text-[11px] leading-5 text-sky-900/75 tabular-nums">
                  Example: {application}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-sky-100 bg-sky-50/60 p-4 sm:p-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-700">
                  Calculated result
                </p>
                <p className="mt-2 font-serif text-3xl font-semibold tracking-tight text-navy tabular-nums">
                  {result === null || !Number.isFinite(result)
                    ? "—"
                    : `${result.toFixed(2)}${suffix}`}
                </p>
              </div>

              <div className="mt-5 border-t border-sky-200/70 pt-3">
                <p className="text-xs leading-5 text-sky-950/75">
                  {interpretation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
