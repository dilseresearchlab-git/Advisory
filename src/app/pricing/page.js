import {
  PageHero,
  Section,
  SectionHeading,
  Notice,
  CTABand,
} from "@/components/ui";
import PlanCards from "@/components/PlanCards";
import { comparisonRows, plans, pricingNote, faqs } from "@/data/pricing";

export const metadata = { title: "Packages & Pricing" };

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages & pricing"
        title="A clear progression, divided by what you actually need"
      >
        Five proposed packages from introductory research to our most
        comprehensive offering.
      </PageHero>

      <Section>
        <Notice title="Draft pricing">{pricingNote}</Notice>
        <div className="mt-10">
          <PlanCards />
        </div>
      </Section>

      <Section tone="ice">
        <SectionHeading eyebrow="Compare" title="Side by side" />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-160 text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-ice-50">
                <th className="px-4 py-3 font-medium text-steel-dark">
                  Feature
                </th>
                {plans.map((p) => (
                  <th
                    key={p.id}
                    className={`px-4 py-3 font-semibold ${p.recommended ? "text-royal" : "text-navy"}`}
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-line/70 last:border-0"
                >
                  <td className="px-4 py-3 text-muted">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={`px-4 py-3 ${v === "—" ? "text-steel/50" : "font-medium text-ink"}`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />

        <div className="mt-8 border-t border-slate-200">
          {faqs.map((f, index) => (
            <details key={f.q} className="group border-b border-slate-200">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6">
                <div className="flex items-start gap-5">
                  <span className="mt-1 text-xs font-medium tabular-nums text-blue-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-lg font-medium text-navy transition-colors group-hover:text-blue-700">
                    {f.q}
                  </h3>
                </div>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-xl text-slate-500 transition-all duration-200 group-open:rotate-45 group-open:border-blue-200 group-open:text-blue-600">
                  +
                </span>
              </summary>

              <div className="pb-6 pl-10 pr-12 sm:pl-12">
                <p className="max-w-3xl text-sm leading-7 text-muted">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  );
}
