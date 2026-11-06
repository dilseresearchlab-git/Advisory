"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const sampleReports = [
  {
    id: "company-deep-dive",
    title: "Company Deep-Dive (Sample)",
    description: "Business model, financials, valuation range, risks.",
    pages: "18 pages",
    tag: "Fundamental Research",
    available: false, // Set to true if you want active download state
  },
  {
    id: "sector-outlook",
    title: "Sector Outlook (Sample)",
    description: "Cycle position, key indicators, coverage universe.",
    pages: "12 pages",
    tag: "Macro & Sector",
    available: false,
  },
  {
    id: "weekly-market",
    title: "Weekly Market Perspective (Sample)",
    description: "Breadth, earnings, flows context and key events.",
    pages: "4 pages",
    tag: "Tactical Note",
    available: false,
  },
];

export default function SampleReportsSection() {
  return (
    <section >
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {sampleReports.map((report) => (
          <motion.div
            key={report.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-royal/40 hover:shadow-xl"
          >
            <div>
              {/* Cover Image / Document Preview Mockup */}
              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-linear-to-br from-navy via-royal to-blue-900 p-5 shadow-inner">
                {/* Decorative background grid lines simulating a document cover */}
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-size-[16px_16px] opacity-40" />
                
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                      {report.tag}
                    </span>
                    <span className="text-xs font-medium text-slate-300">
                      PDF
                    </span>
                  </div>

                  <div>
                    <div className="font-serif text-lg font-medium text-white/90 line-clamp-1">
                      {report.title.replace(" (Sample)", "")}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-medium text-slate-200">
                        {report.pages} · Verified Sample
                      </span>
                    </div>
                  </div>
                </div>

                {/* Smooth zoom overlay effect on hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              </div>

              {/* Card Text Content */}
              <div className="mt-4">
                <h3 className="font-serif text-xl font-semibold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-royal">
                  {report.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {report.description}
                </p>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="mt-4 border-t border-slate-100 lex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                {report.available ? "Ready for download" : "Sample download coming soon"}
              </span>
              
              {report.available ? (
                <Link
                  href={`/samples/${report.id}.pdf`}
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-royal transition-transform group-hover:translate-x-1"
                >
                  Download →
                </Link>
              ) : (
                <span className="text-xs font-semibold text-slate-300 cursor-not-allowed">
                  Locked
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}