import Link from "next/link";
import { Button } from "@/components/ui";

export default function ServiceCard({ service, plan, index }) {
  const isBestValue = index === 1;

  return (
    <article
      className={`card group relative flex flex-col justify-between p-6 transition-all duration-300 ${
        isBestValue
          ? "border-royal/50 bg-linear-to-b from-ice-50/80 to-white shadow-md ring-1 ring-royal/20"
          : "border-slate-200/80 bg-white hover:border-royal/40"
      }`}
    >
      <div>
        {/* Card Header: Number & Focus Badge */}
        <div className="flex items-center justify-between">
          <span className="font-serif text-2xl text-slate-300">
            0{index + 1}
          </span>
          <span className="rounded-full bg-ice-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-royal">
            {service.focus}
          </span>
        </div>

        {/* Title & Concise Tagline */}
        <div className="mt-4">
          <h2 className="font-serif text-xl font-semibold tracking-tight transition-colors duration-100 text-slate-700/90 group-hover:text-emerald-600 sm:text-2xl">
            {service.title}
          </h2>
          <p className="mt-1 text-sm font-semibold text-royal">
            {service.tagline}
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-muted line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* Compact 'Best Suited For' inline block */}
        <div className="mt-2 md:mt-4 border-t border-slate-100 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
            Best suited for:
          </span>
          <p className="mt-0.5 text-xs font-medium text-slate-700 line-clamp-3">
            {service.bestFor}
          </p>
        </div>

        {/* Deliverables (Shortened list layout) */}
        <div className="mt-2 md:mt-4 border-t border-slate-100 pt-3">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-navy">
            Research coverage
          </h3>
          <ul className="mt-2 space-y-1.5 text-xs text-muted">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />
                <span className="truncate">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer: Package Association & Action CTA */}
      <div className="mt-4 md:mt-6 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Package
            </span>
            <Link
              href="/pricing"
              className="font-semibold text-royal hover:underline"
            >
              {plan?.name ?? "Explore packages"}
            </Link>
          </div>
          <span className="font-medium text-orange-500">{service.horizon}</span>
        </div>

        <Button
          href={`/contact?plan=${service.plan}`}
          className="mt-4 w-full justify-center py-2.5 text-xs"
        >
          Register interest
        </Button>
      </div>
    </article>
  );
}