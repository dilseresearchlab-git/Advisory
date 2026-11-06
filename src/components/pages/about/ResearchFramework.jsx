
const dimensions = [
  {
    symbol: "⌂",
    category: "01 / BUSINESS",
    title: "Business understanding",
    description:
      "Understand the business model, industry structure, competitive position and factors that influence long-term business quality.",
    detail: "What makes the business durable?",
    theme: "bg-[#F0F5FD] border-[#DCE8F8] text-[#37679F]",
    symbolBg: "bg-[#DCE9FC]",
  },
  {
    symbol: "▤",
    category: "02 / FINANCIALS",
    title: "Financial strength",
    description:
      "Examine revenue growth, profitability, cash generation, debt levels and the overall strength of the balance sheet.",
    detail: "How financially sound is the company?",
    theme: "bg-[#EFF7F2] border-[#DCEDE2] text-[#347A55]",
    symbolBg: "bg-[#DCEFE3]",
  },
  {
    symbol: "◇",
    category: "03 / VALUATION",
    title: "Valuation",
    description:
      "Study valuation multiples, earnings expectations, intrinsic value and the relationship between price and business fundamentals.",
    detail: "What are we paying for the business?",
    theme: "bg-[#FBF5E9] border-[#F0E5CF] text-[#9A702D]",
    symbolBg: "bg-[#F5E9CF]",
  },
  {
    symbol: "⌁",
    category: "04 / MARKET",
    title: "Market behaviour",
    description:
      "Assess price structure, momentum, relative strength, participation and broader market conditions.",
    detail: "What is the market communicating?",
    theme: "bg-[#F3F0FA] border-[#E6DFF3] text-[#7862A7]",
    symbolBg: "bg-[#E9E2F5]",
  },
  {
    symbol: "◎",
    category: "05 / RISK",
    title: "Risk assessment",
    description:
      "Identify business, financial and market risks while evaluating downside scenarios and potential uncertainty.",
    detail: "What could invalidate the research view?",
    theme: "bg-[#FAF0EF] border-[#F1DEDC] text-[#A45E58]",
    symbolBg: "bg-[#F4E0DE]",
  },
];

export default function ResearchFramework() {
  return (
    <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-6">
      {dimensions.map((item, index) => (
        <article
          key={item.category}
          className={`rounded-xl border p-5 sm:p-6 lg:col-span-2 ${
            index >= 3 ? "lg:col-span-3" : ""
          } ${item.theme}`}
        >
          <div className="flex items-center justify-between gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl ${item.symbolBg}`}
            >
              {item.symbol}
            </span>
            <span className="text-[9px] font-semibold tracking-[0.13em] opacity-75">
              {item.category}
            </span>
          </div>

          <h3 className="mt-5 font-serif text-xl text-navy sm:text-2xl">
            {item.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {item.description}
          </p>

          <div className="mt-5 border-t border-current/15 pt-3">
            <p className="text-xs font-semibold text-navy">
              {item.detail}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
