
import LegalPage from "@/components/LegalPage";
import { regulatory } from "@/data/site";

import { generatePageMetadata } from "@/lib/seo/metadata";
import { pageSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = generatePageMetadata({
  title: "Disclosures, Risk Warning & Regulatory Status",
  description:
    "Read Meridian's regulatory status, investment risk warnings, research limitations, illustrative-content disclosures and important information about using this website.",
  path: "/disclosures",
});

export default function Disclosures() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/disclosures",
          name: "Disclosures, Risk Warning & Regulatory Status",
          description:
            "Important information about Meridian's regulatory status, research content, investment risks, calculator limitations and website use.",
        })}
      />

      <LegalPage
        eyebrow="Legal & important information"
        title="Disclosures & risk warning"
        intro="This page explains the scope and limitations of the information published by Meridian Research & Advisory. Please read these disclosures carefully before using or relying on any material on this website."

        sections={[
          {
            h: "1. Regulatory status",
            p: [
              regulatory.statusLine,
              "Meridian does not represent that it is registered, authorised, approved or endorsed by the Securities and Exchange Board of India (SEBI) or any other regulatory authority for activities requiring such registration or authorisation.",
              "No registration number is displayed because no applicable registration has been issued to the business at this time. Any proposed research or advisory offerings are subject to obtaining the registrations, approvals and permissions required for the relevant activities.",
              "The publication of information on this website should not be interpreted as an offer to provide a regulated investment advisory or research analyst service.",
            ],
          },
          {
            h: "2. Informational and educational purpose",
            p: [
              "Content on this website is intended for general informational and educational purposes. It may discuss financial concepts, company fundamentals, financial statements, valuation methods, market developments and investment-related terminology.",
              "The material is not prepared with reference to the specific investment objectives, financial circumstances, risk tolerance or needs of any individual visitor.",
              "Nothing on this website should be treated as personalised investment advice, a recommendation to buy, sell or hold a security, or a direction to enter into any particular trade or investment.",
            ],
          },
          {
            h: "3. Investment and trading risk",
            p: [
              "Investing in securities and participating in financial markets involves risk. The value of investments can rise or fall, and you may lose part or all of the capital invested.",
              "Trading in derivatives, including futures and options, can involve substantial losses, leverage, rapid price movements, liquidity constraints and the possibility of losing more than initially expected, depending on the product and position.",
              "Market volatility, economic developments, company-specific events, liquidity conditions and other factors can materially affect investment and trading outcomes.",
              "Past performance, historical returns, projections and hypothetical examples are not reliable indicators of future results. No return, profit, capital protection or particular outcome is guaranteed.",
              "You are responsible for evaluating the risks of any financial decision and should seek advice from an appropriately qualified professional where necessary.",
            ],
          },
          {
            h: "4. Research material and illustrative examples",
            p: [
              "This website may contain company names, sector references, financial figures, ratios, charts, sample research cards and other analytical illustrations. Some examples may refer to actual listed companies or publicly available information; others may use hypothetical or illustrative figures.",
              "Unless a specific source, reporting period and data date are clearly stated, figures and examples should not be assumed to represent current, verified or real-time market information.",
              "Sample research material is provided to demonstrate analytical concepts and presentation methods. It is not a current recommendation, a promise of future research coverage or a representation of expected investment performance.",
              "References to a company, security, sector or financial instrument do not constitute an endorsement or a recommendation to transact in it.",
            ],
          },
          {
            h: "5. Market data and information limitations",
            p: [
              "Information may be obtained from company disclosures, public filings, exchange publications, third-party sources and other material believed to be relevant.",
              "Although reasonable care may be taken in presenting information, Meridian does not warrant that all information is complete, accurate, up to date or free from errors.",
              "Market prices, financial data, corporate disclosures and other information may change after publication. Unless expressly stated, website content should not be treated as live market data.",
              "Visitors should independently verify important information against relevant primary sources before making financial decisions.",
            ],
          },
          {
            h: "6. Calculators, formulas and numerical tools",
            p: [
              "Calculators and other tools on this website generate mathematical outputs based on the inputs and assumptions supplied by the user.",
              "Their outputs are illustrative calculations, not forecasts, investment recommendations, trading signals or guarantees of actual returns.",
              "Actual outcomes may differ due to taxes, fees, brokerage, slippage, inflation, market movements, product-specific conditions and other factors that may not be included in a calculation.",
              "Users are responsible for checking the assumptions, inputs and limitations of each tool before relying on its output.",
            ],
          },
          {
            h: "7. Conflicts of interest",
            p: [
              "Meridian recognises that financial interests, commercial relationships and other circumstances can create actual or potential conflicts of interest in research and market-related communication.",
              "Where applicable, relevant interests or conflicts associated with published research will be disclosed in the relevant material in accordance with the requirements applicable to the activity.",
              "Visitors should not assume that the absence of a specific disclosure means that no person or entity associated with a subject has any financial or other interest in it.",
            ],
          },
          {
            h: "8. Third-party websites and external information",
            p: [
              "This website may refer to or link to external websites, publications, data providers and other third-party resources for additional information.",
              "Such links are provided for convenience and do not necessarily represent an endorsement of the external source, its views, products or services.",
              "Meridian does not control external websites and is not responsible for their content, availability, accuracy or privacy practices. Visitors should review the applicable terms and policies of those websites.",
            ],
          },
          {
            h: "9. Independent judgement and responsibility",
            p: [
              "You should use independent judgement when reviewing information published on this website. No article, example, calculation or research illustration should be the sole basis for an investment or trading decision.",
              "You are responsible for your own financial decisions, including assessing suitability, verifying information and understanding the risks involved.",
              "Nothing on this website creates an advisory, fiduciary, portfolio-management or client relationship between Meridian and a visitor merely because the visitor accesses or reads the material.",
            ],
          },
          {
            h: "10. Changes to these disclosures",
            p: [
              "These disclosures may be updated as the website, its content and the business's activities evolve. The version published on this page should be read together with any additional disclosures presented alongside specific content or services.",
              "Where a particular research item, tool or offering has its own limitations or disclosures, those specific disclosures should also be considered.",
            ],
          },
        ]}
      />
    </>
  );
}
