import LegalPage from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="How this website handles information."
      sections={[
        { h: "Information we collect", p: ["This website has no server, database or accounts. Calculator inputs stay in your browser and are not transmitted or stored.", "The enquiry form opens your email application with a pre-filled message. We receive that information only if you choose to send the email."] },
        { h: "How we use enquiry information", p: ["Details you send are used only to respond to your enquiry. [Placeholder: add retention period and legal basis.]"] },
        { h: "Cookies and analytics", p: ["[Placeholder] If analytics or cookies are added in future, this section must be updated and any required consent mechanism implemented."] },
        { h: "Your rights", p: ["You may request access to, correction of, or deletion of personal information you have sent us, in line with applicable Indian data-protection law. [Placeholder: confirm with legal counsel.]"] },
        { h: "Contact", p: [`Privacy questions: ${site.contact.email}`] },
      ]}
    />
  );
}
