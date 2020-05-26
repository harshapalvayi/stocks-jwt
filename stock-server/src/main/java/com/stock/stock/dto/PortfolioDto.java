package com.stock.stock.dto;

import java.math.BigDecimal;

public class PortfolioDto {
    private BigDecimal investment;
    private BigDecimal portfolio;
    private BigDecimal annualDividend;
    private BigDecimal percentChange;

    public PortfolioDto() {
    }

    public PortfolioDto(BigDecimal investment, BigDecimal portfolio, BigDecimal annualDividend,
                        BigDecimal percent) {
        this.investment = investment;
        this.portfolio = portfolio;
        this.annualDividend = annualDividend;
        this.percentChange = percent;
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
}
