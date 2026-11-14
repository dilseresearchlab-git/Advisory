"use client";

import { useRef, useState } from "react";

const btn =
  "flex h-10 w-10 items-center justify-center rounded-full border border-ice-200 bg-ice-100 text-navy transition hover:border-royal hover:bg-white hover:text-royal";

const LinkIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 14a4.5 4.5 0 006.4 0l3-3a4.5 4.5 0 00-6.4-6.4l-1 1M14 10a4.5 4.5 0 00-6.4 0l-3 3a4.5 4.5 0 006.4 6.4l1-1" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.05c.55-1 1.9-2 3.9-2 4.1 0 4.75 2.7 4.75 6.2V21h-4v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21h-4z" />
  </svg>
);
const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" />
  </svg>
);

export default function ShareControls({ title, canonical, className = "" }) {
  const [status, setStatus] = useState("");
  const timer = useRef(null);

  const currentUrl = () => canonical || `${window.location.origin}${window.location.pathname}`;
  const flash = (msg) => {
    setStatus(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 2200);
  };

  const copy = async () => {
    const url = currentUrl();
    try {
      await navigator.clipboard.writeText(url);
      flash("Link copied");
    } catch {
      // Fallback for browsers/contexts without the async clipboard API
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        flash(document.execCommand("copy") ? "Link copied" : "Copy failed");
      } catch {
        flash("Copy failed");
      }
      document.body.removeChild(ta);
    }
  };

  const open = (href) => window.open(href, "_blank", "noopener,noreferrer");
  const linkedIn = () => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl())}`);
  const x = () => open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title || "")}&url=${encodeURIComponent(currentUrl())}`);

  return (
    <div className={className}>
      <p className="font-serif text-base text-midnight">Share this article</p>
      <div className="mt-3 flex gap-2.5">
        <button type="button" onClick={copy} className={btn} aria-label="Copy link to this article"><LinkIcon /></button>
        <button type="button" onClick={linkedIn} className={btn} aria-label="Share on LinkedIn"><LinkedInIcon /></button>
        <button type="button" onClick={x} className={btn} aria-label="Share on X"><XIcon /></button>
      </div>
      <p className="mt-2 h-4 text-xs text-royal" role="status" aria-live="polite">{status}</p>
    </div>
  );
}
