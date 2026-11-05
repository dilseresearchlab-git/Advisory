"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {Section, SectionHeading, Notice } from "@/components/ui";

export default function FeaturedInsightsSection({ researchItems }) {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Featured insights"
          title="A look at how we write"
        />
        <Link
          href="/research"
          className="group inline-flex items-center gap-1 text-sm font-medium text-royal hover:text-navy"
        >
          All research
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* 3D Perspective Container with a clean, subtle contrast backdrop */}
      <div className="relative mt-10 rounded-3xl p-4 sm:p-6 [perspective:1000px]">
        <div className="grid gap-6 md:grid-cols-3">
          {researchItems.slice(0, 3).map((r, index) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{
                // Original subtle lift and tilt
                y: [0, -8, 0],
                rotateX: [0, 2, 0],
                // Enhanced, high-contrast shadow loop so the wave is clearly visible
                boxShadow: [
                  "0 4px 16px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(226, 232, 240, 0.8)",
                  "0 22px 40px -8px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(37, 99, 235, 0.25)",
                  "0 4px 16px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(226, 232, 240, 0.8)",
                ],
              }}
              transition={{
                opacity: { duration: 0.5, delay: index * 0.15 },
                
                // Original smooth timing
                y: {
                  duration: 2.4,
                  repeat: Infinity,
                  repeatDelay: (researchItems.slice(0, 3).length - 1) * 2.4,
                  delay: index * 2.4,
                  ease: [0.37, 0, 0.63, 1],
                },
                rotateX: {
                  duration: 2.4,
                  repeat: Infinity,
                  repeatDelay: (researchItems.slice(0, 3).length - 1) * 2.4,
                  delay: index * 2.4,
                  ease: [0.37, 0, 0.63, 1],
                },
                boxShadow: {
                  duration: 2.4,
                  repeat: Infinity,
                  repeatDelay: (researchItems.slice(0, 3).length - 1) * 2.4,
                  delay: index * 2.4,
                  ease: [0.37, 0, 0.63, 1],
                },
              }}
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 transition-colors duration-300 hover:border-royal/40 transform-3d"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-royal">
                  {r.type}
                </span>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-royal">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {r.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <span className="text-xs font-semibold text-slate-400">
                  {r.date}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

    </Section>
  );
}