package com.stock.stock.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class Options {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long optionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users userInfo;

    private Date expire;
    private String ticker;
    private Date tradeDate;
    private Integer account;
    private boolean holding;
    private Date initialDate;
    private String optionType;
    private BigDecimal contracts;
    private BigDecimal buyPrice;
    private BigDecimal sellPrice;
    private BigDecimal optionPrice;
    private BigDecimal strikePrice;

    public long getOptionId() {
        return optionId;
    }

    public void setOptionId(long optionid) {
        this.optionId = optionid;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public Users getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(Users userInfo) {
        this.userInfo = userInfo;
    }

    public BigDecimal getContracts() {
        return contracts;
    }

    public void setContracts(BigDecimal contracts) {
        this.contracts = contracts;
    }

    public BigDecimal getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(BigDecimal buy) {
        this.buyPrice = buy;
    }

    public BigDecimal getSellPrice() {
        return sellPrice;
    }

    public void setSellPrice(BigDecimal sell) {
        this.sellPrice = sell;
    }

    public BigDecimal getOptionPrice() {
        return optionPrice;
    }

    public void setOptionPrice(BigDecimal option_price) {
        this.optionPrice = option_price;
    }

    public String getOptionType() {
        return optionType;
    }

    public void setOptionType(String option_type) {
        this.optionType = option_type;
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

    public void setStrikePrice(BigDecimal call) {
        this.strikePrice = call;
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

    public void setTradeDate(Date trade_dt) {
        this.tradeDate = trade_dt;
    }

    public Date getInitialDate() {
        return initialDate;
    }

    public void setInitialDate(Date initial_dt) {
        this.initialDate = initial_dt;
    }
}
