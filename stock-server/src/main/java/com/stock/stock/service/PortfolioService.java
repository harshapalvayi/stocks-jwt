package com.stock.stock.service;

import com.stock.stock.dto.*;
import com.stock.stock.entity.OptionsHistory;
import com.stock.stock.entity.StocksHistory;
import com.stock.stock.repository.OptionActivityRepository;
import com.stock.stock.repository.StockActivityRepository;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
public class PortfolioService {

    private final StockService stockService;

    private final OptionService optionService;

    private final StockHistoryService stockHistoryService;

    private final StockActivityService stockActivityService;

    private final OptionHistoryService optionHistoryService;

    private final OptionActivityService optionActivityService;

    private final StockActivityRepository stockActivityRepository;

    private final OptionActivityRepository optionActivityRepository;

    public PortfolioService(StockService stockService,
                            OptionService optionService,
                            StockHistoryService stockHistoryService,
                            OptionHistoryService optionHistoryService,
                            StockActivityService stockActivityService,
                            OptionActivityService optionActivityService,
                            StockActivityRepository stockActivityRepository,
                            OptionActivityRepository optionActivityRepository) {
        this.stockService = stockService;
        this.optionService = optionService;
        this.stockActivityService = stockActivityService;
        this.optionActivityService = optionActivityService;
        this.stockHistoryService = stockHistoryService;
        this.optionHistoryService = optionHistoryService;
        this.stockActivityRepository = stockActivityRepository;
        this.optionActivityRepository = optionActivityRepository;
    }

    public PortfolioData getTotalPortfolio(long userId) throws IOException {
        long stocks = 0;
        long options = 0;
        BigDecimal position;
        BigDecimal investment;
        Date tradeDate = new Date();
        BigDecimal percent = BigDecimal.valueOf(0.0);
        BigDecimal portfolio = BigDecimal.valueOf(0.0);
        BigDecimal annualDividend = BigDecimal.valueOf(0.0);
        BigDecimal optionMarketPrice = BigDecimal.valueOf(0.0);
        BigDecimal allSharePrice = stockActivityRepository.getAllShares(userId);
        BigDecimal allOptionPrice = optionActivityRepository.getAllOptions(userId);
        List<StocksData> stockList = this.stockService.getUserActiveStocksInfoData(userId);
        List<OptionsData> optionsList = this.optionService.getOptionsInfoData(userId);
        List<StockActivityData> stockHistoryList = this.stockActivityService.getUserStockActivityData(userId);
        List<OptionActivityData> optionHistoryList = this.optionActivityService.getUserOptionActivityData(userId);

        // calculate total investment for options and stocks
        investment = allSharePrice.add(allOptionPrice);

        // calculate portfolio based on current price of stock and options
        for (StockActivityData stock: stockHistoryList) {
            String ticker = stock.getTicker();
            Stock yahooStock = this.stockService.getYahooStockData(ticker);
            BigDecimal marketPrice = yahooStock.getQuote(true).getPrice();
            if ("Buy".equals(stock.getAction())) {
                portfolio = portfolio.add(marketPrice.multiply(stock.getShares()));
            } else {
                BigDecimal buyPrice = stockActivityRepository.getShareBuyPrice(stock.getTicker(), userId);
                BigDecimal sharesByUserId = stockActivityRepository.getBuySharesByUserId(stock.getTicker(), userId);
                BigDecimal proOrLoss = (stock.getSharePrice().multiply(stock.getShares()))
                        .subtract((buyPrice.divide(sharesByUserId, RoundingMode.FLOOR)).multiply(stock.getShares()));
                BigDecimal currentPrice = stock.getSharePrice().multiply(stock.getShares());
                if (currentPrice.compareTo(buyPrice) > 0) {
                    portfolio = portfolio.subtract(proOrLoss);
                } else {
                    portfolio = portfolio.add(proOrLoss);
                }
            }
        }

        for (StocksData list: stockList) {
            BigDecimal dividend = list.getDividend();
            if (dividend != null) {
                BigDecimal yearlyDividend = dividend.multiply(list.getShares());
                annualDividend = annualDividend.add(yearlyDividend);
            }
            stocks++;
        }

        for (OptionsData list: optionsList) {
            BigDecimal optionPrice = list.getOptionPrice();
            optionMarketPrice = optionMarketPrice.add(optionPrice);
            options++;
        }

        for (OptionActivityData option: optionHistoryList) {
            if ("Buy".equals(option.getAction())) {
                portfolio = portfolio.add(optionMarketPrice
                        .multiply(option.getContracts().multiply(BigDecimal.valueOf(100))));
            } else {
                BigDecimal buyPrice = optionActivityRepository.getOptionBuyPrice(option.getTicker(), userId);
                BigDecimal optionsByUserId = optionActivityRepository.getBuyOptionsByUserId(option.getTicker(), userId);
                BigDecimal proOrLoss = (option.getOptionPrice()
                        .multiply(option.getContracts().multiply(BigDecimal.valueOf(100))))
                        .subtract((buyPrice.divide(optionsByUserId, RoundingMode.FLOOR))
                                .multiply(option.getContracts().multiply(BigDecimal.valueOf(100))));
                portfolio = portfolio.add(proOrLoss);
            }
        }

        position = portfolio.subtract(investment);
        BigDecimal absPosition = position.abs();
        if (absPosition.compareTo(BigDecimal.valueOf(0.0)) > 0 &&
                investment.compareTo(BigDecimal.valueOf(0.0)) > 0) {
            percent = (absPosition.divide(investment, RoundingMode.FLOOR))
                    .multiply(BigDecimal.valueOf(100));
        }
        return new PortfolioData(userId,
                                investment.setScale(2, BigDecimal.ROUND_FLOOR),
                                portfolio.setScale(2, BigDecimal.ROUND_FLOOR),
                                annualDividend.setScale(2, BigDecimal.ROUND_FLOOR),
                                percent.setScale(2, BigDecimal.ROUND_FLOOR),
                                position.setScale(2, BigDecimal.ROUND_FLOOR),
                                stocks,
                                options,
                                tradeDate);
    }

