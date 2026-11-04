// Advisory service tracks, organised by customer need.
// Descriptions are draft and subject to regulatory approval.

export const services = [
  {
    id: "beginner",
    title: "Beginner Investors",
    tagline: "Learn the market before you commit capital",
    description:
      "Plain-language market perspectives, foundational research and structured learning paths for people starting out.",
    deliverables: ["Weekly market note", "Sector snapshots", "Concept explainers", "Quarterly result primers"],
    plan: "basic",
    icon: "seed",
  },
  {
    id: "long-term",
    title: "Long-Term Investors",
    tagline: "Business quality, valuation and patience",
    description:
      "Fundamental research focused on durable businesses, capital allocation and valuation ranges over multi-year horizons.",
    deliverables: ["Company deep-dives", "Valuation scenarios", "Thesis reviews", "Annual sector outlook"],
    plan: "investor",
    icon: "layers",
  },
  {
    id: "active",
    title: "Active Traders",
    tagline: "Structure and risk before opinion",
    description:
      "Rules-based market insights with defined levels, risk/reward framing and position-sizing discipline.",
    deliverables: ["Price-structure outlook", "Risk/reward frameworks", "Sizing worksheets", "Event commentary"],
    plan: "active-trader",
    icon: "pulse",
  },
  {
    id: "swing",
    title: "Swing & Positional Traders",
    tagline: "Days to weeks, with a plan for being wrong",
    description:
      "Multi-day to multi-week study setups combining trend, momentum and relative strength with explicit invalidation levels.",
    deliverables: ["Setup studies", "Relative-strength screens", "Invalidation levels", "Review notes"],
    plan: "active-trader",
    icon: "swing",
  },
  {
    id: "advanced",
    title: "Advanced Participants",
    tagline: "Breadth, depth and direct access",
    description:
      "Wider coverage, quantitative screens, analyst sessions and bespoke thematic research for experienced market participants.",
    deliverables: ["Quant screens", "Analyst sessions", "Thematic briefs", "Strategy review"],
    plan: "professional",
    icon: "compass",
  },
];

export const principles = [
  { title: "Evidence over narrative", text: "Every view is tied to data, filings and a written rationale that can be challenged." },
  { title: "Risk first", text: "We define what could go wrong before we discuss what could go right." },
  { title: "Transparent limits", text: "We state coverage, assumptions and limitations plainly in every report." },
  { title: "No outcome promises", text: "We do not guarantee returns or present cherry-picked track records." },
];
