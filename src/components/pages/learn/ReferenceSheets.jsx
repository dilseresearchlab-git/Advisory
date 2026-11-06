import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui";
import { ratios, glossary } from "@/data/learning";

export default function ReferenceSheets() {
  return (
    <>
      {/* Financial ratio reference */}
      <Section>
        <div id="ratio-reference" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Quick reference · 04"
            title="Essential financial ratios."
          >
            A quick reference to commonly used ratios and what they reveal.
          </SectionHeading>

          <div className="mt-7 overflow-hidden rounded-xl border border-slate-200/80 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead className="bg-slate-50 text-[10px] font-semibold uppercase tracking-wider text-steel">
                  <tr>
                    <th className="px-4 py-3 sm:px-5">Ratio</th>
                    <th className="px-4 py-3 sm:px-5">Formula</th>
                    <th className="px-4 py-3 sm:px-5">What it reveals</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {ratios.map((ratio) => (
                    <tr
                      key={ratio.name}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-navy sm:px-5">
                        {ratio.name}
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-[#365878] sm:px-5">
                        {ratio.formula}
                      </td>
                      <td className="px-4 py-3 text-xs leading-5 text-muted sm:px-5">
                        {ratio.reading}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-3 text-[10px] leading-5 text-muted">
            Ratios are most useful when compared with industry peers, historical
            performance and the company's business context. For ROE and ROCE,
            average balance-sheet values are often preferable when available.
          </p>
        </div>
      </Section>

      {/* Essential terminology */}
      <Section tone="ice">
        <div id="market-terminology" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Essential terminology · 05"
            title="Know the language of the market."
          >
            Important financial and market terms, explained simply.
          </SectionHeading>

          <div className="mt-7 grid gap-x-10 md:grid-cols-2">
            {glossary.map((item, index) => (
              <div
                key={item.term}
                className={`flex gap-4 border-b border-slate-200/80 py-3 ${
                  index === 0 ? "border-t" : ""
                }`}
              >
                <span className="w-6 shrink-0 pt-0.5 font-serif text-xs text-sky-700/70 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-navy">
                    {item.term}
                  </h3>
                  <p className="mt-0.5 text-xs leading-5 text-muted">
                    {item.def}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Closing CTA */}
      <section className="relative isolate overflow-hidden bg-midnight">
        <div
          className="grid-bg absolute inset-0 opacity-20"
          aria-hidden="true"
        />
        <div
          className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-royal/20 blur-3xl"
          aria-hidden="true"
        />
      </section>
    </>
  );
}
