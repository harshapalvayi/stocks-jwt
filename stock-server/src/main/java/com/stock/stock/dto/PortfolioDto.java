package com.stock.stock.dto;

import java.math.BigDecimal;
import java.util.Date;

public class PortfolioDto {
    private long userId;
    private BigDecimal investment;
    private BigDecimal portfolio;
    private BigDecimal annualDividend;
    private BigDecimal percentChange;
    private BigDecimal position;
    private Date tradeDate;

    public PortfolioDto() {
    }

    public PortfolioDto(long userId, BigDecimal investment, BigDecimal portfolio,
                        BigDecimal annualDividend, BigDecimal percent,
                        BigDecimal position, Date tradeDate) {
        this.userId = userId;
        this.investment = investment;
        this.portfolio = portfolio;
        this.annualDividend = annualDividend;
        this.percentChange = percent;
        this.position = position;
        this.tradeDate = tradeDate;
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

    public BigDecimal getAnnualDividend() {
        return annualDividend;
    }

    public void setAnnualDividend(BigDecimal annualDividend) {
        this.annualDividend = annualDividend;
    }

    public BigDecimal getPercentChange() {
        return percentChange;
    }

    public void setPercentChange(BigDecimal percentChange) {
        this.percentChange = percentChange;
    }

    public BigDecimal getPosition() {
        return position;
    }

    public void setPosition(BigDecimal position) {
        this.position = position;
    }

    public Date getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(Date tradeDate) {
        this.tradeDate = tradeDate;
    }
}
