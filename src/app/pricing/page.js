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

        <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-white shadow-sm">
          <table className="w-full min-w-110 border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-line bg-ice-50/90">
                <th className="sticky left-0 z-10 w-[34%] bg-ice-50/95 px-3 py-2.5 font-semibold text-slate-900 backdrop-blur-xs sm:w-1/4 sm:px-4 sm:py-3">
                  Feature
                </th>
                {plans.map((p) => (
                  <th
                    key={p.id}
                    className={`relative px-2.5 py-2.5 text-center font-semibold transition-colors sm:px-4 sm:py-3 ${
                      p.recommended
                        ? "border-x border-royal/10 bg-royal/5 text-royal"
                        : "text-slate-700"
                    }`}
                  >
                    {p.recommended && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-0.5 bg-royal"
                      />
                    )}
                    <div className="text-xs sm:text-sm">{p.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {comparisonRows.map((row) => (
                <tr
                  key={row.label}
                  className="group transition-colors hover:bg-slate-50/80"
                >
                  <td className="sticky left-0 z-10 bg-white px-3 py-2.5 font-medium leading-snug text-slate-700 group-hover:bg-slate-50/95 sm:px-4 sm:py-3">
                    {row.label}
                  </td>
                  {row.values.map((v, i) => {
                    const isRecommendedCol = plans[i]?.recommended;
                    const isYes = v === "Yes";
                    const isNoOrDash = v === "—" || v === "No";

                    return (
                      <td
                        key={i}
                        className={`px-2.5 py-2.5 text-center transition-colors sm:px-4 sm:py-3 ${
                          isRecommendedCol
                            ? "border-x border-royal/10 bg-royal/[0.02]"
                            : ""
                        }`}
                      >
                        {isYes ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-600 sm:h-6 sm:w-6 sm:text-xs">
                            ✓
                          </span>
                        ) : isNoOrDash ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100/80 text-[11px] text-slate-400 sm:h-6 sm:w-6 sm:text-xs">
                            —
                          </span>
                        ) : (
                          <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold leading-tight text-slate-800 sm:text-xs">
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