    public PortfolioData getStockPortfolio(long userId) throws IOException {
        long stocks = 0;
        BigDecimal position;
        BigDecimal investment;
        BigDecimal percent = BigDecimal.valueOf(0.0);
        BigDecimal portfolio = BigDecimal.valueOf(0.0);
        BigDecimal annualDividend = BigDecimal.valueOf(0.0);
        List<StocksData> stockList = this.stockService.getUserActiveStocksInfoData(userId);
        List<StockActivityData> stockHistoryList = this.stockActivityService.getUserStockActivityData(userId);

        // calculate total investment for stocks.
        investment = stockActivityRepository.getAllShares(userId);

        // calculate portfolio based on current price of stock.
        for (StockActivityData stock: stockHistoryList) {
            String ticker = stock.getTicker();
            Stock yahooStock = this.stockService.getYahooStockData(ticker);
            BigDecimal marketPrice = yahooStock.getQuote().getPrice();
            if ("Buy".equals(stock.getAction())) {
                portfolio = portfolio.add(marketPrice.multiply(stock.getShares()));
            } else {
                BigDecimal buyPrice = stockActivityRepository.getShareBuyPrice(stock.getTicker(), userId);
                BigDecimal sharesByUserId = stockActivityRepository.getBuySharesByUserId(stock.getTicker(), userId);
                BigDecimal proOrLoss = (stock.getSharePrice().multiply(stock.getShares()))
                        .subtract((buyPrice.divide(sharesByUserId, RoundingMode.FLOOR)).multiply(stock.getShares()));
                portfolio = portfolio.add(proOrLoss);
            }
        }

        for (StocksData list: stockList) {
            BigDecimal dividend = list.getDividend();
            if (dividend != null) {
                BigDecimal yearlyDividend = dividend.multiply(list.getShares());
                annualDividend = annualDividend.add(yearlyDividend);
            }
            stocks++;
        }

        position = portfolio.subtract(investment);
        BigDecimal absPosition = position.abs();

        if (absPosition.compareTo(BigDecimal.valueOf(0.0)) > 0) {
            percent = (absPosition.divide(investment, RoundingMode.FLOOR))
                    .multiply(BigDecimal.valueOf(100));
        }
        return new PortfolioData(userId,
                investment.setScale(2, BigDecimal.ROUND_FLOOR),
                portfolio.setScale(2, BigDecimal.ROUND_FLOOR),
                percent.setScale(2, BigDecimal.ROUND_FLOOR),
                annualDividend.setScale(2, BigDecimal.ROUND_FLOOR),
                position.setScale(2, BigDecimal.ROUND_FLOOR),
                stocks);
    }

