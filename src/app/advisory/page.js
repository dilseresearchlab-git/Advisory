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
      <Section >
        <SectionHeading
          eyebrow="Find your research fit"
          title="Start with what you want to understand."
        >
          The right research track depends on your objectives, preferred time
          horizon and the depth of analysis you need.
        </SectionHeading>

        <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-7">
          {[
            {
              number: "01",
              label: "BUILD PERSPECTIVE",
              title: "Understand businesses",
              description:
                "Explore company fundamentals, business quality, financial performance and valuation.",
              audience: "Beginner Investors · Long-Term Investors",
            },
            {
              number: "02",
              label: "STUDY OPPORTUNITIES",
              title: "Follow market movements",
              description:
                "Examine price structure, momentum, relative strength and risk/reward considerations.",
              audience: "Active Traders · Swing & Positional Traders",
            },
            {
              number: "03",
              label: "EXPAND COVERAGE",
              title: "Access deeper analysis",
              description:
                "Explore wider market coverage, quantitative research and thematic perspectives.",
              audience: "Advanced Participants",
            },
          ].map((item) => (
            <article
              key={item.number}
              className="relative flex flex-col border-t border-line pt-4 md:pt-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-serif text-3xl leading-none text-blue-200 md:text-4xl">
                  {item.number}
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-royal md:text-[10px] md:tracking-[0.15em]">
                  {item.label}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-xl text-navy md:mt-7 md:text-2xl">
                {item.title}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted md:mt-3 md:leading-7">
                {item.description}
              </p>

              <div className="mt-5 flex-1 border-t border-line/80 pt-3 md:mt-7 md:pt-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-steel md:text-[10px]">
                  Best aligned with
                </p>
                <p className="mt-1.5 text-sm font-medium leading-5 text-navy md:mt-2 md:leading-6">
                  {item.audience}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 border-t border-line pt-4 md:mt-10 md:pt-6">
          <Link
            href="/pricing"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-royal transition-colors hover:text-navy"
          >
            Compare research packages
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
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
