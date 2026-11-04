import Link from "next/link";
import { PageHero, Section, SectionHeading, Notice, CTABand, Button } from "@/components/ui";
import { services } from "@/data/services";
import { plans } from "@/data/pricing";

export const metadata = { title: "Advisory Services" };

export default function AdvisoryPage() {
  return (
    <>
      <PageHero eyebrow="Advisory services" title="Services designed around the way you participate">
        Five proposed service tracks, each matched to a participant profile and a research package.
      </PageHero>

      <Section>
        <Notice title="Draft">
          These service descriptions are proposals. They will be offered only after applicable regulatory requirements are satisfied.
        </Notice>
        <div className="mt-10 space-y-6">
          {services.map((s, i) => {
            const plan = plans.find((p) => p.id === s.plan);
            return (
              <article key={s.id} className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <span className="font-serif text-3xl text-ice-300">0{i + 1}</span>
                  <h2 className="mt-2 text-3xl">{s.title}</h2>
                  <p className="mt-1 font-medium text-royal">{s.tagline}</p>
                  <p className="mt-4 leading-relaxed text-muted">{s.description}</p>
                  <Button href={`/contact?plan=${s.plan}`} className="mt-6">Register interest</Button>
                </div>
                <div className="rounded-xl bg-ice-50 p-5">
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-navy">What you receive</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-royal" />{d}</li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-line pt-4 text-xs text-steel">
                    Suggested package: <Link href="/pricing" className="font-semibold text-royal">{plan?.name}</Link>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="ice">
        <SectionHeading eyebrow="What advisory is not" title="Clear boundaries">
          Research is general in nature. We do not guarantee returns, manage money, or take custody of client funds.
        </SectionHeading>
      </Section>
      <CTABand />
    </>
  );
}
