package com.stock.stock.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class ShareHistory {

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

    @ManyToOne
    @JoinColumn(name="shareId")
    private Share share;

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

    public Share getShare() {
        return share;
    }

    public void setShare(Share share_history) {
        this.share = share_history;
    }

    public ShareHistory() { }

    @Override
    public String toString() {
        return String.format(
                "Share[shareId=%d, shares='%f', action='%s', price='%f', executed='%s']",
                id, shares, action, sharePrice, tradeDate);
    }
}
