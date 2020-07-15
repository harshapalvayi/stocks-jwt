package com.stock.stock.dto;

import yahoofinance.histquotes.HistoricalQuote;

import java.util.List;

public class StockHistoryInfoDto {
    private long userId;
    private long shareId;
    private String ticker;
    private String stockName;
    private List<HistoricalQuote> history;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getShareId() {
        return shareId;
    }

    public void setShareId(long shareId) {
        this.shareId = shareId;
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

    public StockHistoryInfoDto() {
    }

    public StockHistoryInfoDto(long userId, long shareId, String ticker, String stockName, List<HistoricalQuote> history) {
        this.userId = userId;
        this.shareId = shareId;
        this.ticker = ticker;
        this.stockName = stockName;
        this.history = history;
    }
}
