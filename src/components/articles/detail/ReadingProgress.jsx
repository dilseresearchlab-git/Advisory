"use client";

import { useEffect, useRef } from "react";

// Thin royal-blue bar fixed to the very top of the viewport (above the sticky header).
// Updates via requestAnimationFrame + transform only, so scrolling stays cheap.
export default function ReadingProgress({ targetId }) {
  const bar = useRef(null);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || !bar.current) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const done = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : rect.top < 0 ? 1 : 0;
      bar.current.style.transform = `scaleX(${done})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
      <div ref={bar} className="h-full origin-left bg-royal" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
