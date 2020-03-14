package com.stock.stock.service;

import com.stock.stock.model.StockDetails;
import com.stock.stock.model.Stocks;
import com.stock.stock.repository.StockDetailRepository;
import com.stock.stock.repository.StockRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;
import yahoofinance.YahooFinance;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private StockDetailRepository stockDetailRepository;

    private static final Logger LOG = LoggerFactory.getLogger(StockService.class);

    public void saveStock(Stocks stockData) {
        Stocks currentStock = this.getStockData(stockData);
        Stocks stock = stockRepository.findBySymbol(currentStock.getSymbol());
        if (stock != null) {
            currentStock.setId(stock.getId());
            if (stock.getShares() > 0) {
                currentStock.setShares(stockData.getShares() + stock.getShares());
            } else {
                currentStock.setShares(stockData.getShares());
            }
        }
        stockRepository.save(currentStock);
    }

    public Stocks getStockData(Stocks stock) {
        return this.calculateStockData(stock);
    }

    public Stocks calculateStockData(Stocks stockData) {
        Stocks stock = new Stocks();
        Stock yahooStock = this.getYahooStockData(stockData.getSymbol());
            if (yahooStock.isValid()) {
                stock.setUser_id(stockData.getUser_id());
                stock.setSymbol(stockData.getSymbol().toUpperCase());
                stock.setName(yahooStock.getName());
                stock.setShares(stockData.getShares());
                stock.setPrice(yahooStock.getQuote().getPrice());
                stock.setAvg_price(stockData.getAvg_price());
                stock.setDividend(yahooStock.getDividend().getAnnualYield());
                if (yahooStock.getDividend().getPayDate() != null) {
                    stock.setPay_date(yahooStock.getDividend().getPayDate().getTime());
                }
                if (yahooStock.getDividend().getExDate() != null) {
                    stock.setEx_date(yahooStock.getDividend().getExDate().getTime());
                }
            } else {
                StockDetails details = this.getStockDetails(stockData.getSymbol());
                    stock.setUser_id(stockData.getUser_id());
                    stock.setSymbol(stockData.getSymbol().toUpperCase());
                    stock.setShares(stockData.getShares());
                    stock.setAvg_price(stockData.getAvg_price());
                    stock.setName(details.getStock());
                    stock.setPrice(details.getPrice());
                    stock.setDividend(details.getDividend());
                    if (details.getPay_date() != null) {
                        stock.setPay_date(details.getPay_date());
                    }
                    if (details.getEx_date() != null) {
                        stock.setEx_date(details.getEx_date());
                    }
                }
            if (stock.getPrice() != null && stock.getShares() > 0) {
                stock.setEquity(BigDecimal.valueOf(stock.getShares()).multiply(stock.getPrice()));
            }
            if (stock.getAvg_price() != null && stock.getShares() > 0) {
                stock.setCost(BigDecimal.valueOf(stock.getShares()).multiply(stock.getAvg_price()));
            }
        return stock;
    }

    public Stock getYahooStockData(String quote) {
        try {
            return YahooFinance.get(quote);
        } catch (IOException e) {
            e.printStackTrace();
            return new Stock(quote);
        }
    }

    public Stock getHistoricalStockData(String quote, Calendar from, Calendar to) {
        try {
            return YahooFinance.get(quote, from, to);
        } catch (IOException e) {
            e.printStackTrace();
            return new Stock(quote);
        }
    }

    public StockDetails getStockDetails(String quote) {
        try {
            return stockDetailRepository.findByTicker(quote);
        }
        catch(Exception e) {
            e.printStackTrace();
            return new StockDetails(quote);
        }
    }

    public void editStock(Stocks stockData) {
        Stocks curr = new Stocks();
        Stocks st = stockRepository.findBySymbol(stockData.getSymbol());
        if (st!= null) {
            curr.setId(stockData.getId());
            curr.setUser_id(stockData.getUser_id());
            curr.setSymbol(stockData.getSymbol());
            curr.setName(stockData.getName());
            curr.setPrice(stockData.getPrice());
            curr.setAvg_price(stockData.getAvg_price());
            curr.setShares(stockData.getShares());
            curr.setEquity(stockData.getEquity());
            curr.setCost(stockData.getCost());
            if (stockData.getDividend() != null) {
                curr.setDividend(stockData.getDividend());
            }
        }
        stockRepository.save(curr);
    }

    public void processExcelFile(List<StockDetails> stockDetailsList) {
        List<StockDetails> stocks = new ArrayList<>();
        if (stockDetailsList != null && stockDetailsList.size() > 0) {
            for (StockDetails stock: stockDetailsList) {
                boolean isPresent = stockDetailRepository.existsAllByTicker(stock.getTicker());
                if (!isPresent) {
                    stocks.add(new StockDetails(stock.getTicker(),
                            stock.getStock(),
                            stock.getPrice(),
                            stock.getDividend(),
                            stock.getHigh(),
                            stock.getLow(),
                            stock.getEx_date(),
                            stock.getPay_date()));
                }
            }
            stockDetailRepository.saveAll(stocks);
        }

    }
}
