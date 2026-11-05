import { Filter, Search, Calculator, ShieldAlert, CheckCircle2 } from "lucide-react";

// Map an icon and soft color theme to each step
const stepIcons = [
  { icon: Filter, color: "bg-blue-50 text-blue-600 border-blue-100" },          // Screen
  { icon: Search, color: "bg-indigo-50 text-indigo-600 border-indigo-100" },     // Understand
  { icon: Calculator, color: "bg-emerald-50 text-emerald-600 border-emerald-100" }, // Value
  { icon: ShieldAlert, color: "bg-amber-50 text-amber-600 border-amber-100" },   // Stress-test
  { icon: CheckCircle2, color: "bg-teal-50 text-teal-600 border-teal-100" },     // Review
];

export default function MethodologySteps({ steps }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((s, i) => {
        const StepIcon = stepIcons[i % stepIcons.length].icon;
        const iconTheme = stepIcons[i % stepIcons.length].color;

        return (
          <li
            key={s.step}
            className="group relative flex flex-col rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-royal/30 hover:shadow-lift"
          >
            {/* Colored Icon Container replacing the numbers */}
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${iconTheme} transition-transform duration-300 group-hover:scale-110`}>
              <StepIcon className="h-6 w-6" strokeWidth={1.75} />
            </div>

            <h3 className="mt-5 text-lg font-semibold tracking-tight text-navy">
              {s.title}
            </h3>
            
            <p className="mt-2 text-sm leading-relaxed text-muted flex-1">
              {s.text}
            </p>

            {/* Subtle connecting chevron between cards on desktop */}
            {i < steps.length - 1 && (
              <span
                className="absolute -right-3.5 top-1/2 hidden -translate-y-1/2 text-slate-300 lg:block z-10 bg-white px-0.5"
                aria-hidden="true"
              >
                ›
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}