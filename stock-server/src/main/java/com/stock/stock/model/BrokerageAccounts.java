package com.stock.stock.model;

public class BrokerageAccounts {
    private Integer value;
    private BrokerageEnums text;
    private String url;

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public BrokerageEnums getText() {
        return text;
    }

    public void setText(BrokerageEnums text) {
        this.text = text;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public BrokerageAccounts(Integer value, BrokerageEnums text, String url) {
        this.value = value;
        this.text = text;
        this.url = url;
    }
}