import {User} from '@models/User';
import {Chart} from '@models/chart';

export class Share {
  shareid?: number;
  ticker?: string;
  userInfo?: User;
  shares?: number;
  buy?: number;
  sell?: number;
  account?: number;
}

export class Option {
  optionid?: number;
  ticker?: string;
  userInfo?: User;
  contracts?: number;
  buy?: number;
  sell?: number;
  account?: number;
}

export class AcctType {
  shareid?: number;
  optionid?: number;
  userid?: number;
  account: number;
}

export class ShareList {
  shares?: number;
  buy?: number;
  ticker?: string;
}

export class Portfolio {
  investment: number;
  portfolio: number;
  annualDividend: number;
  percentChange: number;
}

export class StockInfo {
   shareid?: number;
   userid?: number;
   ticker?: string;
   name?: string;
   buy: number;
   shares?: number;
   price?: number;
   cost?: number;
   equity?: number;
   dividend?: number;
   percentChange?: number;
   high?: number;
   low?: number;
   exdate?: Date;
   paydate?: Date;
   account?: number;
}

export class OptionInfo {
  optionid?: number;
  userid?: number;
  ticker?: string;
  name?: string;
  buy: number;
  contracts?: number;
  price?: number;
  account?: number;
}

export class StockHistory {
  shareid?: number;
  userid?: number;
  ticker?: string;
  stockName?: string;
  history?: any;
}


export class CustomStockInfo {
  shareid?: number;
  userid?: number;
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
