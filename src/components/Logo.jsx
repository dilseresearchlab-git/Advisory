import { site } from "@/data/site";

export function LogoMark({ className = "h-8 w-8", color = "#0a1628" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`block shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Coin Circle */}
      <circle
        cx="32"
        cy="43"
        r="16.5"
        stroke={color}
        strokeWidth="3.5"
      />

      {/* Left Stem & Leaf */}
      <path
        d="M29 26.5C29 20 25 16.5 20 15.5"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M20 15.5C12.5 16 8.5 11.5 8 4.5C15 5 19.5 9 20 15.5Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Stem & Leaf */}
      <path
        d="M35 26.5C35 20.5 39 17.5 43.5 16.5"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M43.5 16.5C44 10 48.5 6.5 55.5 7C55 14 50.5 17 43.5 16.5Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rupee Symbol (₹) */}
      <path
        d="M26 36.5H38.5M26 41.5H38.5M29.5 36.5C34.5 36.5 35.5 44.5 27.5 44.5L36.5 51.5"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({ light = false }) {
  return (
    <span className="inline-flex items-center gap-2.5 align-middle">
      <LogoMark color={light ? "#ffffff" : "#0a1628"} />
      <span
        className={`font-serif text-lg sm:text-xl font-semibold leading-none tracking-tight translate-y-[0.5px] mt-2 ${
          light ? "text-white" : "text-midnight"
        }`}
      >
        {site.name}
      </span>
    </span>
  );
}