package com.stock.stock.dto;

import java.math.BigDecimal;
import java.util.Date;

public class StockPdfDto {

    private String description;
    private String symbol;
    private String acctType;
    private String transaction;
    private Date date;
    private BigDecimal qty;
    private BigDecimal price;
    private BigDecimal debit;
    private BigDecimal credit;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getAcctType() {
        return acctType;
    }

    public void setAcctType(String acctType) {
        this.acctType = acctType;
    }

    public String getTransaction() {
        return transaction;
    }

    public void setTransaction(String transaction) {
        this.transaction = transaction;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public BigDecimal getQty() {
        return qty;
    }

    public void setQty(BigDecimal qty) {
        this.qty = qty;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getDebit() {
        return debit;
    }

    public void setDebit(BigDecimal debit) {
        this.debit = debit;
    }

    public BigDecimal getCredit() {
        return credit;
    }

    public void setCredit(BigDecimal credit) {
        this.credit = credit;
    }

    @Override
    public String toString() {
        return "StockPdfDto{" +
                "description='" + description + '\'' +
                ", symbol='" + symbol + '\'' +
                ", acctType='" + acctType + '\'' +
                ", transaction='" + transaction + '\'' +
                ", date=" + date +
                ", qty=" + qty +
                ", price=" + price +
                ", debit=" + debit +
                ", credit=" + credit +
                '}';
    }
}
