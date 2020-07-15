package com.stock.stock.dto;

import java.util.Date;

public class OptionsDetail {
    public OptionType[] calls;
    public Date expirationDate;
    public boolean hasMiniOptions;
    public OptionType[] puts;
}
