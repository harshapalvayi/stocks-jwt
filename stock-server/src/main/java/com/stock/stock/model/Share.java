package com.stock.stock.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="share")
public class Share {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long shareid;

    private String ticker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    private Users userInfo;

    private Integer shares;

    private BigDecimal buy;

    private Date paydate;

    private Date exdate;

    private BigDecimal sell;

    private boolean holding;

    public long getShareid() {
        return shareid;
    }

    public void setShareid(long shareid) {
        this.shareid = shareid;
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
        return userInfo.getUserid();
    }

    public void setUser(Users users) {
        this.userInfo = users;
    }

    public Integer getShares() {
        return shares;
    }

    public void setShares(Integer shares) {
        this.shares = shares;
    }

    public BigDecimal getBuy() {
        return buy;
    }

    public void setBuy(BigDecimal buy) {
        this.buy = buy;
    }

    public Date getPaydate() {
        return paydate;
    }

    public void setPaydate(Date pay_date) {
        this.paydate = pay_date;
    }

    public Date getExdate() {
        return exdate;
    }

    public void setExdate(Date ex_date) {
        this.exdate = ex_date;
    }

    public BigDecimal getSell() {
        return sell;
    }

    public void setSell(BigDecimal sell) {
        this.sell = sell;
    }

    public boolean isHolding() {
        return holding;
    }

    public void setHolding(boolean holding) {
        this.holding = holding;
    }

    public Share() {}

    @Override
    public String toString() {
        return String.format(
                "Share[shareId=%d, shares=%d, buy='%f', payDate='%s', exDate='%s', sell='%f', holding='%b']",
                shareid, shares, buy, paydate, exdate, sell, holding);
    }
}
