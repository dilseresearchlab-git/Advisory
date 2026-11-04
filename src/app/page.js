import Link from "next/link";
import {
  Button,
  Container,
  Section,
  SectionHeading,
  CTABand,
  Notice,
} from "@/components/ui";
import {
  GrowthIllustration,
  StatTile,
  SensexLongTermReturns
} from "@/components/Charts";
import PlanCards from "@/components/PlanCards";
import { services, principles } from "@/data/services";
import { researchItems, illustrativeSeries } from "@/data/research";
import { site } from "@/data/site";
import AutoResearchCard from "@/components/AutoResearchCard";

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
              Research built for people who take markets seriously.
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
      <Section>
        <SectionHeading
          eyebrow="Advisory services"
          title="Organized around how you participate in markets"
        >
          Different participants need different things. Our proposed service
          tracks are designed by need, not by feature count.
        </SectionHeading>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.id}
              href="/advisory"
              className="card card-hover block p-6"
            >
              <h3 className="text-xl">{s.title}</h3>
              <p className="mt-1 text-sm font-medium text-royal">{s.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {s.description}
              </p>
              <p className="mt-5 text-sm font-medium text-navy">Explore →</p>
            </Link>
          ))}
          <div className="card flex flex-col justify-between bg-ice-50 p-6">
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
      </Section>

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
          {/* <div className="card p-6 sm:p-8">
            <BarChart data={illustrativeSeries.marginBridge} title="Illustrative EBITDA margin trajectory (fictional company)" />
            <p className="mt-4 text-xs text-steel">Placeholder data for design purposes only.</p>
          </div> */}
          <div>
            <SensexLongTermReturns />
          </div>
        </div>
      </Section>

      {/* Featured insights */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured insights"
            title="A look at how we write"
          />
          <Link
            href="/research"
            className="text-sm font-medium text-royal hover:text-navy"
          >
            All research →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {researchItems.slice(0, 3).map((r) => (
            <article key={r.id} className="card card-hover flex flex-col p-6">
              <span className="eyebrow">{r.type}</span>
              <h3 className="mt-3 text-xl leading-snug">{r.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {r.summary}
              </p>
              <span className="mt-5 text-xs text-steel">{r.date}</span>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <Notice>
            Titles, companies and figures are fictional placeholders, not
            recommendations.
          </Notice>
        </div>
      </Section>

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
            <div className="mt-3 flex gap-5 text-xs text-steel">
              <span className="flex items-center gap-2">
                <i className="h-0.5 w-5 bg-royal" /> Compounded value
              </span>
              <span className="flex items-center gap-2">
                <i className="h-0.5 w-5 border-t-2 border-dashed border-steel" />{" "}
                Amount invested
              </span>
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
          title="From introductory research to full coverage"
        />
        <div className="mt-6">
          <Notice title="Draft">
            Pricing is a proposal pending business and regulatory approval.
            Packages are not currently on sale.
          </Notice>
        </div>
        <div className="mt-10">
          <PlanCards compact />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
