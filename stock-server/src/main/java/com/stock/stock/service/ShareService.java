package com.stock.stock.service;

import com.stock.stock.dto.*;
import com.stock.stock.model.Share;
import com.stock.stock.model.Users;
import com.stock.stock.repository.ShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import yahoofinance.Stock;
import yahoofinance.YahooFinance;
import yahoofinance.histquotes.HistoricalQuote;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ShareService {

    @Autowired
    private ShareRepository shareRepository;

    public void saveUserStock(Share shareData, long userId) {
        Share currentShare = new Share();
        Users user = new Users();
        user.setUserid(userId);
        String ticker = shareData.getTicker().toUpperCase();
        currentShare.setBuy(shareData.getBuy());
        currentShare.setTicker(ticker);
        currentShare.setUser(user);
        currentShare.setShares(shareData.getShares());
        Stock yahooStock = this.getYahooStockData(currentShare.getTicker());
        if (yahooStock.isValid()) {
            if (yahooStock.getDividend().getPayDate() != null) {
                currentShare.setPaydate(yahooStock.getDividend().getPayDate().getTime());
            }
            if (yahooStock.getDividend().getExDate() != null) {
                currentShare.setExdate(yahooStock.getDividend().getExDate().getTime());
            }
        }
        shareRepository.save(currentShare);
    }

    public void editStock(Share shareData, long userId) {
        Users user = new Users();
        user.setUserid(userId);
        String ticker = shareData.getTicker().toUpperCase();
        Share currentShare = shareRepository.findByShareId(shareData.getShareid());
        if (currentShare != null) {
            currentShare.setUser(user);
            currentShare.setTicker(ticker);
            currentShare.setBuy(shareData.getBuy());
            currentShare.setShares(shareData.getShares());
        }
        shareRepository.save(currentShare);
    }

    public void deleteShare(long shareId) {
        Share currentShare  = shareRepository.findByShareId(shareId);
        if (currentShare != null) {
            shareRepository.delete(currentShare);
        }
    }

    public List<StockInfoDto> getStockInfoDtos(@PathVariable long userid) {
        List<StockInfoDto> stockInfo = new ArrayList<StockInfoDto>();
        List<Share> userShares = shareRepository.findByUserId(userid);
        for (Share share: userShares) {
            Stock yahooStock = this.getYahooStockData(share.getTicker());
            StockInfoDto stock = new StockInfoDto();
            if (yahooStock.isValid()) {
                this.generateStock(userid, share, yahooStock, stock);
                stockInfo.add(stock);
            }
        }
        return stockInfo;
    }

    public void generateStock(@PathVariable long user_id, Share share, Stock yahooStock, StockInfoDto stock) {
        stock.setUserid(user_id);
        stock.setShareid(share.getShareid());
        stock.setTicker(share.getTicker());
        stock.setShares(share.getShares());
        stock.setStockName(yahooStock.getName());
        stock.setBuy(share.getBuy());
        stock.setPrice(yahooStock.getQuote().getPrice());
        String change = yahooStock.getQuote().getChangeInPercent().toString() + "%";
        stock.setPercentChange(change);
        stock.setCost(BigDecimal.valueOf(share.getShares()).multiply(share.getBuy()));
        stock.setEquity(BigDecimal.valueOf(share.getShares()).multiply(stock.getPrice()));
        if (yahooStock.getDividend().getExDate() != null) {
            stock.setExdate(yahooStock.getDividend().getExDate().getTime());
        }
        if (yahooStock.getDividend().getPayDate() != null) {
            stock.setPaydate(yahooStock.getDividend().getPayDate().getTime());
        }
        stock.setLow(yahooStock.getQuote().getYearLow());
        stock.setHigh(yahooStock.getQuote().getYearHigh());
        stock.setDividend(yahooStock.getDividend().getAnnualYield());
    }

    public void generateStockHistory(@PathVariable long user_id,
                                     Share share,
                                     Stock yahooStock,
                                     List<HistoricalQuote> historicalQuote,
                                     StockHistoryInfoDto stockHistory) throws IOException {
        stockHistory.setUserid(user_id);
        stockHistory.setShareid(share.getShareid());
        stockHistory.setTicker(share.getTicker());
        stockHistory.setStockName(yahooStock.getName());
        stockHistory.setHistory(historicalQuote);
    }

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

    public PortfolioDto getPortfolio(long userId) throws ParseException {
        List<Share> shares = shareRepository.findByUserId(userId);
        BigDecimal totalInvestment = BigDecimal.valueOf(0);
        BigDecimal totalEquity = BigDecimal.valueOf(0);
        BigDecimal annualDividend = BigDecimal.valueOf(0);
        String percentChange = null;
        if (shares != null && shares.size() > 0) {
            for (Share share : shares) {
                Stock yahooStock = this.getYahooStockData(share.getTicker());
                if (yahooStock.isValid()) {
                    BigDecimal price = yahooStock.getQuote().getPrice();
                    BigDecimal buy = share.getBuy();
                    if (yahooStock.getDividend().getAnnualYield() != null) {
                        BigDecimal dividend = yahooStock.getDividend().getAnnualYield();
                        annualDividend = annualDividend.add(dividend.multiply(BigDecimal.valueOf(share.getShares())));
                    }
                    if (totalEquity != null && totalInvestment != null) {
                        totalEquity = totalEquity.add(price.multiply(BigDecimal.valueOf(share.getShares())));
                        totalInvestment = totalInvestment.add(buy.multiply(BigDecimal.valueOf(share.getShares())));
                        percentChange = (((
                                (totalInvestment.subtract(totalEquity))
                                        .multiply(BigDecimal.valueOf(100)))
                                .divide(totalEquity, RoundingMode.FLOOR))
                                .setScale(2, RoundingMode.FLOOR)) + "%";
                    }
                }
            }
        }
        return  new PortfolioDto(totalInvestment, totalEquity,
                                annualDividend, percentChange);
    }

    public List<StockInfoDto> getDividendData(long userId, String startDate, String endDate) throws ParseException {
        List<StockInfoDto> stockInfo = new ArrayList<StockInfoDto>();
        CalendarDatesDto dates = this.extractSimpleDateFormat(startDate, endDate);

        List<Share> shares = shareRepository.getMonthlyDividends(dates.getStart(), dates.getEnd());
        for (Share share: shares ) {
            Stock yahooStock = this.getYahooStockData(share.getTicker());
            StockInfoDto stock = new StockInfoDto();
            if (yahooStock.isValid()) {
                generateStock(userId, share, yahooStock, stock);
                stockInfo.add(stock);
            }
        }
        return stockInfo;
    }

    public List<StockInfoDto> getAllDividendData(long userId) {
        List<StockInfoDto> stockInfo = new ArrayList<StockInfoDto>();
        List<Share> shares = shareRepository.findByUserId(userId);
        for (Share share: shares) {
            Stock yahooStock = this.getYahooStockData(share.getTicker());
            StockInfoDto stock = new StockInfoDto();
            if (yahooStock.isValid()) {
                if (yahooStock.getDividend().getAnnualYield() != null) {
                    generateStock(userId, share, yahooStock, stock);
                    stockInfo.add(stock);
                }
            }
        }
        return stockInfo;
    }

    public List<StockHistoryInfoDto> getStockHistoryData(long userId)
            throws IOException {
        List<StockHistoryInfoDto> stockHistoryInfo = new ArrayList<StockHistoryInfoDto>();
        List<Share> shares = shareRepository.findByUserId(userId);
        for (Share share: shares ) {
            Stock yahooStock = YahooFinance.get(share.getTicker(), true);
            List<HistoricalQuote> historicalQuote = yahooStock.getHistory();
            StockHistoryInfoDto historyDto = new StockHistoryInfoDto();
            if (yahooStock.isValid()) {
                generateStockHistory(userId, share, yahooStock, historicalQuote, historyDto);
                stockHistoryInfo.add(historyDto);
            }
        }
        return stockHistoryInfo;
    }

    public CalendarDatesDto extractSimpleDateFormat(String startDate, String endDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        CalendarDatesDto dates = new CalendarDatesDto();
        dates.setStart(sdf.parse(startDate));
        dates.setEnd(sdf.parse(endDate));
        return dates;
    }

    public List<StockInfoDto> getTopMovers(long userId) {
        List<StockInfoDto> stockInfo = new ArrayList<StockInfoDto>();
        List<StockInfoDto> topMovers = new ArrayList<StockInfoDto>();
        List<StockInfoDto> moverList = new ArrayList<StockInfoDto>();
        List<Share> shares = shareRepository.findByUserId(userId);
        for (Share share: shares ) {
            Stock yahooStock = this.getYahooStockData(share.getTicker());
            StockInfoDto stock = new StockInfoDto();
            if (yahooStock.isValid()) {
                generateStock(userId, share, yahooStock, stock);
                stockInfo.add(stock);
            }
        }
        if (stockInfo.size() > 0) {
            stockInfo.sort(StockInfoDto.stockPercentageChange);
            if (stockInfo.size() > 5) {
                topMovers = stockInfo.subList(stockInfo.size() - 5, stockInfo.size());
            } else if (stockInfo.size() < 5) {
                topMovers = stockInfo.subList(0, stockInfo.size());
            }
        }
        return topMovers;
    }

    public void processExcelFile(long userId, List<ShareListDto> shareList) {
        List<Share> shares = new ArrayList<>();
        Users user = new Users();
        user.setUserid(userId);
        Date exdate = null;
        Date paydate = null;
        if (shareList != null && shareList.size() > 0) {
            for (ShareListDto share: shareList) {
                Stock yahooStock = this.getYahooStockData(share.getTicker());
                boolean isPresent = shareRepository.existsAllByTicker(share.getTicker());
                if (yahooStock.getDividend().getExDate() != null) {
                    exdate = yahooStock.getDividend().getExDate().getTime();
                }
                if (yahooStock.getDividend().getPayDate() != null) {
                    paydate = yahooStock.getDividend().getPayDate().getTime();
                }
                if (!isPresent) {
                    Share shareInfo = new Share();
                    shareInfo.setUserInfo(user);
                    shareInfo.setTicker(share.getTicker());
                    shareInfo.setShares(share.getShares());
                    shareInfo.setBuy(share.getBuy());
                    shareInfo.setExdate(exdate);
                    shareInfo.setPaydate(paydate);
                    shares.add(shareInfo);
                } else {
                    Share shareData = shareRepository.findByTicker(share.getTicker());
                    shareData.setUserInfo(user);
                    shareData.setShares(share.getShares());
                    shareData.setBuy(share.getBuy());
                    shareData.setExdate(exdate);
                    shareData.setPaydate(paydate);
                    shares.add(shareData);
                }
            }
            shareRepository.saveAll(shares);
        }
    }

    public Calendar extractCalendarDateFormat(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar;
    }

}
