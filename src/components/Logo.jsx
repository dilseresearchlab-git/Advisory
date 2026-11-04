import { site } from "@/data/site";

// Swap this SVG mark for your own logo. Text comes from site config.
export function LogoMark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0f2447" />
      <path d="M7 22V10l9 8 9-8v12" fill="none" stroke="#b9d0ec" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="18" r="1.8" fill="#5b8def" />
    </svg>
  );
}

export default function Logo({ light = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className={`font-serif text-xl font-semibold tracking-tight ${light ? "text-white" : "text-midnight"}`}>
        {site.name}
      </span>
    </span>
  );
}