    public PortfolioData getOptionPortfolio(long userId) {
        long options = 0;
        BigDecimal position;
        BigDecimal investment;
        BigDecimal percent = BigDecimal.valueOf(0.0);
        BigDecimal portfolio = BigDecimal.valueOf(0.0);
        BigDecimal optionMarketPrice = BigDecimal.valueOf(0.0);
        List<OptionsData> optionsList = this.optionService.getOptionsInfoData(userId);
        List<OptionActivityData> optionHistoryList = this.optionActivityService.getUserOptionActivityData(userId);

        // calculate total investment for options.
        investment = optionActivityRepository.getAllOptions(userId);

        // calculate portfolio based on current price of options
        for (OptionsData list: optionsList) {
            BigDecimal optionPrice = list.getOptionPrice();
            optionMarketPrice = optionMarketPrice.add(optionPrice);
            options++;
        }

        for (OptionActivityData option: optionHistoryList) {
            if ("Buy".equals(option.getAction())) {
                portfolio = portfolio.add(optionMarketPrice
                        .multiply(option.getContracts().multiply(BigDecimal.valueOf(100))));
            } else {
                BigDecimal buyPrice = optionActivityRepository.getOptionBuyPrice(option.getTicker(), userId);
                BigDecimal optionsByUserId = optionActivityRepository.getBuyOptionsByUserId(option.getTicker(), userId);
                BigDecimal proOrLoss = (option.getOptionPrice()
                        .multiply(option.getContracts().multiply(BigDecimal.valueOf(100))))
                        .subtract((buyPrice.divide(optionsByUserId, RoundingMode.FLOOR))
                                .multiply(option.getContracts().multiply(BigDecimal.valueOf(100))));
                portfolio = portfolio.add(proOrLoss);
            }
        }

        position = portfolio.subtract(investment);
        BigDecimal absPosition = position.abs();
        if (absPosition.compareTo(BigDecimal.valueOf(0.0)) > 0) {
            percent = (absPosition.divide(investment, RoundingMode.FLOOR))
                    .multiply(BigDecimal.valueOf(100));
        }
        return new PortfolioData(userId,
                investment.setScale(2, BigDecimal.ROUND_FLOOR),
                portfolio.setScale(2, BigDecimal.ROUND_FLOOR),
                percent.setScale(2, BigDecimal.ROUND_FLOOR),
                position.setScale(2, BigDecimal.ROUND_FLOOR),
                options);
    }

