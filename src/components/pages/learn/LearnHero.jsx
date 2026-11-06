import { Button, Container } from "@/components/ui";
import {
  ChartNoAxesCombined,
  TrendingUp,
  Calculator,
  ChartCandlestick,
} from "lucide-react";

export default function LearnHero() {
  return (
    <section className="relative overflow-hidden bg-midnight">
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

      <div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-royal/30 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.15fr_1fr]">
        {/* Hero content */}
        <div>
          <p className="eyebrow text-ice-300!">
            Learning Centre · Market Knowledge
          </p>

          <h1 className="mt-5 text-4xl leading-[1.08] text-white! sm:text-6xl">
            Understand the numbers behind the market.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ice-300/90">
            Develop a practical understanding of financial statements,
            valuation, business performance and market behaviour. Learn the
            concepts that help you interpret research with greater clarity.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#learning-paths" variant="light">
              Explore learning paths
            </Button>

            <Button
              href="#financial-story"
              className="border-white/25! bg-transparent! text-white! hover:bg-white/10!"
              variant="outline"
            >
              Start learning
            </Button>
          </div>
        </div>

        {/* Learning overview – translucent illustration card */}
        <div className="w-full max-w-md lg:ml-auto rounded-[24px] border border-white/15 bg-white/[0.07] p-5 sm:p-6 backdrop-blur-xl">
          {/* Card heading */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ice-300">
                Financial knowledge
              </p>

              <h2 className="mt-2 font-serif text-2xl text-white">
                Learn the essentials
              </h2>
            </div>

            <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ice-300/80">
              04 areas
            </span>
          </div>

          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ice-300/65">
            Explore the building blocks of financial and market understanding.
          </p>

          {/* Learning stages */}
          <div className="mt-6 space-y-2.5">
            {[
              {
                number: "01",
                title: "Financial fundamentals",
                description: "Revenue, profit and cash flow",
                icon: ChartNoAxesCombined,
                color: "text-sky-300",
                bg: "bg-sky-400/10",
                border: "border-sky-300/15",
              },
              {
                number: "02",
                title: "Ratios & valuation",
                description: "Performance, efficiency and value",
                icon: TrendingUp,
                color: "text-violet-300",
                bg: "bg-violet-400/10",
                border: "border-violet-300/15",
              },
              {
                number: "03",
                title: "Investing mathematics",
                description: "Returns, compounding and risk",
                icon: Calculator,
                color: "text-teal-300",
                bg: "bg-teal-400/10",
                border: "border-teal-300/15",
              },
              {
                number: "04",
                title: "Trading concepts",
                description: "Price structure and risk management",
                icon: ChartCandlestick,
                color: "text-amber-300",
                bg: "bg-amber-400/10",
                border: "border-amber-300/15",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="flex items-center gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.045] px-3.5 py-3"
                >
                  {/* Coloured icon box */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${item.bg} ${item.border}`}
                  >
                    <Icon
                      className={`h-[18px] w-[18px] ${item.color}`}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Stage text */}
                  <div className="min-w-0">
                    <h3 className={`text-sm font-medium ${item.color}`}>
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-ice-300/55">
                      {item.description}
                    </p>
                  </div>

                  {/* Step number */}
                  <span className="ml-auto shrink-0 font-serif text-xs text-ice-300/35">
                    {item.number}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom note */}
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-xs text-ice-300/65">
              From concepts to application
            </span>

            <span className="text-xs text-ice-300/45">Learning guide</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
