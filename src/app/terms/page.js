import LegalPage from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata = { title: "Terms of Use" };

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of use"
      intro="Terms governing use of this website."
      sections={[
        { h: "Acceptance", p: [`By using this website you agree to these terms. If you do not agree, please do not use it.`] },
        { h: "Informational use only", p: ["All content is for general information and education. It is not investment advice, and no advisory relationship is created by using this website or sending an enquiry."] },
        { h: "No offer of services", p: ["Packages and prices shown are proposed drafts and are not offers. Services will be made available only after applicable regulatory requirements are satisfied."] },
        { h: "Intellectual property", p: [`Content is owned by ${site.fullName} unless stated otherwise. You may not reproduce it for commercial use without written permission.`] },
        { h: "Limitation of liability", p: ["To the extent permitted by law, we are not liable for losses arising from reliance on this website's content. [Placeholder: finalise with legal counsel.]"] },
        { h: "Governing law", p: ["[Placeholder] Governing law and jurisdiction to be specified by legal counsel."] },
      ]}
    />
  );
}
