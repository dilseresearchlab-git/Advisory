import Link from "next/link";
import { Container } from "@/components/ui";

export default function ArticlesCTA() {
  return (
    <section className="border-t border-line bg-ice-50/50">
      <Container className="py-10 sm:py-12">
        {/* Compact Banner Card */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 via-indigo-50/30 to-blue-50/80 px-6 py-6 shadow-xs sm:flex-row sm:px-8">
          
          {/* Left Side: Icon, Title & Subtitle */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            {/* Trend/Graph Icon */}
            <div className="hidden shrink-0 rounded-xl bg-white p-3.5 shadow-sm sm:flex">
              <svg 
                className="h-6 w-6 text-royal" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-midnight sm:text-xl">
                Explore our research and advisory services
              </h2>
              <p className="mt-1 text-sm text-muted">
                Get deeper insights and expert guidance for your investment journey.
              </p>
            </div>
          </div>

          {/* Right Side: Action Button */}
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-royal shadow-sm"
          >
            Explore Advisory <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Legal/Disclaimer Note */}
        <p className="mt-6 max-w-4xl text-xs leading-relaxed text-steel">
          Articles are published for general information and educational
          purposes. They should not be treated as a personalised investment
          recommendation or a substitute for independent evaluation.
        </p>
      </Container>
    </section>
  );
}