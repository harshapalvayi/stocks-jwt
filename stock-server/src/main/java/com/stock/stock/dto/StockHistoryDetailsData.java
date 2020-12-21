package com.stock.stock.dto;

import yahoofinance.histquotes.HistoricalQuote;

import java.util.List;

public class StockHistoryDetailsData {
    private long userId;
    private long stockId;
    private String ticker;
    private String stockName;
    private List<HistoricalQuote> history;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getStockId() {
        return stockId;
    }

    public void setStockId(long stockId) {
        this.stockId = stockId;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

    public List<HistoricalQuote> getHistory() {
        return history;
    }

    public void setHistory(List<HistoricalQuote> history) {
        this.history = history;
    }

    public StockHistoryDetailsData() {
    }

    public StockHistoryDetailsData(long userId, long stockId, String ticker, String stockName, List<HistoricalQuote> history) {
        this.userId = userId;
        this.stockId = stockId;
        this.ticker = ticker;
        this.stockName = stockName;
        this.history = history;
    }
}
