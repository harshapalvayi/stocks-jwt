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

    private BigDecimal portfolio;

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

    public Portfolio() {}

    @Override
    public String toString() {
        return String.format(
                "portfolio[portfolioId=%d, equity=%f, investment='%f', dividend='%f']",
                portfolioId, portfolio, investment, annualDividend);
    }
}
