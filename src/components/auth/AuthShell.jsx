import Link from "next/link";
import { regulatory } from "@/data/site";

const copy = {
  login: { title: "Welcome back.", text: "Sign in to continue to your Meridian account." },
  signup: { title: "Create your account.", text: "Register to get started with Meridian research, tools and learning." },
};

const points = [
  "Independent, evidence-led research",
  "Calculators and learning resources",
  "Clear risk disclosures, never return guarantees",
];

// Split layout: midnight brand panel + form column. Shared Header/Footer come from the root layout.
export default function AuthShell({ mode, children }) {
  const c = copy[mode];
  return (
    <section className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_1.1fr]">
      <div className="relative overflow-hidden bg-midnight px-5 py-12 text-ice-100 sm:px-10 lg:px-14 lg:py-20">
        <div className="grid-bg absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-royal/25 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-md lg:mx-0 lg:ml-auto lg:mr-6">
          <p className="eyebrow !text-ice-300">Meridian account</p>
          <h1 className="mt-4 text-4xl leading-[1.1] !text-white sm:text-5xl">{c.title}</h1>
          <p className="mt-4 leading-relaxed text-ice-300/90">{c.text}</p>
          <ul className="mt-8 hidden space-y-3 text-sm text-ice-200/90 sm:block">
            {points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-soft" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-start justify-center bg-white px-5 py-12 sm:px-10 lg:items-center lg:py-20">
        <div className="w-full max-w-md">
          <div className="mb-8 grid grid-cols-2 rounded-full border border-line bg-ice-50 p-1 text-sm" role="tablist" aria-label="Account">
            {[
              ["login", "/login", "Sign in"],
              ["signup", "/signup", "Create account"],
            ].map(([m, href, label]) => (
              <Link
                key={m}
                href={href}
                role="tab"
                aria-selected={mode === m}
                className={`rounded-full px-4 py-2 text-center transition ${mode === m ? "bg-navy font-medium text-white" : "text-steel-dark hover:text-navy"}`}
              >
                {label}
              </Link>
            ))}
          </div>
          {children}
          <p className="mt-8 text-xs leading-relaxed text-steel">
            {regulatory.statusLine} An account does not create an advisory relationship.
          </p>
        </div>
      </div>
    </section>
  );
}
