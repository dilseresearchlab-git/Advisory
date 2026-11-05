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
        <PlanCards />
      </Section>

      <Section tone="ice">
        <SectionHeading eyebrow="Compare" title="Side by side" />

        <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
          <table className="w-full min-w-160 text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-line bg-ice-50/80">
                <th className="px-5 py-4 font-semibold text-slate-900 w-1/4">
                  Feature
                </th>
                {plans.map((p) => (
                  <th
                    key={p.id}
                    className={`relative px-5 py-4 font-semibold text-center transition-colors ${
                      p.recommended
                        ? "bg-royal/4 text-royal border-x border-royal/10"
                        : "text-slate-700"
                    }`}
                  >
                    {p.recommended && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-0.75 bg-royal"
                      />
                    )}
                    <div className="text-base">{p.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-line/60 last:border-0 transition-colors hover:bg-slate-50/80"
                >
                  <td className="px-5 py-4 font-medium text-slate-700">
                    {row.label}
                  </td>
                  {row.values.map((v, i) => {
                    const isRecommendedCol = plans[i]?.recommended;
                    const isYes = v === "Yes";
                    const isNoOrDash = v === "—" || v === "No";

                    return (
                      <td
                        key={i}
                        className={`px-5 py-4 text-center transition-colors ${
                          isRecommendedCol
                            ? "bg-royal/2 border-x border-royal/10"
                            : ""
                        }`}
                      >
                        {isYes ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 font-bold">
                            ✓
                          </span>
                        ) : isNoOrDash ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100/80 text-slate-400">
                            —
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold">
                            {v}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* FAQ Section */}
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
