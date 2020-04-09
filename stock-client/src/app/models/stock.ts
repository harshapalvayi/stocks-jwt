import {User} from '@models/User';
import {Chart} from '@models/chart';

export class Share {
  shareid?: number;
  userInfo?: User;
  shares?: number;
  buy?: number;
  ticker?: string;

  getUserInfo(): User {
    return this.userInfo;
  }
}

export class ShareList {
  shares?: number;
  buy?: number;
  ticker?: string;
}

export class Portfolio {
  totalInvestment: number;
  totalEquity: number;
  annualDividend: number;
  percentChange: number;
}

export class StockInfo {
   shareid?: number;
   userid?: number;
   ticker?: string;
   stockName?: string;
   buy: number;
   shares?: number;
   price?: number;
   cost?: number;
   equity?: number;
   dividend?: number;
   percentChange?: string;
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
