import { PageHero, Section, SectionHeading, CTABand } from "@/components/ui";
import ResearchFramework from "@/components/pages/about/ResearchFramework";
import { principles } from "@/data/services";
import { site } from "@/data/site";

export const metadata = {
  title: "About & Methodology",
};

const methodology = [
  {
    label: "01 / DISCOVER",
    title: "Identify opportunities",
    description:
      "Screen companies, sectors and market developments to identify areas worth investigating.",
    symbol: "⌕",
    accent: "bg-[#4B83C5]",
    symbolColor: "text-[#37679F]",
    symbolBg: "bg-[#EAF1FB]",
  },
  {
    label: "02 / INVESTIGATE",
    title: "Examine the evidence",
    description:
      "Study business fundamentals, financial performance, valuation and relevant market data.",
    symbol: "▤",
    accent: "bg-[#38956A]",
    symbolColor: "text-[#347A55]",
    symbolBg: "bg-[#EAF4ED]",
  },
  {
    label: "03 / CHALLENGE",
    title: "Test the research view",
    description:
      "Question assumptions, evaluate downside risks and consider alternative scenarios.",
    symbol: "◇",
    accent: "bg-[#C28B36]",
    symbolColor: "text-[#9A702D]",
    symbolBg: "bg-[#F8F0E2]",
  },
  {
    label: "04 / REVISIT",
    title: "Review and reassess",
    description:
      "Revisit the analysis as new information emerges and update the research view when necessary.",
    symbol: "↻",
    accent: "bg-[#8267B8]",
    symbolColor: "text-[#7862A7]",
    symbolBg: "bg-[#F0ECF8]",
  },
];

const riskRules = [
  {
    title: "Downside before upside",
    description:
      "Identify what could go wrong and the potential consequences before focusing on expected returns.",
  },
  {
    title: "Capital at risk",
    description:
      "Consider position size in relation to available capital, volatility and potential loss.",
  },
  {
    title: "Concentration awareness",
    description:
      "Understand overlapping exposures across companies, sectors and market conditions.",
  },
  {
    title: "Evidence-led review",
    description:
      "Revisit or withdraw a research view when the evidence no longer supports its original assumptions.",
  },
];

const riskAccents = [
  "bg-rose-50 text-rose-700",
  "bg-blue-50 text-blue-700",
  "bg-violet-50 text-violet-700",
  "bg-emerald-50 text-emerald-700",
];

const riskSymbols = ["↓", "◫", "◇", "↻"];

const transparencyPoints = [
  "Market research involves uncertainty. No analytical framework can predict every market outcome.",
  "Historical performance and financial ratios do not guarantee future results.",
  "Valuation estimates depend on assumptions and should not be treated as exact values.",
  "Research information supports independent evaluation and does not replace individual judgement.",
];

