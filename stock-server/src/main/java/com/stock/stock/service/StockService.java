package com.stock.stock.service;

import org.springframework.stereotype.Service;
import yahoofinance.YahooFinance;

import java.io.IOException;
import java.util.Calendar;

@Service
public class StockService {

    public yahoofinance.Stock getYahooStockData(String quote) {
        try {
            return YahooFinance.get(quote);
        } catch (IOException e) {
            e.printStackTrace();
            return new yahoofinance.Stock(quote);
        }
    }

    public yahoofinance.Stock getHistoricalStockData(String quote, Calendar from, Calendar to) {
        try {
            return YahooFinance.get(quote, from, to);
        } catch (IOException e) {
            e.printStackTrace();
            return new yahoofinance.Stock(quote);
        }
    }
}