    public List<PortfolioData> calculateTotalPortfolio(long userId, String type, int days) throws IOException {
        List<StocksHistory> stockHistoryList;
        List<OptionsHistory> optionHistoryList;
        ArrayList<Date> dates = new ArrayList<>();
        List<PortfolioData> historyData = new ArrayList<>();

        if ("weekly".equals(type)) {
            dates = DateService.calculateWorkingDates(days);
        } else if ("monthly".equals(type)) {
            dates = DateService.calculateWorkingDates(days);
        } else if ("yearly".equals(type)) {
            dates = DateService.calculateWorkingDates(days);
        } else if ("all".equals(type)) {
            List<StockActivityData> userStocks = this.stockActivityService.getUserStockActivityData(userId);
            ArrayList<Date> userDates;
            ArrayList<Date> uniqueDates;
            ArrayList<Date> buildDates = new ArrayList<>();
            for (StockActivityData stockActivityData : userStocks) {
               buildDates.add(stockActivityData.getTradeDate());
            }
            if (buildDates.size() > 0) {
                userDates = DateService.calculateAllDates(buildDates, buildDates.get(buildDates.size() - 1));
                uniqueDates = removeDuplicates(userDates);
                dates = DateService.calculateWorkingDates(uniqueDates.size());
            }
        }

        for (Date givenDate: dates) {
            BigDecimal portfolio = BigDecimal.valueOf(0.0);
            stockHistoryList = this.stockHistoryService.getUserStockHistoryData(userId, givenDate);
            optionHistoryList = this.optionHistoryService.getUserOptionHistoryData(userId, givenDate);
            for(StocksHistory stock: stockHistoryList) {
                portfolio = portfolio.add(stock.getMarketPrice()
                        .multiply(stock.getShares()));
            }
            for (OptionsHistory option: optionHistoryList) {
                portfolio = portfolio.add(option.getMarketPrice()
                        .multiply(option.getContracts().multiply(BigDecimal.valueOf(100))));
            }
            historyData.add(new PortfolioData(userId, portfolio, givenDate));
        }
        return historyData;
    }

    public List<PortfolioHistoryData> getPortfolioHistory(long userId) throws IOException {
        BigDecimal portfolio = BigDecimal.valueOf(0.0);
        BigDecimal investment = BigDecimal.valueOf(0.0);
        List<PortfolioHistoryData> historyData = new ArrayList<>();
        List<StockActivityData> stockHistoryList = this.stockActivityService.getUserStockActivityData(userId);
        List<OptionActivityData> optionHistoryList = this.optionActivityService.getUserOptionActivityData(userId);

        for(StockActivityData stockList : stockHistoryList) {
            BigDecimal investData = stockList.getSharePrice().multiply(stockList.getShares());
            BigDecimal portfolioData = stockList.getMarketPrice().multiply(stockList.getShares());
            investment = investment.add(investData);
            portfolio = portfolio.add(portfolioData);
            Date tradeDate = stockList.getTradeDate();
            historyData.add(new PortfolioHistoryData(userId,
                    investment.setScale(2, BigDecimal.ROUND_FLOOR),
                    portfolio.setScale(2, BigDecimal.ROUND_FLOOR),
                    tradeDate));
        }
        for(OptionActivityData optionList : optionHistoryList) {
            BigDecimal investData = optionList.getActionPrice()
                    .multiply(optionList.getContracts().multiply(BigDecimal.valueOf(100)));
            BigDecimal portfolioData = optionList.getOptionPrice()
                    .multiply(optionList.getContracts().multiply(BigDecimal.valueOf(100)));
            investment = investment.add(investData);
            portfolio = portfolio.add(portfolioData);
            Date tradeDate = optionList.getTradeDate();
            historyData.add(new PortfolioHistoryData(userId,
                    investment.setScale(2, BigDecimal.ROUND_FLOOR),
                    portfolio.setScale(2, BigDecimal.ROUND_FLOOR),
                    tradeDate));
        }
        return historyData;
    }

    private PortfolioData calculatePortfolioData(long userId, List<StockActivityData> stockData, Date date) {
        PortfolioData data;
        BigDecimal investment = BigDecimal.valueOf(0);
        BigDecimal portfolio = BigDecimal.valueOf(0);
        for(StockActivityData stock: stockData) {
            if ("Buy".equals(stock.getAction())) {
                investment = investment.add(stock.getSharePrice().multiply(stock.getShares()));
                portfolio = portfolio.add(stock.getMarketPrice().multiply(stock.getShares()));
            } else {
                BigDecimal proOrLoss = (stock.getMarketPrice().multiply(stock.getShares()))
                        .subtract(stock.getSharePrice().multiply(stock.getShares()));
                portfolio = portfolio.add(proOrLoss);
            }
        }
        data = new PortfolioData(userId, investment, portfolio, date);
        return data;
    }

    public static <T> ArrayList<T> removeDuplicates(ArrayList<T> list) {
        ArrayList<T> newList = new ArrayList<>();
        for (T element : list) {
            if (!newList.contains(element)) {
                newList.add(element);
            }
        }
        return newList;
    }
}
