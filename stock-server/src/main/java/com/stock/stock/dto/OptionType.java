package com.stock.stock.dto;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

public class OptionType {
    public BigDecimal ask;
    public BigDecimal bid;
    public BigDecimal change;
    public String contractSize;
    public String contractSymbol;
    public String currency;
    public Date expiration;
    public BigDecimal impliedVolatility;
    public Boolean inTheMoney;
    public BigDecimal lastPrice;
    public Date lastTradeDate;
    public BigInteger openInterest;
    public BigDecimal percentChange;
    public BigDecimal strike;
    public BigInteger volume;
}
