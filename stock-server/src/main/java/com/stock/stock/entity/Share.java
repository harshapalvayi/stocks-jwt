package com.stock.stock.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
public class Share {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long shareId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users userInfo;

    @OneToMany(mappedBy = "share", cascade = CascadeType.ALL)
    private List<ShareHistory> shareHistory;

    private Date exDate;
    private Date payDate;
    private String ticker;
    private Date tradeDate;
    private Integer account;
    private boolean holding;
    private Date initialDate;
    private BigDecimal shares;
    private BigDecimal buyPrice;
    private BigDecimal sellPrice;

    public long getShareId() {
        return shareId;
    }

    public void setShareId(long share_id) {
        this.shareId = share_id;
    }

    public Users getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(Users userInfo) {
        this.userInfo = userInfo;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public long getUser() {
        return userInfo.getUserId();
    }

    public void setUser(Users users) {
        this.userInfo = users;
    }

    public BigDecimal getShares() {
        return shares;
    }

    public void setShares(BigDecimal shares) {
        this.shares = shares;
    }

    public BigDecimal getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(BigDecimal buy) {
        this.buyPrice = buy;
    }

    public Date getPayDate() {
        return payDate;
    }

    public void setPayDate(Date pay_date) {
        this.payDate = pay_date;
    }

    public Date getExDate() {
        return exDate;
    }

    public void setExDate(Date ex_date) {
        this.exDate = ex_date;
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

    public BigDecimal getSellPrice() {
        return sellPrice;
    }

    public void setSellPrice(BigDecimal sell) {
        this.sellPrice = sell;
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

    public List<ShareHistory> getShareHistory() {
        return shareHistory;
    }

    public void setShareHistory(List<ShareHistory> shareHistory) {
        this.shareHistory = shareHistory;
    }

    public Share() {}

    @Override
    public String toString() {
        return "Share{" +
                "shareId=" + shareId +
                ", ticker='" + ticker + '\'' +
                ", userInfo=" + userInfo +
                ", shareHistory=" + shareHistory +
                ", payDate=" + payDate +
                ", exDate=" + exDate +
                ", tradeDate=" + tradeDate +
                ", account=" + account +
                ", holding=" + holding +
                ", initialDate=" + initialDate +
                ", shares=" + shares +
                ", buyPrice=" + buyPrice +
                ", sellPrice=" + sellPrice +
                '}';
    }
}
