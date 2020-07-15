package com.stock.stock.dto;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

public class Quote {
    public String symbol;
    public Date dividendDate;
    public BigDecimal twoHundredDayAverageChangePercent;
    public BigDecimal fiftyTwoWeekLowChangePercent;
    public String language;
    public BigDecimal ask;
    public BigInteger askSize;
    public BigInteger averageDailyVolume3Month;
    public BigInteger averageDailyVolume10Day;
    public BigDecimal bid;
    public BigInteger bidSize;
    public BigDecimal bookValue;
    public String currency;
    public String displayName;
    public Date earningsTimestamp;
    public Date earningsTimestampEnd;
    public Date earningsTimestampStart;
    public BigDecimal epsForward;
    public BigDecimal epsTrailingTwelveMonths;
    public Boolean esgPopulated;
    public String exchange;
    public Integer exchangeDataDelayedBy;
    public String exchangeTimezoneName;
    public String exchangeTimezoneShortName;
    public BigDecimal fiftyDayAverage;
    public BigDecimal fiftyDayAverageChange;
    public BigDecimal fiftyDayAverageChangePercent;
    public BigDecimal fiftyTwoWeekHigh;
    public BigDecimal fiftyTwoWeekHighChange;
    public BigDecimal fiftyTwoWeekHighChangePercent;
    public BigDecimal fiftyTwoWeekLow;
    public BigDecimal fiftyTwoWeekLowChange;
    public String fiftyTwoWeekRange;
    public String financialCurrency;
    public Date firstTradeDateMilliseconds;
    public BigDecimal forwardPE;
    public String fullExchangeName;
    public BigDecimal gmtOffSetMilliseconds;
    public String longName;
    public String market;
    public BigInteger marketCap;
    public String marketState;
    public String messageBoardId;
    public BigDecimal postMarketChange;
    public BigDecimal postMarketChangePercent;
    public BigDecimal postMarketPrice;
    public Date postMarketTime;
    public Integer priceHint;
    public BigDecimal priceToBook;
    public String quoteSourceName;
    public String quoteType;
    public String region;
    public BigDecimal regularMarketChange;
    public BigDecimal regularMarketChangePercent;
    public BigDecimal regularMarketDayHigh;
    public BigDecimal regularMarketDayLow;
    public String regularMarketDayRange;
    public BigDecimal regularMarketOpen;
    public BigDecimal regularMarketPreviousClose;
    public BigDecimal regularMarketPrice;
    public Date regularMarketTime;
    public BigInteger regularMarketVolume;
    public BigInteger sharesOutstanding;
    public String shortName;
    public Integer sourceInterval;
    public Boolean tradeable;
    public BigDecimal trailingAnnualDividendRate;
    public BigDecimal trailingAnnualDividendYield;
    public BigDecimal trailingPE;
    public Boolean triggerable;
    public BigDecimal twoHundredDayAverage;
    public BigDecimal twoHundredDayAverageChange;
}
