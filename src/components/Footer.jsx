import Link from "next/link";
import Logo from "./Logo";
import { Mail, PhoneCall } from "lucide-react";
import { site, footerLinks, regulatory } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-midnight text-ice-200">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ice-300/80">
              {site.tagline}.
            </p>
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2.5">
                <Mail
                  size={14}
                  className="shrink-0 text-ice-300/70 sm:size-3.5"
                />
                <p className="text-xs text-ice-300/60">{site.contact.email}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <PhoneCall
                  size={14}
                  className="shrink-0 text-ice-300/70 sm:size-3.5"
                />
                <p className="text-xs text-ice-300/60">{site.contact.phone}</p>
              </div>
            </div>
          </div>
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-sans text-xs font-semibold uppercase underline underline-offset-5 tracking-[0.16em] text-slate-400">
                {group}
              </h3>
              <ul className="mt-4 space-y-1 sm:space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-xs sm:text-sm text-ice-50/75 transition-all duration-150 hover:text-white hover:ml-1"
                    >
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
            {regulatory.statusLine} Investments in securities markets are
            subject to market risks, including the possible loss of principal.
            Past performance does not indicate future results. Research shown on
            this website is illustrative.
          </p>
          <p className="mt-4 text-xs text-ice-300/50">
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
