import {
  PageHero,
  Section,
  SectionHeading,
  CTABand,
  Notice,
} from "@/components/ui";
import { researchItems, methodologySteps } from "@/data/research";
import Methodology from "@/components/pages/research/Methodology";
import ResearchArticleCard from "@/components/pages/research/ResearchArticleCard";
import SampleReportsSection from "@/components/pages/research/SampleReports";

import { generatePageMetadata } from "@/lib/seo/metadata";
import { pageSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generatePageMetadata({
  title: "Stock Market Research & Sample Reports",
  description:
    "Explore sample stock market research, company analysis, sector insights and research methodology. See how financial information is assessed and presented for Indian market participants.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/research",
          name: "Stock Market Research & Sample Reports",
          description:
            "Explore sample company analysis, sector insights, research report previews and the methodology used to assess financial and market information.",
        })}
      />
      <PageHero
        eyebrow="Research & insights"
        title="Stock market research, demonstrated through sample work"
      >
        Explore examples of company analysis, sector insights and market
        perspectives, alongside previews of our research reports and the
        methodology behind them. All examples are illustrative.
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Research" title="Sample work" />
        <Notice tone="info">
          These articles are illustrative examples of our research approach.
          They are intended to demonstrate how we examine companies, sectors and
          market developments, and may not represent the full scope of our
          research.
        </Notice>
        <div className="mt-4 md:mt-8 grid gap-6 md:grid-cols-2">
          {researchItems.map((r) => (
            <ResearchArticleCard key={r.title} r={r} />
          ))}
        </div>
      </Section>

      <Section tone="ice">
        <SectionHeading
          eyebrow="Sample reports"
          title="What a deliverable looks like"
        />
        {/* <div className="mt-8 grid gap-5 md:grid-cols-3">
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
        </div> */}
        <SampleReportsSection />
      </Section>

      <Section>
        <SectionHeading eyebrow="Methodology" title="Five stages, every time" />
        <div className="mt-10">
          <Methodology steps={methodologySteps} />
        </div>
      </Section>
      <CTABand />
    </>
  );
}
