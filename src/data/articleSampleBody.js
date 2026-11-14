// ILLUSTRATIVE sample article bodies, used only when Sanity is not configured.
// Every figure below is fictional and exists to demonstrate the block types.
// They mirror the Portable Text shapes documented in sanity/article-blocks.schema.js.

const span = (text, marks = []) => ({ _type: "span", _key: `s${Math.abs(hash(text + marks.join()))}`, text, marks });
const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7);
const block = (key, style, children, extra = {}) => ({ _type: "block", _key: key, style, markDefs: [], children, ...extra });
const p = (key, text) => block(key, "normal", [span(text)]);

const featuredBody = [
  p("p1", "Reported profit is the number most people quote and the one most easily shaped by timing and accounting choices. Cash tells a harder-to-flatter story."),
  block("p2", "normal", [
    span("This sample article is "),
    span("illustrative only", ["strong"]),
    span(". It shows how the page renders each content block; the figures are fictional and are not analysis or a recommendation. See our "),
    span("disclosures", ["l1"]),
    span("."),
  ], { markDefs: [{ _key: "l1", _type: "link", href: "/disclosures" }] }),
  { _type: "keyTakeaways", _key: "kt1", title: "Key Takeaways", items: [
    "Profit and cash flow can diverge for entirely legitimate reasons.",
    "A persistent gap between them is a prompt to investigate, not a verdict.",
    "Working capital is usually the first place to look.",
  ] },
  block("h1", "h2", [span("Why headline profit can mislead")]),
  p("p3", "A sale on credit is revenue today and cash later. If customers pay more slowly, profit rises while cash does not."),
  block("h2a", "h3", [span("Receivables and inventory")]),
  p("p4", "When receivables grow much faster than sales, or inventory piles up, cash is being absorbed by the balance sheet."),
  block("l1", "normal", [span("Compare receivable days with prior years")], { listItem: "bullet", level: 1 }),
  block("l2", "normal", [span("Check inventory growth against sales growth")], { listItem: "bullet", level: 1 }),
  block("l3", "normal", [span("Read the notes for changes in credit terms")], { listItem: "bullet", level: 2 }),
  { _type: "metricHighlights", _key: "mh1", title: "Illustrative example (fictional company)", metrics: [
    { _key: "m1", value: "₹90 cr", label: "Net profit", description: "As reported on the income statement." },
    { _key: "m2", value: "₹110 cr", label: "Operating cash flow", description: "After the working-capital build-up." },
    { _key: "m3", value: "1.2x", label: "Cash conversion", description: "Operating cash flow ÷ net profit." },
  ] },
  block("h2b", "h2", [span("Three checks we run")]),
  { _type: "table", _key: "t1", title: "Illustrative cash-conversion checks", hasHeaderRow: true, rows: [
    { _key: "r1", cells: ["Check", "What we look at", "Why it matters"] },
    { _key: "r2", cells: ["Cash conversion", "Operating cash flow ÷ net profit", "Shows whether profit becomes cash"] },
    { _key: "r3", cells: ["Receivable days", "Receivables ÷ revenue × 365", "Flags slower collections"] },
    { _key: "r4", cells: ["Capex intensity", "Capex ÷ revenue", "Separates growth spend from upkeep"] },
  ] },
  { _type: "checklist", _key: "c1", title: "Before trusting an earnings number", items: [
    { text: "Compare profit with operating cash flow over several years", checked: true },
    { text: "Check working-capital movements", checked: true },
    { text: "Read the auditor's notes and one-off items", checked: false },
  ] },
  block("q1", "blockquote", [span("Profit is an opinion; cash is a fact.")]),
  block("h2c", "h2", [span("Putting it together")]),
  { _type: "prosCons", _key: "pc1", title: "Cash-flow focus: strengths and limits", prosTitle: "Strengths", consTitle: "Limits",
    pros: ["Harder to flatter than reported profit", "Highlights working-capital stress early"],
    cons: ["Cash flow is lumpy year to year", "Growing firms can show weak cash flow for good reasons"] },
  { _type: "callout", _key: "co1", variant: "warning", title: "A note on interpretation",
    body: "A single weak year of cash conversion is not evidence of a problem. Look at the trend and the reasons." },
  { _type: "faq", _key: "f1", title: "Frequently asked questions", items: [
    { _key: "q1", question: "Is profit irrelevant?", answer: "No. Profit and cash flow answer different questions and are most useful together." },
    { _key: "q2", question: "How many years should I compare?", answer: "Several, ideally across a full business cycle, so one-off swings do not dominate." },
  ] },
  block("h2d", "h2", [span("Conclusion")]),
  p("p5", "Treat the gap between profit and cash as a question to answer, not a conclusion to draw. The answer usually lives in working capital, capex and one-off items."),
];

// Other sample articles: a single paragraph from the excerpt (clearly a placeholder).
export function sampleBody(article) {
  if (article.slug === "earnings-quality-beyond-headline-profit") return featuredBody;
  return [p("p1", article.excerpt || "Sample article body.")];
}
