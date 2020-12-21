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
  STOCK_DASHBOARD = 'STOCK DASHBOARD',
  STOCKS = 'MONITOR STOCKS',
  ADD_STOCKS = 'ADD STOCKS',
  STOCK_ACTIVITY = 'STOCK ACTIVITY'
}

export enum OptionTabs {
  OPTION_DASHBOARD = 'OPTION DASHBOARD',
  OPTIONS = 'MONITOR OPTIONS',
  ADD_OPTIONS = 'ADD OPTIONS',
  OPTION_ACTIVITY = 'OPTION ACTIVITY'
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
    { label: 'Add Stocks', title: StockTabs.ADD_STOCKS },
    { label: 'Dashboard', title: StockTabs.STOCK_DASHBOARD },
    { label: 'Monitor Stocks', title: StockTabs.STOCKS },
    { label: 'Stock Activity', title: StockTabs.STOCK_ACTIVITY }
  ],

  optionTabs: [
    { label: 'Add Options', title: OptionTabs.ADD_OPTIONS },
    { label: 'Dashboard', title: OptionTabs.OPTION_DASHBOARD },
    { label: 'Monitor Options', title: OptionTabs.OPTIONS },
    { label: 'Option Activity', title: OptionTabs.OPTION_ACTIVITY }
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

export const StockActivityHeaders = {
  stockActivity: [
    { field: 'ticker', header: 'Ticker', width: '10%'},
    { field: 'name', header: 'Stock', width: '25%'},
    { field: 'marketPrice', header: 'Price', width: '10%'},
    { field: 'buyPrice', header: 'Buy/Sell', width: '12%' },
    { field: 'shares', header: 'Shares', width: '10%' },
    { field: 'percentChange', header: 'Change', width: '11%', icon: true},
    { field: 'returns', header: 'Returns', width: '11%' },
    { field: 'action', header: 'Action', width: '10%' },
    { field: 'tradeDate', header: 'Trade', width: '14%' }
  ]
};

export const OptionsHeaders = {
  headers: [
    { field: 'ticker', header: 'Ticker', width: '10%'},
    { field: 'name', header: 'Stock', width: '30%'},
    { field: 'optionType', header: 'Type', width: '10%' },
    { field: 'optionPrice', header: 'Price', width: '10%' },
    { field: 'buyPrice', header: 'Buy', width: '10%' },
    { field: 'strikePrice', header: 'Strike', width: '10%' },
    { field: 'contracts', header: 'Contract', width: '12%' },
    { field: 'expire', header: 'Expiry', width: '12%' },
    { field: '', header: 'Actions',  width: '12%' }
  ]
};

export const OptionActivityHeaders = {
  optionActivity: [
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
