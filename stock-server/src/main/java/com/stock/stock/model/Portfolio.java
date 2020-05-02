package com.stock.stock.model;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="portfolio")
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long portfolioId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    private Users userInfo;

    private BigDecimal investment;

    private BigDecimal equity;

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
        return equity;
    }

    public void setPortfolio(BigDecimal portfolio) {
        this.equity = portfolio;
    }

    public Portfolio() {}

    @Override
    public String toString() {
        return String.format(
                "portfolio[portfolioId=%d, equity=%f, investment='%f']",
                portfolioId, equity, investment);
    }
}
