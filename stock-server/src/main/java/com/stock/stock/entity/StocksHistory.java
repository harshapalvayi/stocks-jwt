package com.stock.stock.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class StocksHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long userId;
    private String ticker;
    private long stockId;
    private Date tradeDate;
    private BigDecimal shares;
    private BigDecimal marketPrice;

    public StocksHistory() {
    }

    public StocksHistory(long userId,
                         String ticker,
                         long stockId,
                         Date tradeDate,
                         BigDecimal shares,
                         BigDecimal marketPrice) {
        this.userId = userId;
        this.ticker = ticker;
        this.stockId = stockId;
        this.tradeDate = tradeDate;
        this.shares = shares;
        this.marketPrice = marketPrice;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public long getStockId() {
        return stockId;
    }

    public void setStockId(long shareId) {
        this.stockId = shareId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Date getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(Date tradeDate) {
        this.tradeDate = tradeDate;
    }

    public BigDecimal getShares() {
        return shares;
    }

    public void setShares(BigDecimal shares) {
        this.shares = shares;
    }

    public BigDecimal getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(BigDecimal marketPrice) {
        this.marketPrice = marketPrice;
    }
}
