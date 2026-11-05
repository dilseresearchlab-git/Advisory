import { PageHero, Section, SectionHeading, Notice, CTABand } from "@/components/ui";
import { ProcessDiagram } from "@/components/Charts";
import { researchItems, sampleReports, methodologySteps } from "@/data/research";
import Methodology from "@/components/pages/research/Methodology";

export const metadata = { title: "Research & Insights" };

export default function ResearchPage() {
  return (
    <>
      <PageHero eyebrow="Research & insights" title="How we think, shown through sample work">
        Previews of company analysis, sector insight and market perspective. All content is illustrative.
      </PageHero>

      <Section>
        <div className=" grid gap-6 md:grid-cols-2">
          {researchItems.map((r) => (
            <article key={r.id} className="card card-hover p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="eyebrow">{r.type}</span>
                <span className="text-xs text-steel">{r.date}</span>
              </div>
              <h2 className="mt-3 text-2xl leading-snug">{r.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{r.summary}</p>
              <div className="mt-5 grid grid-cols-3 gap-3 rounded-xl bg-ice-50 p-4">
                {r.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-serif text-xl text-navy">{m.value}</div>
                    <div className="text-[11px] leading-tight text-steel">{m.label}</div>
                  </div>
                ))}
              </div>
              <ul className="mt-5 space-y-1.5 text-sm text-ink">
                {r.points.map((p) => (
                  <li key={p} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="ice">
        <SectionHeading eyebrow="Sample reports" title="What a deliverable looks like" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {sampleReports.map((s) => (
            <div key={s.title} className="card p-6">
              <div className="flex h-28 items-end rounded-lg bg-linear-to-br from-navy to-royal-soft p-4">
                <span className="text-xs font-medium text-ice-200">{s.pages}</span>
              </div>
              <h3 className="mt-4 text-lg">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.detail}</p>
              <p className="mt-4 text-xs text-steel">Sample download coming soon.</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Methodology" title="Five stages, every time" />
        <div className="mt-10"><Methodology steps={methodologySteps} /></div>
      </Section>
      <CTABand />
    </>
  );
}
