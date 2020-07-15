package com.stock.stock.dto;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.Date;

public class StockInfoDto {

    private long userId;
    private String name;
    private long shareId;
    private String ticker;
    private BigDecimal cost;
    private BigDecimal low;
    private BigDecimal high;
    private BigDecimal equity;
    private BigDecimal shares;
    private BigDecimal returns;
    private BigDecimal dividend;
    private BigDecimal buyPrice;
    private BigDecimal marketPrice;
    private BigDecimal percentChange;
    private Date exDate;
    private Date payDate;
    private Date tradeDate;
    private Boolean holding;
    private Integer account;
    private String stockExchange;

    public long getUserId() {
    return userId;
}

    public void setUserId(long userId) {
    this.userId = userId;
}

    public long getShareId() {
    return shareId;
}

    public void setShareId(long shareId) {
    this.shareId = shareId;
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

    public BigDecimal getMarketPrice() {
    return marketPrice;
}

    public void setMarketPrice(BigDecimal marketPrice) {
    this.marketPrice = marketPrice;
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

    public BigDecimal getBuyPrice() {
    return buyPrice;
}

    public void setBuyPrice(BigDecimal buyPrice) {
    this.buyPrice = buyPrice;
}

    public BigDecimal getCost() {
    return cost;
}

    public void setCost(BigDecimal cost) {
    this.cost = cost;
}

    public BigDecimal getReturns() {
        return returns;
    }

    public void setReturns(BigDecimal returns) {
        this.returns = returns;
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

    public Date getPayDate() {
    return payDate;
}

    public void setPayDate(Date payDate) {
    this.payDate = payDate;
}

    public Date getExDate() {
    return exDate;
}

    public void setExDate(Date exDate) {
    this.exDate = exDate;
}

    public Date getTradeDate() {
        return tradeDate;
    }

    public void setTradeDate(Date tradeDate) {
        this.tradeDate = tradeDate;
    }

    public BigDecimal getPercentChange() {
        return percentChange;
    }

    public void setPercentChange(BigDecimal percentChange) {
        this.percentChange = percentChange;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAccount() {
        return account;
    }

    public void setAccount(Integer account) {
        this.account = account;
    }

    public String getStockExchange() {
        return stockExchange;
    }

    public void setStockExchange(String stockExchange) {
        this.stockExchange = stockExchange;
    }

    public static Comparator<StockInfoDto> getStockPercentageChange() {
        return stockPercentageChange;
    }

    public static void setStockPercentageChange(Comparator<StockInfoDto> stockPercentageChange) {
        StockInfoDto.stockPercentageChange = stockPercentageChange;
    }

    public Boolean getHolding() {
        return holding;
    }

    public void setHolding(Boolean holding) {
        this.holding = holding;
    }

    public StockInfoDto() { }

/* Sorting the list by percentage change*/
    public static Comparator<StockInfoDto> stockPercentageChange = (s1, s2) -> {
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
    };

}
