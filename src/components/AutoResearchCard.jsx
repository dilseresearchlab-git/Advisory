'use client'

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
    takeaway: "Consistent profitability, strong margins and a net-cash balance sheet",
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
    takeaway: "Diversified growth across consumer, digital and energy businesses",
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
          setActiveIndex((current) =>
            (current + 1) % researchCompanies.length
          );
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
      className={`rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur transition-opacity duration-700 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ice-300">
          Company research
        </span>

        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-ice-200">
          Fundamental analysis
        </span>
      </div>

      <h3 className="mt-4 text-xl text-white">
        {company.name}
      </h3>

      <div className="mt-2 text-xs font-semibold tracking-wider text-ice-300/80">
        {company.sector}
      </div>

      <p className="mt-2 text-sm text-ice-300/80">
        {company.description}
      </p>

      <div className="mt-5">
        {company.trend.length > 0 ? (
          <Sparkline
            data={company.trend}
            className="h-24 w-full"
          />
        ) : (
          <div className="flex h-24 items-center justify-center rounded-xl border border-white/10 bg-white/3">
            <span className="text-xs text-ice-300/60">
              Historical financial trend
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
        {company.metrics.map(([value, label]) => (
          <div key={label}>
            <div className="font-serif text-2xl text-white">
              {value}
            </div>
            <div className="mt-1 text-[11px] leading-relaxed text-ice-300/70">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-xs text-ice-300/80">
          {company.takeaway}
        </span>
        <span className="text-[10px] text-ice-300/50">
          {company.period}
        </span>
      </div>
    </div>
  );
}
