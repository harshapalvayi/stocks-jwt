package com.stock.stock.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class StocksActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long userId;
    private String name;
    private String ticker;
    private String action;
    private Date tradeDate;
    private BigDecimal shares;
    private BigDecimal sharePrice;
    private BigDecimal marketPrice;

    @ManyToOne
    @JoinColumn(name="stockId")
    private Stocks stocks;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getShares() {
        return shares;
    }

    public void setShares(BigDecimal shares) {
        this.shares = shares;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public BigDecimal getSharePrice() {
        return sharePrice;
    }

    public void setSharePrice(BigDecimal price) {
        this.sharePrice = price;
    }

    public Date getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(Date trade_ts) {
        this.tradeDate = trade_ts;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Stocks getShare() {
        return stocks;
    }

    public void setShare(Stocks stocks_history) {
        this.stocks = stocks_history;
    }

    public BigDecimal getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(BigDecimal marketPrice) {
        this.marketPrice = marketPrice;
    }

    public StocksActivity() { }

    @Override
    public String toString() {
        return "StocksActivity{" +
                "id=" + id +
                ", userId=" + userId +
                ", name='" + name + '\'' +
                ", ticker='" + ticker + '\'' +
                ", action='" + action + '\'' +
                ", tradeDate=" + tradeDate +
                ", shares=" + shares +
                ", sharePrice=" + sharePrice +
                ", marketPrice=" + marketPrice +
                ", stocks=" + stocks +
                '}';
    }
}
