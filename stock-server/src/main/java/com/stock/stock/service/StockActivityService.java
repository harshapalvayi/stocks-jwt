package com.stock.stock.service;

import com.stock.stock.dto.StockActivityData;
import com.stock.stock.entity.StocksActivity;
import com.stock.stock.repository.StockActivityRepository;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class StockActivityService {

    public final StockService stockService;

    private final StockActivityRepository stockActivityRepository;

    public StockActivityService(StockService stockService,
                               StockActivityRepository stockActivityRepository) {
        this.stockService = stockService;
        this.stockActivityRepository = stockActivityRepository;
    }
    public List<StockActivityData> getUserStockActivityData(long userId) throws IOException {
        List<StockActivityData> stockInfo = new ArrayList<>();
        List<StocksActivity> userShares = stockActivityRepository.findByUserId(userId);
        getUserStockActivityList(stockInfo, userShares, userId);
        return stockInfo;
    }

    public List<StockActivityData> getUserStockActivityDataUntilTradeDate(long userId, Date tradeDate) throws IOException {
        List<StockActivityData> stockInfo = new ArrayList<>();
        if (tradeDate != null) {
            String date = DateService.convertDateToString(tradeDate);
            List<StocksActivity> userStocks = stockActivityRepository.findByUserIdAndUntilTradeDate(userId, date);
            if (userStocks.size() > 0) {
                getUserStockActivityList(stockInfo, userStocks, userId);
            }
        }
        return stockInfo;
    }

    public List<StockActivityData> getUserStockActivityDataForTradeDate(long userId, Date tradeDate) throws IOException {
        List<StockActivityData> stockInfo = new ArrayList<>();
        if (tradeDate != null) {
            String date = DateService.convertDateToString(tradeDate);
            List<StocksActivity> userShares = stockActivityRepository.findByUserIdAndTradeDate(userId, date);
            getUserStockActivityList(stockInfo, userShares, userId);
        }
        return stockInfo;
    }

    public List<StockActivityData> getUserStockActivityDataByTicker(long userId, String ticker) throws IOException {
        List<StockActivityData> stockInfo = new ArrayList<>();
        List<StocksActivity> userShares = stockActivityRepository.findByUserIdAndTicker(userId, ticker.toUpperCase());
        getUserStockActivityList(stockInfo, userShares, userId);
        return stockInfo;
    }

    public void getUserStockActivityList(List<StockActivityData> stockInfo, List<StocksActivity> shares, long userId) throws IOException {
        for (StocksActivity share : shares) {
            String ticker = share.getTicker().toUpperCase();
            Stock yahooStock = this.stockService.getYahooStockData(ticker);
            StockActivityData stockHistory = new StockActivityData();
            if (yahooStock.isValid()) {
                generateUserStockActivityData(share, yahooStock, stockHistory, userId);
                stockInfo.add(stockHistory);
            }
        }
    }

    public void generateUserStockActivityData(StocksActivity share,
                                              Stock yahooStock,
                                              StockActivityData stockHistory,
                                              long userId) throws IOException {
        BigDecimal returns;
        BigDecimal buyPrice = stockActivityRepository.getShareBuyPrice(share.getTicker(), userId);
        BigDecimal sharesByUserId = stockActivityRepository.getBuySharesByUserId(share.getTicker(), userId);
        BigDecimal buyAvg =  buyPrice.divide(sharesByUserId, RoundingMode.FLOOR);
        String name = yahooStock.getName();
        BigDecimal sharePrice = share.getSharePrice();
        BigDecimal change = yahooStock.getQuote(true).getChangeInPercent();
        stockHistory.setTicker(share.getTicker());
        stockHistory.setShares(share.getShares());
        stockHistory.setName(name);
        stockHistory.setSharePrice(sharePrice);
        stockHistory.setPercentChange(change);
        stockHistory.setStockId(share.getShare().getStockId());
        stockHistory.setCost((share.getShares()).multiply(sharePrice));
        stockHistory.setMarketPrice(share.getMarketPrice());
        stockHistory.setEquity((share.getShares()).multiply(share.getMarketPrice()));
        stockHistory.setAction(share.getAction());
        if ("Sell".equals(stockHistory.getAction())) {
            returns = stockHistory.getSharePrice()
                    .multiply(stockHistory.getShares())
                    .subtract(buyAvg.multiply(stockHistory.getShares()));
        } else {
            returns = stockHistory.getEquity().subtract(stockHistory.getCost());
        }
        stockHistory.setReturns(returns);
        stockHistory.setTradeDate(share.getTradeDate());
    }

}
