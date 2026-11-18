
import LegalPage from "@/components/LegalPage";
import { site } from "@/data/site";

import { generatePageMetadata } from "@/lib/seo/metadata";
import { pageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generatePageMetadata({
  title: "Privacy Policy | Personal Information & Data Use",
  description:
    "Understand how Meridian handles website enquiries, browser-based calculator inputs, technical information and personal data, including your privacy choices.",
  path: "/privacy",
});

export default function Privacy() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/privacy",
          name: "Privacy Policy | Personal Information & Data Use",
          description:
            "Learn how Meridian handles information submitted through website enquiries, browser-based tools and other interactions with the website.",
        })}
      />
      <JsonLd
  data={breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ])}
/>

      <LegalPage
        eyebrow="Legal & data protection"
        title="Privacy policy"
        intro={`This Privacy Policy explains how ${site.fullName} handles information when you visit or interact with this website. We aim to collect only the information needed to respond to enquiries and operate the website's features.`}
        sections={[
          {
            h: "1. Scope of this policy",
            p: [
              "This policy applies to information associated with your use of this website, including general enquiries, contact communications and browser-based tools.",
              "It should be read together with our Terms of Use and Disclosures. If a particular service or feature has a separate privacy notice, that notice will also apply to the relevant interaction.",
            ],
          },
          {
            h: "2. Information you provide",
            p: [
              "You may choose to provide personal information when contacting us. This may include your name, email address, phone number and the details you include in an enquiry.",
              "The website's current enquiry form opens your device's default email application with a pre-filled message. The information entered into the form is transferred to that email application so that you can review and send it.",
              "The form does not itself submit your message to a website database. We receive the information only if you choose to send the email.",
              "Please do not include passwords, account credentials, payment information, identity documents or confidential financial information in general enquiries.",
            ],
          },
          {
            h: "3. Calculator inputs and browser-based tools",
            p: [
              "The financial calculators and numerical tools on this website process the values you enter within your browser.",
              "Calculator inputs and calculated outputs are not intentionally transmitted to or stored by the website's calculator functionality.",
              "You should still exercise care when using a shared or public device, as information displayed in a browser may be visible to other people using that device.",
            ],
          },
          {
            h: "4. How enquiry information is used",
            p: [
              "If you send us an email, we may use the information in that communication to understand your request, respond to your enquiry and maintain relevant business correspondence.",
              "We do not use general enquiry information to create an investment profile or provide personalised investment recommendations merely because you have contacted us.",
              "We do not sell personal information submitted through general enquiries.",
              "If you later enter into a separate service arrangement with us, additional information-handling terms may apply and will be communicated where appropriate.",
            ],
          },
          {
            h: "5. Hosting, technical information and service providers",
            p: [
              "Although this website does not currently use its own application database or account system, the hosting infrastructure and technical service providers used to deliver the website may process limited technical information.",
              "Depending on the hosting and infrastructure configuration, this may include IP addresses, browser and device information, access timestamps, requested pages and technical error records.",
              "Email providers may process and retain messages that you choose to send to us. Their handling of information is also subject to their own privacy policies and terms.",
              "We do not control the privacy practices of independent third-party providers. You should review their policies where relevant.",
            ],
          },
          {
            h: "6. Cookies and similar technologies",
            p: [
              "Cookies and similar technologies may be used by websites to support essential functionality, security, performance measurement or analytics.",
              "The use of such technologies on this website depends on the services and configuration active at the time of your visit. Your browser may provide controls to view, restrict or delete cookies.",
              "If analytics, advertising or other non-essential tracking technologies are introduced, this policy and any applicable consent or preference mechanisms will be updated as required before or when those technologies are used.",
            ],
          },
          {
            h: "7. Sharing and disclosure of information",
            p: [
              "We do not sell personal information submitted through general website enquiries.",
              "Information may be processed by service providers involved in delivering website hosting, email and related technical services, to the extent necessary for those services.",
              "Information may also be disclosed where required by applicable law, a valid legal process or a lawful request from a competent authority, or where necessary to protect legal rights and address security concerns.",
            ],
          },
          {
            h: "8. Data retention and security",
            p: [
              "Enquiry emails may be retained for as long as reasonably necessary to respond to the request, maintain relevant correspondence, meet applicable legal requirements or address legitimate business needs.",
              "The website does not currently provide a user account or application database in which calculator inputs or enquiry form submissions are stored.",
              "We take reasonable steps appropriate to the website's current operations to protect information under our control. However, no method of electronic transmission or storage can be guaranteed to be completely secure.",
              "Information held by email, hosting or other third-party providers may be subject to their own retention and security practices.",
            ],
          },
          {
            h: "9. Your privacy choices and requests",
            p: [
              "You may choose not to submit personal information through the website. Some communication features may not be usable without providing basic contact details.",
              "Subject to applicable law, you may contact us to request access to, correction of or deletion of personal information that you have shared with us.",
              "We may need to verify your identity and understand the nature of your request before acting on it. Certain information may need to be retained where required or permitted by law.",
              "You may also manage cookies through your browser settings, subject to the effect this may have on website functionality.",
            ],
          },
          {
            h: "10. Children's privacy",
            p: [
              "This website is intended for a general audience interested in financial markets and research. It is not designed to knowingly collect personal information from children.",
              "If you believe that a child has provided personal information to us, please contact us so that the matter can be reviewed and appropriate action considered.",
            ],
          },
          {
            h: "11. Changes to this Privacy Policy",
            p: [
              "This policy may be updated when website features, business operations, service providers or applicable legal requirements change.",
              "The revised version will be published on this page. Visitors should review this page periodically to remain informed about how information is handled.",
            ],
          },
          {
            h: "12. Contact for privacy enquiries",
            p: [
              `For questions, concerns or requests relating to this Privacy Policy or personal information shared with us, contact ${site.fullName} at ${site.contact.email}.`,
              "Please avoid including passwords, account credentials or other sensitive information in your privacy enquiry.",
            ],
          },
        ]}
      />
    </>
  );
}
