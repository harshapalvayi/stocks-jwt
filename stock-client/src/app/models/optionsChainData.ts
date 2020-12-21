
export class OptionData {
  userId?: number;
  optionId?: number;
  ticker?: string;
  optionSymbol?: string;
  name?: string;
  expire: Date;
  tradeDate?: Date;
  account?: number;
  contracts?: number;
  buyPrice?: number;
  sellPrice?: number;
  optionType?: string;
  optionPrice?: number;
  strikePrice?: number;
  stockExchange?: string;
}

export class OptionActivityData {
  id?: number;
  userId?: number;
  optionId?: number;
  ticker?: string;
  name?: string;
  expire?: Date;
  tradeDate?: Date;
  cost?: number;
  equity?: number;
  action?: string;
  returns?: number;
  contracts?: number;
  strikePrice?: number;
  actionPrice?: number;
  optionPrice?: number;
  percentChange?: number;
  stockExchange?: string;
}

export class OptionsChainData {
  strikes: number;
  quote: QuoteData;
  options: OptionsData[];
  hasMiniOptions: boolean;
  expirationDates: Date[];
  underlyingSymbol: string;
}

export class OptionFeed {
  optionType: string;
  expire?: Date;
  strike: number;
  optionPrice: number;
  optionSymbol?: string;
}

export class OptionPortfolio {
  investment: number;
  portfolio: number;
  percentChange?: number;
  position: number;
  options: number;
}

export class OptionsData {
  calls: OptionType[];
  expirationDate: Date;
  hasMiniOptions: boolean;
  puts: OptionType[];
}

export class QuoteData {
  tradeable: boolean;
  triggerable: boolean;
  esgPopulated: boolean;
  dividendDate: Date;
  postMarketTime: Date;
  earningsTimestamp: Date;
  regularMarketTime: Date;
  earningsTimestampEnd: Date;
  earningsTimestampStart: Date;
  firstTradeDateMilliseconds: Date;
  ask: number;
  bid: number;
  market: string;
  symbol: string;
  region: string;
  currency: string;
  exchange: string;
  longName: string;
  language: string;
  shortName: string;
  quoteType: string;
  displayName: string;
  marketState: string;
  messageBoardId: string;
  quoteSourceName: string;
  fullExchangeName: string;
  financialCurrency: string;
  fiftyTwoWeekRange: string;
  exchangeTimezoneName: string;
  regularMarketDayRange: string;
  exchangeTimezoneShortName: string;
  bidSize: number;
  askSize: number;
  bookValue: number;
  forwardPE: number;
  marketCap: number;
  priceHint: number;
  epsForward: number;
  trailingPE: number;
  priceToBook: number;
  sourceInterval: number;
  fiftyDayAverage: number;
  fiftyTwoWeekLow: number;
  postMarketPrice: number;
  fiftyTwoWeekHigh: number;
  postMarketChange: number;
  regularMarketOpen: number;
  sharesOutstanding: number;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketVolume: number;
  regularMarketDayLow: number;
  regularMarketDayHigh: number;
  gmtOffSetMilliseconds: number;
  fiftyTwoWeekLowChange: number;
  fiftyDayAverageChange: number;
  twoHundredDayAverage: number;
  exchangeDataDelayedBy: number;
  fiftyTwoWeekHighChange: number;
  averageDailyVolume10Day: number;
  postMarketChangePercent: number;
  epsTrailingTwelveMonths: number;
  averageDailyVolume3Month: number;
  twoHundredDayAverageChange: number;
  regularMarketChangePercent: number;
  trailingAnnualDividendRate: number;
  regularMarketPreviousClose: number;
  trailingAnnualDividendYield: number;
  fiftyDayAverageChangePercent: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekHighChangePercent: number;
  twoHundredDayAverageChangePercent: number;

}

export class OptionType {
  ask: number;
  bid: number;
  strike: number;
  volume: number;
  change: number;
  lastPrice: number;
  openInterest: number;
  percentChange: number;
  impliedVolatility: number;
  inTheMoney: boolean;
  expiration: Date;
  lastTradeDate: Date;
  currency: string;
  contractSize: string;
  contractSymbol: string;
  selected?: boolean;
}

export class OptionTimestamp {
  ticker: string;
  expiry: number;
}
