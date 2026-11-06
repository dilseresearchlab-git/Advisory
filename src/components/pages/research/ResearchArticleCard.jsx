"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ResearchArticleCard({ r }) {
  return (
    <motion.article 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 md:p-8 shadow-sm transition-all duration-300 hover:border-royal/40 hover:shadow-lg"
    >
      {/* Top Accent Shimmer Bar on Hover */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-royal to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-royal ring-1 ring-inset ring-royal/20">
            <span className="h-1.5 w-1.5 rounded-full bg-royal animate-pulse" />
            {r.type}
          </span>
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
            {r.date}
          </span>
        </div>

        {/* Title: Responsive font sizing to prevent overflow on mobile/tablet */}
        <h2 className="mt-3 sm:mt-4 font-serif text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-royal">
          {r.title}
        </h2>

        {/* Summary */}
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
          {r.summary}
        </p>

        {/* Compact, Responsive Metrics Grid (2 columns on mobile, 3 on desktop) */}
        <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-ice-50/60 p-3.5 sm:p-4 ring-1 ring-slate-100">
          {r.metrics.map((m) => {
            const isPositive = m.value.toString().includes("+") || m.value.toString().includes("%");
            const valueColor = isPositive ? "text-emerald-600" : "text-navy";

            return (
              <div key={m.label} className="flex flex-col justify-between overflow-hidden">
                <div className={`font-serif text-base sm:text-lg font-bold tracking-tight truncate ${valueColor}`}>
                  {m.value}
                </div>
                <div className="mt-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400 leading-tight line-clamp-2">
                  {m.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Points / Bullet List */}
        <ul className="mt-5 sm:mt-6 space-y-2 text-xs sm:text-sm text-slate-700">
          {r.points.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-royal shadow-xs" />
              <span className="leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Read More Action Link */}
      <Link href="/pricing" className="mt-6 sm:mt-8 border-t border-slate-100 pt-3 sm:pt-4">
        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-royal transition-transform duration-200 group-hover:translate-x-1">
          Read full analysis →
        </span>
      </Link>
    </motion.article>
  );
}