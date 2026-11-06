
"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui";
import { financialStatementsExample as example } from "@/data/learning";

/* ----------------------------------
   Formatting helpers
---------------------------------- */

const formatMoney = (value) => {
  const absolute = Math.abs(value);

  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(absolute);

  return `${value < 0 ? "−" : ""}₹${formatted}`;
};

const formatPercent = (value) => `${value.toFixed(1)}%`;

const sum = (items) =>
  items.reduce((total, item) => total + item.value, 0);

/* ----------------------------------
   Shared components
---------------------------------- */

function StatementTab({ active, onClick, icon, title, subtitle }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border px-3 py-3 text-left transition ${
        active
          ? "border-sky-200 bg-sky-50/80 text-sky-900"
          : "border-transparent bg-transparent text-steel hover:bg-slate-50"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          active ? "bg-white text-sky-700" : "bg-slate-100 text-slate-500"
        }`}
      >
        {icon}
      </span>

      <span className="min-w-0">
        <span className="block text-xs font-semibold">{title}</span>
        <span className="mt-0.5 block text-[10px] text-muted">
          {subtitle}
        </span>
      </span>
    </button>
  );
}

function StatementRow({
  label,
  value,
  emphasis = false,
  description,
  positive = false,
  negative = false,
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 border-b border-slate-100 py-2 ${
        emphasis ? "font-semibold" : ""
      }`}
    >
      <div className="min-w-0">
        <p className={`text-xs ${emphasis ? "text-navy" : "text-steel"}`}>
          {label}
        </p>

        {description && (
          <p className="mt-0.5 text-[10px] leading-4 text-muted">
            {description}
          </p>
        )}
      </div>

      <span
        className={`shrink-0 text-xs tabular-nums ${
          positive
            ? "text-emerald-700"
            : negative
              ? "text-amber-700"
              : emphasis
                ? "text-navy"
                : "text-steel"
        }`}
      >
        {formatMoney(value)}
      </span>
    </div>
  );
}

function SectionTotal({ label, value, tone = "blue", caption }) {
  const styles = {
    blue: "border-sky-100 bg-sky-50/70 text-sky-900",
    green: "border-emerald-100 bg-emerald-50/70 text-emerald-900",
    violet: "border-violet-100 bg-violet-50/70 text-violet-900",
  };

  return (
    <div className={`mt-3 flex items-center justify-between gap-3 rounded-xl border p-3 ${styles[tone]}`}>
      <div>
        <p className="text-xs font-semibold">{label}</p>
        {caption && (
          <p className="mt-0.5 text-[10px] opacity-70">{caption}</p>
        )}
      </div>

      <p className="shrink-0 text-sm font-semibold tabular-nums">
        {formatMoney(value)}
      </p>
    </div>
  );
}

function MiniHeading({ eyebrow, title, children }) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-700">
        {eyebrow}
      </p>
      <h3 className="mt-1 font-serif text-xl text-navy">{title}</h3>
      {children && (
        <p className="mt-1 text-xs leading-5 text-muted">{children}</p>
      )}
    </div>
  );
}

/* ----------------------------------
   1. Income statement
---------------------------------- */

