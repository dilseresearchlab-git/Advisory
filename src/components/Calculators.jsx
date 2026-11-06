"use client";

import { useMemo, useState } from "react";
import {
  sipFutureValue,
  lumpsumFutureValue,
  cagr,
  returns,
  riskReward,
  positionSize,
  brokerage,
} from "@/lib/calculations";
import { formatINR } from "./ui";
import { RiskRewardVisual } from "./Charts";

const num = (v) => (v === "" || v === null ? 0 : Number(v));

// Standard text/number input component with responsive sizing
function Field({ label, value, onChange, suffix, step = "any", min = 0 }) {
  return (
    <div className="w-full">
      <label className="label text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-600">{label}</label>
      <div className="relative mt-1.5">
        <input
          className="input w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 sm:py-2.5 text-sm text-slate-900 shadow-xs focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20"
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">{suffix}</span>
        )}
      </div>
    </div>
  );
}

// Dual-mode interactive input with Range Slider + Number Field optimized for mobile/desktop
function RangeField({ label, value, onChange, suffix, min, max, step = "any" }) {
  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between gap-2">
        <label className="label text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-600 truncate">{label}</label>
        <div className="relative w-24 sm:w-28 shrink-0">
          <input
            className="input w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-right text-xs font-bold text-navy focus:border-royal focus:outline-none"
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {suffix && (
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">{suffix}</span>
          )}
        </div>
      </div>
      {/* Interactive Range Slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value || min}
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-royal cursor-pointer h-1.5 bg-slate-200 rounded-lg"
      />
    </div>
  );
}

function Result({ label, value, strong = false, highlight = false }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-slate-200/60 py-2.5 sm:py-3 last:border-0">
      <span className="text-xs sm:text-sm font-medium text-slate-600">{label}</span>
      <span className={strong ? `font-serif text-xl sm:text-2xl lg:text-3xl tracking-tight ${highlight ? "text-emerald-600 font-bold" : "text-navy"}` : "text-xs sm:text-sm font-semibold text-slate-900"}>
        {value}
      </span>
    </div>
  );
}

function Panel({ title, blurb, children, results, note }) {
  return (
    <div className="card grid gap-6 sm:gap-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 lg:p-8 shadow-sm lg:grid-cols-12 items-start">
      <div className="lg:col-span-7 space-y-5 sm:space-y-6">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl tracking-tight text-navy">{title}</h3>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{blurb}</p>
        </div>
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">{children}</div>
      </div>
      <div className="lg:col-span-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-ice-50/60 p-4 sm:p-6 ring-1 ring-slate-100 shadow-inner">
        <div className="space-y-1">{results}</div>
        {note && <p className="mt-4 sm:mt-5 text-[10px] sm:text-[11px] leading-relaxed text-slate-400 border-t border-slate-200/50 pt-3">{note}</p>}
      </div>
    </div>
  );
}

const pct = (n, d = 2) => (isFinite(n) ? `${n.toFixed(d)}%` : "—");

function SIP() {
  const [monthly, setMonthly] = useState("10000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("15");
  const [step, setStep] = useState("0");
  const r = useMemo(
    () => sipFutureValue({ monthly: num(monthly), annualRate: num(rate), years: num(years), stepUpPct: num(step) }),
    [monthly, rate, years, step]
  );

  const investedPct = r.value > 0 ? (r.invested / r.value) * 100 : 50;

  return (
    <Panel
      title="SIP Calculator"
      blurb="Estimate the future value of a monthly investment at an assumed annual return."
      results={
        <>
          <Result label="Total invested" value={formatINR(r.invested)} />
          <Result label="Estimated gain" value={formatINR(r.gain)} highlight />
          <Result label="Estimated value" value={formatINR(r.value)} strong highlight />
          
          <div className="mt-4 pt-2">
            <div className="flex justify-between text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              <span>Principal ({investedPct.toFixed(0)}%)</span>
              <span>Returns ({100 - Number(investedPct.toFixed(0))}%)</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div style={{ width: `${investedPct}%` }} className="bg-navy transition-all duration-500" />
              <div style={{ width: `${100 - investedPct}%` }} className="bg-emerald-500 transition-all duration-500" />
            </div>
          </div>
        </>
      }
      note="Assumes a constant return, contributions at the start of each month and no taxes or costs. Actual market returns vary and can be negative."
    >
      <RangeField label="Monthly investment" value={monthly} onChange={setMonthly} suffix="₹" min={500} max={100000} step={500} />
      <RangeField label="Expected annual return" value={rate} onChange={setRate} suffix="%" min={1} max={30} step={0.5} />
      <RangeField label="Duration" value={years} onChange={setYears} suffix="yrs" min={1} max={40} step={1} />
      <RangeField label="Annual step-up" value={step} onChange={setStep} suffix="%" min={0} max={20} step={1} />
    </Panel>
  );
}

function Lumpsum() {
  const [p, setP] = useState("500000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");
  const r = useMemo(() => lumpsumFutureValue({ principal: num(p), annualRate: num(rate), years: num(years) }), [p, rate, years]);
  
  const investedPct = r.value > 0 ? (r.invested / r.value) * 100 : 50;

  return (
    <Panel
      title="Lumpsum Calculator"
      blurb="See how a one-time investment may compound at an assumed rate."
      results={
        <>
          <Result label="Invested" value={formatINR(r.invested)} />
          <Result label="Estimated gain" value={formatINR(r.gain)} highlight />
          <Result label="Estimated value" value={formatINR(r.value)} strong highlight />
          
          <div className="mt-4 pt-2">
            <div className="flex justify-between text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              <span>Principal</span>
              <span>Compounded Gain</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div style={{ width: `${investedPct}%` }} className="bg-navy transition-all duration-500" />
              <div style={{ width: `${100 - investedPct}%` }} className="bg-emerald-500 transition-all duration-500" />
            </div>
          </div>
        </>
      }
      note="Illustrative only. Assumes a constant annual return and no taxes or costs."
    >
      <RangeField label="Investment amount" value={p} onChange={setP} suffix="₹" min={10000} max={10000000} step={10000} />
      <RangeField label="Expected annual return" value={rate} onChange={setRate} suffix="%" min={1} max={30} step={0.5} />
      <RangeField label="Duration" value={years} onChange={setYears} suffix="yrs" min={1} max={30} step={1} />
    </Panel>
  );
}

function CAGR() {
  const [start, setStart] = useState("100000");
  const [end, setEnd] = useState("250000");
  const [years, setYears] = useState("7");
  const c = cagr({ start: num(start), end: num(end), years: num(years) });
  const absoluteChange = ((num(end) - num(start)) / (num(start) || NaN)) * 100;

  return (
    <Panel
      title="CAGR Calculator"
      blurb="Convert a start value, end value and period into a compound annual growth rate."
      results={
        <>
          <Result label="Absolute change" value={pct(absoluteChange)} highlight={absoluteChange >= 0} />
          <Result label="CAGR" value={pct(c)} strong highlight={c >= 0} />
        </>
      }
      note="CAGR smooths growth into a single rate and hides interim volatility."
    >
      <Field label="Starting value" value={start} onChange={setStart} suffix="₹" />
      <Field label="Ending value" value={end} onChange={setEnd} suffix="₹" />
      <Field label="Years" value={years} onChange={setYears} suffix="yrs" />
    </Panel>
  );
}

function Returns() {
  const [buy, setBuy] = useState("250");
  const [sell, setSell] = useState("310");
  const [qty, setQty] = useState("100");
  const [years, setYears] = useState("1.5");
  const r = returns({ buy: num(buy), sell: num(sell), qty: num(qty), years: num(years) });
  const isProfit = r.pnl >= 0;

  return (
    <Panel
      title="Returns Calculator"
      blurb="Compute absolute and annualised return on a completed position."
      results={
        <>
          <Result label="Cost" value={formatINR(r.cost)} />
          <Result label="Proceeds" value={formatINR(r.proceeds)} />
          <Result label="Profit / loss" value={formatINR(r.pnl)} highlight={isProfit} />
          <Result label="Absolute return" value={pct(r.pct)} highlight={isProfit} />
          <Result label="Annualised return" value={pct(r.annualised)} strong highlight={isProfit} />
        </>
      }
      note="Before brokerage, taxes and other charges. Example values are placeholders."
    >
      <Field label="Buy price" value={buy} onChange={setBuy} suffix="₹" />
      <Field label="Sell price" value={sell} onChange={setSell} suffix="₹" />
      <Field label="Quantity" value={qty} onChange={setQty} step="1" />
      <Field label="Holding period" value={years} onChange={setYears} suffix="yrs" />
    </Panel>
  );
}

function RiskReward() {
  const [entry, setEntry] = useState("500");
  const [stop, setStop] = useState("480");
  const [target, setTarget] = useState("560");
  const r = riskReward({ entry: num(entry), stop: num(stop), target: num(target) });
  return (
    <Panel
      title="Risk / Reward Calculator"
      blurb="Frame a trade by comparing distance to stop against distance to target."
      results={
        <>
          {r.valid && <div className="mb-4"><RiskRewardVisual risk={+r.risk.toFixed(2)} reward={+r.reward.toFixed(2)} /></div>}
          <Result label="Direction" value={r.long ? "Long" : "Short"} />
          <Result label="Risk per share" value={r.valid ? formatINR(r.risk, 2) : "—"} />
          <Result label="Reward per share" value={r.valid ? formatINR(r.reward, 2) : "—"} />
          <Result label="Reward : Risk" value={r.valid ? `${r.ratio.toFixed(2)} : 1` : "Check inputs"} strong highlight={r.ratio >= 2} />
          <Result label="Break-even win rate" value={r.valid ? pct(r.breakeven, 1) : "—"} />
        </>
      }
      note="Break-even win rate ignores costs and slippage. Stop should sit on the opposite side of entry from target."
    >
      <Field label="Entry price" value={entry} onChange={setEntry} suffix="₹" />
      <Field label="Stop price" value={stop} onChange={setStop} suffix="₹" />
      <Field label="Target price" value={target} onChange={setTarget} suffix="₹" />
    </Panel>
  );
}

function PositionSize() {
  const [capital, setCapital] = useState("500000");
  const [risk, setRisk] = useState("1");
  const [entry, setEntry] = useState("500");
  const [stop, setStop] = useState("480");
  const r = positionSize({ capital: num(capital), riskPct: num(risk), entry: num(entry), stop: num(stop) });
  return (
    <Panel
      title="Position Sizing"
      blurb="Size a position so that hitting your stop costs a fixed percentage of capital."
      results={
        <>
          <Result label="Capital at risk" value={formatINR(r.riskAmount)} />
          <Result label="Quantity" value={r.valid ? r.qty.toLocaleString("en-IN") : "—"} strong highlight />
          <Result label="Position value" value={r.valid ? formatINR(r.value) : "—"} />
          <Result label="% of capital deployed" value={r.valid ? pct(r.pctOfCapital, 1) : "—"} />
        </>
      }
      note="Quantity is rounded down. Does not account for gaps, slippage or margin requirements."
    >
      <Field label="Trading capital" value={capital} onChange={setCapital} suffix="₹" />
      <Field label="Risk per trade" value={risk} onChange={setRisk} suffix="%" />
      <Field label="Entry price" value={entry} onChange={setEntry} suffix="₹" />
      <Field label="Stop price" value={stop} onChange={setStop} suffix="₹" />
    </Panel>
  );
}

function Brokerage() {
  const [buy, setBuy] = useState("500");
  const [sell, setSell] = useState("510");
  const [qty, setQty] = useState("100");
  const [segment, setSegment] = useState("intraday");
  const [mode, setMode] = useState("flat");
  const [bv, setBv] = useState("20");
  const r = brokerage({ buy: num(buy), sell: num(sell), qty: num(qty), segment, brokerageMode: mode, brokerageValue: num(bv) });
  const isNetProfit = r.netPnl >= 0;

  return (
    <Panel
      title="Brokerage & Charges"
      blurb="Estimate transaction costs on an equity cash-market round trip."
      results={
        <>
          <Result label="Brokerage" value={formatINR(r.brk, 2)} />
          <Result label="STT" value={formatINR(r.stt, 2)} />
          <Result label="Exchange + SEBI fees" value={formatINR(r.exchange + r.sebi, 2)} />
          <Result label="Stamp duty" value={formatINR(r.stamp, 2)} />
          <Result label="GST" value={formatINR(r.gst, 2)} />
          <Result label="Total charges" value={formatINR(r.totalCharges, 2)} />
          <Result label="Net P&L after charges" value={formatINR(r.netPnl, 2)} strong highlight={isNetProfit} />
          <Result label="Break-even move / share" value={formatINR(r.breakevenPerShare, 2)} />
        </>
      }
      note="Statutory rates are indicative defaults and may be outdated. Verify against your broker's contract note."
    >
      <Field label="Buy price" value={buy} onChange={setBuy} suffix="₹" />
      <Field label="Sell price" value={sell} onChange={setSell} suffix="₹" />
      <Field label="Quantity" value={qty} onChange={setQty} step="1" />
      <div>
        <label className="label text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-600">Segment</label>
        <select className="input mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 sm:py-2.5 text-sm text-slate-900 shadow-xs focus:border-royal focus:outline-none" value={segment} onChange={(e) => setSegment(e.target.value)}>
          <option value="intraday">Equity intraday</option>
          <option value="delivery">Equity delivery</option>
        </select>
      </div>
      <div>
        <label className="label text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-600">Brokerage type</label>
        <select className="input mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 sm:py-2.5 text-sm text-slate-900 shadow-xs focus:border-royal focus:outline-none" value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="flat">Flat ₹ per order</option>
          <option value="percent">% of turnover</option>
        </select>
      </div>
      <Field label={mode === "flat" ? "Brokerage per order" : "Brokerage rate"} value={bv} onChange={setBv} suffix={mode === "flat" ? "₹" : "%"} />
    </Panel>
  );
}

const tools = [
  { id: "sip", label: "SIP", C: SIP },
  { id: "lumpsum", label: "Lumpsum", C: Lumpsum },
  { id: "cagr", label: "CAGR", C: CAGR },
  { id: "returns", label: "Returns", C: Returns },
  { id: "rr", label: "Risk / Reward", C: RiskReward },
  { id: "size", label: "Position Size", C: PositionSize },
  { id: "brokerage", label: "Brokerage", C: Brokerage },
];

export default function Calculators() {
  const [active, setActive] = useState("sip");
  const Active = tools.find((t) => t.id === active).C;
  return (
    <div className="space-y-6 sm:space-y-8 w-full overflow-hidden">
      {/* Scrollable tab navigation on smaller viewports */}
      <div className="-mx-4 sm:mx-0 flex gap-2 overflow-x-auto px-5 sm:px-0 pb-2 sm:flex-wrap scrollbar-none" role="tablist" aria-label="Calculators">
        {tools.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`shrink-0 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all shadow-xs ${
              active === t.id
                ? "bg-navy text-white shadow-md scale-105"
                : "border border-slate-200 bg-white text-slate-600 hover:border-royal hover:text-royal"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4 sm:mt-6" role="tabpanel">
        <Active />
      </div>
    </div>
  );
}