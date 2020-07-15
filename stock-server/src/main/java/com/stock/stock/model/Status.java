package com.stock.stock.model;

public enum Status {
    SUCCESS,
    FAILURE,
    NOT_FOUND,
    INVALID_REQUEST;

    Status() { }

    public String value() {
        return this.name();
    }
}
