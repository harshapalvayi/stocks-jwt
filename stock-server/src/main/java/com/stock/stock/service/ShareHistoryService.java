package com.stock.stock.service;

import com.stock.stock.dto.StockHistoryDto;
import com.stock.stock.entity.ShareHistory;
import com.stock.stock.repository.ShareHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import yahoofinance.Stock;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShareHistoryService {

    @Autowired
    public StockService stockService;

    @Autowired
    private ShareHistoryRepository shareHistoryRepository;

    public List<StockHistoryDto> getUserShareHistoryDtos(@PathVariable long user) {
        List<StockHistoryDto> stockInfo = new ArrayList<>();
        List<ShareHistory> userShares = shareHistoryRepository.findByUserId(user);
        getStockHistoryList(stockInfo, userShares);
        return stockInfo;
    }

    public void getStockHistoryList(List<StockHistoryDto> stockInfo, List<ShareHistory> shares) {
        for (ShareHistory share : shares) {
            String ticker = share.getTicker().toUpperCase();
            Stock yahooStock = this.stockService.getYahooStockData(ticker);
            StockHistoryDto stockHistory = new StockHistoryDto();
            if (yahooStock.isValid()) {
                generateStockHistory(share, yahooStock, stockHistory);
                stockInfo.add(stockHistory);
            }
        }
    }

    public void generateStockHistory(ShareHistory share, Stock yahooStock, StockHistoryDto stockHistory) {
        String name = yahooStock.getName();
        BigDecimal sharePrice = share.getSharePrice();
        BigDecimal marketPrice = yahooStock.getQuote().getPrice();
        BigDecimal change = yahooStock.getQuote().getChangeInPercent();
        stockHistory.setTicker(share.getTicker());
        stockHistory.setShares(share.getShares());
        stockHistory.setName(name);
        stockHistory.setSharePrice(sharePrice);
        stockHistory.setMarketPrice(marketPrice);
        stockHistory.setPercentChange(change);
        stockHistory.setShareId(share.getShare().getShareId());
        stockHistory.setCost((share.getShares()).multiply(sharePrice));
        stockHistory.setEquity((share.getShares()).multiply(marketPrice));
        BigDecimal returns = stockHistory.getEquity().subtract(stockHistory.getCost());
        stockHistory.setReturns(returns);
        stockHistory.setAction(share.getAction());
        stockHistory.setTradeDate(share.getTradeDate());
    }

}
