package com.stock.stock.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class OptionsActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private long userId;
    private String ticker;
    private Date expire;
    private BigDecimal contracts;
    private String optionSymbol;

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

    public long getOptionId() {
        return option.getOptionId();
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

    public void setOptionType(String optionType) {
        this.optionType = optionType;
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

    public void setStrikePrice(BigDecimal strikePrice) {
        this.strikePrice = strikePrice;
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

    public String getOptionSymbol() {
        return optionSymbol;
    }

    public void setOptionSymbol(String optionSymbol) {
        this.optionSymbol = optionSymbol;
    }

    public OptionsActivity() { }

    @Override
    public String toString() {
        return "OptionHistory{" +
                "id=" + id +
                ", ticker='" + ticker + '\'' +
                ", name='" + name + '\'' +
                ", userId=" + userId +
                ", option=" + option +
                ", contracts=" + contracts +
                ", expire=" + expire +
                ", action='" + action + '\'' +
                ", optionType=" + optionType +
                ", strikePrice=" + strikePrice +
                ", optionPrice=" + actionPrice +
                ", tradeDate=" + tradeDate +
                '}';
    }
}
