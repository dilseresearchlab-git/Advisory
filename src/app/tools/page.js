
import {
  PageHero,
  Section,
  Notice,
  CTABand,
} from "@/components/ui";

import Calculators from "@/components/Calculators";

import { generatePageMetadata } from "@/lib/seo/metadata";
import { pageSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generatePageMetadata({
  title: "Stock Market Calculators & Financial Tools",
  description:
    "Use practical financial calculators and numerical tools for stock market analysis and investment planning. Calculate outcomes directly in your browser, with no data stored or transmitted.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/tools",
          name: "Stock Market Calculators & Financial Tools",
          description:
            "Explore browser-based financial calculators and numerical tools designed to help traders and investors examine calculations and structure their decisions.",
        })}
      />

      <PageHero
        eyebrow="Tools & calculators"
        title="Numerical tools for better-structured decisions"
      >
        Practical calculators for examining financial outcomes and
        working through numerical scenarios. Everything runs in
        your browser. Nothing you enter is sent or stored.
      </PageHero>

      <Section>
        <Calculators />

        <div className="mt-8">
          <Notice title="For illustration only">
            Calculators show mathematical outcomes from the inputs
            you provide. They are not forecasts, recommendations or
            investment advice.
          </Notice>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
