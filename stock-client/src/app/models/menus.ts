export enum Tabs {
  PRICE_BUY = 'PRICE-BUY',
  COST_EQUITY = 'COST-EQUITY',
  DIVIDEND = 'DIVIDEND',
  MONTHLY_DIVIDEND = 'MONTHLY_DIVIDEND',
  YEARLY_DIVIDEND = 'YEARLY_DIVIDEND',
  TOTAL_PORTFOLIO = 'TOTAL_PORTFOLIO',
  TOP_MOVERS = 'TOP_MOVERS'
}

export enum AdminTabs {
  STOCKS = 'STOCKS'
}

export const MenuTabs = {
  reportTabs: [
    { label: 'Portfolio', value: Tabs.TOTAL_PORTFOLIO, id: 0 },
    { label: 'Price/Buy', value: Tabs.PRICE_BUY, id: 1 },
    { label: 'Cost/Equity', value: Tabs.COST_EQUITY, id: 2 },
    { label: 'Dividends', value: Tabs.DIVIDEND, id: 3 },
    { label: 'Monthly Dividends', value: Tabs.MONTHLY_DIVIDEND, id: 4 },
    { label: 'Yearly Dividends', value: Tabs.YEARLY_DIVIDEND, id: 5 },
    { label: 'Top Movers', value: Tabs.TOP_MOVERS, id: 6 },

  ],

  adminTabs: [
    { label: 'Stocks', value: AdminTabs.STOCKS, id: 0 }
  ]
};

export const StockHeaders = {
  headers: [
    { field: 'ticker', header: 'Ticker', width: '10%'},
    { field: 'name', header: 'Stock', width: '30%'},
    { field: 'price', header: 'Price', width: '10%'},
    { field: 'percentChange', header: 'Change', width: '10%', icon: true},
    { field: 'buy', header: 'Buy', width: '10%' },
    { field: 'shares', header: 'Shares', width: '10%' },
    { field: '', header: 'Actions',  width: '15%' }
  ]
};

export const OptionsHeaders = {
  headers: [
    { field: 'ticker', header: 'Ticker', width: '10%'},
    { field: 'name', header: 'Stock', width: '30%'},
    { field: 'price', header: 'Price', width: '10%'},
    { field: 'buy', header: 'Buy', width: '10%' },
    { field: 'contracts', header: 'Contract', width: '15%' },
    { field: '', header: 'Actions',  width: '15%' }
  ]
};
