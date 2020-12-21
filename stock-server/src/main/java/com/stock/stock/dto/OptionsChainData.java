package com.stock.stock.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class OptionsChainData {
    public Timestamp[] expirationDates;
    public boolean hasMiniOptions;
    public OptionChainDetail[] options;
    public Quote quote;
    public BigDecimal[] strikes;
    public String underlyingSymbol;
}

