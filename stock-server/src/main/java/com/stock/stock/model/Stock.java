package com.stock.stock.model;

import java.math.BigDecimal;
import java.util.Date;

public class Stock {
    private String ticker;

    private String StockName;

    private BigDecimal price;

    private BigDecimal dividend;

    private Date payDate;

    private Date exDate;

    private BigDecimal high;

    private BigDecimal low;

    private String stockExchange;

    public Stock() {
    }

    public Stock(String ticker, String stockName,
                 BigDecimal price, BigDecimal dividend,
                 Date paydate, Date exDate,
                 BigDecimal high, BigDecimal low,
                 String stockExchange) {
        this.ticker = ticker;
        StockName = stockName;
        this.price = price;
        this.dividend = dividend;
        this.payDate = paydate;
        this.exDate = exDate;
        this.high = high;
        this.low = low;
        this.stockExchange = stockExchange;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public String getStockName() {
        return StockName;
    }

    public void setStockName(String stockName) {
        StockName = stockName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getDividend() {
        return dividend;
    }

    public void setDividend(BigDecimal dividend) {
        this.dividend = dividend;
    }

    public Date getPayDate() {
        return payDate;
    }

    public void setPayDate(Date payDate) {
        this.payDate = payDate;
    }

    public Date getExDate() {
        return exDate;
    }

    public void setExDate(Date exDate) {
        this.exDate = exDate;
    }

    public BigDecimal getHigh() {
        return high;
    }

    public void setHigh(BigDecimal high) {
        this.high = high;
    }

    public BigDecimal getLow() {
        return low;
    }

    public void setLow(BigDecimal low) {
        this.low = low;
    }

    public String getStockExchange() {
        return stockExchange;
    }

    public void setStockExchange(String stockExchange) {
        this.stockExchange = stockExchange;
    }
}
