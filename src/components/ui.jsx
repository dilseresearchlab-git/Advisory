import Link from "next/link";

export function Container({ children, className = "" }) {
  return <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({ children, className = "", tone = "white", id }) {
  const tones = {
    white: "bg-white",
    ice: "bg-ice-50",
    navy: "bg-midnight text-ice-100",
  };
  return (
    <section id={id} className={`${tones[tone]} py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, children, align = "left", light = false }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${light ? "!text-ice-300" : ""}`}>{eyebrow}</p>}
      <h2 className={`mt-3 text-3xl leading-tight sm:text-4xl ${light ? "!text-white" : ""}`}>{title}</h2>
      {children && <p className={`mt-4 leading-relaxed ${light ? "text-ice-300/90" : "text-muted"}`}>{children}</p>}
    </div>
  );
}

export function Button({ href, children, variant = "primary", className = "", ...rest }) {
  const styles = {
    primary: "bg-navy text-white hover:bg-royal",
    light: "bg-white text-navy hover:bg-ice-100",
    outline: "border border-ice-300 text-navy hover:border-royal hover:text-royal bg-white",
    ghost: "text-royal hover:text-navy",
  };
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition duration-200";
  if (href) {
    return (
      <Link href={href} className={`${base} ${styles[variant]} ${className}`} {...rest}>
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

export function PageHero({ eyebrow, title, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-ice-100 to-white">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
      <Container className="relative py-16 sm:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-5xl">{title}</h1>
        {children && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{children}</p>}
      </Container>
    </section>
  );
}

export function Notice({ children, title = "Illustrative content" }) {
  return (
    <div className="rounded-xl border border-ice-300 bg-ice-50 px-4 py-3 text-sm text-steel-dark">
      <span className="font-semibold text-navy">{title}. </span>
      {children}
    </div>
  );
}

export function CTABand() {
  return (
    <section className="bg-navy">
      <Container className="flex flex-col items-start justify-between gap-6 py-14 sm:flex-row sm:items-center">
        <div className="max-w-xl">
          <h2 className="text-3xl !text-white">Talk to our research team</h2>
          <p className="mt-3 text-ice-300/90">
            Tell us how you participate in markets and we will point you to the right research track.
          </p>
        </div>
        <Button href="/contact" variant="light">Send an enquiry</Button>
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
