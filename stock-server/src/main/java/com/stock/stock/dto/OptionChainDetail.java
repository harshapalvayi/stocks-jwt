package com.stock.stock.dto;

import java.util.Date;

public class OptionChainDetail {
    public OptionDetailData[] calls;
    public Date expirationDate;
    public boolean hasMiniOptions;
    public OptionDetailData[] puts;
}
