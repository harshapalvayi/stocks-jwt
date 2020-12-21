package com.stock.stock.service;

import com.stock.stock.entity.Stocks;
import com.stock.stock.entity.StocksHistory;
import com.stock.stock.repository.StockHistoryRepository;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;
import yahoofinance.histquotes.HistoricalQuote;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockHistoryService {

    public final StockService stockService;

    private final StockHistoryRepository stockHistoryRepository;

    public StockHistoryService(StockService stockService,
                               StockHistoryRepository stockHistoryRepository) {
        this.stockService = stockService;
        this.stockHistoryRepository = stockHistoryRepository;
    }

    public List<StocksHistory> getUserStockHistoryData(long userId, Date tradeDate) throws IOException {
        List<StocksHistory> stockInfo = new ArrayList<>();
        if (tradeDate != null) {
            String stringDate = DateService.convertDateToString(tradeDate);
            List<StocksHistory> userStocks = stockHistoryRepository.findByUserIdAndTradeDate(userId, stringDate);
            if (userStocks.size() > 0) {
                stockInfo.addAll(userStocks);
            }
        }
        return stockInfo;
    }

    public void loadUserStockHistoryDetails(Stocks stockData) throws IOException, ParseException {
        if (stockData != null) {
            recordStockHistory(stockData);
        } else {
            List<Stocks> stocksInfo = this.stockService.getAllUserActiveStocks();
            for (Stocks stock: stocksInfo) {
                recordStockHistory(stock);
            }
        }
    }

    public void recordStockHistory(Stocks stock) throws IOException, ParseException {
        StocksHistory userStock;
        Date tradeDate = stock.getInitialDate();
        Date currDate = new Date();
        ArrayList<Date> dates = DateService.calculateAllDatesUntil(tradeDate);
        for (Date date: dates) {
            Stock yahooStock = this.stockService.getYahooStockDataForTradeDate(stock.getTicker(), date);
            List<HistoricalQuote> list =  yahooStock.getHistory().stream()
                        .filter(data -> DateService.convertCalenderToString(data.getDate())
                                .equals(DateService.convertDateToString(date)))
                        .collect(Collectors.toList());
            if (list.size() > 0) {
                String stringDate = DateService.convertDateToString(date);
                userStock = stockHistoryRepository
                        .findByStockIdAndUserIdAndTradeDate(stock.getStockId(),
                                stock.getUser().getUserId(), stringDate);
                if (userStock == null) {
                    userStock = new StocksHistory();
                }
                userStock.setUserId(stock.getUser().getUserId());
                userStock.setStockId(stock.getStockId());
                userStock.setTicker(stock.getTicker());
                userStock.setShares(stock.getShares());
                if (DateService.compareDates(currDate, date)) {
                    userStock.setMarketPrice(yahooStock.getQuote().getPrice());
                } else {
                    userStock.setMarketPrice(list.get(0).getClose());
                }
                userStock.setTradeDate(date);
                stockHistoryRepository.save(userStock);
            }
        }
    }
}
