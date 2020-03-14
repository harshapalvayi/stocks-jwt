package com.stock.stock.model;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class StockDetails implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private long stock_id;

    private String ticker;

    private String stock;

    private BigDecimal price;

    private BigDecimal dividend;

    private BigDecimal high;

    private BigDecimal low;

    @Temporal(TemporalType.DATE)
    private Date pay_date;

    @Temporal(TemporalType.DATE)
    private Date ex_date;

    public StockDetails() {

    }

    public StockDetails(String ticker) {
        this.ticker = ticker;
    }

    public long getStock_id() { return stock_id; }

    public void setStock_id(long stock_id) { this.stock_id = stock_id; }

    public String getTicker() { return ticker; }

    public void setTicker(String ticker) { this.ticker = ticker; }

    public String getStock() { return stock; }

    public void setStock(String stock) { this.stock = stock; }

    public BigDecimal getPrice() { return price; }

    public BigDecimal getDividend() { return dividend; }

    public BigDecimal getHigh() { return high; }

    public void setHigh(BigDecimal high) { this.high = high; }

    public BigDecimal getLow() { return low; }

    public void setLow(BigDecimal low) { this.low = low; }

    public void setDividend(BigDecimal dividend) {
        this.dividend = dividend;
    }

    public Date getPay_date() {
        return pay_date;
    }

    public void setPay_date(Date pay_date) {
        this.pay_date = pay_date;
    }

    public Date getEx_date() {
        return ex_date;
    }

    public void setEx_date(Date ex_date) {
        this.ex_date = ex_date;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public boolean isValid() {
        return this.ticker != null;
    }

    public StockDetails(String ticker, String stock, BigDecimal price, BigDecimal high, BigDecimal low,
                        BigDecimal dividend, Date pay_date, Date ex_date) {
        this.ticker = ticker;
        this.stock = stock;
        this.price = price;
        this.dividend = dividend;
        this.high = high;
        this.low = low;
        this.pay_date = pay_date;
        this.ex_date = ex_date;
    }

    public StockDetails(long stock_id, BigDecimal price, BigDecimal high, BigDecimal low,
                        BigDecimal dividend, Date pay_date, Date ex_date) {
        this.stock_id = stock_id;
        this.price = price;
        this.dividend = dividend;
        this.high = high;
        this.low = low;
        this.pay_date = pay_date;
        this.ex_date = ex_date;
    }
}
