import { Container } from "@/components/ui";

const themes = [
  "Market Perspectives",
  "Company Research",
  "Investment Insights",
];

export default function ArticlesHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-gradient-to-b from-ice-100 to-white">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <Container className="relative py-16 sm:py-24 lg:py-28">
        <p className="eyebrow">Meridian Research &amp; Perspectives</p>

        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.08] tracking-tight text-midnight sm:text-6xl">
          Articles &amp; Insights
          <span className="mt-2 block text-royal">
            A clearer view of the markets.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          Independent perspectives on businesses, financial performance and
          market themes—written to explain how we think, not to tell you what
          to buy.
        </p>

        <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Research themes">
          {themes.map((theme) => (
            <li
              key={theme}
              className="rounded-full border border-ice-300 bg-white/80 px-4 py-2 text-xs font-medium text-navy"
            >
              {theme}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
