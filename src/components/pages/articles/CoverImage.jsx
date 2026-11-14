import Image from "next/image";
import { useId } from "react";

// Editorial fallback artwork used only when an article has no cover image.
function CoverArt({ category = "" }) {
  const reactId = useId();
  const id = reactId.replace(/:/g, "");
  const c = category.toLowerCase();
  const variant = c.includes("company")
    ? "bars"
    : c.includes("investment")
      ? "arcs"
      : "line";

  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`${category || "Research"} abstract illustration`}
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#1d3f8a" />
        </linearGradient>
        <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fb5ff" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#8fb5ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="400" height="250" fill={`url(#bg-${id})`} />
      {[50, 100, 150, 200].map((y) => (
        <line
          key={y}
          x1="0"
          x2="400"
          y1={y}
          y2={y}
          stroke="#b9d0ec"
          strokeOpacity="0.12"
        />
      ))}

      {variant === "line" && (
        <>
          <path
            d="M0 190 L50 170 L95 180 L140 140 L190 150 L240 105 L290 118 L340 70 L400 52 L400 250 L0 250 Z"
            fill={`url(#fill-${id})`}
          />
          <path
            d="M0 190 L50 170 L95 180 L140 140 L190 150 L240 105 L290 118 L340 70 L400 52"
            fill="none"
            stroke="#c5d9ff"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="340" cy="70" r="5" fill="#fff" />
        </>
      )}

      {variant === "bars" &&
        [60, 95, 80, 130, 115, 160, 185].map((height, index) => (
          <rect
            key={index}
            x={40 + index * 48}
            y={235 - height}
            width="28"
            height={height}
            rx="3"
            fill="#b9d0ec"
            fillOpacity={0.25 + index * 0.1}
          />
        ))}

      {variant === "arcs" &&
        [150, 110, 70].map((radius, index) => (
          <circle
            key={radius}
            cx="200"
            cy="260"
            r={radius}
            fill="none"
            stroke="#b9d0ec"
            strokeOpacity={0.25 + index * 0.2}
            strokeWidth="2"
          />
        ))}
    </svg>
  );
}

export default function CoverImage({
  article,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "",
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-md bg-ice-100 ${aspect} ${className}`}
    >
      {article.coverUrl ? (
        <Image
          src={article.coverUrl}
          alt={article.coverAlt || article.title || ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
        />
      ) : (
        <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.035]">
          <CoverArt category={article.category} />
        </div>
      )}
    </div>
  );
}
