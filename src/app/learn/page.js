import { PageHero, Section, SectionHeading, CTABand } from "@/components/ui";
import { learningTracks, glossary, ratios } from "@/data/learning";

export const metadata = { title: "Learning Centre" };

export default function LearnPage() {
  return (
    <>
      <PageHero eyebrow="Learning centre" title="Understand the fundamentals before the forecasts">
        Concise, plain-language education on financial statements, ratios and market concepts.
      </PageHero>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {learningTracks.map((t) => (
            <article key={t.id} className="card p-6 sm:p-8">
              <h2 className="text-2xl">{t.title}</h2>
              <p className="mt-2 text-sm text-muted">{t.blurb}</p>
              <ol className="mt-5 space-y-2.5">
                {t.lessons.map((l, i) => (
                  <li key={l} className="flex items-baseline gap-3 text-sm">
                    <span className="font-serif text-ice-300">{String(i + 1).padStart(2, "0")}</span>{l}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="ice">
        <SectionHeading eyebrow="Key ratios" title="A quick reference" />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-ice-50 text-steel-dark">
                <th className="px-4 py-3 font-medium">Ratio</th>
                <th className="px-4 py-3 font-medium">Formula</th>
                <th className="px-4 py-3 font-medium">How to read it</th>
              </tr>
            </thead>
            <tbody>
              {ratios.map((r) => (
                <tr key={r.name} className="border-b border-line/70 last:border-0">
                  <td className="px-4 py-3 font-semibold text-navy">{r.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-ink">{r.formula}</td>
                  <td className="px-4 py-3 text-muted">{r.reading}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Glossary" title="Terms worth knowing" />
        <dl className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {glossary.map((g) => (
            <div key={g.term} className="border-t border-line pt-4">
              <dt className="font-serif text-lg text-navy">{g.term}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{g.def}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <CTABand />
    </>
  );
}
