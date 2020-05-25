package com.stock.stock.controller;

import com.stock.stock.model.Stock;
import com.stock.stock.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Date;

@RestController
@RequestMapping(value = "/api")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping(value = "/stocks/{userId}/{ticker}")
    public Stock getStockDetails(@PathVariable long userId,
                                 @PathVariable String ticker) {
        yahoofinance.Stock stock = this.stockService.getYahooStockData(ticker);

        Date exDate = stock.getDividend().getExDate() != null ? stock.getDividend().getExDate().getTime(): null;
        Date payDate = stock.getDividend().getPayDate() != null ? stock.getDividend().getPayDate().getTime(): null;

        Stock stockDetails = new Stock(stock.getSymbol(),
                stock.getName(),
                stock.getQuote().getPrice(),
                stock.getDividend().getAnnualYield(),
                payDate,
                exDate,
                stock.getQuote().getYearHigh(),
                stock.getQuote().getYearLow());
        return stockDetails;
    }

}
