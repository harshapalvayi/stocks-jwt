package com.stock.stock.dto;

import yahoofinance.histquotes.HistoricalQuote;

import java.util.List;

public class StockHistoryInfoDto {
    private long userid;
    private long shareid;
    private String ticker;
    private String stockName;
    private List<HistoricalQuote> history;

    public long getUserid() {
        return userid;
    }

    public void setUserid(long userid) {
        this.userid = userid;
    }

    public long getShareid() {
        return shareid;
    }

    public void setShareid(long shareid) {
        this.shareid = shareid;
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

    public StockHistoryInfoDto(long userid, long shareid, String ticker, String stockName, List<HistoricalQuote> history) {
        this.userid = userid;
        this.shareid = shareid;
        this.ticker = ticker;
        this.stockName = stockName;
        this.history = history;
    }
}
