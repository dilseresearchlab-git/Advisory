import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({ children, className = "", tone = "white", id }) {
  const tones = {
    white: "bg-white",
    ice: "bg-ice-50",
    navy: "bg-midnight text-ice-100",
  };
  return (
    <section
      id={id}
      className={`${tones[tone]} py-12 sm:py-18 md:py-24 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  light = false,
  className = "",
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className={`eyebrow ${light ? "text-ice-300!" : ""}`}>{eyebrow}</p>
      )}
      <h2
        className={`mt-3 text-2xl leading-tight sm:text-3xl lg:text-4xl ${light ? "text-white!" : ""} ${className}`}
      >
        {title}
      </h2>
      {children && (
        <p
          className={`mt-3 md:mt-4 text-sm sm:text-base leading-relaxed ${light ? "text-ice-300/90" : "text-muted"}`}
        >
          {children}
        </p>
      )}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}) {
  const styles = {
    primary: "bg-navy text-white hover:bg-royal",
    light: "bg-white text-navy hover:bg-ice-100",
    outline:
      "border border-ice-300 text-navy hover:border-royal hover:text-royal bg-white",
    ghost: "text-royal hover:text-navy",
  };
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium transition duration-200";
  if (href) {
    return (
      <Link
        href={href}
        className={`${base} ${styles[variant]} ${className}`}
        {...rest}
      >
        {children}
      </Link>
    );
  }
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

// export function PageHero({ eyebrow, title, children }) {
//   return (
//     <section className="relative overflow-hidden border-b border-line bg-linear-to-b from-ice-100 to-white">
//       <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
//       <Container className="relative py-12 sm:py-16 lg:py-24">
//         <p className="eyebrow">{eyebrow}</p>
//         <h1 className="mt-2 md:mt-4 max-w-3xl text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">
//           {title}
//         </h1>
//         {children && (
//           <p className="mt-3 md:mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-muted">
//             {children}
//           </p>
//         )}
//       </Container>
//     </section>
//   );
// }

export function PageHero({
  eyebrow,
  title,
  children,
  imageSrc,
  imageAlt = "",
}) {
  const hasImage = Boolean(imageSrc);

  return (
    <section className="relative overflow-hidden border-b border-line bg-linear-to-b from-ice-100 to-white">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        {hasImage ? (
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="mt-2 md:mt-4 max-w-3xl text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              {children && (
                <p className="mt-3 md:mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-muted">
                  {children}
                </p>
              )}
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-xl p-3 sm:p-4">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  aria-hidden={imageAlt === "" ? "true" : undefined}
                  className="h-auto w-full rounded-lg object-contain"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-2 md:mt-4 max-w-3xl text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {children && (
              <p className="mt-3 md:mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-muted">
                {children}
              </p>
            )}
          </>
        )}
      </Container>
    </section>
  );
}

export function Notice({ children, title = "Illustrative content" }) {
  return (
    <div className="rounded-xl border border-ice-300 bg-ice-50 px-4 py-3 text-sm text-steel-dark mt-2 md:mt-4">
      <span className="font-semibold text-navy">{title}. </span>
      {children}
    </div>
  );
}

export function CTABand() {
  return (
    <section className="border-t border-line bg-ice-50/50">
      <Container className="py-10 sm:py-12">
        {/* Compact Banner Card */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-blue-100 bg-linear-to-r from-blue-50/80 via-indigo-50/30 to-blue-50/80 px-6 py-6 shadow-xs sm:flex-row sm:px-8">
          {/* Left Side: Icon, Title & Subtitle */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            {/* Trend/Graph Icon */}
            <div className="hidden shrink-0 rounded-xl bg-white p-3.5 shadow-sm sm:flex">
              <svg
                className="h-6 w-6 text-royal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-midnight sm:text-xl">
                Explore our research and advisory services
              </h2>
              <p className="mt-1 text-sm text-muted">
                Get deeper insights and expert guidance for your investment
                journey.
              </p>
            </div>
          </div>

          {/* Right Side: Action Button */}
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-royal shadow-sm"
          >
            Send an Enquiry <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function formatINR(n, digits = 0) {
  if (!isFinite(n)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(n);
}
