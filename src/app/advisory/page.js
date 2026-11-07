import Link from "next/link";
import {
  PageHero,
  Section,
  SectionHeading,
  Notice,
  CTABand,
  Button,
} from "@/components/ui";
import { services } from "@/data/services";
import { plans } from "@/data/pricing";
import ServiceCard from "@/components/pages/advisory/ServiceCard";
import GettingStarted from "@/components/pages/advisory/GettingStarted";
import ResearchFitSection from "@/components/pages/advisory/ResearchFitSection";

export const metadata = { title: "Advisory Services" };

export default function AdvisoryPage() {
  return (
    <>
      {/* 01 — Hero */}
      <PageHero
        eyebrow="Advisory services"
        title="Research aligned with your market objectives."
      >
        Five proposed research tracks designed around different investment
        horizons, trading styles and levels of market participation.
      </PageHero>

      {/* 02 — Advisory service tracks */}
      <Section tone="ice">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Explore our services"
            title="Different objectives. Different research needs."
          >
            Whether you're evaluating businesses, following market opportunities
            or seeking broader analytical coverage, explore the research track
            that aligns with your approach.
          </SectionHeading>
        </div>

        {/* <Notice title="Proposed services">
          These service descriptions and packages are proposals. They will be
          offered only after applicable regulatory requirements are satisfied.
        </Notice> */}

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s, index) => {
            const plan = plans.find((p) => p.id === s.plan);

            return (
              <ServiceCard key={s.id} service={s} plan={plan} index={index} />
            );
          })}
        </div>
      </Section>

      {/* 03 — Find your research fit */}
      <Section>
        <ResearchFitSection />
      </Section>

      {/* 04 — How to get started */}
      <Section tone="navy">
        <SectionHeading
          eyebrow="Getting started"
          title="A straightforward path to exploring our services."
          className="text-white"
        >
          Understand the proposed offering, identify your research needs and
          register your interest.
        </SectionHeading>

        <GettingStarted />
      </Section>

      {/* 05 — Transparency */}
      <Section>
        <div className="max-w-4xl">
          <SectionHeading
            eyebrow="Transparency & scope"
            title="Important things to understand."
          />

          <ul className="mt-7 space-y-4">
            {[
              "Market research and insights do not guarantee returns or trading outcomes.",
              "No custody of client funds or discretionary portfolio management.",
              "Research coverage and deliverables are subject to the selected package and defined scope.",
              "Regulated advisory services will commence only after obtaining applicable regulatory approvals.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:text-base"
              >
                <span className="shrink-0 text-amber-500" aria-hidden="true">
                  ⚠
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 06 — Final CTA */}
      <CTABand />
    </>
  );
}

// Alternative fit section visual
// <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-7">
//   {[
//     {
//       number: "01",
//       label: "BUILD PERSPECTIVE",
//       title: "Understand businesses",
//       description:
//         "Explore company fundamentals, business quality, financial performance and valuation.",
//       audience: "Beginner Investors · Long-Term Investors",
//       // Illustrative concept: Growth / Financial health (Plant/Money concept)
//       illustrationBg: "bg-emerald-50/60 border-emerald-100",
//       badgeColor: "text-emerald-700 bg-emerald-100/80",
//       icon: (
//         <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//         </svg>
//       ),
//     },
//     {
//       number: "02",
//       label: "STUDY OPPORTUNITIES",
//       title: "Follow market movements",
//       description:
//         "Examine price structure, momentum, relative strength and risk/reward considerations.",
//       audience: "Active Traders · Swing & Positional Traders",
//       // Illustrative concept: Market trends / Momentum (Chart concept)
//       illustrationBg: "bg-blue-50/60 border-blue-100",
//       badgeColor: "text-royal bg-blue-100/80",
//       icon: (
//         <svg className="w-6 h-6 text-royal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
//         </svg>
//       ),
//     },
//     {
//       number: "03",
//       label: "EXPAND COVERAGE",
//       title: "Access deeper analysis",
//       description:
//         "Explore wider market coverage, quantitative research and thematic perspectives.",
//       audience: "Advanced Participants",
//       // Illustrative concept: Advanced data / Quantitative depth (Layers/Target concept)
//       illustrationBg: "bg-purple-50/60 border-purple-100",
//       badgeColor: "text-purple-700 bg-purple-100/80",
//       icon: (
//         <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//         </svg>
//       ),
//     },
//   ].map((item) => (
//     <article
//       key={item.number}
//       className="group relative flex flex-col justify-between rounded-2xl border border-line/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8"
//     >
//       <div>
//         {/* Top visual illustration slot & metadata header */}
//         <div className="flex items-center justify-between gap-3">
//           <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${item.illustrationBg} transition-transform duration-300 group-hover:scale-105`}>
//             {item.icon}
//           </div>
//           <span className="font-serif text-3xl leading-none text-blue-200 md:text-4xl">
//             {item.number}
//           </span>
//         </div>

//         <div className="mt-6">
//           <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-royal md:text-[10px] md:tracking-[0.15em]">
//             {item.label}
//           </span>

//           <h3 className="mt-2 font-serif text-xl text-navy md:text-2xl">
//             {item.title}
//           </h3>

//           <p className="mt-2 text-sm leading-6 text-muted md:leading-7">
//             {item.description}
//           </p>
//         </div>
//       </div>

//       {/* Bottom Audience Footer */}
//       <div className="mt-6 border-t border-line/80 pt-4 md:mt-8">
//         <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-steel md:text-[10px]">
//           Best aligned with
//         </p>
//         <p className="mt-1.5 text-sm font-medium leading-5 text-navy md:leading-6">
//           {item.audience}
//         </p>
//       </div>
//     </article>
//   ))}
// </div>

// <div className="mt-7 border-t border-line pt-4 md:mt-10 md:pt-6">
//   <Link
//     href="/pricing"
//     className="group inline-flex items-center gap-2 text-sm font-semibold text-royal transition-colors hover:text-navy"
//   >
//     Compare research packages
//     <span className="transition-transform duration-200 group-hover:translate-x-1">
//       →
//     </span>
//   </Link>
// </div>
