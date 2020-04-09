package com.stock.stock.dto;

import java.math.BigDecimal;

public class ShareListDto {
    public String ticker;
    public Integer shares;
    public BigDecimal buy;

    public ShareListDto() {
    }

    public ShareListDto(String ticker, Integer shares, BigDecimal buy) {
        this.ticker = ticker;
        this.shares = shares;
        this.buy = buy;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public Integer getShares() {
        return shares;
    }

    public void setShares(Integer shares) {
        this.shares = shares;
    }

    public BigDecimal getBuy() {
        return buy;
    }

    public void setBuy(BigDecimal buy) {
        this.buy = buy;
    }
}
