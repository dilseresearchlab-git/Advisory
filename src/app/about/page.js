import { PageHero, Section, SectionHeading, CTABand } from "@/components/ui";
import { ProcessDiagram } from "@/components/Charts";
import { methodologySteps } from "@/data/research";
import { principles } from "@/data/services";
import { site } from "@/data/site";

export const metadata = { title: "About & Methodology" };

const riskRules = [
  ["Define the downside first", "Every idea starts with what could go wrong and how much it could cost."],
  ["Size to survive", "Position sizing is framed by a fixed, small percentage of capital at risk."],
  ["Diversify thoughtfully", "Concentration is a deliberate, disclosed choice, never an accident."],
  ["Review and revise", "Views are revisited on schedule and withdrawn openly when the evidence changes."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About & methodology" title="A research-first philosophy">
        {site.fullName} exists to bring rigour and transparency to market research for individual participants.
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Philosophy" title="Say what we know, and what we don't">
            We believe good research is falsifiable, explicit about assumptions and honest about uncertainty.
            We would rather publish a cautious range than a confident number we cannot defend.
          </SectionHeading>
          <div className="grid gap-5 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="card p-5">
                <h3 className="text-lg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="ice">
        <SectionHeading eyebrow="Research process" title="From screen to review" />
        <div className="mt-10"><ProcessDiagram steps={methodologySteps} /></div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Risk management" title="How we frame risk" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {riskRules.map(([t, d]) => (
            <div key={t} className="card p-6">
              <h3 className="text-lg">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ice">
        <SectionHeading eyebrow="Regulatory status" title="Where we stand today">
          {site.fullName} is not currently registered with SEBI. We will not offer investment advice or research analyst
          services until the applicable registrations are obtained and legal review is complete.
        </SectionHeading>
      </Section>
      <CTABand />
    </>
  );
}
