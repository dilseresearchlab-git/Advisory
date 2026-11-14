"use client";

import { useEffect, useRef, useState } from "react";

// variant="desktop": sticky sidebar list with active-section highlighting.
// variant="mobile": compact collapsible block shown above the article.
// Links use the exact IDs generated from the article body (see lib/portableText.js).
export default function ArticleTOC({ headings, variant = "desktop" }) {
  const [active, setActive] = useState(headings[0]?.id);
  const details = useRef(null);

  useEffect(() => {
    if (variant !== "desktop" || !headings.length) return;
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        const first = headings.find((h) => visible.has(h.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-90px 0px -65% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings, variant]);

  if (!headings.length) return null;

  if (variant === "mobile") {
    return (
      <details ref={details} className="mb-8 rounded-lg border border-line bg-ice-50 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy [&::-webkit-details-marker]:hidden">
          In this article
          <span className="text-royal" aria-hidden="true">▾</span>
        </summary>
        <ol className="border-t border-line px-4 py-3">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
              <a
                href={`#${h.id}`}
                onClick={() => details.current?.removeAttribute("open")}
                className="block py-1.5 text-sm text-steel-dark hover:text-royal"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    );
  }

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">In this article</p>
      <ol className="mt-4 border-l border-line">
        {headings.map((h) => {
          const on = active === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 text-sm leading-snug transition ${h.level === 3 ? "pl-8" : "pl-4"} ${
                  on ? "border-royal font-medium text-royal" : "border-transparent text-steel-dark hover:text-navy"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
