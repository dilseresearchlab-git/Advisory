
export const learningTracks = [
  {
    id: "fundamentals",
    title: "Financial Fundamentals",
    level: "Beginner",
    duration: "25 min",
    blurb:
      "Understand how a business earns, spends, retains and manages its money.",
    outcome:
      "Read the basic financial statements and distinguish reported profit from actual cash generation.",
    lessons: [
      "How a business makes money: revenue, costs and profit",
      "The three financial statements, explained",
      "Gross profit, EBITDA, EBIT and net profit",
      "Depreciation and amortisation made simple",
      "Working capital and the cash conversion cycle",
      "Why operating cash flow can differ from net profit",
    ],
  },
  {
    id: "valuation",
    title: "Valuation & Ratios",
    level: "Intermediate",
    duration: "35 min",
    blurb:
      "Go beyond financial numbers to understand business quality, valuation and what market multiples really measure.",
    outcome:
      "Calculate important ratios and interpret them in the context of growth, profitability, debt and industry.",
    lessons: [
      "Earnings per share and the P/E ratio",
      "P/B, enterprise value and EV/EBITDA",
      "ROE, ROCE and return on assets",
      "Profit margins and operating efficiency",
      "CAGR, earnings growth and the PEG ratio",
      "Discounted cash flow and margin of safety",
    ],
  },
  {
    id: "investing",
    title: "Investing Concepts",
    level: "Beginner",
    duration: "30 min",
    blurb:
      "Understand how capital grows over time and how to think about risk, diversification and investment behaviour.",
    outcome:
      "Understand the relationship between compounding, time, risk and long-term portfolio decisions.",
    lessons: [
      "Simple interest versus compound interest",
      "CAGR and the mathematics of long-term growth",
      "SIPs and rupee-cost averaging",
      "Asset allocation and diversification",
      "Inflation, real returns and purchasing power",
      "Behavioural biases and investment mistakes",
    ],
  },
  {
    id: "trading",
    title: "Trading Education",
    level: "Intermediate",
    duration: "35 min",
    blurb:
      "Learn to approach trading through structured decisions, measurable risk and disciplined execution.",
    outcome:
      "Calculate position sizes, assess trade risk and evaluate trading outcomes beyond individual wins or losses.",
    lessons: [
      "Capital, risk per trade and position sizing",
      "Entry price, stop-loss and target price",
      "Support, resistance and market structure",
      "Trend, momentum, volume and volatility",
      "Risk/reward ratio and trade expectancy",
      "Drawdown, leverage and maintaining a trading journal",
    ],
  },
];


export const glossary = [
  {
    term: "EPS",
    def: "Earnings attributable to each outstanding share.",
  },
  {
    term: "CAGR",
    def: "Annualised growth rate over a specified period.",
  },
  {
    term: "EBITDA",
    def: "Earnings before interest, tax, depreciation and amortisation.",
  },
  {
    term: "Free Cash Flow",
    def: "Operating cash flow minus capital expenditure.",
  },
  {
    term: "Market Capitalisation",
    def: "Share price multiplied by outstanding shares.",
  },
  {
    term: "Dividend Yield",
    def: "Annual dividend per share relative to its market price.",
  },
  {
    term: "Book Value",
    def: "A company's assets minus its liabilities.",
  },
  {
    term: "Enterprise Value",
    def: "Equity value plus debt, minus cash and cash equivalents.",
  },
  {
    term: "Liquidity",
    def: "How easily an asset can be bought or sold.",
  },
  {
    term: "Volatility",
    def: "The degree to which a security's price fluctuates.",
  },
  {
    term: "Drawdown",
    def: "A decline from an investment's peak value to a subsequent low.",
  },
  {
    term: "Bull Market",
    def: "A market environment characterised by sustained rising prices.",
  },
  {
    term: "Bear Market",
    def: "A market environment characterised by sustained falling prices.",
  },
  {
    term: "Diversification",
    def: "Spreading investments across assets to manage concentration risk.",
  },
  {
    term: "Market Sentiment",
    def: "The overall attitude of investors towards the market.",
  },
  {
    term: "Stop-loss",
    def: "A predetermined exit level intended to limit a trade's loss.",
  },
];



