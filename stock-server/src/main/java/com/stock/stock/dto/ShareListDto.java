package com.stock.stock.dto;

import java.math.BigDecimal;

public class ShareListDto {
    public String ticker;
    public BigDecimal shares;
    public BigDecimal buy;
    public BigDecimal sell;

    public ShareListDto() {
    }

    public ShareListDto(String ticker, BigDecimal shares, BigDecimal buy, BigDecimal sell) {
        this.ticker = ticker;
        this.shares = shares;
        this.buy = buy;
        this.sell = sell;
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
}
