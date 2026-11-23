import { PageHero, Section, SectionHeading, CTABand } from "@/components/ui";
import { services } from "@/data/services";
import { plans } from "@/data/pricing";
import ServiceCard from "@/components/pages/advisory/ServiceCard";
import GettingStarted from "@/components/pages/advisory/GettingStarted";
import ResearchFitSection from "@/components/pages/advisory/ResearchFitSection";

import { generatePageMetadata } from "@/lib/seo/metadata";
import { pageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generatePageMetadata({
  title: "Stock Market Research & Advisory Approaches",
  description:
    "Explore proposed research approaches for Indian traders and investors. Understand different market objectives, research coverage and the packages designed around them.",
  path: "/advisory",
});

export default function AdvisoryPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/advisory",
          name: "Stock Market Research & Advisory Approaches",
          description:
            "Explore proposed research approaches for Indian traders and investors, including different market objectives, research coverage and package options.",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Advisory", path: "/advisory" },
        ])}
      />
      {/* 01 — Hero */}
      <PageHero
        eyebrow="Advisory services"
        title="Research aligned with your market objectives."
        imageSrc={"/images/Advisory.png"}
        imageAlt="A woman consulting a guy."
      >
        Five proposed research tracks designed around different investment
        horizons, trading styles and levels of market participation.
      </PageHero>

      {/* 02 — Advisory service tracks */}
      <Section tone="ice">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Explore our services"
            title="Different objectives. Different research needs."
          >
            Whether you're evaluating businesses, following market opportunities
            or seeking broader analytical coverage, explore the research track
            that aligns with your approach.
          </SectionHeading>
        </div>

        {/* <Notice title="Proposed services">
          These service descriptions and packages are proposals. They will be
          offered only after applicable regulatory requirements are satisfied.
        </Notice> */}

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s, index) => {
            const plan = plans.find((p) => p.id === s.plan);

            return (
              <ServiceCard key={s.id} service={s} plan={plan} index={index} />
            );
          })}
        </div>
      </Section>

      {/* 03 — Find your research fit */}
      <Section>
        <ResearchFitSection />
      </Section>

      {/* 04 — How to get started */}
      <Section tone="navy">
        <SectionHeading
          eyebrow="Getting started"
          title="A straightforward path to exploring our services."
          className="text-white"
        >
          Understand the proposed offering, identify your research needs and
          register your interest.
        </SectionHeading>

        <GettingStarted />
      </Section>

      {/* 05 — Transparency */}
      <Section>
        <div className="max-w-4xl">
          <SectionHeading
            eyebrow="Transparency & scope"
            title="Important things to understand."
          />

          <ul className="mt-7 space-y-4">
            {[
              "Market research and insights do not guarantee returns or trading outcomes.",
              "No custody of client funds or discretionary portfolio management.",
              "Research coverage and deliverables are subject to the selected package and defined scope.",
              "Regulated advisory services will commence only after obtaining applicable regulatory approvals.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:text-base"
              >
                <span className="shrink-0 text-amber-500" aria-hidden="true">
                  ⚠
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 06 — Final CTA */}
      <CTABand />
    </>
  );
}
