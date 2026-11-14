import Link from "next/link";
import { Container } from "@/components/ui";

export default function ArticlesCTA() {
  return (
    <section className="border-t border-line bg-ice-50">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <p className="eyebrow">Go further</p>
            <h2 className="mt-3 text-2xl text-midnight sm:text-3xl">
              Explore Meridian&apos;s research and advisory services
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
              Discover research-led perspectives and advisory services designed
              around the needs of active market participants.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-royal"
          >
            Enquire with Meridian <span aria-hidden="true">→</span>
          </Link>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-steel">
          Articles are published for general information and educational
          purposes. They should not be treated as a personalised investment
          recommendation or a substitute for independent evaluation.
        </p>
      </Container>
    </section>
  );
}
