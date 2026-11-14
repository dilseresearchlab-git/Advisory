import { Suspense } from "react";
import { PageHero, Section } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

const contact = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || site.contact.phone;
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || site.contact.email;

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Start a conversation">
        Tell us about your approach to markets and we will suggest the most relevant research track.
      </PageHero>
      <Section tone="ice" className="py-12 sm:py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Suspense fallback={<div className="card p-8 text-sm text-muted">Loading form…</div>}>
            <ContactForm />
          </Suspense>
          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="text-xl">Contact details</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div><dt className="text-xs text-steel">Email</dt><dd className="text-ink">{email}</dd></div>
                <div><dt className="text-xs text-steel">Phone</dt><dd className="text-ink">{contact}</dd></div>
                <div><dt className="text-xs text-steel">Address</dt><dd className="text-ink">{site.contact.address}</dd></div>
                <div><dt className="text-xs text-steel">Hours</dt><dd className="text-ink">{site.contact.hours}</dd></div>
              </dl>
            </div>
            <p className="text-xs leading-relaxed text-steel">
              Contact details above are placeholders. Do not send confidential financial information or account details through this form.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
