function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function CategoryTag({ children }) {
  if (!children) return null;

  return (
    <span className="inline-flex rounded-full bg-ice-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy">
      {children}
    </span>
  );
}

export default function ArticleMeta({ article, showAuthor = false }) {
  const date = formatDate(article.publishedAt);

  return (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-steel">
      {date && (
        <span className="inline-flex items-center gap-1.5">
          <CalendarIcon />
          <time dateTime={article.publishedAt}>{date}</time>
        </span>
      )}

      {article.readingTime && (
        <span className="inline-flex items-center gap-1.5 border-l border-line pl-4">
          <ClockIcon />
          {article.readingTime} min read
        </span>
      )}

      {showAuthor && article.author && (
        <span className="border-l border-line pl-4">By {article.author}</span>
      )}
    </p>
  );
}
