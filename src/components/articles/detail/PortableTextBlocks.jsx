// Renderers for custom Portable Text objects. Field names follow
// sanity/article-blocks.schema.js. Every renderer tolerates missing fields and
// never invents content: absent data simply isn't shown.

import Image from "next/image";
import { imageSize } from "@/lib/sanityImage";

const text = (v) => (typeof v === "string" ? v : v?.text || "");
const list = (v) => (Array.isArray(v) ? v : []);

const Check = ({ className = "" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
const Cross = ({ className = "" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
const Bulb = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0012 3z" />
  </svg>
);

function BlockTitle({ children }) {
  if (!children) return null;
  return <h3 className="mb-4 font-serif text-2xl text-midnight">{children}</h3>;
}

export function KeyTakeaways({ value }) {
  const items = list(value.items).map(text).filter(Boolean);
  if (!items.length) return null;
  return (
    <aside
      className="my-10 rounded-xl border border-ice-200 bg-ice-100/70 p-6 sm:p-7"
      aria-label={value.title || "Key takeaways"}
    >
      <div className="flex items-center gap-3 text-royal">
        <span className="flex h-6 w-6 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white">
          <Bulb />
        </span>
        <p className="font-serif text-base sm:text-xl">{value.title || "Key Takeaways"}</p>
      </div>
      <ul className="mt-4 space-y-2.5 pl-1 text-[15px] sm:text-base leading-relaxed text-slate-600">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy"
              aria-hidden="true"
            />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function MetricHighlights({ value }) {
  const metrics = list(value.metrics).filter((m) => m?.value);
  if (!metrics.length) return null;
  return (
    <section className="my-10" aria-label={value.title || "Metric highlights"}>
      <BlockTitle>{value.title}</BlockTitle>
      <dl
        className={`grid gap-4 ${metrics.length >= 3 ? "sm:grid-cols-3" : metrics.length === 2 ? "sm:grid-cols-2" : ""}`}
      >
        {metrics.map((m, i) => (
          <div
            key={m._key || i}
            className="rounded-xl border border-line bg-white p-5"
          >
            <dt className="text-xs font-semibold uppercase tracking-wider text-steel">
              {m.label}
            </dt>
            <dd className="mt-2 font-serif text-4xl leading-none text-navy">
              {m.value}
            </dd>
            {m.description && (
              <dd className="mt-3 text-sm leading-relaxed text-muted">
                {m.description}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}

export function ArticleTable({ value }) {
  // Read column headings separately from the data rows.
  const headings = list(value.columns).map(text);
  const rows = list(value.rows).map((row) => list(row.cells).map(text));

  if (!headings.length && !rows.length) return null;

  return (
    <figure className="my-10">
      <BlockTitle>{value.title}</BlockTitle>

      <div
        className="overflow-x-auto rounded-lg border border-line"
        tabIndex={0}
        role="region"
        aria-label={value.title || "Data table"}
      >
        <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
          {value.caption && (
            <caption className="sr-only">{value.caption}</caption>
          )}

          {/* Actual Sanity column headings */}
          {headings.length > 0 && (
            <thead>
              <tr className="bg-navy text-white">
                {headings.map((heading, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-4 py-3 font-semibold"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
          )}

          {/* Actual Sanity data rows */}
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-line">
                {row.map((cell, cellIndex) =>
                  headings.length > 0 && cellIndex === 0 ? (
                    <th
                      key={cellIndex}
                      scope="row"
                      className="px-4 py-3 font-medium text-ink text-sm sm:text-base"
                    >
                      {cell}
                    </th>
                  ) : (
                    <td key={cellIndex} className="px-4 py-3 text-muted text-sm sm:text-base">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {value.caption && (
        <figcaption className="mt-2 text-xs text-steel">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Checklist({ value }) {
  const items = list(value.items)
    .map((i) => (typeof i === "string" ? { text: i, checked: true } : i))
    .filter((i) => i?.text);
  if (!items.length) return null;
  return (
    <section className="my-10" aria-label={value.title || "Checklist"}>
      <BlockTitle>{value.title}</BlockTitle>
      <ul className="space-y-3">
        {items.map((i, idx) => (
          <li key={i._key || idx} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                i.checked === false
                  ? "border-ice-300 bg-white text-transparent"
                  : "border-royal bg-royal text-white"
              }`}
            >
              <Check className="h-3.5 w-3.5" />
            </span>
            <span className="text-[16px] leading-relaxed text-ink">
              {i.text}
              <span className="sr-only">
                {i.checked === false ? " (not done)" : " (done)"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProsCons({ value }) {
  const pros = list(value.pros).map(text).filter(Boolean);
  const cons = list(value.cons).map(text).filter(Boolean);
  if (!pros.length && !cons.length) return null;
  return (
    <section className="my-10" aria-label={value.title || "Pros and cons"}>
      <BlockTitle>{value.title}</BlockTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {pros.length > 0 && (
          <div className="rounded-xl border border-ice-200 bg-ice-100/70 p-5">
            <p className="flex items-center gap-2 font-serif text-lg text-royal">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-royal text-white">
                <Check className="h-3.5 w-3.5" />
              </span>
              {value.prosTitle || "Positives"}
            </p>
            <ul className="mt-3 space-y-2">
              {pros.map((t, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-[15px] leading-relaxed text-ink"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-royal" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
        {cons.length > 0 && (
          <div className="rounded-xl border border-rose-200/80 bg-rose-50 p-5">
            <p className="flex items-center gap-2 font-serif text-lg text-rose-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-700 text-white">
                <Cross className="h-3 w-3" />
              </span>
              {value.consTitle || "Considerations"}
            </p>
            <ul className="mt-3 space-y-2">
              {cons.map((t, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-[15px] leading-relaxed text-ink"
                >
                  <Cross className="mt-1 h-3.5 w-3.5 shrink-0 text-rose-700" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

const calloutStyles = {
  info: "border-royal/30 bg-ice-100/70 text-navy",
  note: "border-ice-300 bg-ice-50 text-navy",
  success: "border-emerald-300 bg-emerald-50 text-emerald-900",
  positive: "border-emerald-300 bg-emerald-50 text-emerald-900",
  warning: "border-amber-300 bg-amber-50 text-amber-900",
  caution: "border-amber-300 bg-amber-50 text-amber-900",
  risk: "border-rose-300 bg-rose-50 text-rose-900",
  danger: "border-rose-300 bg-rose-50 text-rose-900",
};

export function Callout({ value, renderRich }) {
  const style = calloutStyles[value.variant] || calloutStyles.info;
  const body = Array.isArray(value.body)
    ? renderRich(value.body)
    : text(value.body);
  if (!value.title && !body) return null;
  return (
    <aside
      className={`my-10 rounded-xl border-l-4 border p-5 sm:p-6 ${style}`}
      role="note"
    >
      {value.title && <p className="font-serif text-lg">{value.title}</p>}
      {body && (
        <div
          className={`${value.title ? "mt-2" : ""} text-[16px] leading-relaxed text-ink`}
        >
          {body}
        </div>
      )}
    </aside>
  );
}

export function Faq({ value, renderRich }) {
  const items = list(value.items).filter((i) => i?.question);
  if (!items.length) return null;
  return (
    <section
      className="my-10"
      aria-label={value.title || "Frequently asked questions"}
    >
      <BlockTitle>{value.title}</BlockTitle>
      <div className="divide-y divide-line rounded-xl border border-line">
        {items.map((i, idx) => (
          <details
            key={i._key || idx}
            className="group px-5 py-4 open:bg-ice-50"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-navy [&::-webkit-details-marker]:hidden">
              {i.question}
              <span
                className="text-xl leading-none text-royal transition group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <div className="mt-3 text-[16px] leading-relaxed text-muted">
              {Array.isArray(i.answer) ? renderRich(i.answer) : text(i.answer)}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function RelatedLinks({ value }) {
  const items = list(value.articles).filter((a) => a?.slug && a?.title);
  if (!items.length) return null;
  return (
    <aside
      className="my-10 border-t border-b border-line py-6"
      aria-label={value.title || "Related reading"}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-royal">
        {value.title || "Related reading"}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((a) => (
          <li key={a._id || a.slug}>
            <a
              href={`/articles/${a.slug}`}
              className="font-serif text-lg text-navy underline decoration-ice-300 underline-offset-4 transition hover:text-royal hover:decoration-royal"
            >
              {a.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function Divider() {
  return <hr className="my-12 border-line" />;
}

export function BodyImage({ value }) {
  const url = value?.asset?.url;
  if (!url) return null;
  const size = imageSize(value) || { width: 1600, height: 900 };
  const q = [];
  const dims = value.asset?.metadata?.dimensions;
  if (value.crop && dims) {
    const c = value.crop;
    q.push(
      `rect=${Math.round(c.left * dims.width)},${Math.round(c.top * dims.height)},${size.width},${size.height}`,
    );
  }
  q.push("w=1400", "auto=format");
  return (
    <figure className="my-10">
      <Image
        src={`${url}?${q.join("&")}`}
        alt={value.alt || ""}
        width={size.width}
        height={size.height}
        sizes="(min-width: 1024px) 760px, 100vw"
        className="h-auto w-full rounded-lg"
      />
      {value.caption && (
        <figcaption className="mt-2 text-xs leading-relaxed text-steel">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
