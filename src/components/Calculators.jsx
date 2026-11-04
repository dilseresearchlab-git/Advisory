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

function Field({ label, value, onChange, suffix, step = "any", min = 0 }) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="relative">
        <input
          className="input"
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-steel">{suffix}</span>
        )}
      </div>
    </div>
  );
}

function Result({ label, value, strong = false }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line/70 py-2.5 last:border-0">
      <span className="text-sm text-muted">{label}</span>
      <span className={strong ? "font-serif text-2xl text-navy" : "text-sm font-semibold text-ink"}>{value}</span>
    </div>
  );
}

function Panel({ title, blurb, children, results, note }) {
  return (
    <div className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
      <div>
        <h3 className="text-2xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">{children}</div>
      </div>
      <div className="rounded-xl bg-ice-50 p-5 sm:p-6">
        {results}
        {note && <p className="mt-4 text-xs leading-relaxed text-steel">{note}</p>}
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
  return (
    <Panel
      title="SIP Calculator"
      blurb="Estimate the future value of a monthly investment at an assumed annual return."
      results={
        <>
          <Result label="Total invested" value={formatINR(r.invested)} />
          <Result label="Estimated gain" value={formatINR(r.gain)} />
          <Result label="Estimated value" value={formatINR(r.value)} strong />
        </>
      }
      note="Assumes a constant return, contributions at the start of each month and no taxes or costs. Actual market returns vary and can be negative."
    >
      <Field label="Monthly investment" value={monthly} onChange={setMonthly} suffix="₹" />
      <Field label="Expected annual return" value={rate} onChange={setRate} suffix="%" />
      <Field label="Duration" value={years} onChange={setYears} suffix="yrs" />
      <Field label="Annual step-up" value={step} onChange={setStep} suffix="%" />
    </Panel>
  );
}

function Lumpsum() {
  const [p, setP] = useState("500000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");
  const r = useMemo(() => lumpsumFutureValue({ principal: num(p), annualRate: num(rate), years: num(years) }), [p, rate, years]);
  return (
    <Panel
      title="Lumpsum Calculator"
      blurb="See how a one-time investment may compound at an assumed rate."
      results={
        <>
          <Result label="Invested" value={formatINR(r.invested)} />
          <Result label="Estimated gain" value={formatINR(r.gain)} />
          <Result label="Estimated value" value={formatINR(r.value)} strong />
        </>
      }
      note="Illustrative only. Assumes a constant annual return and no taxes or costs."
    >
      <Field label="Investment amount" value={p} onChange={setP} suffix="₹" />
      <Field label="Expected annual return" value={rate} onChange={setRate} suffix="%" />
      <Field label="Duration" value={years} onChange={setYears} suffix="yrs" />
    </Panel>
  );
}

function CAGR() {
  const [start, setStart] = useState("100000");
  const [end, setEnd] = useState("250000");
  const [years, setYears] = useState("7");
  const c = cagr({ start: num(start), end: num(end), years: num(years) });
  return (
    <Panel
      title="CAGR Calculator"
      blurb="Convert a start value, end value and period into a compound annual growth rate."
      results={
        <>
          <Result label="Absolute change" value={pct(((num(end) - num(start)) / (num(start) || NaN)) * 100)} />
          <Result label="CAGR" value={pct(c)} strong />
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
  return (
    <Panel
      title="Returns Calculator"
      blurb="Compute absolute and annualised return on a completed position."
      results={
        <>
          <Result label="Cost" value={formatINR(r.cost)} />
          <Result label="Proceeds" value={formatINR(r.proceeds)} />
          <Result label="Profit / loss" value={formatINR(r.pnl)} />
          <Result label="Absolute return" value={pct(r.pct)} />
          <Result label="Annualised return" value={pct(r.annualised)} strong />
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
          <Result label="Reward : Risk" value={r.valid ? `${r.ratio.toFixed(2)} : 1` : "Check inputs"} strong />
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
          <Result label="Quantity" value={r.valid ? r.qty.toLocaleString("en-IN") : "—"} strong />
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
          <Result label="Total charges" value={formatINR(r.totalCharges, 2)} strong />
          <Result label="Net P&L after charges" value={formatINR(r.netPnl, 2)} />
          <Result label="Break-even move / share" value={formatINR(r.breakevenPerShare, 2)} />
        </>
      }
      note="Statutory rates are indicative defaults and may be outdated. Verify against your broker's contract note and current notifications. Rates can be edited in src/lib/calculations.js."
    >
      <Field label="Buy price" value={buy} onChange={setBuy} suffix="₹" />
      <Field label="Sell price" value={sell} onChange={setSell} suffix="₹" />
      <Field label="Quantity" value={qty} onChange={setQty} step="1" />
      <div>
        <label className="label">Segment</label>
        <select className="input" value={segment} onChange={(e) => setSegment(e.target.value)}>
          <option value="intraday">Equity intraday</option>
          <option value="delivery">Equity delivery</option>
        </select>
      </div>
      <div>
        <label className="label">Brokerage type</label>
        <select className="input" value={mode} onChange={(e) => setMode(e.target.value)}>
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
    <div>
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Calculators">
        {tools.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
              active === t.id
                ? "border-navy bg-navy text-white"
                : "border-line bg-white text-steel-dark hover:border-royal hover:text-royal"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-6" role="tabpanel">
        <Active />
      </div>
    </div>
  );
}