function IncomeStatement({ data }) {
  const rows = [
    {
      label: "Revenue",
      value: data.revenue,
      emphasis: true,
    },
    {
      label: "Cost of goods sold",
      value: -data.cogs,
      negative: true,
    },
    {
      label: "Gross profit",
      value: data.grossProfit,
      emphasis: true,
    },
    {
      label: "Operating expenses",
      value: -data.operatingExpenses,
      negative: true,
    },
    {
      label: "EBITDA",
      value: data.ebitda,
      emphasis: true,
    },
    {
      label: "Depreciation & amortisation",
      value: -data.depreciation,
      negative: true,
    },
    {
      label: "EBIT",
      value: data.ebit,
      emphasis: true,
    },
    {
      label: "Finance costs",
      value: -data.financeCosts,
      negative: true,
    },
    {
      label: "Profit before tax",
      value: data.profitBeforeTax,
      emphasis: true,
    },
    {
      label: "Tax expense",
      value: -data.tax,
      negative: true,
    },
    {
      label: "Profit after tax",
      value: data.netProfit,
      emphasis: true,
    },
  ];

  const profitMargin = (data.netProfit / data.revenue) * 100;
  const operatingMargin = (data.ebit / data.revenue) * 100;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <MiniHeading
          eyebrow="Statement 01"
          title="Income statement"
        >
          How the business earned and spent money during the year.
        </MiniHeading>

        <div className="rounded-xl border border-slate-200/80 bg-white px-4">
          {rows.map((row) => (
            <StatementRow key={row.label} {...row} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="rounded-2xl border border-slate-200 bg-[#173454] p-5 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-200">
            Final earnings · PAT
          </p>

          <p className="mt-2 text-3xl font-semibold tabular-nums">
            {formatMoney(data.netProfit)}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/15 pt-4">
            <div>
              <p className="text-[10px] text-blue-200/70">
                Net profit margin
              </p>
              <p className="mt-1 text-xl font-semibold text-emerald-300">
                {formatPercent(profitMargin)}
              </p>
            </div>

            <div>
              <p className="text-[10px] text-blue-200/70">
                Operating margin
              </p>
              <p className="mt-1 text-xl font-semibold text-sky-200">
                {formatPercent(operatingMargin)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
          <p className="text-xs font-semibold text-sky-900">
            Three earnings measures
          </p>

          <p className="mt-1.5 text-xs leading-5 text-sky-900/70">
            EBITDA excludes depreciation. EBIT includes it.
            PAT also accounts for finance costs and tax.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------
   2. Balance sheet
---------------------------------- */

function BalanceSheet({ data }) {
  const totalAssets = sum(data.assets);
  const totalLiabilities = sum(data.liabilities);
  const totalEquity = sum(data.equity);
  const totalFunding = totalLiabilities + totalEquity;

  const balanced = Math.abs(totalAssets - totalFunding) < 0.01;

  const categories = [
    {
      title: "Assets",
      items: data.assets,
      total: totalAssets,
      color: "bg-sky-500",
      text: "text-sky-800",
      surface: "bg-sky-50/70",
    },
    {
      title: "Liabilities",
      items: data.liabilities,
      total: totalLiabilities,
      color: "bg-violet-500",
      text: "text-violet-800",
      surface: "bg-violet-50/70",
    },
    {
      title: "Equity",
      items: data.equity,
      total: totalEquity,
      color: "bg-emerald-500",
      text: "text-emerald-800",
      surface: "bg-emerald-50/70",
    },
  ];

  return (
    <div>
      <MiniHeading
        eyebrow="Statement 02"
        title="Balance sheet"
      >
        What the business owns and owes at a specific point in time.
      </MiniHeading>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        {/* Asset composition */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold text-navy">
              Asset composition
            </p>
            <span className="text-xs font-semibold tabular-nums text-sky-800">
              {formatMoney(totalAssets)}
            </span>
          </div>

          <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-slate-100">
            {data.assets.map((item) => (
              <div
                key={item.name}
                className="h-full bg-sky-500 border-r border-white/50 last:border-0"
                style={{
                  width: `${(item.value / totalAssets) * 100}%`,
                }}
                title={`${item.name}: ${formatMoney(item.value)}`}
              />
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {data.assets.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-steel">{item.name}</span>
                  <span className="text-xs font-medium tabular-nums text-navy">
                    {formatMoney(item.value)}
                  </span>
                </div>

                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-sky-400"
                    style={{
                      width: `${(item.value / totalAssets) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Liabilities and equity */}
        <div className="space-y-3">
          {categories.slice(1).map((category) => (
            <div
              key={category.title}
              className={`rounded-xl border border-slate-100 p-4 ${category.surface}`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-xs font-semibold ${category.text}`}>
                  {category.title}
                </p>
                <p className={`text-xs font-semibold tabular-nums ${category.text}`}>
                  {formatMoney(category.total)}
                </p>
              </div>

              <div className="mt-3 space-y-2">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-xs text-steel">{item.name}</span>
                    <span className="text-xs tabular-nums text-navy">
                      {formatMoney(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
            <p className="text-xs font-semibold text-sky-900">
              The accounting equation
            </p>

            <p className="mt-2 text-sm font-semibold tabular-nums text-sky-900">
              Assets = Liabilities + Equity
            </p>

            <div className="mt-3 flex items-center justify-between gap-3 text-xs">
              <span className="text-sky-800/70">Total assets</span>
              <span className="font-semibold text-sky-900">
                {formatMoney(totalAssets)}
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between gap-3 text-xs">
              <span className="text-sky-800/70">Liabilities + equity</span>
              <span className="font-semibold text-sky-900">
                {formatMoney(totalFunding)}
              </span>
            </div>

            <div className={`mt-3 border-t border-sky-200/70 pt-3 text-xs font-semibold ${
              balanced ? "text-emerald-700" : "text-red-700"
            }`}>
              {balanced
                ? "✓ Balance sheet balances"
                : "Balance sheet does not balance"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------
   3. Cash flow statement
---------------------------------- */

function CashFlow({ data }) {
  const operatingTotal = sum(data.operating);
  const investingTotal = sum(data.investing);
  const financingTotal = sum(data.financing);

  const netChange = operatingTotal + investingTotal + financingTotal;
  const calculatedClosingCash = data.openingCash + netChange;

  const groups = [
    {
      title: "Operating activities",
      caption: "Cash from core business operations.",
      items: data.operating,
      total: operatingTotal,
      surface: "bg-sky-50/70",
      border: "border-sky-100",
      color: "text-sky-800",
      bar: "bg-sky-500",
    },
    {
      title: "Investing activities",
      caption: "Cash spent on or received from investments.",
      items: data.investing,
      total: investingTotal,
      surface: "bg-violet-50/70",
      border: "border-violet-100",
      color: "text-violet-800",
      bar: "bg-violet-500",
    },
    {
      title: "Financing activities",
      caption: "Cash from borrowing, capital and dividends.",
      items: data.financing,
      total: financingTotal,
      surface: "bg-emerald-50/70",
      border: "border-emerald-100",
      color: "text-emerald-800",
      bar: "bg-emerald-500",
    },
  ];

  return (
    <div>
      <MiniHeading
        eyebrow="Statement 03"
        title="Cash flow statement"
      >
        Where cash came from and where it went during the year.
      </MiniHeading>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        {/* Cash flow groups */}
        <div className="space-y-3">
          {groups.map((group) => (
            <div
              key={group.title}
              className={`rounded-xl border p-4 ${group.border} ${group.surface}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`text-xs font-semibold ${group.color}`}>
                    {group.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted">
                    {group.caption}
                  </p>
                </div>

                <p className={`shrink-0 text-sm font-semibold tabular-nums ${group.color}`}>
                  {formatMoney(group.total)}
                </p>
              </div>

              <div className="mt-3 space-y-2 border-t border-slate-200/60 pt-3">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-xs text-steel">{item.name}</span>

                    <span
                      className={`text-xs tabular-nums ${
                        item.value < 0 ? "text-amber-700" : "text-navy"
                      }`}
                    >
                      {formatMoney(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cash reconciliation */}
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-700">
              Cash reconciliation
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-steel">Opening cash</span>
                <span className="text-xs font-semibold tabular-nums text-navy">
                  {formatMoney(data.openingCash)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-steel">Operating cash flow</span>
                <span className="text-xs font-medium tabular-nums text-sky-800">
                  {formatMoney(operatingTotal)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-steel">Investing cash flow</span>
                <span className="text-xs font-medium tabular-nums text-violet-800">
                  {formatMoney(investingTotal)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-steel">Financing cash flow</span>
                <span className="text-xs font-medium tabular-nums text-emerald-800">
                  {formatMoney(financingTotal)}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-navy">
                    Net cash change
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-navy">
                    {formatMoney(netChange)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
              Closing cash
            </p>

            <p className="mt-2 text-3xl font-semibold tabular-nums text-emerald-900">
              {formatMoney(calculatedClosingCash)}
            </p>

            <p className="mt-2 text-xs leading-5 text-emerald-800/70">
              Opening cash plus the net movement in cash.
            </p>

            <div className="mt-3 border-t border-emerald-200/70 pt-3">
              <p className="text-[10px] text-emerald-800/70">
                Example closing cash
              </p>
              <p className="mt-1 text-sm font-semibold text-emerald-900">
                {formatMoney(data.closingCash)}
              </p>

              {Math.abs(calculatedClosingCash - data.closingCash) < 0.01 ? (
                <p className="mt-2 text-[10px] font-medium text-emerald-700">
                  ✓ Cash flow reconciles
                </p>
              ) : (
                <p className="mt-2 text-[10px] font-medium text-red-700">
                  Closing cash does not reconcile
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-4">
            <p className="text-xs font-semibold text-amber-900">
              Profit isn't the same as cash.
            </p>
            <p className="mt-1.5 text-xs leading-5 text-amber-900/70">
              Depreciation is non-cash. Working capital changes
              also affect operating cash flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------
   4. Statement connections
---------------------------------- */

function StatementConnections() {
  const connections = [
    {
      from: "Net profit",
      to: "Retained earnings",
      description:
        "Profit generally increases retained earnings; dividends and other adjustments reduce them.",
      color: "text-sky-700",
      icon: "trending-up",
    },
    {
      from: "Depreciation",
      to: "Cash flow",
      description:
        "Depreciation reduces profit but is added back in the indirect cash flow method.",
      color: "text-violet-700",
      icon: "refresh",
    },
    {
      from: "Capital expenditure",
      to: "Assets",
      description:
        "Equipment purchases use investing cash and create assets that are depreciated over time.",
      color: "text-emerald-700",
      icon: "layers",
    },
  ];

  return (
    <div className="mt-9">
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-700">
          How they connect
        </p>
        <h3 className="mt-1 font-serif text-xl text-navy">
          Three statements. One financial story.
        </h3>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {connections.map((item) => (
          <div
            key={item.from}
            className="rounded-xl border border-slate-200/80 bg-white p-4"
          >
            <p className={`text-xs font-semibold ${item.color}`}>
              {item.from}
            </p>

            <div className="my-2 flex items-center gap-2 text-slate-300">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs">↓</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-xs font-semibold text-navy">{item.to}</p>

            <p className="mt-2 text-xs leading-5 text-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------
   5. Knowledge check
---------------------------------- */

function KnowledgeCheck() {
  const [answer, setAnswer] = useState("");

  const correct = answer === "balance";

  const options = [
    { value: "income", label: "Income statement" },
    { value: "balance", label: "Balance sheet" },
    { value: "cash", label: "Cash flow statement" },
  ];

  return (
    <div className="mt-9 rounded-2xl border border-slate-200 bg-[#173454] p-5 text-white sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-200">
            Quick knowledge check
          </p>

          <h3 className="mt-2 font-serif text-2xl text-white">
            Which statement shows a company's financial position on 31 March?
          </h3>

          <p className="mt-2 text-xs leading-5 text-blue-100/65">
            Think about the statement that captures assets, liabilities
            and equity at a specific date.
          </p>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-blue-200/70">
            Choose your answer
          </p>

          <div className="space-y-2">
            {options.map((option) => {
              const active = answer === option.value;
              const isRight = option.value === "balance";

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAnswer(option.value)}
                  aria-pressed={active}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-xs transition ${
                    active
                      ? isRight
                        ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                        : "border-amber-300/40 bg-amber-400/10 text-amber-100"
                      : "border-white/15 bg-white/[0.04] text-white hover:bg-white/10"
                  }`}
                >
                  {option.label}
                  <span className="text-[10px] opacity-70">
                    {active ? (isRight ? "✓ Correct" : "Try again") : "Select →"}
                  </span>
                </button>
              );
            })}
          </div>

          {answer && (
            <p
              aria-live="polite"
              className={`mt-3 text-xs leading-5 ${
                correct ? "text-emerald-200" : "text-amber-200"
              }`}
            >
              {correct
                ? "Correct. A balance sheet shows assets, liabilities and equity at a particular point in time."
                : "Not quite. Look for the statement that reports what a business owns and owes on a specific date."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------
   Main component
---------------------------------- */

export default function FinancialStatements() {
  const [activeTab, setActiveTab] = useState("income");

  const tabs = [
    {
      id: "income",
      title: "Income statement",
      subtitle: "Business performance",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"
          stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M4 19V5M4 19h17" />
          <path d="m7 15 4-4 3 2 5-6" />
        </svg>
      ),
    },
    {
      id: "balance",
      title: "Balance sheet",
      subtitle: "Financial position",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"
          stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M12 3v18M4 7h16M6 7l-3 7h6L6 7ZM18 7l-3 7h6l-3-7Z" />
          <path d="M7 21h10" />
        </svg>
      ),
    },
    {
      id: "cash",
      title: "Cash flow",
      subtitle: "Cash movement",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"
          stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M4 7h15l-3-3M20 17H5l3 3" />
          <path d="M19 7v4M5 17v-4" />
        </svg>
      ),
    },
  ];

  return (
    <Section>
      <div id="financial-statements" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Financial statements · 02"
          title="Three statements. One complete picture."
        >
          Explore how a company's performance, financial position and
          cash movements fit together.
        </SectionHeading>

        {/* Company context */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3">
          <div>
            <p className="text-xs font-semibold text-navy">
              {example.company}
            </p>
            <p className="mt-0.5 text-[10px] text-muted">
              Illustrative company · {example.period}
            </p>
          </div>

          <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-[10px] font-medium text-sky-800">
            All figures in INR
          </span>
        </div>

        {/* Statement explorer */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_5px_24px_rgba(15,42,77,0.035)]">
          <div className="flex flex-col gap-1 border-b border-slate-100 bg-slate-50/60 p-2 sm:flex-row">
            {tabs.map((tab) => (
              <StatementTab
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                {...tab}
              />
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "income" && (
              <IncomeStatement data={example.income} />
            )}

            {activeTab === "balance" && (
              <BalanceSheet data={example.balance} />
            )}

            {activeTab === "cash" && (
              <CashFlow data={example.cashFlow} />
            )}
          </div>
        </div>

        <StatementConnections />

        <KnowledgeCheck />

        {/* Assumptions */}
        <details className="mt-4 rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3">
          <summary className="cursor-pointer text-xs font-semibold text-steel">
            About this example
          </summary>

          <p className="mt-3 text-xs leading-5 text-muted">
            ABC Ltd. is a fictional business. The figures are illustrative
            and designed to demonstrate how the three financial statements
            work together. They are not actual company financial results
            or investment research.
          </p>
        </details>
      </div>
    </Section>
  );
}
