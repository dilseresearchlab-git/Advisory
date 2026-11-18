import { Suspense } from "react";
import { PageHero, Section } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

import { generatePageMetadata } from "@/lib/seo/metadata";
import { pageSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

const contact = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || site.contact.phone;
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || site.contact.email;

export const metadata = generatePageMetadata({
  title: "Contact Our Stock Market Research Team",
  description:
    "Get in touch to enquire about stock market research, company analysis and proposed research offerings. Find our contact details and send a general enquiry.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/contact",
          name: "Contact Our Stock Market Research Team",
          description:
            "Contact us for general enquiries about stock market research, company analysis and proposed research offerings.",
        })}
      />
      <PageHero eyebrow="Contact" title="Start a conversation">
        Tell us about your approach to markets and we will suggest the most relevant research track.
      </PageHero>
      <Section tone="i" className="py-12 sm:py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Suspense fallback={<div className="card p-8 text-sm text-muted">Loading form…</div>}>
            <ContactForm />
          </Suspense>
          <aside className="space-y-6">
            <div className="card p-6 bg-midnight/5">
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
