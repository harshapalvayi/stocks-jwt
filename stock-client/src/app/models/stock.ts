import {User} from '@models/User';
import {Chart} from '@models/chart';

export class Stock {
  stockId?: number;
  ticker?: string;
  user?: User;
  shares?: number;
  account?: number;
  buyPrice?: number;
  sellPrice?: number;
  tradeDate?: Date;
}

export class AcctType {
  userId?: number;
  account: number;
  stockId?: number;
  optionId?: number;
}

export class StockList {
  ticker?: string;
  shares?: number;
  buyPrice?: number;
  sellPrice?: number;
  account?: number;
  tradeDate?: Date;
}

export class StockPortfolio {
  userId?: number;
  investment: number;
  portfolio: number;
  percentChange?: number;
  position: number;
  annualDividend: number;
  stocks: number;
}

export class StockInfo {
  name?: string;
  ticker?: string;
  userId?: number;
  shares?: number;
  stockId?: number;
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

export class StockActivityInfo {
  id?: number;
  userId?: number;
  stockId?: number;
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
  stockId?: number;
  userId?: number;
  ticker?: string;
  stockName?: string;
  history?: any;
}


export class CustomStockInfo {
  stockId?: number;
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
