package com.stock.stock.model;

import java.math.BigDecimal;
import java.util.Date;

public class Stock {
    private String ticker;

    private String StockName;

    private BigDecimal price;

    private BigDecimal dividend;

    private Date paydate;

    private Date exdate;

    private BigDecimal high;

    private BigDecimal low;

    public Stock() {
    }

    public Stock(String ticker, String stockName,
                 BigDecimal price, BigDecimal dividend,
                 Date paydate, Date exdate,
                 BigDecimal high, BigDecimal low) {
        this.ticker = ticker;
        StockName = stockName;
        this.price = price;
        this.dividend = dividend;
        this.paydate = paydate;
        this.exdate = exdate;
        this.high = high;
        this.low = low;
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

    public Date getPaydate() {
        return paydate;
    }

    public void setPaydate(Date paydate) {
        this.paydate = paydate;
    }

    public Date getExdate() {
        return exdate;
    }

    public void setExdate(Date exdate) {
        this.exdate = exdate;
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
}
