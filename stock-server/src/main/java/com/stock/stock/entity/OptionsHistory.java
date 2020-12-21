package com.stock.stock.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class OptionsHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long userId;
    private String ticker;
    private long optionId;
    private BigDecimal contracts;
    private Date tradeDate;
    private BigDecimal marketPrice;

    public OptionsHistory() {
    }

    public OptionsHistory(long userId,
                          String ticker,
                          long optionId,
                          BigDecimal contracts,
                          BigDecimal marketPrice,
                          Date tradeDate) {
        this.userId = userId;
        this.ticker = ticker;
        this.optionId = optionId;
        this.contracts = contracts;
        this.marketPrice = marketPrice;
        this.tradeDate = tradeDate;
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

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public long getOptionId() {
        return optionId;
    }

    public void setOptionId(long optionId) {
        this.optionId = optionId;
    }

    public BigDecimal getContracts() {
        return contracts;
    }

    public void setContracts(BigDecimal contracts) {
        this.contracts = contracts;
    }

    public BigDecimal getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(BigDecimal marketPrice) {
        this.marketPrice = marketPrice;
    }
}
