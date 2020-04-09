package com.stock.stock.dto;

import java.math.BigDecimal;

public class PortfolioDto {
    private BigDecimal totalInvestment;
    private BigDecimal totalEquity;
    private BigDecimal annualDividend;
    private String percentChange;

    public PortfolioDto() {
    }

    public PortfolioDto(BigDecimal totalInvestment, BigDecimal totalValue, BigDecimal annualDividend,
                        String percent) {
        this.totalInvestment = totalInvestment;
        this.totalEquity = totalValue;
        this.annualDividend = annualDividend;
        this.percentChange = percent;
    }

    public BigDecimal getTotalInvestment() {
        return totalInvestment;
    }

    public void setTotalInvestment(BigDecimal totalInvestment) {
        this.totalInvestment = totalInvestment;
    }

    public BigDecimal getTotalEquity() {
        return totalEquity;
    }

    public void setTotalEquity(BigDecimal totalEquity) {
        this.totalEquity = totalEquity;
    }

    public BigDecimal getAnnualDividend() {
        return annualDividend;
    }

    public void setAnnualDividend(BigDecimal annualDividend) {
        this.annualDividend = annualDividend;
    }

    public String getPercentChange() {
        return percentChange;
    }

    public void setPercentChange(String percentChange) {
        this.percentChange = percentChange;
    }
}
