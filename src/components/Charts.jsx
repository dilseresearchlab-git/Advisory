// Lightweight SVG infographics. All data is illustrative.

export function Sparkline({ data, className = "h-12 w-full" }) {
  const w = 200,
    h = 48,
    pad = 3;
  const min = Math.min(...data),
    max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
    return [x, y];
  });
  const d = pts
    .map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(" ");
  const area = `${d} L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2f5fd6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2f5fd6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark)" />
      <path
        d={d}
        fill="none"
        stroke="#2f5fd6"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BarChart({ data, unit = "%", title }) {
  const max = Math.max(...data.map((d) => d.value)) * 1.15;
  return (
    <figure>
      {title && (
        <figcaption className="mb-4 text-sm font-medium text-navy">
          {title}
        </figcaption>
      )}
      <div className="flex h-40 items-end gap-4" role="img" aria-label={title}>
        {data.map((d, i) => (
          <div
            key={d.label}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <span className="text-xs font-semibold text-navy">
              {d.value}
              {unit}
            </span>
            <div
              className="w-full rounded-t-md bg-linear-to-t from-navy to-royal-soft"
              style={{
                height: `${(d.value / max) * 100}%`,
                opacity: 0.55 + (i / data.length) * 0.45,
              }}
            />
            <span className="text-xs text-steel">{d.label}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

// Compounding illustration: invested vs. growth
export function GrowthIllustration() {
  const invested = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120];
  const growth = [
    0, 12.9, 27.4, 44.8, 64.9, 88.2, 115.5, 147.3, 184.6, 228.2, 278.9,
  ];
  const w = 360,
    h = 180,
    pad = 14;
  const maxV = 290;
  const toPath = (arr) =>
    arr
      .map(
        (v, i) =>
          `${i ? "L" : "M"}${(pad + (i / (arr.length - 1)) * (w - pad * 2)).toFixed(1)},${(h - pad - (v / maxV) * (h - pad * 2)).toFixed(1)}`,
      )
      .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      role="img"
      aria-label="Illustration of invested amount versus compounded value over time"
    >
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={pad}
          x2={w - pad}
          y1={pad + t * (h - pad * 2)}
          y2={pad + t * (h - pad * 2)}
          stroke="#dde6f1"
          strokeDasharray="3 4"
        />
      ))}
      <path
        d={toPath(invested)}
        fill="none"
        stroke="#5b7a9d"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <path
        d={toPath(growth)}
        fill="none"
        stroke="#1d4ed8"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle
        cx={w - pad}
        cy={h - pad - (growth[10] / maxV) * (h - pad * 2)}
        r="4"
        fill="#1d4ed8"
      />
    </svg>
  );
}

// Risk/reward visual
export function RiskRewardVisual({ risk = 1, reward = 2 }) {
  const total = risk + reward;
  return (
    <div role="img" aria-label={`Risk ${risk} to reward ${reward}`}>
      <div className="flex h-8 overflow-hidden rounded-lg text-xs font-semibold text-white">
        <div
          className="flex items-center justify-center bg-steel-dark"
          style={{ width: `${(risk / total) * 100}%` }}
        >
          Risk {risk}
        </div>
        <div
          className="flex items-center justify-center bg-royal"
          style={{ width: `${(reward / total) * 100}%` }}
        >
          Reward {reward}
        </div>
      </div>
    </div>
  );
}

// Research process diagram
export function ProcessDiagram({ steps }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((s, i) => (
        <li
          key={s.step}
          className="relative rounded-2xl border border-line bg-white p-5 shadow-soft"
        >
          <span className="font-serif text-3xl text-ice-300">{s.step}</span>
          <h3 className="mt-2 text-lg">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
          {i < steps.length - 1 && (
            <span
              className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-ice-300 lg:block"
              aria-hidden="true"
            >
              ›
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export function StatTile({ value, label }) {
  return (
    <div>
      <div className="font-serif text-4xl text-navy">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}

const sensexLongTermReturns = [
  {
    period: "10 YEARS",
    years: 10,
    from: "03 Nov 2016",
    start: 27527.22,
    end: 76917.85,
    gain: 179.4,
    cagr: 10.82,
    multiple: 2.79,
    value: 279000,
    insight: "The index grew to nearly 2.8 times its starting level.",
  },
  {
    period: "20 YEARS",
    years: 20,
    from: "03 Nov 2006",
    start: 13130.79,
    end: 76917.85,
    gain: 485.8,
    cagr: 9.24,
    multiple: 5.86,
    value: 586000,
    insight: "The index grew to nearly 5.9 times its starting level.",
  },
  {
    period: "30 YEARS",
    years: 30,
    from: "04 Nov 1996",
    start: 3092.72,
    end: 76917.85,
    gain: 2387.1,
    cagr: 11.31,
    multiple: 24.87,
    value: 2487000,
    insight: "The index grew to nearly 24.9 times its starting level.",
  },
];

const formatIndian = (value) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(value);

const formatRupees = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export function SensexLongTermReturns() {
  const maxMultiple = Math.max(
    ...sensexLongTermReturns.map((item) => item.multiple),
  );

  return (
    <section className="group relative overflow-hidden rounded-2xl bg-white p-px shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Continuously Rotating Green Gradient Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-150%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,#10b981_330deg,transparent_360deg)] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Inset Content Box (Masks the center of the gradient) */}
      <div className="relative h-full w-full rounded-[calc(1rem-1px)] bg-white p-5 sm:p-6">
        {/* Your section content goes here */}
        {/* Compact heading */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-royal">
              Long-term market performance
            </p>
            <h3 className="mt-1.5 font-serif text-xl text-navy sm:text-2xl">
              The power of time in the market
            </h3>
            <p className="mt-1 text-xs text-steel">
              BSE Sensex · Historical price returns
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-semibold tracking-wide text-blue-700">
            10 · 20 · 30Y
          </span>
        </div>

        {/* Three compact comparison columns */}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          {sensexLongTermReturns.map((item, index) => (
            <div
              key={item.period}
              className={`min-w-0 rounded-xl border p-2.5 sm:p-3 ${
                index === 2
                  ? "border-blue-200 bg-blue-50/70"
                  : "border-slate-100 bg-slate-50/70"
              }`}
            >
              <p className="text-[9px] font-semibold tracking-wider text-steel sm:text-[10px]">
                {item.years} YEARS
              </p>

              <p className="mt-2 font-serif text-2xl tracking-tight text-navy sm:text-3xl">
                {item.multiple.toFixed(2)}x
              </p>

              <p className="mt-1 text-[10px] font-semibold leading-tight text-emerald-700 sm:text-xs">
                +
                {item.gain.toLocaleString("en-IN", {
                  maximumFractionDigits: 1,
                })}
                %
              </p>

              <div className="mt-3 border-t border-blue-100 pt-2.5">
                <p className="text-[9px] text-steel">CAGR</p>
                <p className="mt-0.5 text-base font-semibold text-navy sm:text-lg">
                  {item.cagr.toFixed(2)}%
                </p>
              </div>

              <div className="mt-2.5">
                <p className="text-[9px] text-steel">₹1L becomes</p>
                <p className="mt-0.5 text-xs font-semibold text-navy sm:text-sm">
                  {formatRupees(item.value)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* One compact proportional comparison */}
        <div className="mt-5 rounded-xl border border-slate-100 p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs font-semibold text-navy">
              Relative wealth growth
            </p>
            <p className="text-[9px] text-steel">Starting amount: ₹1 lakh</p>
          </div>

          <div className="space-y-3">
            {sensexLongTermReturns.map((item) => (
              <div key={item.period}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] text-steel-dark">{item.years}Y</span>
                  <span className="text-[10px] font-semibold text-emerald-700">
                    {item.multiple.toFixed(2)}x
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-blue-50">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-blue-400 to-blue-800"
                    style={{
                      width: `${(item.multiple / maxMultiple) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal source note */}
        <p className="mt-4 text-[9px] leading-relaxed text-steel">
          Historical Sensex price-index performance as of 03 Nov 2026. Excludes
          dividends, inflation, taxes and transaction costs. Illustrative
          values, not actual investment returns.
        </p>
      </div>
    </section>
  );
}
