package com.stock.stock.service;

import com.stock.stock.dto.ShareData;
import com.stock.stock.entity.Stocks;
import com.stock.stock.entity.StocksActivity;
import com.stock.stock.entity.Users;
import com.stock.stock.repository.StockActivityRepository;
import com.stock.stock.repository.StockHistoryRepository;
import com.stock.stock.repository.StockRepository;
import com.stock.stock.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;
import yahoofinance.histquotes.HistoricalQuote;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TradeService {

    @Autowired
    public StockService stockService;

    @Autowired
    public StockHistoryService stockHistoryService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockActivityRepository stockActivityRepository;

    public void saveUserStockData(ShareData shareData, long userId) throws IOException, ParseException {
        String ticker = shareData.getTicker().toUpperCase();
        Stocks currentStocks = stockRepository.findByTickerAndUserId(ticker, userId);
        Users user = new Users();
        user.setUserId(userId);
        Stock yahooStock = this.stockService
                .getYahooStockDataForTradeDate(ticker, shareData.tradeDate);
        if (yahooStock != null && yahooStock.isValid()) {
            if (currentStocks != null) {
                BigDecimal shares = currentStocks.getShares().add(shareData.getShares());
                currentStocks.setShares(shares);
            } else {
                currentStocks = new Stocks();
                currentStocks.setTicker(ticker);
                currentStocks.setShares(shareData.getShares());
                currentStocks.setInitialDate(shareData.getTradeDate());
            }
            BigDecimal equity = yahooStock.getQuote(true).getPrice()
                    .multiply(shareData.getShares());
            currentStocks.setEquity(equity);
            BigDecimal cost = shareData.getBuyPrice().multiply(shareData.getShares());
            currentStocks.setCost(cost);

            if (shareData.getTradeDate() != null) {
                currentStocks.setTradeDate(shareData.getTradeDate());
            }

            if (yahooStock.getDividend().getPayDate() != null) {
                currentStocks.setPayDate(yahooStock.getDividend().getPayDate().getTime());
            }
            if (yahooStock.getDividend().getExDate() != null) {
                currentStocks.setExDate(yahooStock.getDividend().getExDate().getTime());
            }
            currentStocks.setUser(user);
            currentStocks.setHolding(true);
            currentStocks.setAccount(shareData.getAccount());
            shareData.setUser(currentStocks.getUser());
            /* Record in stocks table */
            stockRepository.save(currentStocks);
            /* Record in stock history table */
            stockHistoryService.loadUserStockHistoryDetails(currentStocks);
            /* Record in stock activity table */
            saveStockActivityData(shareData, currentStocks, yahooStock, "Buy");
        }
    }

    public void deleteUserStock(long stockId, long userId) {
        Stocks currentStocks = stockRepository.findByStockIdAndUserId(stockId, userId);
        Stock yahooStock = this.stockService.getYahooStockData(currentStocks.getTicker().toUpperCase());
        if (yahooStock != null) {
            stockRepository.delete(currentStocks);
        }
    }

    public void tradeStock(ShareData shareData, long userId) throws IOException, ParseException {
        String ticker = shareData.getTicker().toUpperCase();
        Stocks currentStocks = stockRepository.findByStockIdAndUserId(shareData.getStockId(), userId);
        Users user = userRepository.findByUserId(userId);
        Stock yahooStock = this.stockService.getYahooStockDataForTradeDate(ticker, shareData.getTradeDate());
        buyOrSellStock(shareData, ticker, currentStocks, user, yahooStock);
    }

    public void buyOrSellStock(ShareData shareData, String ticker, Stocks currentStocks, Users user, Stock yahooStock) throws IOException, ParseException {
        String action;
        if (yahooStock != null) {
            if (currentStocks != null && user != null) {
                currentStocks.setUser(user);
                currentStocks.setTicker(ticker);
                currentStocks.setStockId(shareData.getStockId());
                /* sell logic */
                if(shareData.getSellPrice() != null) {
                    action = "Sell";
                    int result = (currentStocks.getShares()).compareTo(shareData.getShares());
                    if ( result == 0) {
                        currentStocks.setShares(BigDecimal.valueOf(0));
                        currentStocks.setHolding(false);
                    } else if (result > 0) {
                        BigDecimal shares = currentStocks.getShares().subtract(shareData.getShares());
                        currentStocks.setShares(shares);
                        currentStocks.setHolding(true);
                    } else {
                        currentStocks.setShares(BigDecimal.valueOf(0));
                        currentStocks.setHolding(false);
                    }
                } else {
                    /* buy logic */
                    action = "Buy";
                    BigDecimal shares = currentStocks.getShares().add(shareData.getShares());
                    currentStocks.setShares(shares);
                    currentStocks.setHolding(true);
                }
                currentStocks.setTradeDate(shareData.getTradeDate());
                /* Record in stocks table */
                stockRepository.save(currentStocks);
                /* Record in stock history table */
                stockHistoryService.loadUserStockHistoryDetails(currentStocks);
                /* Record in stock activity table */
                saveStockActivityData(shareData, currentStocks, yahooStock, action);
            }
        }
    }

    public void saveStockActivityData(ShareData shareData,
                                      Stocks currentStocks,
                                      Stock yahooStock, String action) throws IOException {
        shareData.setStockId(currentStocks.getStockId());
        saveStockActivityDataByAction(shareData, currentStocks, yahooStock, action);
    }

    private void saveStockActivityDataByAction(ShareData share, Stocks currentStocks, Stock yahooStock, String action) throws IOException {
        BigDecimal marketPrice = null;
        List<HistoricalQuote> list = new ArrayList<>();
        String ticker = share.getTicker().toUpperCase();
        StocksActivity stockHistory = new StocksActivity();
        stockHistory.setShare(currentStocks);
        stockHistory.setTicker(ticker);
        stockHistory.setUserId(currentStocks.getUser().getUserId());
        stockHistory.setName(yahooStock.getName());
        if ("Buy".equals(action)) {
            stockHistory.setSharePrice(share.getBuyPrice());
        } else {
            stockHistory.setSharePrice(share.getSellPrice());
        }
        if (yahooStock.getHistory().size() > 0) {
            list =  yahooStock.getHistory().stream()
                    .filter(data -> DateService.convertCalenderToString(data.getDate())
                            .equals(DateService.convertDateToString(share.getTradeDate())))
                    .collect(Collectors.toList());
            if (list.size() > 0) {
                marketPrice = list.get(0).getClose();
            } else {
                Stock stock = this.stockService.getYahooStockData(share.getTicker().toUpperCase());
                marketPrice = stock.getQuote().getPrice();
            }

        }
        stockHistory.setAction(action);
        stockHistory.setMarketPrice(marketPrice);
        stockHistory.setShares(share.getShares());
        stockHistory.setTradeDate(share.getTradeDate());
        stockActivityRepository.save(stockHistory);
    }

}
