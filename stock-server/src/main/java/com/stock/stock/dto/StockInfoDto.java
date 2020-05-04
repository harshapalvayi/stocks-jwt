package com.stock.stock.dto;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.Date;

public class StockInfoDto {
private long userid;
private long shareid;
private String ticker;
private String name;
private BigDecimal price;
private BigDecimal dividend;
private BigDecimal shares;
private BigDecimal equity;
private BigDecimal buy;
private BigDecimal cost;
private BigDecimal high;
private BigDecimal low;
private BigDecimal percentChange;
private Date paydate;
private Date exdate;


    public long getUserid() {
    return userid;
}

    public void setUserid(long userid) {
    this.userid = userid;
}

    public long getShareid() {
    return shareid;
}

    public void setShareid(long shareid) {
    this.shareid = shareid;
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

    public void setStockName(String name) {
    this.name = name;
}

    public BigDecimal getPrice() {
    return price;
}

    public void setPrice(BigDecimal price) {
    this.price = price;
}

    public BigDecimal getDividend() {
    return dividend;
}

    public void setDividend(BigDecimal dividend) {
    this.dividend = dividend;
}

    public BigDecimal getShares() {
        return shares;
    }

    public void setShares(BigDecimal shares) {
        this.shares = shares;
    }

    public BigDecimal getEquity() {
    return equity;
}

    public void setEquity(BigDecimal equity) {
    this.equity = equity;
}

    public BigDecimal getBuy() {
    return buy;
}

    public void setBuy(BigDecimal buy) {
    this.buy = buy;
}

    public BigDecimal getCost() {
    return cost;
}

    public void setCost(BigDecimal cost) {
    this.cost = cost;
}

    public BigDecimal getHigh() {
    return high;
}

    public void setHigh(BigDecimal high) {
    this.high = high;
}

    public BigDecimal getLow() {
    return low;
}

    public void setLow(BigDecimal low) {
    this.low = low;
}

    public Date getPaydate() {
    return paydate;
}

    public void setPaydate(Date paydate) {
    this.paydate = paydate;
}

    public Date getExdate() {
    return exdate;
}

    public void setExdate(Date exdate) {
    this.exdate = exdate;
}

    public BigDecimal getPercentChange() {
        return percentChange;
    }

    public void setPercentChange(BigDecimal percentChange) {
        this.percentChange = percentChange;
    }

    public StockInfoDto() {
}

public StockInfoDto(long userid, long shareid, String ticker, String name,
                    BigDecimal price, BigDecimal dividend, BigDecimal percentChange,
                    BigDecimal shares, BigDecimal equity, BigDecimal buy, BigDecimal cost,
                    BigDecimal high, BigDecimal low, Date exdate, Date paydate) {
    this.userid = userid;
    this.shareid = shareid;
    this.ticker = ticker;
    this.name = name;
    this.price = price;
    this.percentChange = percentChange;
    this.dividend = dividend;
    this.shares = shares;
    this.equity = equity;
    this.buy = buy;
    this.cost = cost;
    this.high = high;
    this.low = low;
    this.exdate = exdate;
    this.paydate = paydate;
}

/* Sorting the list by percentage change*/
public static Comparator<StockInfoDto> stockPercentageChange = new Comparator<StockInfoDto>() {

    public int compare(StockInfoDto s1, StockInfoDto s2) {
        int compare = 0;
        if (s1.getPercentChange() != null && s2.getPercentChange() != null) {

            BigDecimal change1 = s1.getPercentChange();
            BigDecimal change2 = s2.getPercentChange();

            /*For ascending order*/
            compare = change1.compareTo(change2);

            /*For descending order*/
            //change2-change1;
        }
        return compare;
    }};

}
