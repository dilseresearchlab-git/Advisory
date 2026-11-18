import LegalPage from "@/components/LegalPage";
import { site } from "@/data/site";

import { generatePageMetadata } from "@/lib/seo/metadata";
import { pageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generatePageMetadata({
  title: "Terms of Use | Website Terms & Conditions",
  description:
    "Read the terms governing access to and use of Meridian's website, research content, educational resources, financial calculators and enquiry facilities.",
  path: "/terms",
});

export default function Terms() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/terms",
          name: "Terms of Use | Website Terms & Conditions",
          description:
            "Terms governing the use of Meridian's website, including research content, educational resources, financial calculators, intellectual property and enquiries.",
        })}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />

      <LegalPage
        eyebrow="Legal & website policies"
        title="Terms of use"
        intro={`These terms govern your access to and use of the ${site.fullName} website. By accessing or using this website, you acknowledge that you have read and understood these terms. Please do not use the website if you do not agree with them.`}
        sections={[
          {
            h: "1. Acceptance of terms",
            p: [
              "These Terms of Use apply to visitors and users who access or interact with this website, its pages, tools, articles, research illustrations and enquiry facilities.",
              "By continuing to use the website, you agree to comply with these terms and any additional notices or conditions presented alongside particular content or features.",
              "If you are accessing the website on behalf of another person or organisation, you are responsible for ensuring that your use is consistent with these terms.",
            ],
          },
          {
            h: "2. Informational and educational purpose",
            p: [
              "The website provides general information and educational material relating to financial markets, company fundamentals, financial statements, valuation concepts, investment terminology and research methodology.",
              "Website content is not personalised investment advice, a recommendation to buy, sell or hold any security, or a direction to undertake any investment or trading activity.",
              "The information is not tailored to your financial circumstances, investment objectives, risk tolerance or individual requirements. You should exercise independent judgement and seek appropriately qualified professional advice where necessary.",
              "Accessing this website or communicating with us does not, by itself, establish an advisory, fiduciary, portfolio-management or client relationship.",
            ],
          },
          {
            h: "3. Regulatory status and proposed services",
            p: [
              "The regulatory status of the business is described in the Disclosures section of this website. Nothing in these terms should be interpreted as representing that the business holds a registration, authorisation or approval that has not been obtained.",
              "Any research or advisory packages, service descriptions, pricing information or proposed deliverables displayed on the website are provided for informational purposes and may represent planned offerings rather than currently available services.",
              "No regulated service will be offered or commenced unless and until the registrations, approvals and other applicable regulatory requirements have been satisfied.",
              "The publication of a proposed package, price or service description does not create an obligation to provide that service or constitute an offer capable of acceptance.",
            ],
          },
          {
            h: "4. Research content and market information",
            p: [
              "Articles, company references, sample reports, charts, financial ratios and other research material are provided to explain analytical concepts and research approaches.",
              "Some material may use actual company references, historical information or hypothetical examples. Unless the relevant source, reporting period and data date are stated, you should not assume that a figure is current, verified or representative of live market conditions.",
              "Information may become outdated, incomplete or inaccurate as market conditions and company disclosures change. You should independently verify material information before relying on it.",
              "Nothing in the research material guarantees the accuracy of a particular outcome, future performance or investment result.",
            ],
          },
          {
            h: "5. Calculators and website tools",
            p: [
              "The website may provide calculators, formulas and other browser-based tools to help users explore numerical and financial concepts.",
              "Outputs are generated from the inputs and assumptions supplied by the user. They are mathematical illustrations and should not be treated as forecasts, trading signals, investment recommendations or guaranteed outcomes.",
              "Actual results may differ due to taxes, charges, brokerage, slippage, inflation, market movements and other factors that may not be included in a calculation.",
              "You are responsible for checking your inputs and understanding the limitations of each tool before using its output.",
            ],
          },
          {
            h: "6. Acceptable use",
            p: [
              "You agree to use the website lawfully and in a manner that does not interfere with its operation, security, availability or use by others.",
              "You must not attempt to gain unauthorised access to the website, its systems or restricted areas, introduce malicious code, disrupt its operation or misuse any contact or enquiry facility.",
              "You must not use automated methods to extract, scrape, copy or systematically collect website content in a manner that violates applicable law or the rights of the website owner or third parties.",
              "You must not reproduce, republish, distribute or commercially exploit website material in a misleading, unlawful or unauthorised manner.",
            ],
          },
          {
            h: "7. Intellectual property",
            p: [
              `Unless otherwise stated, website content, original written material, visual designs, graphics, branding, research illustrations and other original materials are owned by or used with permission by ${site.fullName}.`,
              "You may access and use the material for your personal, non-commercial reference, provided that you do not remove relevant ownership notices or misrepresent the source.",
              "You must obtain prior written permission before reproducing, modifying, distributing, publishing or commercially exploiting protected material, except where permitted by applicable law.",
              "Third-party names, logos, trademarks and materials remain the property of their respective owners. Their appearance on this website does not imply an affiliation or endorsement.",
            ],
          },
          {
            h: "8. Enquiries and communications",
            p: [
              "The website may allow you to submit general enquiries or contact requests through forms, email, telephone or other communication channels.",
              "Submitting an enquiry does not create an advisory or client relationship, guarantee acceptance of a request or constitute an agreement to provide a service.",
              "You should not submit passwords, account credentials, payment information, sensitive personal information or confidential financial details through general enquiry forms.",
              "You are responsible for ensuring that the contact information you provide is accurate and that you are authorised to share any information included in your enquiry.",
            ],
          },
          {
            h: "9. Third-party websites and services",
            p: [
              "The website may contain links to third-party websites, publications, data sources or services for convenience and reference.",
              "These external resources are not controlled by us. We do not necessarily endorse their content, products, services, policies or opinions.",
              "Your use of third-party websites and services is subject to their own terms and privacy policies. You should review those documents before interacting with them.",
            ],
          },
          {
            h: "10. Website availability and changes",
            p: [
              "We may modify, suspend, restrict or discontinue any part of the website or its content at any time, including for maintenance, updates, security or operational reasons.",
              "We do not guarantee uninterrupted availability, compatibility with every device or browser, or that the website will always be free from errors or interruptions.",
              "We may revise these terms as the website, its features or business activities evolve. Updated terms will be published on this page and will apply from the date they are made available, subject to applicable law.",
            ],
          },
          {
            h: "11. Limitation of liability",
            p: [
              "To the extent permitted by applicable law, we will not be responsible for losses arising from reliance on general information, educational material, research illustrations, calculator outputs or other content published on this website.",
              "We do not warrant that website content will be complete, accurate, current, uninterrupted or suitable for a particular purpose.",
              "Nothing in these terms excludes or limits liability where such exclusion or limitation is prohibited by applicable law. These terms do not affect any rights or remedies that cannot lawfully be excluded.",
              "You remain responsible for your use of the website, your interpretation of its content and any decisions you make based on information accessed through it.",
            ],
          },
          {
            h: "12. Governing law and jurisdiction",
            p: [
              "These terms are intended to be governed by the laws of India, subject to applicable statutory and regulatory requirements.",
              "Any dispute arising in connection with the use of this website will be subject to the jurisdiction of the competent courts in India, as determined by applicable law.",
            ],
          },
          {
            h: "13. Contact and questions",
            p: [
              `For questions about these terms or the use of this website, you may contact ${site.fullName} through the contact details published on the Contact page.`,
              "Please do not include confidential financial information, passwords or account credentials in general correspondence.",
            ],
          },
        ]}
      />
    </>
  );
}
