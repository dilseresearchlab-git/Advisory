import Link from "next/link";
import Logo from "./Logo";
import { site, footerLinks, regulatory } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-midnight text-ice-200">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ice-300/80">{site.tagline}.</p>
            <p className="mt-4 text-xs text-ice-300/60">{site.contact.email}</p>
            <p className="text-xs text-ice-300/60">{site.contact.phone}</p>
          </div>
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ice-300">{group}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ice-200/80 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-ice-300/70">
            <strong className="font-semibold text-ice-200">Important: </strong>
            {regulatory.statusLine} Investments in securities markets are subject to market risks, including the possible loss of principal.
            Past performance does not indicate future results. Research shown on this website is illustrative.
          </p>
          <p className="mt-4 text-xs text-ice-300/50">
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
