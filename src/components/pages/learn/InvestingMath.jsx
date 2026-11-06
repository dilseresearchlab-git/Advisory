
"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const number = (value) => Number(value) || 0;

function NumberField({ label, value, onChange, step = "any" }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-steel">
        {label}
      </span>
      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(event) => onChange(number(event.target.value))}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold tabular-nums text-navy outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
      />
    </label>
  );
}

const calculators = [
  {
    id: "cagr",
    label: "CAGR",
    description: "Measure the annualised growth of an investment.",
    formula: "(Ending value ÷ Starting value) ^ (1 ÷ Years) − 1",
  },
  {
    id: "compound",
    label: "Compounding",
    description: "See how an investment may grow when returns are reinvested.",
    formula: "Principal × (1 + Annual return) ^ Years",
  },
  {
    id: "position",
    label: "Position sizing",
    description: "Estimate quantity based on a predefined trade risk.",
    formula: "Risk amount ÷ (Entry price − Stop-loss)",
  },
  {
    id: "sip",
    label: "SIP returns",
    description: "Estimate how regular monthly investments may grow.",
    formula: "M × [((1 + i)^n − 1) ÷ i]",
  },
  {
    id: "riskreward",
    label: "Risk / Reward",
    description: "Compare a trade's potential reward against its risk.",
    formula: "Potential reward ÷ Potential risk",
  },
];

