package com.stock.stock.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long portfolioId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users userInfo;

    private Date tradeDate;
    private BigDecimal portfolio;
    private BigDecimal investment;
    private BigDecimal annualDividend;


    public long getPortfolioId() {
        return portfolioId;
    }

    public void setPortfolioId(long portfolioId) {
        this.portfolioId = portfolioId;
    }

    public Users getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(Users userInfo) {
        this.userInfo = userInfo;
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

    public Date getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(Date trade_dt) {
        this.tradeDate = trade_dt;
    }

    public Portfolio() { }

    @Override
    public String toString() {
        return "Portfolio{" +
                "portfolioId=" + portfolioId +
                ", userInfo=" + userInfo +
                ", investment=" + investment +
                ", portfolio=" + portfolio +
                ", annualDividend=" + annualDividend +
                ", tradeDate=" + tradeDate +
                '}';
    }
}
