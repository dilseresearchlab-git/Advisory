// ─────────────────────────────────────────────────────────────
// PRICING — PROPOSED DRAFT. Edit freely.
// All prices are placeholders requiring business and regulatory
// approval before publication. Prices exclude GST (shown as a note).
// `monthly` / `annual` are in INR. Annual is billed once per year.
// ─────────────────────────────────────────────────────────────

export const pricingNote =
  "Draft pricing for internal review. Packages are not available for purchase and will only be activated after applicable regulatory requirements are satisfied.";

export const plans = [
  {
    id: "basic",
    name: "Basic",
    audience: "New investors building a foundation",
    summary: "Introductory research and market context to help you learn how to read the market.",
    monthly: 499,
    annual: 4990,
    recommended: false,
    includes: [
      "Weekly market perspective note",
      "Monthly sector snapshot",
      "Access to explainer library",
      "Quarterly results primers (select companies)",
    ],
    coverage: "Broad-market themes and large-cap coverage",
    limitations: [
      "No stock-specific research reports",
      "No trading-oriented content",
      "No individual portfolio review",
    ],
  },
  {
    id: "investor",
    name: "Investor",
    audience: "Long-term investors seeking fundamental analysis",
    summary: "In-depth company research with a multi-year view, built around business quality and valuation.",
    monthly: 1499,
    annual: 14990,
    recommended: true,
    includes: [
      "Everything in Basic",
      "Detailed company research reports",
      "Valuation frameworks and scenario ranges",
      "Quarterly thesis reviews on covered companies",
      "Annual sector outlook",
    ],
    coverage: "Large and mid-cap companies across major sectors",
    limitations: [
      "No short-term trading ideas",
      "Research is general, not personalised to your goals",
    ],
  },
  {
    id: "active-trader",
    name: "Active Trader",
    audience: "Swing and positional traders",
    summary: "Structured, rules-based market insights with defined levels, risk context and position-sizing guidance.",
    monthly: 2499,
    annual: 24990,
    recommended: false,
    includes: [
      "Everything in Basic",
      "Weekly technical and price-structure outlook",
      "Defined risk/reward frameworks on study setups",
      "Position-sizing worksheets",
      "Post-event market commentary",
    ],
    coverage: "Liquid large and mid-cap stocks and major indices",
    limitations: [
      "No intraday or tick-level coverage",
      "No assurance of outcomes; trading involves substantial risk of loss",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    audience: "Experienced participants who need breadth and depth",
    summary: "Combined fundamental and trading-oriented research with broader coverage and advanced analytics.",
    monthly: 4999,
    annual: 49990,
    recommended: false,
    includes: [
      "Everything in Investor and Active Trader",
      "Expanded coverage universe",
      "Quantitative screens and factor commentary",
      "Monthly analyst briefing (group session)",
      "Priority research requests (subject to scope)",
    ],
    coverage: "Wide coverage including select small-caps and derivatives-context notes",
    limitations: [
      "Group format only; no one-to-one portfolio advice",
      "Research requests are scoped at our discretion",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    audience: "Serious participants seeking the highest level of access",
    summary: "Our most comprehensive research offering with direct analyst access and enhanced scope.",
    monthly: 9999,
    annual: 99990,
    recommended: false,
    includes: [
      "Everything in Professional",
      "Direct analyst Q&A sessions (scheduled)",
      "Custom thematic research briefs",
      "Early access to new research products",
      "Annual strategy review session",
    ],
    coverage: "Full coverage universe plus bespoke thematic work",
    limitations: [
      "Any personalised advisory is subject to regulatory approval",
      "Limited seats to preserve service quality",
    ],
  },
];

export const comparisonRows = [
  { label: "Market perspectives", values: ["Weekly", "Weekly", "Weekly", "Weekly", "Weekly"] },
  { label: "Company research reports", values: ["—", "Yes", "—", "Yes", "Yes"] },
  { label: "Valuation frameworks", values: ["—", "Yes", "—", "Yes", "Yes"] },
  { label: "Price-structure outlook", values: ["—", "—", "Yes", "Yes", "Yes"] },
  { label: "Risk/reward & sizing worksheets", values: ["—", "—", "Yes", "Yes", "Yes"] },
  { label: "Quantitative screens", values: ["—", "—", "—", "Yes", "Yes"] },
  { label: "Analyst sessions", values: ["—", "—", "—", "Group", "Direct"] },
  { label: "Custom thematic briefs", values: ["—", "—", "—", "—", "Yes"] },
];

export const faqs = [
  {
    q: "Are these packages available now?",
    a: "No. These are proposed drafts. Packages will be offered only after the necessary regulatory registrations are in place and our legal review is complete.",
  },
  {
    q: "Do you promise returns?",
    a: "Never. Markets carry risk, including loss of capital. Nothing we publish is a guarantee or a forecast of performance.",
  },
  {
    q: "Is the research personalised?",
    a: "Research in all packages is general in nature and does not consider your individual circumstances unless and until personalised services are legally permitted and explicitly offered.",
  },
  {
    q: "Which package should I choose?",
    a: "Pick based on how you participate in markets: Investor suits long-term holders; Active Trader suits swing and positional traders. Use the enquiry form and we will help you decide.",
  },
];
