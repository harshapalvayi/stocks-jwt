package com.stock.stock.dto;

import com.stock.stock.entity.Users;

import java.math.BigDecimal;
import java.util.Date;

public class ShareData {
    public long stockId;
    public String ticker;
    public Users user;
    public BigDecimal shares;
    public BigDecimal buyPrice;
    public BigDecimal sellPrice;
    public Integer account;
    public Date tradeDate;

    public ShareData() {
    }

    public ShareData(long stockId, String ticker, Users user,
                     BigDecimal shares, BigDecimal buyPrice,
                     BigDecimal sellPrice, Integer account, Date tradeDate) {
        this.stockId = stockId;
        this.ticker = ticker;
        this.user = user;
        this.shares = shares;
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
        this.account = account;
        this.tradeDate = tradeDate;
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

    public Users getUser() {
        return user;
    }

    public long getUserId() {
        return user.getUserId();
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public BigDecimal getShares() {
        return shares;
    }

    public void setShares(BigDecimal shares) {
        this.shares = shares;
    }

    public BigDecimal getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(BigDecimal buyPrice) {
        this.buyPrice = buyPrice;
    }

    public BigDecimal getSellPrice() {
        return sellPrice;
    }

    public void setSellPrice(BigDecimal sellPrice) {
        this.sellPrice = sellPrice;
    }

    public Integer getAccount() {
        return account;
    }

    public void setAccount(Integer account) {
        this.account = account;
    }

    public Date getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(Date tradeDate) {
        this.tradeDate = tradeDate;
    }
}
