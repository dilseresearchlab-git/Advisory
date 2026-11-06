import { PageHero, Section, SectionHeading, CTABand } from "@/components/ui";
import { researchItems, sampleReports, methodologySteps } from "@/data/research";
import Methodology from "@/components/pages/research/Methodology";
import ResearchArticleCard from "@/components/pages/research/ResearchArticleCard";

export const metadata = { title: "Research & Insights" };

export default function ResearchPage() {
  return (
    <>
      <PageHero eyebrow="Research & insights" title="How we think, shown through sample work">
        Previews of company analysis, sector insight and market perspective. All content is illustrative.
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Research" title="Sample work" />
        {/* <Notice tone="info" className="mt-6">
          The following research articles are samples of our work. They are not intended to be exhaustive or representative of all research we conduct. 
        </Notice> */}
        <div className="mt-4 md:mt-8 grid gap-6 md:grid-cols-2">
          {researchItems.map((r) => (
            <ResearchArticleCard key={r.title} r={r} />
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
