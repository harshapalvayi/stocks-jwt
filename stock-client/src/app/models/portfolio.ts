export class PortfolioData {
  userId?: number;
  investment: number;
  portfolio: number;
  annualDividend?: number;
  percentChange: number;
  position: number;
  stocks?: number;
  options?: number;
  tradeDate?: number;
}

export class PortfolioHistory {
  userId: number;
  investment: number;
  portfolio: number;
  tradeDate: number;
}