export const ratios = [
  {
    name: "Net Profit Margin",
    formula: "Net Profit ÷ Revenue × 100",
    reading: "Shows how much revenue remains as net profit.",
  },
  {
    name: "Return on Equity (ROE)",
    formula: "Net Profit ÷ Shareholders' Equity × 100",
    reading: "Measures profit generated from shareholders' funds.",
  },
  {
    name: "Return on Capital Employed (ROCE)",
    formula: "EBIT ÷ Capital Employed × 100",
    reading: "Measures how efficiently the business uses its capital.",
  },
  {
    name: "Debt-to-Equity",
    formula: "Total Debt ÷ Shareholders' Equity",
    reading: "Indicates the company's reliance on borrowing.",
  },
  {
    name: "Interest Coverage",
    formula: "EBIT ÷ Finance Costs",
    reading: "Measures the ability to cover interest obligations.",
  },
  {
    name: "Asset Turnover",
    formula: "Revenue ÷ Total Assets",
    reading: "Shows how efficiently assets generate revenue.",
  },
  {
    name: "Price-to-Earnings (P/E)",
    formula: "Share Price ÷ Earnings Per Share",
    reading: "Compares a share's price with its earnings.",
  },
  {
    name: "Price-to-Book (P/B)",
    formula: "Share Price ÷ Book Value Per Share",
    reading: "Compares market price with accounting book value.",
  },
  {
    name: "EV/EBITDA",
    formula: "Enterprise Value ÷ EBITDA",
    reading: "Compares business value with operating earnings.",
  },
];



export const financialStoryExample = {
  company: "ABC Ltd.",
  description: "A fictional business selling consumer products.",
  currency: "INR",
  revenue: 100000,
  costOfGoodsSold: 55000,
  operatingExpenses: 20000,
  depreciationAndAmortisation: 5000,
  financeCosts: 2000,
  illustrativeTaxRate: 25,
  assumptions: [
    "All figures relate to one simplified accounting period.",
    "Operating expenses exclude depreciation and amortisation.",
    "Tax is assumed to be 25% of positive profit before tax.",
    "Exceptional items and other income are excluded.",
  ],
};


export const financialStatementsExample = {
  company: "ABC Ltd.",
  period: "Illustrative financial year",
  currency: "INR",

  income: {
    revenue: 100000,
    cogs: 55000,
    grossProfit: 45000,
    operatingExpenses: 20000,
    ebitda: 25000,
    depreciation: 5000,
    ebit: 20000,
    financeCosts: 2000,
    profitBeforeTax: 18000,
    tax: 4500,
    netProfit: 13500,
  },

  balance: {
    date: "End of financial year",
    assets: [
      { name: "Cash & cash equivalents", value: 22500 },
      { name: "Trade receivables", value: 15000 },
      { name: "Inventory", value: 20000 },
      { name: "Property, plant & equipment", value: 58000 },
    ],
    liabilities: [
      { name: "Trade payables", value: 15000 },
      { name: "Borrowings", value: 30000 },
    ],
    equity: [
      { name: "Share capital", value: 50000 },
      { name: "Retained earnings", value: 20500 },
    ],
  },

  cashFlow: {
    openingCash: 12000,

    operating: [
      { name: "Net profit", value: 13500, type: "base" },
      { name: "Add: Depreciation", value: 5000 },
      { name: "Increase in receivables", value: -5000 },
      { name: "Increase in inventory", value: -3000 },
      { name: "Increase in payables", value: 4000 },
    ],

    investing: [
      { name: "Purchase of equipment", value: -8000 },
    ],

    financing: [
      { name: "New borrowings", value: 5000 },
      { name: "Dividends paid", value: -1000 },
    ],

    closingCash: 22500,
  },
};
