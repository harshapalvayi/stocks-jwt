package com.stock.stock.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
public class Options {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long optionId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users user;

    @OneToMany(mappedBy = "option", cascade = CascadeType.ALL)
    private List<OptionsActivity> optionsActivities;

    private Date expire;
    private String ticker;
    private Date tradeDate;
    private Integer account;
    private boolean holding;
    private Date initialDate;
    private String optionType;
    private String optionSymbol;
    private BigDecimal contracts;
    private BigDecimal cost;
    private BigDecimal equity;
    private BigDecimal optionPrice;
    private BigDecimal strikePrice;

    public long getOptionId() {
        return optionId;
    }

    public void setOptionId(long optionId) {
        this.optionId = optionId;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public Users getUser() {
        return user;
    }

    public long getUserId() {
        return user.getUserId();
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public BigDecimal getContracts() {
        return contracts;
    }

    public void setContracts(BigDecimal contracts) {
        this.contracts = contracts;
    }

    public BigDecimal getOptionPrice() {
        return optionPrice;
    }

    public void setOptionPrice(BigDecimal optionPrice) {
        this.optionPrice = optionPrice;
    }

    public String getOptionType() {
        return optionType;
    }

    public void setOptionType(String optionType) {
        this.optionType = optionType;
    }

    public boolean isHolding() {
        return holding;
    }

    public void setHolding(boolean holding) {
        this.holding = holding;
    }

    public Integer getAccount() {
        return account;
    }

    public void setAccount(Integer account) {
        this.account = account;
    }

    public BigDecimal getStrikePrice() {
        return strikePrice;
    }

    public void setStrikePrice(BigDecimal strikePrice) {
        this.strikePrice = strikePrice;
    }

    public Date getExpire() {
        return expire;
    }

    public void setExpire(Date expire) {
        this.expire = expire;
    }

    public Date getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(Date tradeDate) {
        this.tradeDate = tradeDate;
    }

    public Date getInitialDate() {
        return initialDate;
    }

    public void setInitialDate(Date initialDate) {
        this.initialDate = initialDate;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public BigDecimal getEquity() {
        return equity;
    }

    public void setEquity(BigDecimal equity) {
        this.equity = equity;
    }

    public List<OptionsActivity> getOptionHistory() {
        return optionsActivities;
    }

    public void setOptionHistory(List<OptionsActivity> optionsActivities) {
        this.optionsActivities = optionsActivities;
    }

    public String getOptionSymbol() {
        return optionSymbol;
    }

    public void setOptionSymbol(String optionSymbol) {
        this.optionSymbol = optionSymbol;
    }

    @Override
    public String toString() {
        return "Options{" +
                "optionId=" + optionId +
                ", user=" + user +
                ", optionsActivities=" + optionsActivities +
                ", expire=" + expire +
                ", ticker='" + ticker + '\'' +
                ", tradeDate=" + tradeDate +
                ", account=" + account +
                ", holding=" + holding +
                ", initialDate=" + initialDate +
                ", optionType='" + optionType + '\'' +
                ", optionSymbol='" + optionSymbol + '\'' +
                ", contracts=" + contracts +
                ", cost=" + cost +
                ", equity=" + equity +
                ", optionPrice=" + optionPrice +
                ", strikePrice=" + strikePrice +
                '}';
    }
}
