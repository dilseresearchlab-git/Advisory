"use client";

import { useEffect, useRef, useState } from "react";

const INITIAL = 500000;
const FD_RATE = 0.07;
const MARKET_RATE = 0.12;
const YEARS = 10;

const fdFinal = INITIAL * Math.pow(1 + FD_RATE, YEARS);
const marketFinal = INITIAL * Math.pow(1 + MARKET_RATE, YEARS);

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value) => `+${value.toFixed(1)}%`;

const chart = {
  width: 420,
  height: 190,
  left: 16,
  right: 400,
  top: 35,
  bottom: 155,
  min: INITIAL,
  max: 1650000,
};

function getPoint(value, index) {
  const x = chart.left + (index / YEARS) * (chart.right - chart.left);

  const y =
    chart.bottom -
    ((value - chart.min) / (chart.max - chart.min)) *
      (chart.bottom - chart.top);

  return { x, y };
}

function createSmoothPath(points) {
  return (
    points.reduce((path, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }

      const previous = points[index - 1];
      const midX = (previous.x + point.x) / 2;
      const midY = (previous.y + point.y) / 2;

      if (index === 1) {
        return `${path} Q ${previous.x} ${previous.y} ${midX} ${midY}`;
      }

      return `${path} T ${midX} ${midY}`;
    }, "") + ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`
  );
}

// Growth data
const fdPoints = [getPoint(INITIAL, 0), getPoint(fdFinal, YEARS)];

const marketValues = Array.from(
  { length: YEARS + 1 },
  (_, year) => INITIAL * Math.pow(1 + MARKET_RATE, year),
);

const marketPoints = marketValues.map((value, index) => getPoint(value, index));

const fdPath = `M ${fdPoints[0].x} ${fdPoints[0].y} L ${fdPoints[1].x} ${fdPoints[1].y}`;

const marketPath = createSmoothPath(marketPoints);

export default function GrowthIllustration() {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let startTime = null;

    const duration = 2600;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a smooth finish
      const eased = 1 - Math.pow(1 - rawProgress, 3);

      setProgress(eased);

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cancelAnimationFrame(animationRef.current);

          if (reducedMotion.matches) {
            setProgress(1);
            return;
          }

          startTime = null;
          setProgress(0);

          animationRef.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animationRef.current);
          setProgress(0);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Live counter values
  const fdValue = INITIAL + (fdFinal - INITIAL) * progress;

  const marketValue = INITIAL * Math.pow(1 + MARKET_RATE, YEARS * progress);

  // Animate the endpoint markers
  const fdY =
    chart.bottom -
    ((fdValue - chart.min) / (chart.max - chart.min)) *
      (chart.bottom - chart.top);

  const marketY =
    chart.bottom -
    ((marketValue - chart.min) / (chart.max - chart.min)) *
      (chart.bottom - chart.top);

  return (
    <div ref={containerRef} className="w-full">
      <svg
        viewBox="0 0 420 190"
        className="w-full overflow-visible"
        role="img"
        aria-label="Illustrative fixed deposit and market-linked growth comparison"
      >
        <defs>
          <clipPath id="growth-reveal">
            <rect
              x={chart.left}
              y="0"
              width={(chart.right - chart.left) * progress}
              height="190"
            />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={chart.left}
            x2={chart.right}
            y1={chart.top + t * (chart.bottom - chart.top)}
            y2={chart.top + t * (chart.bottom - chart.top)}
            stroke="#dde6f1"
            strokeDasharray="3 5"
          />
        ))}

        {/* Fixed deposit - dotted straight line */}
        <path
          d={fdPath}
          fill="none"
          stroke="#5b7a9d"
          strokeWidth="2.5"
          strokeDasharray="5 5"
          clipPath="url(#growth-reveal)"
        />

        {/* Market-linked - curved solid line */}
        <path
          d={marketPath}
          fill="none"
          stroke="#1d4ed8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath="url(#growth-reveal)"
        />

        {/* Fixed deposit endpoint */}
        <circle
          cx={chart.right}
          cy={fdY}
          r="4"
          fill="#5b7a9d"
          opacity={progress}
        />

        {/* Market endpoint */}
        <circle
          cx={chart.right}
          cy={marketY}
          r="4.5"
          fill="#1d4ed8"
          opacity={progress}
        />

        {/* Labels above endpoints */}
        <text
          x={chart.right}
          y={marketY - 12}
          textAnchor="end"
          fill="#1d4ed8"
          fontSize="12"
          fontWeight="700"
          opacity={progress}
        >
          ₹{(marketValue / 100000).toFixed(2)}L
        </text>

        <text
          x={chart.right}
          y={fdY - 12}
          textAnchor="end"
          fill="#5b7a9d"
          fontSize="12"
          fontWeight="700"
          opacity={progress}
        >
          ₹{(fdValue / 100000).toFixed(2)}L
        </text>

        {/* Timeline */}
        <g fill="#8293a9" fontSize="10">
          <text x={chart.left} y="178">
            Year 0
          </text>
          <text x={chart.right} y="178" textAnchor="end">
            Year 10
          </text>
        </g>
      </svg>

      {/* Compact summary */}
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
        <div>
          <p className="text-xs text-steel">Fixed deposit</p>

          <p className="mt-1 text-lg font-semibold text-[#5b7a9d] tabular-nums">
            {formatINR(fdValue)}
          </p>

          <p className="mt-0.5 text-xs text-steel">
            {formatPercent((fdValue / INITIAL - 1) * 100)} growth
          </p>
        </div>

        <div>
          <p className="text-xs text-steel">Market-linked</p>

          <p className="mt-1 text-lg font-semibold text-blue-700 tabular-nums">
            {formatINR(marketValue)}
          </p>

          <p className="mt-0.5 text-xs text-blue-700">
            {formatPercent((marketValue / INITIAL - 1) * 100)} growth
          </p>
        </div>
      </div>

      {/* Short disclaimer */}
      <p className="mt-4 text-[10px] leading-relaxed text-steel">
        Illustrative only: ₹5 lakh lump sum over 10 years, assuming 7% FD
        interest and 12% annual market CAGR. Market returns are not guaranteed.
      </p>

      {/* Single legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-steel">
        <div className="flex items-center gap-2">
          <span className="w-6 border-t-2 border-dashed border-[#5b7a9d]" />
          Fixed deposit
        </div>

        <div className="flex items-center gap-2">
          <span className="w-6 border-t-[3px] border-[#1d4ed8]" />
          Market-linked growth
        </div>
      </div>
    </div>
  );
}
