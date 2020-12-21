package com.stock.stock.dto;

import java.math.BigDecimal;
import java.util.Date;

public class PortfolioData {
    private long userId;
    private BigDecimal investment;
    private BigDecimal portfolio;
    private BigDecimal annualDividend;
    private BigDecimal percentChange;
    private BigDecimal position;
    private long stocks;
    private long options;
    private Date tradeDate;

    public PortfolioData() {
    }

    public PortfolioData(long userId, BigDecimal investment, BigDecimal portfolio,
                         BigDecimal annualDividend, BigDecimal percent,
                         BigDecimal position, long stocks, long options, Date tradeDate) {
        this.userId = userId;
        this.investment = investment;
        this.portfolio = portfolio;
        this.annualDividend = annualDividend;
        this.percentChange = percent;
        this.position = position;
        this.stocks = stocks;
        this.options = options;
        this.tradeDate = tradeDate;
    }

    public PortfolioData(long userId, BigDecimal investment, BigDecimal portfolio, Date tradeDate) {
        this.userId = userId;
        this.investment = investment;
        this.portfolio = portfolio;
        this.tradeDate = tradeDate;
    }

    public PortfolioData(long userId, BigDecimal portfolio, Date tradeDate) {
        this.userId = userId;
        this.portfolio = portfolio;
        this.tradeDate = tradeDate;
    }

    public PortfolioData(long userId, BigDecimal investment, BigDecimal portfolio,
                         BigDecimal percentChange, BigDecimal annualDividend,
                         BigDecimal position, long stocks) {
        this.userId = userId;
        this.investment = investment;
        this.portfolio = portfolio;
        this.position = position;
        this.annualDividend = annualDividend;
        this.percentChange = percentChange;
        this.stocks = stocks;
    }

    public PortfolioData(long userId, BigDecimal investment, BigDecimal portfolio,
                         BigDecimal percentChange, BigDecimal position, long options) {
        this.userId = userId;
        this.investment = investment;
        this.portfolio = portfolio;
        this.position = position;
        this.percentChange = percentChange;
        this.options = options;
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

    public long getStocks() {
        return stocks;
    }

    public void setStocks(long stocks) {
        this.stocks = stocks;
    }

    public long getOptions() {
        return options;
    }

    public void setOptions(long options) {
        this.options = options;
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
