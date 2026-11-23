"use client";

import { useEffect, useState } from "react";
import { Sparkline } from "@/components/Charts";

const researchCompanies = [
  {
    name: "TCS",
    sector: "IT SERVICES & CONSULTING",
    description: "Technology services, consulting and digital solutions",
    period: "FY2022 – FY2026 · Consolidated",
    metrics: [
      ["28.6%", "Avg. EBITDA margin"],
      ["8.6%", "5Y revenue CAGR"],
      ["Net cash", "Net debt / EBITDA"],
    ],
    trend: [191754, 225458, 240893, 255324, 267021],
    takeaway:
      "Consistent profitability, strong margins and a net-cash balance sheet",
  },
  {
    name: "Reliance Industries",
    sector: "DIVERSIFIED CONGLOMERATE",
    description: "Energy, retail, digital services and new energy",
    period: "FY2022 – FY2026 · Consolidated",
    metrics: [
      ["16.8%", "Avg. EBITDA margin"],
      ["10.5%", "5Y revenue CAGR"],
      ["0.60x", "Net debt / EBITDA"],
    ],
    trend: [788743, 974864, 1000122, 1071174, 1175919],
    takeaway:
      "Diversified growth across consumer, digital and energy businesses",
  },
  {
    name: "ITC",
    sector: "FMCG & CONSUMER BUSINESSES",
    description: "FMCG, cigarettes, hotels, paperboards and packaging",
    period: "FY2022 – FY2026 · Consolidated",
    metrics: [
      ["35.3%", "Avg. EBITDA margin"],
      ["8.4%", "5Y revenue CAGR"],
      ["Net cash", "Net debt / EBITDA"],
    ],
    trend: [65205, 76518, 76840, 81613, 89913],
    takeaway: "High operating margins and strong cash generation",
  },
];

export default function AutoResearchCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let fadeTimer;
    let nextTimer;

    const rotate = () => {
      fadeTimer = setTimeout(() => {
        setVisible(false);

        nextTimer = setTimeout(() => {
          setActiveIndex((current) => (current + 1) % researchCompanies.length);
          setVisible(true);
        }, 800);
      }, 5200);
    };

    rotate();

    const interval = setInterval(rotate, 6000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(nextTimer);
      clearInterval(interval);
    };
  }, []);

  const company = researchCompanies[activeIndex];

  return (
    <div
      className={`rounded-xl sm:rounded-2xl border border-white/10 bg-white/6 p-4 sm:p-5 backdrop-blur transition-opacity duration-700 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-ice-300">
          Company research
        </span>

        <span className="rounded-full w-fit text-center bg-white/10 px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] text-ice-300/80">
          Fundamental analysis
        </span>
      </div>

      <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl text-white">
        {company.name}
      </h3>

      <div className="mt-1.5 text-[10px] sm:text-xs font-semibold tracking-wider text-ice-300/80">
        {company.sector}
      </div>

      <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm leading-relaxed text-ice-300/45">
        {company.description}
      </p>

      {/* Financial trend */}
      <div className="mt-4 sm:mt-5">
        {company.trend.length > 0 ? (
          <Sparkline data={company.trend} className="h-20 sm:h-24 w-full" />
        ) : (
          <div className="flex h-20 sm:h-24 items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/3">
            <span className="text-[11px] sm:text-xs text-ice-300/60">
              Historical financial trend
            </span>
          </div>
        )}
      </div>

      {/* Key metrics */}
      <div className="mt-4 sm:mt-5 grid grid-cols-3 gap-2 sm:gap-4 border-t border-white/10 pt-3.5 sm:pt-5">
        {company.metrics.map(([value, label]) => (
          <div key={label} className="min-w-0">
            <div className="font-serif text-lg sm:text-xl md:text-2xl text-emerald-400">
              {value}
            </div>
            <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-xs leading-snug sm:leading-relaxed text-ice-300/70">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Research takeaway */}
      <div className="mt-4 sm:mt-5 flex items-center justify-between gap-2 border-t border-white/10 pt-3 sm:pt-4">
        <span className="text-[9px] sm:text-xs leading-relaxed text-ice-300/80">
          {company.takeaway}
        </span>
        <span className="shrink-0 text-[9px] sm:text-[10px] text-ice-300/50">
          {company.period}
        </span>
      </div>
    </div>
  );
}
