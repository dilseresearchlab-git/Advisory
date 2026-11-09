"use client";

import { useEffect, useRef } from "react";
import {
  Building2,
  ChartNoAxesCombined,
  Scale,
  ChartCandlestick,
  ShieldAlert,
} from "lucide-react";

const dimensions = [
  {
    Icon: Building2,
    category: "01 / BUSINESS",
    title: "Business understanding",
    description:
      "Understand the business model, industry structure, competitive position and factors that influence long-term business quality.",
    detail: "What makes the business durable?",
    theme: "bg-[#F0F5FD] border-[#DCE8F8] text-[#37679F]",
    symbolBg: "bg-[#DCE9FC]",
  },
  {
    Icon: ChartNoAxesCombined,
    category: "02 / FINANCIALS",
    title: "Financial strength",
    description:
      "Examine revenue growth, profitability, cash generation, debt levels and the overall strength of the balance sheet.",
    detail: "How financially sound is the company?",
    theme: "bg-[#EFF7F2] border-[#DCEDE2] text-[#347A55]",
    symbolBg: "bg-[#DCEFE3]",
  },
  {
    Icon: Scale,
    category: "03 / VALUATION",
    title: "Valuation",
    description:
      "Study valuation multiples, earnings expectations, intrinsic value and the relationship between price and business fundamentals.",
    detail: "What are we paying for the business?",
    theme: "bg-[#FBF5E9] border-[#F0E5CF] text-[#9A702D]",
    symbolBg: "bg-[#F5E9CF]",
  },
  {
    Icon: ChartCandlestick,
    category: "04 / MARKET",
    title: "Market behaviour",
    description:
      "Assess price structure, momentum, relative strength, participation and broader market conditions.",
    detail: "What is the market communicating?",
    theme: "bg-[#F3F0FA] border-[#E6DFF3] text-[#7862A7]",
    symbolBg: "bg-[#E9E2F5]",
  },
  {
    Icon: ShieldAlert,
    category: "05 / RISK",
    title: "Risk assessment",
    description:
      "Identify business, financial and market risks while evaluating downside scenarios and potential uncertainty.",
    detail: "What could invalidate the research view?",
    theme: "bg-[#FAF0EF] border-[#F1DEDC] text-[#A45E58]",
    symbolBg: "bg-[#F4E0DE]",
  },
];

export default function ResearchFramework() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".research-reveal-item");

    container.classList.add("reveal-ready");

    // Fallback for browsers without IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }                                                                                     
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="research-reveal mt-9 lg:mt-12">
      <div className="grid gap-x-8 lg:grid-cols-6">
        {dimensions.map((item, index) => (
          <article
            key={item.category}
            style={{
              transitionDelay: `${index * 110}ms`,
            }}
            className={`
              research-reveal-item
              group relative flex flex-col
              border-t border-line py-6 sm:py-7
              lg:px-3
              ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}
            `}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EDF3FC] text-[#2858A5]">
                <item.Icon size={19} strokeWidth={1.7} />
              </div>

              <span className="text-[10px] font-semibold tracking-[0.13em] text-blue-700">
                {item.category}
              </span>
            </div>

            <h3 className="mt-5 font-serif text-xl text-navy sm:text-2xl">
              {item.title}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted">
              {item.description}
            </p>

            <div className="mt-5 flex items-start gap-2 border-t border-line pt-3">
              <span className="mt-0.5 text-blue-700">
                <item.Icon size={13} strokeWidth={2} />
              </span>

              <p className="text-xs font-semibold text-navy">{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
