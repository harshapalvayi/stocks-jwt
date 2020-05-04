import {User} from '@models/User';
import {Chart} from '@models/chart';

export class Share {
  shareid?: number;
  ticker?: string;
  userInfo?: User;
  shares?: number;
  buy?: number;
  sell?: number;
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
