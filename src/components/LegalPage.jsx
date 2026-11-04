import { PageHero, Section, Notice } from "./ui";

export default function LegalPage({ eyebrow, title, intro, sections }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title}>{intro}</PageHero>
      <Section>
        <div className="mx-auto max-w-3xl">
          <Notice title="Draft">
            This is template text for review. It must be reviewed and finalised by a qualified legal professional before publication.
          </Notice>
          <div className="mt-10 space-y-9">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="text-2xl">{s.h}</h2>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">
                  {s.p.map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
