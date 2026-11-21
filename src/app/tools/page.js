import { PageHero, Section, Notice, CTABand } from "@/components/ui";

import Calculators from "@/components/Calculators";

import { generatePageMetadata } from "@/lib/seo/metadata";
import { pageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
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
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
        ])}
      />

      <PageHero
        eyebrow="Tools & calculators"
        title="Numerical tools for better-structured decisions"
        imageSrc={"/images/Calculator.svg"}
        imageAlt="A guy using calculator."
      >
        Practical calculators for examining financial outcomes and working
        through numerical scenarios. Everything runs in your browser. Nothing
        you enter is sent or stored.
      </PageHero>

      <Section>
        <Calculators />

        <div className="mt-8">
          <Notice title="For illustration only">
            Calculators show mathematical outcomes from the inputs you provide.
            They are not forecasts, recommendations or investment advice.
          </Notice>
        </div>
      </Section>
      <Section className="mt-16 border-t border-line pt-12">
        <h2 className="font-serif text-2xl text-navy sm:text-3xl">
          Explore our stock market calculators
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          Use these financial calculators to examine investment growth, trading
          returns, risk exposure and transaction costs. Each tool works with the
          values you provide.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <article>
            <h3 className="font-semibold text-navy">SIP Calculator</h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              Estimate the future value of regular monthly investments using an
              assumed annual return, investment duration and optional annual
              contribution increase.
            </p>
          </article>

          <article>
            <h3 className="font-semibold text-navy">Lumpsum Calculator</h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              Estimate how a one-time investment may grow over a selected period
              at an assumed annual return.
            </p>
          </article>

          <article>
            <h3 className="font-semibold text-navy">CAGR Calculator</h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              Calculate compound annual growth between an initial value and a
              final value over a specified period.
            </p>
          </article>

          <article>
            <h3 className="font-semibold text-navy">Returns Calculator</h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              Calculate investment profit or loss, absolute returns and
              annualised returns using buy price, sell price, quantity and
              holding period.
            </p>
          </article>

          <article>
            <h3 className="font-semibold text-navy">
              Risk / Reward Calculator
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              Compare the potential risk and reward of a trade using entry,
              stop-loss and target prices.
            </p>
          </article>

          <article>
            <h3 className="font-semibold text-navy">
              Position Size Calculator
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              Estimate trade quantity based on trading capital, risk per trade,
              entry price and stop-loss level.
            </p>
          </article>

          <article>
            <h3 className="font-semibold text-navy">Brokerage Calculator</h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              Estimate brokerage, applicable transaction charges and net profit
              or loss for equity intraday and delivery trades.
            </p>
          </article>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
