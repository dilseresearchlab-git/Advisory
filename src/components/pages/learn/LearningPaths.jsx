import { Section, SectionHeading } from "@/components/ui";

const themes = {
  fundamentals: {
    number: "01",
    label: "BUSINESS BASICS",
    iconBox: "bg-sky-50 text-sky-700 border-sky-100",
    title: "text-sky-800",
    numberColor: "text-sky-600",
    accent: "bg-sky-500",
    surface: "from-sky-50/70",
    border: "border-sky-100/80",
  },

  valuation: {
    number: "02",
    label: "COMPANY EVALUATION",
    iconBox: "bg-violet-50 text-violet-700 border-violet-100",
    title: "text-violet-800",
    numberColor: "text-violet-600",
    accent: "bg-violet-500",
    surface: "from-violet-50/70",
    border: "border-violet-100/80",
  },

  investing: {
    number: "03",
    label: "LONG-TERM THINKING",
    iconBox: "bg-teal-50 text-teal-700 border-teal-100",
    title: "text-teal-800",
    numberColor: "text-teal-600",
    accent: "bg-teal-500",
    surface: "from-teal-50/70",
    border: "border-teal-100/80",
  },

  trading: {
    number: "04",
    label: "MARKET PARTICIPATION",
    iconBox: "bg-amber-50 text-amber-700 border-amber-100",
    title: "text-amber-800",
    numberColor: "text-amber-600",
    accent: "bg-amber-500",
    surface: "from-amber-50/70",
    border: "border-amber-100/80",
  },
};

function TrackIcon({ name }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      aria-hidden="true"
      {...common}
    >
      {name === "fundamentals" && (
        <>
          <path d="M3 21h18" />
          <path d="M5 21V8l7-4 7 4v13" />
          <path d="M9 21v-5h6v5" />
          <path d="M9 10h.01M15 10h.01" />
          <path d="M8 13h.01M16 13h.01" />
        </>
      )}

      {name === "valuation" && (
        <>
          <path d="M3 3v18h18" />
          <path d="m7 14 4-4 3 2 6-7" />
          <path d="M16 5h4v4" />
        </>
      )}

      {name === "investing" && (
        <>
          <path d="M12 21v-9" />
          <path d="M12 15C5 15 4 10 4 5c5 0 10 2 10 8" />
          <path d="M12 18c1-5 4-7 9-8 0 5-2 9-9 10" />
        </>
      )}

      {name === "trading" && (
        <>
          <path d="M5 3v18M12 3v18M19 3v18" />
          <rect x="3" y="7" width="4" height="6" rx="1" />
          <rect x="10" y="11" width="4" height="7" rx="1" />
          <rect x="17" y="5" width="4" height="9" rx="1" />
        </>
      )}
    </svg>
  );
}

export default function LearningPaths({ tracks = [] }) {
  return (
    <Section>
      <div id="learning-paths" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Choose your starting point"
          title="Four areas. A stronger understanding of markets."
        >
          Build your knowledge around the concepts that matter to you,
          from understanding businesses to evaluating market opportunities.
        </SectionHeading>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {tracks.map((track) => {
            const theme = themes[track.id] ?? themes.fundamentals;

            return (
              <article
                key={track.id}
                className={`group relative overflow-hidden rounded-2xl border ${theme.border} bg-gradient-to-br to-white p-5 transition-colors duration-300 hover:border-slate-300 sm:p-6`}
              >
                {/* Heading row */}
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${theme.iconBox}`}
                  >
                    <TrackIcon name={track.id} />
                  </div>

                  <span
                    className={`font-serif text-sm ${theme.numberColor}/70`}
                  >
                    {theme.number}
                  </span>
                </div>

                {/* Main content */}
                <div className="mt-5">
                  <p
                    className={`text-[10px] font-semibold tracking-[0.16em] ${theme.numberColor}`}
                  >
                    {theme.label}
                  </p>

                  <h3 className={`mt-2 font-serif text-xl ${theme.title}`}>
                    {track.title}
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
                    {track.blurb}
                  </p>
                </div>

                {/* Learning outcome */}
                {track.outcome && (
                  <div className="mt-5 flex items-start gap-2.5 border-t border-slate-200/70 pt-4">
                    <span
                      className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${theme.accent}`}
                    />

                    <p className="text-xs leading-5 text-navy/75">
                      {track.outcome}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}