package com.stock.stock.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class OptionsChainDto {
    public Timestamp[] expirationDates;
    public boolean hasMiniOptions;
    public OptionsDetail[] options;
    public Quote quote;
    public BigDecimal[] strikes;
    public String underlyingSymbol;
}

