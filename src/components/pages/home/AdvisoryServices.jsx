"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Button,
  Section,
  SectionHeading,
} from "@/components/ui";

// Container variant for staggered children reveal
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Card lift and fade-in variant
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function AdvisoryServicesSection({ services }) {
  return (
    <Section>
      <SectionHeading
        eyebrow="Advisory services"
        title="Organized around how you participate in markets"
      >
        Different participants need different things. Our proposed service
        tracks are designed by need, not by feature count.
      </SectionHeading>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s) => {
          const isBestValue = s.title === "Long-Term Investors";

          return (
            <motion.div key={s.id} variants={cardVariants} className="h-full">
              <Link
                href="/advisory"
                className={`
                  group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border bg-white p-7
                  transition-all duration-300 ease-out
                  hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(15,23,42,0.08)]
                  ${
                    isBestValue
                      ? "border-royal/50 shadow-[0_4px_20px_rgba(37,99,235,0.06)] ring-1 ring-royal/20"
                      : "border-slate-200/80 hover:border-royal/40"
                  }
                `}
              >
                {/* Top Edge Gradient Shimmer on Hover */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-royal/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Diagonal Ribbon Badge in Top Right Corner */}
                {isBestValue && (
                  <div className="absolute -right-10 top-6 z-10 w-36 rotate-45 bg-royal py-1 text-center text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    ★ Best Value
                  </div>
                )}

                <div>
                  <div className="pr-10"> {/* Add padding right so text doesn't collide with the ribbon */}
                    <h3 className="text-xl font-semibold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-slate-600">
                      {s.title}
                    </h3>
                  </div>

                  <p className="mt-1.5 text-sm font-semibold text-royal">
                    {s.tagline}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-2">
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-royal">
                    Explore
                    <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* CTA Card */}
        <motion.div variants={cardVariants} className="h-full">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/70 p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                Not sure where you fit?
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Tell us about your approach and time horizon.
              </p>
            </div>

            <Button href="/contact" className="mt-6 self-start">
              Get in touch
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

// pewvious section code without prior animation
{/* <Section>
        <SectionHeading
          eyebrow="Advisory services"
          title="Organized around how you participate in markets"
        >
          Different participants need different things. Our proposed service
          tracks are designed by need, not by feature count.
        </SectionHeading>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, index) => {
            const isBestValue = s.title === "Long-Term Investors";

            return (
              <Link
                key={s.id}
                href="/advisory"
                style={{ animationDelay: `${index * 80}ms` }}
                className={`
            service-card-enter
            card card-hover group relative block p-6
            transition-all duration-300 ease-out
            hover:-translate-y-1
            hover:shadow-[0_12px_30px_rgba(15,40,80,0.08)]
            ${
              isBestValue
                ? "border-royal/70 shadow-[0_6px_20px_rgba(37,99,235,0.07)]"
                : "hover:border-royal/40"
            }
          `}
              >
                {isBestValue && (
                  <span className="absolute right-5 top-5 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold tracking-wider text-royal">
                    BEST VALUE
                  </span>
                )}

                <h3 className="pr-20 text-xl transition-colors duration-200 group-hover:text-royal">
                  {s.title}
                </h3>

                <p className="mt-1 text-sm font-medium text-royal">
                  {s.tagline}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.description}
                </p>

                <p className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-navy">
                  Explore
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </Link>
            );
          })}

          <div
            style={{ animationDelay: `${services.length * 80}ms` }}
            className="
        service-card-enter
        card flex flex-col justify-between
        bg-ice-50 p-6
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-[0_12px_30px_rgba(15,40,80,0.08)]
      "
          >
            <div>
              <h3 className="text-xl">Not sure where you fit?</h3>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                Tell us about your approach and time horizon.
              </p>
            </div>

            <Button href="/contact" className="mt-6 self-start">
              Get in touch
            </Button>
          </div>
        </div>
      </Section> */}