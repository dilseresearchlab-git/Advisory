
import {
  PageHero,
  Section,
  SectionHeading,
  CTABand,
} from "@/components/ui";
import { ProcessDiagram } from "@/components/Charts";
import { methodologySteps } from "@/data/research";
import { principles } from "@/data/services";
import { site } from "@/data/site";

export const metadata = {
  title: "About & Methodology",
};

const researchDimensions = [
  {
    number: "01",
    title: "Business understanding",
    description:
      "Understand how a company operates, earns revenue, competes and creates long-term value.",
    focus: "Business model · Industry position · Competitive strengths",
  },
  {
    number: "02",
    title: "Financial quality",
    description:
      "Examine revenue growth, profitability, cash generation, balance-sheet strength and capital efficiency.",
    focus: "Growth · Margins · Cash flow · Financial health",
  },
  {
    number: "03",
    title: "Valuation",
    description:
      "Assess what the business may be worth relative to its financial performance, growth prospects and risks.",
    focus: "Multiples · Intrinsic value · Valuation assumptions",
  },
  {
    number: "04",
    title: "Market behaviour",
    description:
      "Study price structure, volume, momentum and relative strength to understand how the market is behaving.",
    focus: "Trend · Momentum · Volume · Market context",
  },
  {
    number: "05",
    title: "Risk assessment",
    description:
      "Identify what could invalidate a research view, where uncertainty lies and how downside should be considered.",
    focus: "Downside · Assumptions · Risk/reward · Invalidation",
  },
];

const applicationSteps = [
  {
    label: "Business",
    title: "Understand what is being analysed",
    description:
      "Start with the company's operations, industry, competitive position and underlying business drivers.",
  },
  {
    label: "Evidence",
    title: "Examine what the numbers reveal",
    description:
      "Connect financial statements, operating performance and valuation metrics rather than relying on one isolated ratio.",
  },
  {
    label: "Context",
    title: "Consider what the market is pricing",
    description:
      "Evaluate market behaviour, prevailing expectations and the conditions that may influence the research view.",
  },
  {
    label: "Risk",
    title: "Define what could go wrong",
    description:
      "Identify important uncertainties, downside scenarios and the evidence that could change the conclusion.",
  },
];

const riskRules = [
  {
    number: "01",
    title: "Define the downside first",
    description:
      "Understand the potential loss, key assumptions and circumstances that could invalidate a research view.",
  },
  {
    number: "02",
    title: "Size to survive",
    description:
      "Position sizing should account for capital at risk, volatility and the possibility of an unfavourable outcome.",
  },
  {
    number: "03",
    title: "Diversify thoughtfully",
    description:
      "Consider exposure across businesses, sectors and risk factors. Diversification does not eliminate market risk.",
  },
  {
    number: "04",
    title: "Review and revise",
    description:
      "Revisit assumptions as new information emerges. A research conclusion should change when the evidence changes.",
  },
];

const transparencyPoints = [
  "Market research involves uncertainty; no analytical framework can predict every market outcome.",
  "Historical performance and financial ratios do not guarantee future results.",
  "Valuation estimates depend on assumptions and should not be treated as exact values.",
  "Research information is intended to support independent evaluation, not replace individual judgement.",
];

export default function AboutPage() {
  return (
    <>
      {/* 01 — Hero */}
      <PageHero
        eyebrow="About & methodology"
        title="Research built on evidence, context and discipline."
      >
        {site.fullName} aims to bring structured financial analysis,
        market understanding and transparent research practices
        to individual market participants.
      </PageHero>

      {/* 02 — Philosophy */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Our philosophy"
            title="Evidence over assumptions. Clarity over noise."
          >
            We believe useful market research starts with asking
            better questions, examining reliable information and
            being explicit about what the evidence can and cannot tell us.
          </SectionHeading>

          <div className="divide-y divide-line border-y border-line">
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                className="grid grid-cols-[2rem_1fr] gap-4 py-5"
              >
                <span className="font-serif text-xl text-blue-300">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="font-semibold text-navy">
                    {principle.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">
                    {principle.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 03 — Research framework */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Research framework"
          title="A stock is more than a price chart or a financial ratio."
        >
          A meaningful research view considers multiple dimensions
          together. Each answers a different question about the
          business, its valuation and its market context.
        </SectionHeading>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {researchDimensions.map((item) => (
            <div
              key={item.number}
              className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-6"
            >
              <span className="font-serif text-3xl leading-none text-blue-300">
                {item.number}
              </span>

              <div className="grid gap-3 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-8">
                <div>
                  <h3 className="font-serif text-xl text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                </div>

                <div className="md:border-l md:border-line md:pl-6">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-royal">
                    Areas of examination
                  </span>
                  <p className="mt-2 text-xs leading-6 text-steel">
                    {item.focus}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 — Research methodology */}
      <Section>
        <SectionHeading
          eyebrow="Research methodology"
          title="From screening to review."
        >
          A structured research process helps organise information,
          test assumptions and maintain consistency from the initial
          examination through subsequent review.
        </SectionHeading>

        <div className="mt-10">
          <ProcessDiagram steps={methodologySteps} />
        </div>
      </Section>

      {/* 05 — Practical application */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Putting research into practice"
          title="Connecting the analysis to a research decision."
        >
          Different analytical inputs become more useful when they
          are interpreted together, rather than viewed in isolation.
        </SectionHeading>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div className="rounded-2xl bg-midnight p-6 sm:p-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ice-300">
              An analytical perspective
            </span>

            <h3 className="mt-5 max-w-sm font-serif text-2xl leading-snug text-white sm:text-3xl">
              Good research connects the business to the price being paid.
            </h3>

            <p className="mt-4 text-sm leading-7 text-ice-200/75">
              A financially strong business may still be an expensive
              investment. A low valuation may reflect genuine business
              challenges. Context is essential to interpretation.
            </p>

            <div className="mt-7 border-t border-white/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ice-300">
                The central question
              </p>
              <p className="mt-2 font-serif text-lg text-white">
                What does the evidence support, and what could change it?
              </p>
            </div>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {applicationSteps.map((step, index) => (
              <div
                key={step.label}
                className="grid grid-cols-[5.5rem_1fr] gap-3 py-5 sm:grid-cols-[7rem_1fr] sm:gap-5"
              >
                <span className="pt-1 text-[10px] font-semibold uppercase tracking-wider text-royal">
                  {step.label}
                </span>

                <div>
                  <h3 className="font-semibold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 06 — Risk management */}
      <Section>
        <SectionHeading
          eyebrow="Risk management"
          title="Protect the downside. Respect uncertainty."
        >
          Risk is not an afterthought added to an otherwise complete
          analysis. It is part of how a research view should be evaluated.
        </SectionHeading>

        <div className="mt-10 grid gap-x-12 md:grid-cols-2">
          {riskRules.map((rule) => (
            <div
              key={rule.number}
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-5"
            >
              <span className="font-serif text-2xl text-blue-300">
                {rule.number}
              </span>

              <div>
                <h3 className="font-semibold text-navy">
                  {rule.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 07 — Transparency */}
      <Section tone="navy">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Transparency & scope"
            title="Clear expectations. Defined boundaries."
            className="text-white"
          >
            Research should communicate its limitations as clearly
            as its conclusions. These considerations are fundamental
            to responsible market analysis.
          </SectionHeading>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {transparencyPoints.map((point, index) => (
              <div
                key={index}
                className="flex gap-4 py-4"
              >
                <span className="mt-0.5 text-ice-300">!</span>
                <p className="text-sm leading-6 text-ice-200/85">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 08 — Shared CTA */}
      <CTABand />
    </>
  );
}
