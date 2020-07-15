export enum ReportTabs {
  PRICE_BUY = 'PRICE-BUY',
  COST_EQUITY = 'COST-EQUITY',
  DIVIDEND = 'DIVIDEND',
  MONTHLY_DIVIDEND = 'MONTHLY_DIVIDEND',
  YEARLY_DIVIDEND = 'YEARLY_DIVIDEND',
  TOTAL_PORTFOLIO = 'TOTAL_PORTFOLIO',
  TOP_MOVERS = 'TOP_MOVERS'
}

export enum StockTabs {
  STOCKS = 'STOCKS',
  STOCK_HISTORY = 'STOCK_HISTORY'
}

export enum OptionTabs {
  OPTIONS = 'MONITOR OPTIONS',
  ADD_OPTIONS = 'ADD OPTIONS',
  OPTION_HISTORY = 'OPTION HISTORY'
}

export enum AdminTabs {
  STOCKS = 'STOCKS'
}

export enum BrokerageAccounts {
  ROBINHOOD = 'ROBINHOOD',
  WEBULL = 'WEBULL',
  YAHOOFINANCE = 'YAHOOFINANCE',
  FIDELITY = 'FIDELITY',
  ETRADE = 'ETRADE'
}

export const MenuTabs = {
  reportTabs: [
    { label: 'Portfolio', title: ReportTabs.TOTAL_PORTFOLIO },
    { label: 'Price/Buy', title: ReportTabs.PRICE_BUY},
    { label: 'Cost/Equity', title: ReportTabs.COST_EQUITY },
    { label: 'Dividends', title: ReportTabs.DIVIDEND },
    { label: 'Monthly Dividends', title: ReportTabs.MONTHLY_DIVIDEND},
    { label: 'Yearly Dividends', title: ReportTabs.YEARLY_DIVIDEND },
    { label: 'Top Movers', title: ReportTabs.TOP_MOVERS }
  ],

  stockTabs: [
    { label: 'Stocks', title: StockTabs.STOCKS },
    { label: 'Stock History', title: StockTabs.STOCK_HISTORY }
  ],

  optionTabs: [
    { label: 'Add Options', title: OptionTabs.ADD_OPTIONS },
    { label: 'Monitor Options', title: OptionTabs.OPTIONS },
    { label: 'OptionInfo History', title: OptionTabs.OPTION_HISTORY }
  ],

  adminTabs: [
    { label: 'Stocks', value: AdminTabs.STOCKS, id: 0 }
  ]
};

export const OptionTypes = {
 types: [
   {label: 'Call', value: 'call'},
   {label: 'Put', value: 'put'}
   ]
};

export const StockHeaders = {
  stocks: [
    { field: 'ticker', header: 'Ticker', width: '12%'},
    { field: 'name', header: 'Stock', width: '30%'},
    { field: 'price', header: 'Price', width: '10%'},
    { field: 'percentChange', header: 'Change', width: '12%', icon: true},
    { field: 'buyPrice', header: 'Buy', width: '10%' },
    { field: 'shares', header: 'Shares', width: '12%' },
    { field: '', header: 'Actions',  width: '12%' }
  ]
};

export const StockHistoryHeaders = {
  stockHistory: [
    { field: 'ticker', header: 'Ticker', width: '10%'},
    { field: 'name', header: 'Stock', width: '25%'},
    { field: 'marketPrice', header: 'Price', width: '10%'},
    { field: 'price', header: 'Buy', width: '8%' },
    { field: 'shares', header: 'Shares', width: '10%' },
    { field: 'percentChange', header: 'Change', width: '12%', icon: true},
    { field: 'returns', header: 'Returns', width: '12%' },
    { field: 'action', header: 'Action', width: '10%' },
    { field: 'tradeDate', header: 'Trade', width: '14%' }
  ]
};

export const OptionsHeaders = {
  headers: [
    { field: 'ticker', header: 'Ticker', width: '10%'},
    { field: 'name', header: 'Stock', width: '30%'},
    { field: 'optionType', header: 'Type', width: '10%' },
    { field: 'buyPrice', header: 'Buy', width: '10%' },
    { field: 'strikePrice', header: 'Strike', width: '10%' },
    { field: 'contracts', header: 'Contract', width: '12%' },
    { field: 'expire', header: 'Expiry', width: '12%' },
    { field: '', header: 'Actions',  width: '20%' }
  ]
};

export const OptionHistoryHeaders = {
  optionHistory: [
    { field: 'ticker', header: 'Ticker', width: '10%'},
    { field: 'name', header: 'Stock', width: '25%'},
    { field: 'buyPrice', header: 'Price', width: '10%'},
    { field: 'strikePrice', header: 'Strike', width: '10%' },
    { field: 'contracts', header: 'Contracts', width: '12%' },
    { field: 'expire', header: 'Expiry', width: '11%', icon: true},
    { field: 'returns', header: 'Returns', width: '11%' },
    { field: 'action', header: 'Action', width: '10%' },
    { field: 'tradeDate', header: 'Trade', width: '12%' }
  ]
};
