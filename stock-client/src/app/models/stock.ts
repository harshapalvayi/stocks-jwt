import {User} from '@models/User';
import {Chart} from '@models/chart';

export class Share {
  shareId?: number;
  ticker?: string;
  userInfo?: User;
  shares?: number;
  account?: number;
  buyPrice?: number;
  sellPrice?: number;
  tradeDate?: Date;
}

export class AcctType {
  userId?: number;
  account: number;
  shareId?: number;
  optionId?: number;
}

export class ShareList {
  ticker?: string;
  shares?: number;
  buyPrice?: number;
  account?: number;
  tradeDate?: Date;
}

export class Portfolio {
  investment: number;
  portfolio: number;
  annualDividend: number;
  percentChange: number;
  position: number;
  tradeDate: number;
}

export class PortfolioHistory {
  userId: number;
  portfolioId: number;
  investment: number;
  portfolio: number;
  annualDividend: number;
  percentChange: number;
  position: number;
  tradeDate: number;
}

export class StockInfo {
  name?: string;
  ticker?: string;
  userId?: number;
  shares?: number;
  shareId?: number;
  low?: number;
  high?: number;
  cost?: number;
  equity?: number;
  returns?: number;
  dividend?: number;
  buyPrice?: number;
  sellPrice?: number;
  marketPrice?: number;
  percentChange?: number;
  exDate?: Date;
  payDate?: Date;
  tradeDate?: Date;
  stockExchange?: string;
  holding?: boolean;
  account?: number;
}

export class StockHistoryInfo {
  id?: number;
  userId?: number;
  shareId?: number;
  ticker?: string;
  name?: string;
  shares?: number;
  actionPrice?: number;
  cost?: number;
  equity?: number;
  returns?: number;
  sharePrice?: number;
  marketPrice?: number;
  percentChange?: number;
  tradeDate?: Date;
  stockExchange?: string;
}

export class StockHistory {
  shareId?: number;
  userId?: number;
  ticker?: string;
  stockName?: string;
  history?: any;
}


export class CustomStockInfo {
  shareId?: number;
  userId?: number;
  price?: number;
  buy?: number;
  cost?: number;
  equity?: number;
  stockName?: string;
  history?: Chart;
}

export class StockDetails {
  ticker: string;
  stockName: string;
  price: number;
  dividend: number;
  payDate: string;
  exDate: string;
  high: number;
  low: number;
}
