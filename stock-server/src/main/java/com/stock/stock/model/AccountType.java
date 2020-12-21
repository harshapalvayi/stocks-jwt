package com.stock.stock.model;

public class AccountType {

    private long stockId;

    private long optionId;

    private long userId;

    private Integer account;

    public AccountType() { }

    public AccountType(long stockId,
                       long optionId,
                       long userId,
                       Integer account) {
        this.stockId = stockId;
        this.optionId = optionId;
        this.userId = userId;
        this.account = account;
    }

    public long getStockId() {
        return stockId;
    }

    public void setStockId(long stockId) {
        this.stockId = stockId;
    }

    public long getOptionId() {
        return optionId;
    }

    public void setOptionId(long optionId) {
        this.optionId = optionId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Integer getAccount() {
        return account;
    }

    public void setAccount(Integer account) {
        this.account = account;
    }
}