export default function AboutPage() {
  return (
    <>
      {/* 01 — Hero */}
      <PageHero
        eyebrow="About & methodology"
        title="Research built on evidence, context and discipline."
      >
        {site.fullName} aims to bring structured financial analysis, market
        understanding and transparent research practices to individual market
        participants.
      </PageHero>

      {/* 02 — Philosophy */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-royal">
              The thinking behind our work
            </span>

            <h2 className="mt-5 max-w-xl font-serif text-3xl leading-tight text-navy sm:text-4xl lg:text-5xl">
              Good research begins with better questions.
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-muted">
              We believe useful market research starts with reliable
              information, thoughtful interpretation and the willingness to
              question an attractive conclusion.
            </p>

            <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
              The objective is not to sound certain. It is to explain what the
              evidence suggests, which assumptions matter and where uncertainty
              remains.
            </p>
          </div>

          <div className="relative rounded-2xl bg-midnight p-6 sm:p-8">
            <div className="absolute right-6 top-6 h-20 w-20 rounded-full border border-ice-300/15" />
            <div className="absolute right-11 top-11 h-10 w-10 rounded-full border border-ice-300/20" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-ice-300">
              Research principles
            </span>

            <p className="mt-7 max-w-sm font-serif text-2xl leading-snug text-white sm:text-3xl">
              Evidence first. Assumptions visible. Conclusions open to review.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {principles.map((principle) => (
                <span
                  key={principle.title}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-xs text-ice-200"
                >
                  {principle.title}
                </span>
              ))}
            </div>

            <div className="mt-8 border-t border-white/10 pt-4">
              <p className="text-xs leading-6 text-ice-200/70">
                A research conclusion should be explainable, challengeable and
                revisited when the facts change.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 — Research framework */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Our research framework"
          title="Five dimensions. One connected view."
        >
          A company, its financial performance, its valuation and its market
          behaviour tell different parts of the story. Explore the dimensions we
          consider when examining a research opportunity.
        </SectionHeading>

        <div className="mt-9">
          <ResearchFramework />
        </div>

        <p className="mt-5 text-xs text-steel">
          Select any research dimension to explore the questions behind it.
        </p>
      </Section>

      {/* 04 — Methodology */}

      {/* Research methodology */}
      <Section>
        <SectionHeading
          eyebrow="Research methodology"
          title="A disciplined process from discovery to review."
        >
          Research is not a one-time conclusion. It is a process of examining
          evidence, challenging assumptions and revisiting the findings.
        </SectionHeading>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:gap-5">
          {methodology.map((item) => (
            <article
              key={item.label}
              className="relative flex gap-4 overflow-hidden rounded-xl border border-line bg-white p-5 sm:p-6"
            >
              <div className={`absolute inset-y-0 left-0 w-1 ${item.accent}`} />

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl ${item.symbolBg} ${item.symbolColor}`}
              >
                {item.symbol}
              </div>

              <div className="min-w-0">
                <p
                  className={`text-[9px] font-semibold tracking-[0.14em] ${item.symbolColor}`}
                >
                  {item.label}
                </p>

                <h3 className="mt-2 font-serif text-xl text-navy">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 05 — Practical research application */}
      <Section tone="ice">
        <SectionHeading
          eyebrow="Putting research into practice"
          title="A good business is not automatically a good investment."
        >
          The difference between business quality and investment value is an
          important part of financial analysis. Both the underlying company and
          the price paid deserve attention.
        </SectionHeading>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Research note */}
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-royal">
                  Research perspective
                </span>
                <h3 className="mt-1 font-serif text-lg text-navy">
                  Two questions, not one
                </h3>
              </div>
              <span className="rounded-full bg-ice px-3 py-1 text-[9px] font-semibold text-royal">
                Analytical lens
              </span>
            </div>

            <div className="grid sm:grid-cols-2">
              <div className="p-5 sm:p-6">
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Business quality
                </span>
                <h4 className="mt-4 font-serif text-2xl text-navy">
                  What are we buying?
                </h4>
                <ul className="mt-5 space-y-3 text-sm text-muted">
                  <li>↗ Competitive position</li>
                  <li>↗ Earnings quality</li>
                  <li>↗ Cash generation</li>
                  <li>↗ Financial resilience</li>
                </ul>
              </div>

              <div className="border-t border-line bg-[#F7F9FC] p-5 sm:border-l sm:border-t-0 sm:p-6">
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Business quality
                </span>
                <h4 className="mt-4 font-serif text-2xl text-navy">
                  What are we paying?
                </h4>
                <ul className="mt-5 space-y-3 text-sm text-muted">
                  <li>↗ Valuation multiples</li>
                  <li>↗ Growth expectations</li>
                  <li>↗ Margin of safety</li>
                  <li>↗ Downside scenarios</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-line px-5 py-4">
              <p className="text-xs leading-6 text-muted">
                Both perspectives matter. A strong business can be overvalued,
                while an apparently inexpensive stock may carry significant
                underlying risks.
              </p>
            </div>
          </div>

          {/* Analytical takeaway */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-midnight p-6 sm:p-8">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-ice-300/10" />
            <div className="absolute -right-3 top-0 h-28 w-28 rounded-full border border-ice-300/10" />

            <div className="relative">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ice-300">
                The research question
              </span>

              <h3 className="mt-7 max-w-sm font-serif text-3xl leading-tight text-white sm:text-4xl">
                What does the market expect, and what does the evidence support?
              </h3>

              <p className="mt-5 max-w-sm text-sm leading-7 text-ice-200/75">
                Financial performance, valuation assumptions and market
                expectations need to be considered together before forming a
                balanced research view.
              </p>
            </div>

            <div className="relative mt-10 flex flex-wrap gap-2">
              {["Fundamentals", "Valuation", "Expectations", "Risk"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-3 py-2 text-[10px] text-ice-200"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* 06 — Risk management */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-royal">
              Risk management
            </span>

            <h2 className="mt-5 font-serif text-3xl leading-tight text-navy sm:text-4xl">
              Every research view has a risk side.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-muted">
              Risk cannot be removed from market participation. It can be
              examined, understood and incorporated into the way decisions are
              evaluated.
            </p>

            <div className="mt-8 rounded-2xl bg-ice p-5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-royal">
                A useful distinction
              </span>
              <p className="mt-3 font-serif text-xl leading-snug text-navy">
                Knowing what could go wrong is as important as knowing what
                could go right.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {riskRules.map((rule, index) => (
              <article
                key={rule.title}
                className={`rounded-2xl border border-line p-5 ${
                  index === 0
                    ? "bg-[#F3F7FD]"
                    : index === 3
                      ? "bg-midnight text-white"
                      : "bg-white"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${riskAccents[index]}`}
                >
                  {riskSymbols[index]}
                </span>

                <h3
                  className={`mt-5 font-serif text-xl ${
                    index === 3 ? "text-white" : "text-navy"
                  }`}
                >
                  {rule.title}
                </h3>

                <p
                  className={`mt-2 text-sm leading-6 ${
                    index === 3 ? "text-ice-200/75" : "text-muted"
                  }`}
                >
                  {rule.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* 07 — Transparency */}
      <Section tone="navy">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ice-300">
              Transparency & scope
            </span>

            <h2 className="mt-5 font-serif text-3xl leading-tight text-white sm:text-4xl">
              Clear expectations. Defined boundaries.
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-ice-200/75">
              Research should communicate its limitations as clearly as its
              conclusions.
            </p>
          </div>

          <div className="border-y border-white/10">
            {transparencyPoints.map((point, index) => (
              <div
                key={index}
                className="flex gap-4 border-b border-white/10 py-4 last:border-b-0"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ice-300/30 text-xs text-ice-300">
                  !
                </span>

                <p className="text-sm leading-6 text-ice-200/85">{point}</p>
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
