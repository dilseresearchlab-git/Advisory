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
      <Section>
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
          {services.map((s, i) => {
            const plan = plans.find((p) => p.id === s.plan);

            return (
              <article
                key={s.id}
                className={`card group flex flex-col p-6 sm:p-7 ${
                  i === 1
                    ? "border-royal/40 bg-gradient-to-b from-ice-50 to-white"
                    : ""
                }`}
              >
                {/* Card header */}
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl text-ice-300">
                    0{i + 1}
                  </span>

                  <span className="rounded-full bg-ice-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-royal">
                    {s.focus}
                  </span>
                </div>

                {/* Service information */}
                <div className="mt-5">
                  <h2 className="font-serif text-2xl text-navy sm:text-3xl">
                    {s.title}
                  </h2>

                  <p className="mt-2 text-sm font-semibold text-royal">
                    {s.tagline}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {s.description}
                  </p>
                </div>

                {/* Intended audience */}
                <div className="mt-6 rounded-xl bg-ice-50/80 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-steel">
                    Best suited for
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-navy">
                    {s.bestFor}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-navy">
                    Research coverage
                  </h3>

                  <ul className="mt-3 space-y-2.5 text-sm text-muted">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Package association and action */}
                <div className="mt-auto pt-7">
                  <div className="flex items-center justify-between border-t border-line pt-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-steel">
                        Suggested package
                      </p>
                      <Link
                        href="/pricing"
                        className="mt-1 inline-flex text-sm font-semibold text-royal hover:underline"
                      >
                        {plan?.name ?? "Explore packages"}
                      </Link>
                    </div>

                    <span className="text-xs text-steel">{s.horizon}</span>
                  </div>

                  <Button
                    href={`/contact?plan=${s.plan}`}
                    className="mt-5 w-full justify-center"
                  >
                    Register interest
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* 03 — Find your research fit */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Find your research fit"
          title="Start with what you want to understand."
        >
          The right research track depends on your objectives, preferred time
          horizon and the depth of analysis you need.
        </SectionHeading>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-line bg-white p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-royal">
              01 / Build perspective
            </span>
            <h3 className="mt-4 font-serif text-2xl text-navy">
              Understand businesses
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Explore company fundamentals, business quality, financial
              performance and valuation.
            </p>
            <p className="mt-5 border-t border-line pt-4 text-sm font-semibold text-navy">
              Beginner Investors · Long-Term Investors
            </p>
          </article>

          <article className="rounded-2xl border border-line bg-white p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-royal">
              02 / Study opportunities
            </span>
            <h3 className="mt-4 font-serif text-2xl text-navy">
              Follow market movements
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Examine price structure, momentum, relative strength and
              risk/reward considerations.
            </p>
            <p className="mt-5 border-t border-line pt-4 text-sm font-semibold text-navy">
              Active Traders · Swing & Positional Traders
            </p>
          </article>

          <article className="rounded-2xl border border-line bg-white p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-royal">
              03 / Expand coverage
            </span>
            <h3 className="mt-4 font-serif text-2xl text-navy">
              Access deeper analysis
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Explore wider market coverage, quantitative research and thematic
              perspectives.
            </p>
            <p className="mt-5 border-t border-line pt-4 text-sm font-semibold text-navy">
              Advanced Participants
            </p>
          </article>
        </div>

        <div className="mt-7 text-center">
          <Link
            href="/pricing"
            className="text-sm font-semibold text-royal hover:underline"
          >
            Compare research packages →
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

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            {
              number: "01",
              title: "Identify your needs",
              description:
                "Consider your market participation, objectives and preferred research horizon.",
            },
            {
              number: "02",
              title: "Explore a suitable track",
              description:
                "Review the proposed service categories and their corresponding packages.",
            },
            {
              number: "03",
              title: "Register your interest",
              description:
                "Share your preferred package and research requirements for further information.",
            },
          ].map((step) => (
            <div key={step.number} className="relative">
              <span className="font-serif text-4xl text-ice-300">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ice-200">
                {step.description}
              </p>
            </div>
          ))}
        </div>
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
