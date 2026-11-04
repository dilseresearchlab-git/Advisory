import LegalPage from "@/components/LegalPage";
import { site, regulatory } from "@/data/site";

export const metadata = { title: "Disclosures" };

export default function Disclosures() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Disclosures & risk warning"
      intro="Please read these disclosures before relying on any content on this website."
      sections={[
        { h: "Regulatory status", p: [regulatory.statusLine, "No registration number is displayed because none has been issued. Nothing on this website should be read as implying regulatory approval, authorisation or affiliation."] },
        { h: "No investment advice", p: ["Content is provided for general information and education. It does not take into account your objectives, financial situation or needs, and is not a recommendation to buy, sell or hold any security."] },
        { h: "Risk warning", p: ["Investing and trading in securities involve substantial risk, including the loss of some or all capital. Past performance does not indicate future results. No returns are guaranteed."] },
        { h: "Illustrative content", p: ["Company names, figures, charts and research samples on this website are fictional placeholders. Calculators produce mathematical outputs from your inputs and are not forecasts."] },
        { h: "Conflicts of interest", p: [`[Placeholder] ${site.fullName} will disclose any holdings or interests in securities discussed in published research once research services are offered.`] },
      ]}
    />
  );
}
