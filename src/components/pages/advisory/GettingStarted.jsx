
"use client";

const steps = [
  {
    number: "STEP 01",
    title: "Identify your needs",
    description:
      "Consider your market participation, objectives and preferred research horizon.",
  },
  {
    number: "STEP 02",
    title: "Explore a suitable track",
    description:
      "Review the proposed service categories and their corresponding packages.",
  },
  {
    number: "STEP 03",
    title: "Register your interest",
    description:
      "Share your preferred package and research requirements for further information.",
  },
];

export default function GettingStarted() {
  return (
    <div className="mt-9 grid gap-9 md:mt-12 md:grid-cols-3 md:gap-6">
      {steps.map((step, index) => (
        <article
          key={step.number}
          className="relative rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition-colors duration-300 hover:border-ice-300/30 hover:bg-white/[0.07] sm:p-6"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ice-300">
            {step.number}
          </span>

          <h3 className="mt-4 font-serif text-xl text-white sm:text-2xl">
            {step.title}
          </h3>

          <p className="mt-2 text-xs leading-6 text-ice-200/75 sm:text-sm sm:leading-relaxed">
            {step.description}
          </p>

          {index !== 2 && (
            <span
              aria-hidden="true"
              className="process-arrow absolute z-10 flex h-8 w-8 items-center justify-center rounded-full border border-ice-300/25 bg-[#142744] text-lg text-ice-300 shadow-lg"
            >
              →
            </span>
          )}
        </article>
      ))}

      <style jsx>{`
        .process-arrow {
          left: 50%;
          bottom: -30px;
          transform: translateX(-50%) rotate(90deg);
          animation: arrow-down 1.5s ease-in-out infinite;
        }

        @media (min-width: 768px) {
          .process-arrow {
            left: auto;
            right: -16px;
            top: 50%;
            bottom: auto;
            transform: translateY(-50%);
            animation: arrow-right 1.5s ease-in-out infinite;
          }
        }

        @keyframes arrow-right {
          0%, 100% {
            transform: translate(0, -50%);
          }
          50% {
            transform: translate(6px, -50%);
          }
        }

        @keyframes arrow-down {
          0%, 100% {
            transform: translateX(-50%) rotate(90deg);
          }
          50% {
            transform: translate(-50%, 6px) rotate(90deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .process-arrow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
