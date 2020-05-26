package com.stock.stock.model;

public class AccountType {

    private long shareid;

    private long optionid;

    private long userid;

    private Integer account;

    public AccountType() { }

    public AccountType(long share, long option, long user, Integer account) {
        this.shareid = share;
        this.optionid = option;
        this.userid = user;
        this.account = account;
    }

    public long getShareid() {
        return shareid;
    }

    public void setShareid(long shareid) {
        this.shareid = shareid;
    }

    public long getOptionid() {
        return optionid;
    }

    public void setOptionid(long optionid) {
        this.optionid = optionid;
    }

    public long getUserid() {
        return userid;
    }

    public void setUserid(long userid) {
        this.userid = userid;
    }

    public Integer getAccount() {
        return account;
    }

    public void setAccount(Integer account) {
        this.account = account;
    }
}
