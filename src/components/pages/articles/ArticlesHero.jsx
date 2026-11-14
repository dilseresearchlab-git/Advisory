import { Container } from "@/components/ui";
import Image from "next/image";

const themes = [
  "Market Perspectives",
  "Company Research",
  "Investment Insights",
];

export default function ArticlesHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line ">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/market-building.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 blur-[1px]"
        />
        {/* Dark/Light overlay gradient to keep text readable */}
        <div className="absolute inset-0 bg-linear-to-r from-ice-100/95 via-ice-100/80 to-ice-100/60" />
      </div>

      {/* Grid pattern overlay if you want to keep it */}
      <div
        className="grid-bg pointer-events-none absolute inset-0 z-10 opacity-30"
        aria-hidden="true"
      />

      {/* Content */}
      <Container className="relative z-20 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Meridian Research &amp; Perspectives</p>

          <h1 className="mt-4 text-3xl md:leading-[1.1] md:text-4xl lg:text-5xl">
            Articles &amp; Insights
            <span className="md:mt-2 block text-royal">
              A clearer view of the markets.
            </span>
          </h1>

          <p className="mt-4 md:mt-6 max-w-2xl text-base md:leading-8 text-muted md:text-lg">
            Independent perspectives on businesses, financial performance and
            market themes—written to explain how we think, not to tell you what
            to buy.
          </p>
        </div>
      </Container>
    </section>
  );
}