export default function InvestingMath() {
  const [active, setActive] = useState("cagr");

  const [startValue, setStartValue] = useState(100000);
  const [endValue, setEndValue] = useState(180000);
  const [cagrYears, setCagrYears] = useState(5);

  const [principal, setPrincipal] = useState(100000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [compoundYears, setCompoundYears] = useState(10);

  const [capital, setCapital] = useState(100000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [entry, setEntry] = useState(500);
  const [stopLoss, setStopLoss] = useState(475);

  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [sipReturn, setSipReturn] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  const [target, setTarget] = useState(575);

  const selected = calculators.find((item) => item.id === active);

  // CAGR
  const cagr =
    startValue > 0 && endValue >= 0 && cagrYears > 0
      ? (Math.pow(endValue / startValue, 1 / cagrYears) - 1) * 100
      : null;

  // Lump-sum compounding
  const futureValue =
    principal >= 0 && compoundYears >= 0 && annualReturn >= 0
      ? principal * Math.pow(1 + annualReturn / 100, compoundYears)
      : null;

  // Position sizing
  const riskAmount = capital * (riskPercent / 100);
  const priceRisk = entry - stopLoss;
  const quantity =
    priceRisk > 0 && riskAmount > 0
      ? Math.floor(riskAmount / priceRisk)
      : null;
  const positionValue = quantity !== null ? quantity * entry : null;

  // SIP: monthly contributions at the end of each month.
  const monthlyRate = sipReturn / 100 / 12;
  const totalMonths = sipYears * 12;

  const sipFutureValue =
    monthlyInvestment >= 0 && sipYears >= 0 && sipReturn >= 0
      ? monthlyRate === 0
        ? monthlyInvestment * totalMonths
        : monthlyInvestment *
          ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
      : null;

  const totalInvested = monthlyInvestment * totalMonths;
  const sipGain =
    sipFutureValue !== null ? sipFutureValue - totalInvested : null;

  // Risk / Reward
  const potentialRisk = entry - stopLoss;
  const potentialReward = target - entry;
  const riskReward =
    potentialRisk > 0 && potentialReward > 0
      ? potentialReward / potentialRisk
      : null;

  let result = null;
  let resultLabel = "";
  let resultDisplay = "—";
  let interpretation = "";
  let application = "";

  if (active === "cagr") {
    result = cagr;
    resultLabel = "Annualised growth";
    resultDisplay = cagr === null ? "—" : `${cagr.toFixed(2)}%`;
    interpretation =
      cagr === null
        ? "Enter a positive starting value and a valid time period."
        : `The investment grew at an annualised rate of ${cagr.toFixed(2)}% over ${cagrYears} years.`;
    application =
      `${money(startValue)} → ${money(endValue)} over ${cagrYears} years = ${cagr === null ? "—" : `${cagr.toFixed(2)}% CAGR`}`;
  }

  if (active === "compound") {
    result = futureValue;
    resultLabel = "Estimated future value";
    resultDisplay =
      futureValue === null ? "—" : money(futureValue);
    interpretation =
      futureValue === null
        ? "Enter valid investment, return and duration values."
        : `Your ${money(principal)} investment could grow by ${money(futureValue - principal)} over ${compoundYears} years at ${annualReturn}% annual growth.`;
    application =
      `${money(principal)} invested at ${annualReturn}% for ${compoundYears} years = ${futureValue === null ? "—" : money(futureValue)}`;
  }

  if (active === "position") {
    result = quantity;
    resultLabel = "Suggested quantity";
    resultDisplay =
      quantity === null ? "—" : quantity.toLocaleString("en-IN");
    interpretation =
      quantity === null
        ? "Entry price must be greater than the stop-loss, with a positive risk budget."
        : `Buying ${quantity.toLocaleString("en-IN")} shares keeps the planned loss near ${money(riskAmount)} if the stop-loss is reached.`;
    application =
      `${money(riskAmount)} ÷ ${money(priceRisk > 0 ? priceRisk : 0)} risk per share = ${quantity === null ? "—" : `${quantity.toLocaleString("en-IN")} shares`}`;
  }

  if (active === "sip") {
    result = sipFutureValue;
    resultLabel = "Estimated SIP value";
    resultDisplay =
      sipFutureValue === null ? "—" : money(sipFutureValue);
    interpretation =
      sipFutureValue === null
        ? "Enter valid monthly investment, return and duration values."
        : `You invest ${money(totalInvested)} in total. The estimated growth is ${money(sipGain)} over ${sipYears} years.`;
    application =
      `${money(monthlyInvestment)} per month for ${totalMonths} months at ${sipReturn}% annual return = ${sipFutureValue === null ? "—" : money(sipFutureValue)}`;
  }

  if (active === "riskreward") {
    result = riskReward;
    resultLabel = "Risk / reward ratio";
    resultDisplay =
      riskReward === null ? "—" : `${riskReward.toFixed(2)} : 1`;
    interpretation =
      riskReward === null
        ? "Set a stop-loss below entry and a target above entry."
        : `The potential reward is ${riskReward.toFixed(2)} times the potential risk.`;
    application =
      `${money(potentialReward > 0 ? potentialReward : 0)} potential reward ÷ ${money(potentialRisk > 0 ? potentialRisk : 0)} potential risk = ${riskReward === null ? "—" : `${riskReward.toFixed(2)} : 1`}`;
  }

  return (
    <Section tone="ice">
      <div id="investing-mathematics" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Investing mathematics · 03"
          title="Understand the numbers behind your decisions."
        >
          Explore investment growth, compounding and trade risk through
          practical calculations.
        </SectionHeading>

        <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
          <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-slate-50/70 p-3">
            {calculators.map((item) => (
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
                Investment calculator
              </p>
              <h3 className="mt-1 font-serif text-xl text-navy">
                {selected.label}
              </h3>
              <p className="mt-1 text-xs leading-5 text-muted">
                {selected.description}
              </p>

              {active === "cagr" && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <NumberField label="Starting value (₹)" value={startValue} onChange={setStartValue} />
                  <NumberField label="Ending value (₹)" value={endValue} onChange={setEndValue} />
                  <NumberField label="Period (years)" value={cagrYears} onChange={setCagrYears} step="1" />
                </div>
              )}

              {active === "compound" && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <NumberField label="Initial investment (₹)" value={principal} onChange={setPrincipal} />
                  <NumberField label="Annual return (%)" value={annualReturn} onChange={setAnnualReturn} />
                  <NumberField label="Period (years)" value={compoundYears} onChange={setCompoundYears} step="1" />
                </div>
              )}

              {active === "position" && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <NumberField label="Trading capital (₹)" value={capital} onChange={setCapital} />
                  <NumberField label="Risk per trade (%)" value={riskPercent} onChange={setRiskPercent} />
                  <NumberField label="Entry price (₹)" value={entry} onChange={setEntry} />
                  <NumberField label="Stop-loss price (₹)" value={stopLoss} onChange={setStopLoss} />
                </div>
              )}

              {active === "sip" && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <NumberField label="Monthly investment (₹)" value={monthlyInvestment} onChange={setMonthlyInvestment} />
                  <NumberField label="Expected annual return (%)" value={sipReturn} onChange={setSipReturn} />
                  <NumberField label="Duration (years)" value={sipYears} onChange={setSipYears} step="1" />
                </div>
              )}

              {active === "riskreward" && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <NumberField label="Entry price (₹)" value={entry} onChange={setEntry} />
                  <NumberField label="Stop-loss price (₹)" value={stopLoss} onChange={setStopLoss} />
                  <NumberField label="Target price (₹)" value={target} onChange={setTarget} />
                </div>
              )}

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
                  {resultLabel}
                </p>
                <p className="mt-2 font-serif text-3xl font-semibold tracking-tight text-navy tabular-nums">
                  {resultDisplay}
                </p>

                {active === "compound" && futureValue !== null && (
                  <p className="mt-1 text-[11px] text-steel">
                    Estimated gain: {money(futureValue - principal)}
                  </p>
                )}

                {active === "sip" && sipFutureValue !== null && (
                  <div className="mt-2 space-y-1 text-[11px] text-steel">
                    <p>Total invested: {money(totalInvested)}</p>
                    <p>Estimated gain: {money(sipGain)}</p>
                  </div>
                )}

                {active === "position" && quantity !== null && (
                  <div className="mt-2 space-y-1 text-[11px] text-steel">
                    <p>Planned risk: {money(riskAmount)}</p>
                    <p>Position value: {money(positionValue)}</p>
                    <p>Risk per share: {money(priceRisk)}</p>
                  </div>
                )}

                {active === "riskreward" && riskReward !== null && (
                  <div className="mt-2 space-y-1 text-[11px] text-steel">
                    <p>Potential risk: {money(potentialRisk)} per share</p>
                    <p>Potential reward: {money(potentialReward)} per share</p>
                  </div>
                )}
              </div>

              <div className="mt-5 border-t border-sky-200/70 pt-3">
                <p className="text-xs leading-5 text-sky-950/75">
                  {interpretation}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-[10px] leading-5 text-muted">
          Illustrative calculations, not return forecasts. CAGR and compounding
          assume constant growth. SIP assumes a constant monthly return and
          end-of-month contributions. Position sizing excludes brokerage,
          taxes, slippage and execution gaps.
        </p>
      </div>
    </Section>
  );
}
