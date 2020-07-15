package com.stock.stock.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class OptionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private long userId;
    private String ticker;
    private Date expire;
    private BigDecimal contracts;

    @ManyToOne
    @JoinColumn(name="optionId")
    private Options option;

    private String action;
    private Date tradeDate;
    private String optionType;
    private BigDecimal strikePrice;
    private BigDecimal actionPrice;
    private BigDecimal optionPrice;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Date getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(Date tradeDate) {
        this.tradeDate = tradeDate;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Options getOption() {
        return option;
    }

    public void setOption(Options option) {
        this.option = option;
    }

    public BigDecimal getContracts() {
        return contracts;
    }

    public void setContracts(BigDecimal contracts) {
        this.contracts = contracts;
    }

    public String getOptionType() {
        return optionType;
    }

    public void setOptionType(String option_type) {
        this.optionType = option_type;
    }

    public BigDecimal getOptionPrice() {
        return optionPrice;
    }

    public void setOptionPrice(BigDecimal optionPrice) {
        this.optionPrice = optionPrice;
    }

    public BigDecimal getStrikePrice() {
        return strikePrice;
    }

    public void setStrikePrice(BigDecimal call) {
        this.strikePrice = call;
    }

    public Date getExpire() {
        return expire;
    }

    public void setExpire(Date expire) {
        this.expire = expire;
    }

    public BigDecimal getActionPrice() {
        return actionPrice;
    }

    public void setActionPrice(BigDecimal buy) {
        this.actionPrice = buy;
    }

    public OptionHistory() { }

    @Override
    public String toString() {
        return "OptionHistory{" +
                "id=" + id +
                ", ticker='" + ticker + '\'' +
                ", name='" + name + '\'' +
                ", user_id=" + userId +
                ", option=" + option +
                ", contracts=" + contracts +
                ", expire=" + expire +
                ", action='" + action + '\'' +
                ", option_type=" + optionType +
                ", strike_price=" + strikePrice +
                ", option_price=" + actionPrice +
                ", trade_dt=" + tradeDate +
                '}';
    }
}
