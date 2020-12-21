package com.stock.stock.dto;

import java.math.BigDecimal;
import java.util.Date;

public class PortfolioHistoryData {
    private long id;
    private long userId;
    private BigDecimal investment;
    private BigDecimal portfolio;
    private Date tradeDate;

    public PortfolioHistoryData() { }

    public PortfolioHistoryData(long userId,
                                BigDecimal investment,
                                BigDecimal portfolio,
                                Date tradeDate) {
        this.userId = userId;
        this.investment = investment;
        this.portfolio = portfolio;
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

    public BigDecimal getInvestment() {
        return investment;
    }

    public void setInvestment(BigDecimal investment) {
        this.investment = investment;
    }

    public BigDecimal getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(BigDecimal portfolio) {
        this.portfolio = portfolio;
    }

    public Date getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(Date tradeDate) {
        this.tradeDate = tradeDate;
    }
}
