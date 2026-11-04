// Pure calculation helpers. No dependencies; runs entirely in the browser.

export function sipFutureValue({ monthly, annualRate, years, stepUpPct = 0 }) {
  const r = annualRate / 100 / 12;
  const months = Math.round(years * 12);
  let balance = 0;
  let invested = 0;
  let pmt = monthly;
  const series = [{ year: 0, invested: 0, value: 0 }];
  for (let m = 1; m <= months; m++) {
    balance = (balance + pmt) * (1 + r); // contribution at start of month
    invested += pmt;
    if (m % 12 === 0) {
      series.push({ year: m / 12, invested, value: balance });
      pmt = pmt * (1 + stepUpPct / 100);
    }
  }
  return { invested, value: balance, gain: balance - invested, series };
}

export function lumpsumFutureValue({ principal, annualRate, years }) {
  const value = principal * Math.pow(1 + annualRate / 100, years);
  return { invested: principal, value, gain: value - principal };
}

export function cagr({ start, end, years }) {
  if (start <= 0 || end <= 0 || years <= 0) return NaN;
  return (Math.pow(end / start, 1 / years) - 1) * 100;
}

export function returns({ buy, sell, qty, years }) {
  const cost = buy * qty;
  const proceeds = sell * qty;
  const pnl = proceeds - cost;
  const pct = cost > 0 ? (pnl / cost) * 100 : NaN;
  const annualised = years > 0 && buy > 0 && sell > 0 ? cagr({ start: buy, end: sell, years }) : NaN;
  return { cost, proceeds, pnl, pct, annualised };
}

export function riskReward({ entry, stop, target }) {
  const long = target > entry;
  const risk = long ? entry - stop : stop - entry;
  const reward = long ? target - entry : entry - target;
  const valid = risk > 0 && reward > 0;
  const ratio = valid ? reward / risk : NaN;
  // Win rate needed to break even, ignoring costs: risk / (risk + reward)
  const breakeven = valid ? (risk / (risk + reward)) * 100 : NaN;
  return { long, risk, reward, ratio, breakeven, valid };
}

export function positionSize({ capital, riskPct, entry, stop }) {
  const riskPerShare = Math.abs(entry - stop);
  const riskAmount = (capital * riskPct) / 100;
  if (riskPerShare <= 0 || entry <= 0) return { qty: 0, riskAmount, value: 0, pctOfCapital: 0, valid: false };
  const qty = Math.floor(riskAmount / riskPerShare);
  const value = qty * entry;
  return {
    qty,
    riskAmount,
    actualRisk: qty * riskPerShare,
    value,
    pctOfCapital: capital > 0 ? (value / capital) * 100 : 0,
    valid: true,
  };
}

// Approximate Indian equity cash-market charges. These rates are EDITABLE
// defaults and may be outdated; verify against current exchange/regulator
// notifications and your broker's contract note before relying on them.
export const chargeRates = {
  sttDeliveryBuy: 0.1,
  sttDeliverySell: 0.1,
  sttIntradaySell: 0.025,
  exchangeTxn: 0.00297, // % of turnover (NSE equity, indicative)
  sebiFee: 0.0001, // % of turnover (Rs 10 per crore)
  stampDeliveryBuy: 0.015,
  stampIntradayBuy: 0.003,
  gst: 18, // % on brokerage + exchange txn + SEBI fee
};

export function brokerage({ buy, sell, qty, segment, brokerageMode, brokerageValue, rates = chargeRates }) {
  const buyTurnover = buy * qty;
  const sellTurnover = sell * qty;
  const turnover = buyTurnover + sellTurnover;
  const perOrder = (t) => (brokerageMode === "percent" ? (t * brokerageValue) / 100 : brokerageValue);
  const brk = perOrder(buyTurnover) + perOrder(sellTurnover);

  const delivery = segment === "delivery";
  const stt = delivery
    ? (buyTurnover * rates.sttDeliveryBuy + sellTurnover * rates.sttDeliverySell) / 100
    : (sellTurnover * rates.sttIntradaySell) / 100;
  const exchange = (turnover * rates.exchangeTxn) / 100;
  const sebi = (turnover * rates.sebiFee) / 100;
  const stamp = (buyTurnover * (delivery ? rates.stampDeliveryBuy : rates.stampIntradayBuy)) / 100;
  const gst = ((brk + exchange + sebi) * rates.gst) / 100;
  const totalCharges = brk + stt + exchange + sebi + stamp + gst;
  const grossPnl = sellTurnover - buyTurnover;
  const netPnl = grossPnl - totalCharges;
  const breakevenPerShare = qty > 0 ? totalCharges / qty : 0;
  return { turnover, brk, stt, exchange, sebi, stamp, gst, totalCharges, grossPnl, netPnl, breakevenPerShare };
}
