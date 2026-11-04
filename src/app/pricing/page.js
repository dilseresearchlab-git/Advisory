import { PageHero, Section, SectionHeading, Notice, CTABand } from "@/components/ui";
import PlanCards from "@/components/PlanCards";
import { comparisonRows, plans, pricingNote, faqs } from "@/data/pricing";

export const metadata = { title: "Packages & Pricing" };

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Packages & pricing" title="A clear progression, divided by what you actually need">
        Five proposed packages from introductory research to our most comprehensive offering.
      </PageHero>

      <Section>
        <Notice title="Draft pricing">{pricingNote}</Notice>
        <div className="mt-10"><PlanCards /></div>
      </Section>

      <Section tone="ice">
        <SectionHeading eyebrow="Compare" title="Side by side" />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-ice-50">
                <th className="px-4 py-3 font-medium text-steel-dark">Feature</th>
                {plans.map((p) => (
                  <th key={p.id} className={`px-4 py-3 font-semibold ${p.recommended ? "text-royal" : "text-navy"}`}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-line/70 last:border-0">
                  <td className="px-4 py-3 text-muted">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className={`px-4 py-3 ${v === "—" ? "text-steel/50" : "font-medium text-ink"}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Questions" title="Before you enquire" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="card p-6">
              <h3 className="text-lg">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
