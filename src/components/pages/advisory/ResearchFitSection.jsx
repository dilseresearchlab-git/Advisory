import Link from "next/link";
import {SectionHeading} from "@/components/ui";

// 1. Scalable SVG Illustrations matched to Card Themes with High Contrast
function PlantGrowthIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full">
      {/* Soft emerald background circle */}
      <circle cx="100" cy="60" r="45" fill="#D1FAE5" />
      {/* Pot */}
      <path d="M85 85H115L112 100H88L85 85Z" fill="#047857" opacity="0.25" />
      <path d="M83 82H117V86H83V82Z" fill="#065F46" opacity="0.6" />
      {/* Stem */}
      <path d="M100 82Q98 55 108 35" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" />
      {/* Leaves - Emerald gradient shades */}
      <path d="M100 70C90 68 85 58 92 52C98 58 100 65 100 70Z" fill="#10B981" />
      <path d="M102 58C112 55 116 45 109 40C103 46 102 53 102 58Z" fill="#047857" />
      <path d="M108 35C102 25 114 20 115 30C111 32 109 34 108 35Z" fill="#34D399" />
      {/* Gold Coins - Vibrant contrast */}
      <circle cx="78" cy="48" r="8.5" fill="#D97706" />
      <circle cx="78" cy="48" r="7" fill="#F59E0B" />
      <text x="78" y="51" textAnchor="middle" fill="#FFF" fontSize="8" fontWeight="bold">$</text>
      <circle cx="124" cy="38" r="10.5" fill="#D97706" />
      <circle cx="124" cy="38" r="9" fill="#F59E0B" />
      <text x="124" y="41" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">$</text>
    </svg>
  );
}

function MarketMovementIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full">
      {/* Soft amber background circle */}
      <circle cx="100" cy="60" r="45" fill="#FFEDD5" />
      {/* Grid Lines */}
      <path d="M50 90H150M50 60H150M50 30H150" stroke="#FDBA74" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      {/* Candlestick Wicks & Bars - Warm Amber/Orange tones */}
      <path d="M65 75V45M95 65V35M125 50V25M155 40V15" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="61" y="52" width="8" height="15" rx="2" fill="#FB923C" />
      <rect x="91" y="42" width="8" height="18" rx="2" fill="#F97316" />
      <rect x="121" y="30" width="8" height="14" rx="2" fill="#EA580C" />
      {/* Bold Uptrend Arrow */}
      <path d="M55 80L88 55L118 42L155 20" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="155" cy="20" r="4" fill="#C2410C" />
    </svg>
  );
}

function DeeperAnalysisIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full">
      {/* Soft indigo background circle */}
      <circle cx="100" cy="60" r="45" fill="#E0E7FF" />
      {/* Connected Network Nodes */}
      <path d="M70 65L100 40L135 55L100 85L70 65Z" stroke="#818CF8" strokeWidth="1.5" />
      <path d="M100 40L100 85" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* Magnifying / Target Ring */}
      <circle cx="100" cy="60" r="28" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 2" />
      {/* High Contrast Data Nodes */}
      <circle cx="70" cy="65" r="5" fill="#6366F1" />
      <circle cx="100" cy="40" r="6" fill="#4338CA" />
      <circle cx="135" cy="55" r="5" fill="#4F46E5" />
      <circle cx="100" cy="85" r="7" fill="#3730A3" />
      {/* Floating Sparkles */}
      <circle cx="130" cy="30" r="2.5" fill="#818CF8" />
      <circle cx="65" cy="40" r="2.5" fill="#A5B4FC" />
    </svg>
  );
}

// 2. Main Component
export default function ResearchFitSection() {
  const cards = [
    {
      number: "01",
      bg: "bg-emerald-50",
      label: "BUILD PERSPECTIVE",
      title: "Understand businesses",
      description:
        "Explore company fundamentals, business quality, financial performance and valuation.",
      audience: "Beginner Investors · Long-Term Investors",
      illustration: <PlantGrowthIllustration />,
    },
    {
      number: "02",
      bg: "bg-amber-50",
      label: "STUDY OPPORTUNITIES",
      title: "Follow market movements",
      description:
        "Examine price structure, momentum, relative strength and risk/reward considerations.",
      audience: "Active Traders · Swing & Positional Traders",
      illustration: <MarketMovementIllustration />,
    },
    {
      number: "03",
      bg: "bg-indigo-50",
      label: "EXPAND COVERAGE",
      title: "Access deeper analysis",
      description:
        "Explore wider market coverage, quantitative research and thematic perspectives.",
      audience: "Advanced Participants",
      illustration: <DeeperAnalysisIllustration />,
    },
  ];

  return (
    <section className="py-12 md:py-16">
      {/* Section Header */}
    <SectionHeading
          eyebrow="Find your research fit"
          title="Start with what you want to understand."
        >
          The right research track depends on your objectives, preferred time
          horizon and the depth of analysis you need.
        </SectionHeading>

      {/* Cards Grid */}
      <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-7">
        {cards.map((item) => (
          <article
            key={item.number}
            className="group relative flex flex-col justify-between rounded-2xl border border-line/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-7"
          >
            <div>
              {/* Card Top: Number & Label */}
              <div className="flex items-center justify-between gap-3">
                {/* <span className="font-serif text-3xl leading-none text-blue-200 md:text-4xl">
                  {item.number}
                </span> */}

                <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-royal md:text-[10px] md:tracking-[0.15em]">
                  {item.label}
                </span>
              </div>

              {/* Illustration Area matching Card BG */}
              <div
                className={`my-4 flex h-32 w-full items-center justify-center rounded-xl ${item.bg} p-2 transition-transform duration-300 group-hover:scale-105`}
              >
                {item.illustration}
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-xl text-navy md:text-2xl">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted md:leading-7">
                {item.description}
              </p>
            </div>

            {/* Card Footer: Audience */}
            <div className="mt-6 border-t border-line/80 pt-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-steel md:text-[10px]">
                Best aligned with
              </p>
              <p className="mt-1.5 text-sm font-medium leading-5 text-navy md:leading-6">
                {item.audience}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Footer Link */}
      <div className="mt-8 border-t border-line pt-6 md:mt-10">
        <Link
          href="/pricing"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-royal transition-colors hover:text-navy"
        >
          Compare research packages
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
} 