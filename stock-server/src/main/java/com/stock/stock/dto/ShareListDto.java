package com.stock.stock.dto;

import java.math.BigDecimal;
import java.util.Date;

public class ShareListDto {
    public String ticker;
    public BigDecimal shares;
    public BigDecimal buy;
    public BigDecimal sell;
    public Integer account;
    public Date tradeDate;

    public ShareListDto() {
    }

    public ShareListDto(String ticker, BigDecimal shares, BigDecimal buy,
                        BigDecimal sell, Integer account, Date tradeDate) {
        this.ticker = ticker;
        this.shares = shares;
        this.buy = buy;
        this.sell = sell;
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

    public BigDecimal getBuy() {
        return buy;
    }

    public void setBuy(BigDecimal buy) {
        this.buy = buy;
    }

    public BigDecimal getSell() {
        return sell;
    }

    public void setSell(BigDecimal sell) {
        this.sell = sell;
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
