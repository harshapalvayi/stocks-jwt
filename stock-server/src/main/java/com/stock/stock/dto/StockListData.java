package com.stock.stock.dto;

import java.math.BigDecimal;
import java.util.Date;

public class StockListData {
    public String ticker;
    public BigDecimal shares;
    public BigDecimal buyPrice;
    public BigDecimal sellPrice;
    public Integer account;
    public Date tradeDate;

    public StockListData() {
    }

    public StockListData(String ticker, BigDecimal shares, BigDecimal buyPrice,
                         BigDecimal sellPrice, Integer account, Date tradeDate) {
        this.ticker = ticker;
        this.shares = shares;
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
        this.account = account;
        this.tradeDate = tradeDate;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
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

    public Date getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(Date tradeDate) {
        this.tradeDate = tradeDate;
    }

    public void setAccount(Integer account) {
        this.account = account;
    }
}
