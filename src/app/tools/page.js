import { PageHero, Section, Notice, CTABand } from "@/components/ui";
import Calculators from "@/components/Calculators";

export const metadata = { title: "Tools & Calculators" };

export default function ToolsPage() {
  return (
    <>
      <PageHero eyebrow="Tools & calculators" title="Numerical tools for better-structured decisions">
        Everything runs in your browser. Nothing you enter is sent or stored.
      </PageHero>
      <Section>
        <Calculators />
        <div className="mt-8">
          <Notice title="For illustration only">
            Calculators show mathematical outcomes from the inputs you provide. They are not forecasts, recommendations or advice.
          </Notice>
        </div>
      </Section>
      <CTABand />
    </>
  );
}
