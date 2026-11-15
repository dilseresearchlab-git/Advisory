import Link from "next/link";
import { Button, Container } from "@/components/ui";
import { nav } from "@/data/site";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

// Global 404. Uses the shared Header/Footer from the root layout, the same
// grid-and-ice hero treatment as other pages, and the nav list from site config.
export default function NotFound() {
  const links = nav.filter((n) => n.href !== "/");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ice-100 to-white">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />

      <Container className="relative flex flex-col items-center py-20 text-center sm:py-28">
        {/* Oversized, low-contrast numeral as a quiet focal point */}
        <p
          className="select-none font-serif text-[7.5rem] font-medium leading-none tracking-tight text-ice-300/70 sm:text-[11rem]"
          aria-hidden="true"
        >
          404
        </p>

        <div className="-mt-6 sm:-mt-10">
          <p className="eyebrow">Error 404</p>
          <h1 className="mx-auto mt-4 max-w-xl text-3xl leading-tight sm:text-5xl">
            We couldn&apos;t find that page.
          </h1>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
            The link may be outdated or the address mistyped. Head back to the homepage or continue to one of our main sections.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/">Back to home</Button>
            <Button href="/contact" variant="outline">Contact us</Button>
          </div>
        </div>

        <nav aria-label="Main sections" className="mt-14 w-full max-w-xl border-t border-line pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel">Explore</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-steel-dark transition hover:text-royal">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
