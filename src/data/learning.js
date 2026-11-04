export const learningTracks = [
  {
    id: "fundamentals",
    title: "Financial Fundamentals",
    blurb: "Read a balance sheet, income statement and cash flow statement with confidence.",
    lessons: [
      "The three financial statements, explained",
      "Operating vs. net profit",
      "Why cash flow matters more than profit",
      "Working capital and the cash cycle",
    ],
  },
  {
    id: "valuation",
    title: "Valuation & Ratios",
    blurb: "Understand what multiples measure and where they mislead.",
    lessons: ["P/E, P/B and EV/EBITDA", "ROE vs. ROCE", "Discounted cash flow basics", "Margin of safety"],
  },
  {
    id: "investing",
    title: "Investing Concepts",
    blurb: "Compounding, diversification and behaviour over long horizons.",
    lessons: ["The power of compounding", "Asset allocation basics", "SIPs and rupee-cost averaging", "Avoiding common behavioural traps"],
  },
  {
    id: "trading",
    title: "Trading Education",
    blurb: "Risk management first, then structure, then entries.",
    lessons: ["Position sizing and risk per trade", "Support, resistance and trend", "Risk/reward and expectancy", "Keeping a trading journal"],
  },
];

export const glossary = [
  { term: "CAGR", def: "Compound Annual Growth Rate: the constant yearly rate that would take a starting value to an ending value over a period." },
  { term: "P/E Ratio", def: "Price divided by earnings per share. Shows how much the market pays for each rupee of earnings." },
  { term: "P/B Ratio", def: "Price divided by book value per share. Often used for banks and asset-heavy businesses." },
  { term: "EV/EBITDA", def: "Enterprise value divided by EBITDA. A capital-structure-neutral valuation multiple." },
  { term: "ROE", def: "Return on Equity: net profit divided by shareholders' equity." },
  { term: "ROCE", def: "Return on Capital Employed: operating profit (EBIT) divided by capital employed." },
  { term: "EBITDA", def: "Earnings before interest, tax, depreciation and amortisation. A proxy for operating profit." },
  { term: "Free Cash Flow", def: "Operating cash flow minus capital expenditure. Cash available to investors after reinvestment." },
  { term: "Market Capitalisation", def: "Share price multiplied by shares outstanding." },
  { term: "Drawdown", def: "The fall from a peak to a subsequent trough in the value of an investment." },
  { term: "Risk/Reward", def: "The ratio of potential loss (to stop) against potential gain (to target) in a trade." },
  { term: "Stop-loss", def: "A pre-defined price at which a position is exited to limit loss." },
  { term: "Beta", def: "A measure of a stock's sensitivity to market movements." },
  { term: "Liquidity", def: "How easily an asset can be bought or sold without moving its price." },
];

export const ratios = [
  { name: "Return on Equity", formula: "Net Profit ÷ Shareholders' Equity", reading: "Higher can indicate efficient use of equity, but check leverage." },
  { name: "Debt / Equity", formula: "Total Debt ÷ Shareholders' Equity", reading: "Shows reliance on borrowing. Compare within the same industry." },
  { name: "Interest Coverage", formula: "EBIT ÷ Interest Expense", reading: "How comfortably earnings cover interest costs." },
  { name: "Operating Margin", formula: "Operating Profit ÷ Revenue", reading: "Indicates pricing power and cost control." },
  { name: "Price / Earnings", formula: "Price ÷ EPS", reading: "Compare against growth, quality and the company's own history." },
];
