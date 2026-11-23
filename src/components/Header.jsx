"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { nav } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    opacity: 0,
    isHovering: false,
  });

  const itemRefs = useRef([]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const activeIndex = nav.findIndex((item) => isActive(item.href));
  const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  useEffect(() => {
    const updateIndicator = () => {
      const el = targetIndex >= 0 ? itemRefs.current[targetIndex] : null;
      if (!el) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      // Inset by 12px (px-3) so the hairline matches the label width rather than the padding box
      const horizontalPadding = 12;
      setIndicator({
        left: el.offsetLeft + horizontalPadding,
        width: Math.max(0, el.offsetWidth - horizontalPadding * 2),
        opacity: 1,
        isHovering: hoveredIndex !== null && hoveredIndex !== activeIndex,
      });
    };

    updateIndicator();

    // Recalculate once web fonts finish loading so font-semibold width is exact
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateIndicator);
    }

    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [targetIndex, hoveredIndex, activeIndex, pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative hidden h-full items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item, idx) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`relative z-10 rounded-md px-3 py-2 text-sm tracking-[-0.01em] transition-colors duration-200 ${
                  active
                    ? "font-semibold text-royal"
                    : "font-medium text-steel-dark hover:text-midnight"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Shared gliding bottom indicator anchored to the header border */}
          <span
            aria-hidden="true"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
              opacity: indicator.opacity,
            }}
            className={`pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              indicator.isHovering ? "bg-midnight/45" : "bg-royal"
            }`}
          />
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="rounded-full bg-navy px-5 py-2 text-sm font-medium text-white shadow-xs transition-all duration-200 hover:bg-royal"
          >
            Enquire
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-midnight lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <nav
            className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8"
            aria-label="Mobile"
          >
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-md px-2 py-3 text-sm transition-colors ${
                    active
                      ? "font-semibold text-royal"
                      : "font-medium text-steel-dark hover:text-midnight"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-royal"
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-navy px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-royal"
            >
              Enquire
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}