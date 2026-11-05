// Advisory service tracks, organised by customer need.
// Descriptions are draft and subject to regulatory approval.


export const services = [
  {
    id: "beginner",
    title: "Beginner Investors",
    focus: "Foundational research",
    horizon: "Foundational",
    tagline: "Build market understanding before committing capital",
    description:
      "Accessible market perspectives and foundational company research designed to help newer investors understand businesses, market behaviour and essential financial concepts.",
    bestFor:
      "New investors seeking structured market understanding and a foundation for evaluating investment opportunities.",
    deliverables: [
      "Weekly market notes",
      "Sector snapshots",
      "Financial concept explainers",
      "Quarterly result primers",
    ],
    plan: "basic",
  },
  {
    id: "long-term",
    title: "Long-Term Investors",
    focus: "Fundamental research",
    horizon: "Multi-year",
    tagline: "Business quality, valuation and long-term perspective",
    description:
      "Fundamental research examining business performance, financial strength, capital allocation and valuation to support a deeper understanding of companies over multi-year horizons.",
    bestFor:
      "Investors interested in business fundamentals, financial performance and longer-term investment perspectives.",
    deliverables: [
      "Company deep-dives",
      "Valuation scenarios",
      "Investment thesis reviews",
      "Annual sector outlooks",
    ],
    plan: "investor",
  },
  {
    id: "active",
    title: "Active Traders",
    focus: "Market analysis",
    horizon: "Active participation",
    tagline: "Structure, market context and risk awareness",
    description:
      "Structured, rules-based market research examining price behaviour, important levels, market conditions and risk/reward considerations for active trading decisions.",
    bestFor:
      "Market participants who actively monitor price movements and seek structured trading-oriented research.",
    deliverables: [
      "Price-structure outlooks",
      "Risk/reward frameworks",
      "Position-sizing worksheets",
      "Event-driven commentary",
    ],
    plan: "active-trader",
  },
  {
    id: "swing",
    title: "Swing & Positional Traders",
    focus: "Trend research",
    horizon: "Days to weeks",
    tagline: "Study trends with a defined risk perspective",
    description:
      "Multi-day to multi-week research examining trends, momentum and relative strength, alongside potential invalidation levels and changing market conditions.",
    bestFor:
      "Traders seeking research around developing trends and opportunities over multi-day to multi-week horizons.",
    deliverables: [
      "Swing and positional setup studies",
      "Relative-strength screens",
      "Trend and invalidation levels",
      "Setup review notes",
    ],
    plan: "active-trader",
  },
  {
    id: "advanced",
    title: "Advanced Participants",
    focus: "Comprehensive research",
    horizon: "Broad coverage",
    tagline: "Greater breadth, analytical depth and research access",
    description:
      "A comprehensive research offering combining fundamental and trading-oriented analysis, quantitative screening, wider market coverage and scheduled analyst interactions.",
    bestFor:
      "Experienced investors and traders seeking broader research coverage, advanced analytical perspectives and enhanced access to research discussions.",
    deliverables: [
      "Expanded quantitative screens",
      "Fundamental and trading-oriented research",
      "Scheduled group analyst sessions",
      "Custom thematic research briefs",
      "Priority research requests",
      "Annual research outlook",
    ],
    plan: "professional",
  },
];


export const principles = [
  { title: "Evidence over narrative", text: "Every view is tied to data, filings and a written rationale that can be challenged." },
  { title: "Risk first", text: "We define what could go wrong before we discuss what could go right." },
  { title: "Transparent limits", text: "We state coverage, assumptions and limitations plainly in every report." },
  { title: "No outcome promises", text: "We do not guarantee returns or present cherry-picked track records." },
];
