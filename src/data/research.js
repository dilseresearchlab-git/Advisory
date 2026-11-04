// ILLUSTRATIVE placeholder research. Company names are fictional.
// None of this is real analysis, a recommendation, or investment advice.

export const researchItems = [
  {
    id: "r1",
    company: "Sun Pharmaceutical Industries",
    symbol: "SUNPHARMA",
    sector: "PHARMACEUTICALS",
    type: "Company Analysis",
    title:
      "Sun Pharma: Can specialty medicines sustain the next phase of growth?",
    date: "Q2 FY2027 · September 2026",
    asOf: "30 September 2026",
    summary:
      "Sun Pharma's revenue grew 11.8% year-on-year, supported by India and innovative medicines. The key research question is whether specialty portfolio expansion can offset pressure in parts of its US generics business.",
    points: [
      "Consolidated Q2 sales reached ₹16,100 crore, up 11.8% YoY.",
      "EBITDA was ₹4,744 crore, growing 4.8%, with a 29.3% margin.",
      "Global Innovative Medicines sales reached $356 million, up 6.9%, representing 21.1% of sales.",
      "R&D investment was ₹778 crore, equal to 4.8% of sales.",
      "Reported net profit was affected by exceptional charges; adjusted net profit was ₹3,162 crore.",
    ],
    metrics: [
      { label: "Q2 sales", value: "₹16,100 Cr" },
      { label: "Sales growth YoY", value: "+11.8%" },
      { label: "EBITDA margin", value: "29.3%" },
      { label: "Innovative medicines sales", value: "$356 Mn" },
    ],
    source: "Sun Pharma Q2 FY27 earnings release",
    sourceUrl: "https://sunpharma.com/media/",
  },

  {
    id: "r2",
    company: "ITC Limited",
    symbol: "ITC",
    sector: "FMCG & CONSUMER GOODS",
    type: "Company Analysis",
    title:
      "ITC: Can non-cigarette FMCG businesses become a stronger growth engine?",
    date: "Q2 FY2027 · September 2026",
    asOf: "30 September 2026",
    summary:
      "ITC's non-cigarette businesses continued to expand, with FMCG Others recording strong growth. At the same time, cigarette taxation, input-cost inflation and pressure on consolidated profitability remain important factors to examine.",
    points: [
      "Consolidated gross revenue was ₹30,431 crore; net revenue from operations was ₹20,454 crore.",
      "Consolidated net revenue grew 5.1% YoY, while EBITDA declined 15.7%.",
      "FMCG Others segment revenue grew 19% YoY.",
      "FMCG Others segment EBITDA margin expanded by more than 50 basis points.",
      "Cigarette business volumes remained under pressure following a significant tax increase.",
    ],
    metrics: [
      { label: "Gross revenue", value: "₹30,431 Cr" },
      { label: "Net revenue", value: "₹20,454 Cr" },
      { label: "FMCG Others growth", value: "+19%" },
      { label: "FMCG Others margin expansion", value: "+50 bps" },
    ],
    source: "ITC Q2 FY27 financial results and media statement",
    sourceUrl:
      "https://itcportal.com/media-centre/press-releases/media-statement-financial-results-for-the-quarter-ended-30th-september-2026.html",
  },

  {
    id: "r3",
    company: "Bharti Airtel",
    symbol: "BHARTIARTL",
    sector: "TELECOMMUNICATIONS",
    type: "Business & Sector Insight",
    title:
      "Bharti Airtel: Tracking ARPU, subscriber quality and network-led growth",
    date: "Q1 FY2027 · June 2026",
    asOf: "30 June 2026",
    summary:
      "Airtel delivered strong consolidated revenue and EBITDA growth. Improving mobile ARPU, postpaid additions and expansion in homes and enterprise services offer useful indicators of the company's revenue quality.",
    points: [
      "Consolidated revenue from operations reached ₹58,539 crore, up 18.4% YoY.",
      "Consolidated EBITDA was ₹33,599 crore, up 19.3% YoY.",
      "EBITDA margin stood at 57.4%.",
      "India mobile ARPU increased to ₹264 from ₹250 a year earlier.",
      "The customer base reached approximately 681 million across 15 countries.",
    ],
    metrics: [
      { label: "Consolidated revenue", value: "₹58,539 Cr" },
      { label: "Revenue growth YoY", value: "+18.4%" },
      { label: "EBITDA margin", value: "57.4%" },
      { label: "India mobile ARPU", value: "₹264" },
    ],
    source: "Bharti Airtel Q1 FY27 results",
    sourceUrl: "https://www.airtel.in/about-bharti/equity/results",
  },

  {
    id: "r4",
    company: "Tata Steel",
    symbol: "TATASTEEL",
    sector: "METALS & STEEL",
    type: "Company Analysis",
    title: "Tata Steel: Assessing domestic margins, global operations and debt",
    date: "Q1 FY2027 · June 2026",
    asOf: "30 June 2026",
    summary:
      "Tata Steel's consolidated EBITDA grew 25% year-on-year, supported by stronger performance in India. Domestic profitability, overseas operational challenges, capital expenditure and net debt remain central to the company's outlook.",
    points: [
      "Consolidated turnover was ₹60,794 crore, compared with ₹53,178 crore a year earlier.",
      "Consolidated EBITDA reached ₹9,370 crore, up 25% YoY.",
      "India EBITDA was ₹9,908 crore, with EBITDA per tonne at ₹19,162.",
      "Consolidated steel deliveries were 7.27 million tonnes.",
      "Net debt stood at ₹84,173 crore, with net debt to EBITDA at 2.3x.",
    ],
    metrics: [
      { label: "Consolidated turnover", value: "₹60,794 Cr" },
      { label: "Consolidated EBITDA", value: "₹9,370 Cr" },
      { label: "EBITDA growth YoY", value: "+25%" },
      { label: "Net debt / EBITDA", value: "2.3x" },
    ],
    source: "Tata Steel Q1 FY27 results",
    sourceUrl:
      "https://www.tatasteel.com/newsroom/press-releases/india/2026/tata-steel-reports-consolidated-ebitda-of-rs-9-370-crores-for-the-quarter-ended-june-30-2026/",
  },
];

export const sampleReports = [
  {
    title: "Company Deep-Dive (Sample)",
    pages: "18 pages",
    detail: "Business model, financials, valuation range, risks.",
  },
  {
    title: "Sector Outlook (Sample)",
    pages: "12 pages",
    detail: "Cycle position, key indicators, coverage universe.",
  },
  {
    title: "Weekly Market Perspective (Sample)",
    pages: "4 pages",
    detail: "Breadth, earnings, flows context and key events.",
  },
];

export const methodologySteps = [
  {
    step: "01",
    title: "Screen",
    text: "Quantitative filters on quality, growth, leverage and liquidity narrow the universe.",
  },
  {
    step: "02",
    title: "Understand",
    text: "We read filings, concall transcripts and industry data to understand how the business earns money.",
  },
  {
    step: "03",
    title: "Value",
    text: "Multiple methods produce a range, not a single point. Assumptions are stated and tested.",
  },
  {
    step: "04",
    title: "Stress-test",
    text: "We model downside scenarios and identify what would invalidate the thesis.",
  },
  {
    step: "05",
    title: "Review",
    text: "Every published view is peer-reviewed and revisited on a defined schedule.",
  },
];

// Illustrative series for infographics (not market data)
export const illustrativeSeries = {
  marginBridge: [
    { label: "FY22", value: 15.2 },
    { label: "FY23", value: 16.1 },
    { label: "FY24", value: 16.9 },
    { label: "FY25", value: 17.8 },
  ],
};
