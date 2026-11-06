import Link from "next/link";
import {
  Button,
  Container,
  Section,
  SectionHeading,
  CTABand,
} from "@/components/ui";
import { StatTile, SensexLongTermReturns } from "@/components/Charts";
import PlanCards from "@/components/PlanCards";
import { services, principles } from "@/data/services";
import { researchItems, illustrativeSeries } from "@/data/research";
import { site } from "@/data/site";
import AutoResearchCard from "@/components/AutoResearchCard";
import AdsvisoryServicesSection from "@/components/pages/home/AdvisoryServices";
import FeaturedInsightsSection from "@/components/pages/home/FeaturedInsights";
import HeroTyping from "@/components/ui/HeroTyping";
import GrowthIllustration from "@/components/ui/GrowthIllustration";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-midnight">
        <div
          className="grid-bg absolute inset-0 opacity-30"
          aria-hidden="true"
        />
        <div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-royal/30 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="eyebrow text-ice-300!">
              Research &amp; Advisory · India
            </p>
            <h1 className="mt-5 text-4xl leading-[1.08] text-white! sm:text-6xl">
              Research built for people who demand{" "}
              <span className="inline-block min-h-[1.08em] min-w-[320px] sm:min-w-[560px]">
                <HeroTyping />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ice-300/90">
              {site.fullName} produces structured, evidence-led research for
              investors and traders — with risk defined before opinion, and
              limits stated plainly.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact" variant="light">
                Request an enquiry
              </Button>
              <Button
                href="/pricing"
                className="border-white/25! bg-transparent! text-white! hover:bg-white/10!"
                variant="outline"
              >
                View proposed packages
              </Button>
            </div>
            <p className="mt-8 max-w-md text-xs leading-relaxed text-ice-300/60">
              Not registered with SEBI. Services are described as proposals and
              will be activated only after applicable regulatory requirements
              are met.
            </p>
          </div>

          {/* Hero visual: illustrative research panel */}
          <AutoResearchCard />
        </Container>
      </section>

      {/* Principles strip */}
      <Section tone="ice" className="py-14!">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <div key={p.title}>
              <h3 className="text-lg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <AdsvisoryServicesSection services={services} />

      {/* Research credibility */}
      <Section tone="ice">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Research credibility"
              title="A process you can inspect"
            >
              Every report states its assumptions, valuation range, key risks
              and what would prove the thesis wrong.
            </SectionHeading>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <StatTile value="5" label="Stage research process" />
              <StatTile value="100%" label="Reports state key risks" />
              <StatTile value="0" label="Return guarantees" />
            </div>
            <Button href="/about" variant="outline" className="mt-10">
              Read our methodology
            </Button>
          </div>
          <div>
            <SensexLongTermReturns />
          </div>
        </div>
      </Section>

      {/* Featured insights */}
      <FeaturedInsightsSection researchItems={researchItems} />

      {/* Tools */}
      <Section tone="ice">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="card p-6 sm:p-8 order-last lg:order-first">
            <p className="text-sm font-medium text-navy">
              Compounding, illustrated
            </p>
            <div className="mt-4">
              <GrowthIllustration />
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Tools & calculators"
              title="Numbers that sharpen decisions"
            >
              SIP, CAGR, returns, risk/reward, position sizing and brokerage
              calculators — all running in your browser.
            </SectionHeading>
            <Button href="/tools" className="mt-8">
              Open the tools
            </Button>
          </div>
        </div>
      </Section>

      {/* Pricing preview */}

      <Section>
        <SectionHeading
          eyebrow="Proposed packages"
          title="Research access for every level of participation"
        >
          Choose a research package aligned with your market objectives, from
          introductory market understanding to comprehensive professional
          research.
        </SectionHeading>

        <div className="mt-10">
          <PlanCards compact />
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-royal transition hover:gap-3"
          >
            Compare all packages
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
