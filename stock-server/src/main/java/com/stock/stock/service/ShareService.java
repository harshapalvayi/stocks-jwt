package com.stock.stock.service;

import yahoofinance.Stock;
import com.stock.stock.dto.*;
import com.stock.stock.model.*;
import yahoofinance.YahooFinance;
import com.stock.stock.entity.Share;
import com.stock.stock.entity.Users;
import com.stock.stock.entity.Portfolio;
import com.stock.stock.entity.ShareHistory;
import yahoofinance.histquotes.HistoricalQuote;
import com.stock.stock.repository.UserRepository;
import com.stock.stock.repository.ShareRepository;
import com.stock.stock.repository.PortfolioRepository;
import com.stock.stock.repository.ShareHistoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ShareService {

    @Autowired
    public StockService stockService;

    @Autowired
    public PortfolioService portfolioService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShareRepository shareRepository;

    @Autowired
    private ShareHistoryRepository shareHistoryRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    public void saveUserStock(Share shareData, long userId) {
        String ticker = shareData.getTicker().toUpperCase();
        Share currentShare = shareRepository.findByTicker(ticker);
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        Users user = new Users();
        user.setUserId(userId);
        Stock yahooStock = this.stockService.getYahooStockData(ticker);
        if (yahooStock != null) {
            if (yahooStock.isValid()) {
                if (currentShare != null) {
                    BigDecimal shares = currentShare.getShares().add(shareData.getShares());
                    BigDecimal buy = ((currentShare.getBuyPrice().multiply(currentShare.getShares()))
                            .add(shareData.getBuyPrice()).multiply(shareData.getShares()))
                            .divide(shares, RoundingMode.FLOOR);
                    currentShare.setTicker(ticker);
                    currentShare.setBuyPrice(buy);
                    currentShare.setShares(shares);
                    currentShare.setTradeDate(shareData.getTradeDate());
                } else {
                    currentShare = new Share();
                    currentShare.setBuyPrice(shareData.getBuyPrice());
                    currentShare.setTicker(ticker);
                    currentShare.setBuyPrice(shareData.getBuyPrice());
                    currentShare.setShares(shareData.getShares());
                    currentShare.setTradeDate(shareData.getTradeDate());
                    currentShare.setInitialDate(shareData.getTradeDate());
                }
                if (shareData.getTradeDate() != null) {
                    currentShare.setTradeDate(shareData.getTradeDate());
                }

                if (yahooStock.getDividend().getPayDate() != null) {
                    currentShare.setPayDate(yahooStock.getDividend().getPayDate().getTime());
                }
                if (yahooStock.getDividend().getExDate() != null) {
                    currentShare.setExDate(yahooStock.getDividend().getExDate().getTime());
                }
                currentShare.setUser(user);
                currentShare.setAccount(shareData.getAccount());
                currentShare.setHolding(true);
                shareData.setUserInfo(currentShare.getUserInfo());
                shareRepository.save(currentShare);
                performOtherActions(shareData, currentShare, portfolio, user, yahooStock, "Buy");
            }
        }
    }

    public void deleteUserStock(long shareId, long userId) {
        Share currentShare = shareRepository.findByShareId(shareId);
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        Stock yahooStock = this.stockService.getYahooStockData(currentShare.getTicker().toUpperCase());
        if (yahooStock != null) {
            deleteShareFromPortfolio(currentShare, yahooStock, portfolio);
            shareRepository.delete(currentShare);
        }
    }

    public void updateShareAcctType(AccountType acctData, long userId) {
        Share currentShare = shareRepository.findByShareId(acctData.getShareid());
        Users user = userRepository.findByUserId(userId);
        if (currentShare != null && user != null) {
            currentShare.setAccount(acctData.getAccount());
            shareRepository.save(currentShare);
        }
    }

    public void tradeStock(Share shareData, long userId) {
        String action;
        String ticker = shareData.getTicker().toUpperCase();
        Share currentShare = shareRepository.findByShareId(shareData.getShareId());
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        Users user = userRepository.findByUserId(userId);
        Stock yahooStock = this.stockService.getYahooStockData(ticker);
        if (yahooStock != null) {
            if (currentShare != null && user != null) {
                currentShare.setShareId(shareData.getShareId());
                currentShare.setUser(user);
                currentShare.setTicker(ticker);
                /* sell logic */
                if(shareData.getSellPrice() != null) {
                    action = "Sell";
                    int result = (currentShare.getShares()).compareTo(shareData.getShares());
                    if ( result == 0) {
                        currentShare.setShares(BigDecimal.valueOf(0));
                        currentShare.setHolding(false);
                    } else if (result > 0) {
                        BigDecimal shares = currentShare.getShares().subtract(shareData.getShares());
                        currentShare.setShares(shares);
                        currentShare.setHolding(true);
                    } else if (result < 0) {
                        currentShare.setShares(BigDecimal.valueOf(0));
                        currentShare.setHolding(false);
                    }
                    currentShare.setSellPrice(shareData.getSellPrice());
                    BigDecimal lossOrGains = (shareData.getSellPrice()
                            .subtract(currentShare.getBuyPrice()))
                            .multiply(shareData.getShares()).abs();
                    if (portfolio != null) {
                        if (lossOrGains.compareTo(BigDecimal.valueOf(0)) > 0) {
                            portfolio.setPortfolio(portfolio.getPortfolio().add(lossOrGains));
                        } else {
                            portfolio.setPortfolio(portfolio.getPortfolio().subtract(lossOrGains));
                        }
                    }
                } else {
                    /* buy logic */
                    action = "Buy";
                    BigDecimal shares = currentShare.getShares().add(shareData.getShares());
                    BigDecimal buy = currentShare.getBuyPrice()
                            .add(shareData.getBuyPrice())
                            .divide(shares, RoundingMode.FLOOR);
                    currentShare.setBuyPrice(buy);
                    currentShare.setShares(shares);
                    currentShare.setHolding(true);
                    BigDecimal buyValue = shareData.getBuyPrice().multiply(shareData.getShares()).abs();
                    if (portfolio != null) {
                        portfolio.setPortfolio(portfolio.getPortfolio().add(buyValue));
                    }
                }
                shareRepository.save(currentShare);
                performOtherActions(shareData, currentShare, portfolio, user, yahooStock, action);
            }
        }
    }

    public void performOtherActions(Share shareData,
                                    Share currentShare,
                                    Portfolio portfolio,
                                    Users user,
                                    Stock yahooStock, String action) {
        shareData.setShareId(currentShare.getShareId());
        saveStockHistoryByAction(shareData, yahooStock, action);
        updateShareToPortfolio(user, shareData, yahooStock, portfolio);
    }

    public List<StockInfoDto> getUserActiveStocksInfoDtos(@PathVariable long userId) {
        List<StockInfoDto> stockInfo = new ArrayList<>();
        List<Share> userShares = shareRepository.findByUserInfoAndHolding(userId);
        getStockList(userId, stockInfo, userShares);
        return stockInfo;
    }

    public void generateStock(@PathVariable long userId, Share share, Stock yahooStock, StockInfoDto stock) {
        stock.setUserId(userId);
        stock.setShareId(share.getShareId());
        stock.setTicker(share.getTicker());
        stock.setShares(share.getShares());
        stock.setStockName(yahooStock.getName());
        stock.setBuyPrice(share.getBuyPrice());
        stock.setMarketPrice(yahooStock.getQuote().getPrice());
        BigDecimal change = yahooStock.getQuote().getChangeInPercent();
        stock.setPercentChange(change);
        stock.setCost((share.getShares()).multiply(share.getBuyPrice()));
        stock.setEquity((share.getShares()).multiply(stock.getMarketPrice()));
        stock.setReturns(stock.getCost().subtract(stock.getEquity()));
        if (share.getAccount() != null) {
            stock.setAccount(share.getAccount());
        }
        if (yahooStock.getDividend().getExDate() != null) {
            stock.setExDate(yahooStock.getDividend().getExDate().getTime());
        }
        if (yahooStock.getDividend().getPayDate() != null) {
            stock.setPayDate(yahooStock.getDividend().getPayDate().getTime());
        }
        stock.setStockExchange(yahooStock.getStockExchange());
        stock.setLow(yahooStock.getQuote().getYearLow());
        stock.setHigh(yahooStock.getQuote().getYearHigh());
        stock.setDividend(yahooStock.getDividend().getAnnualYield());
        stock.setHolding(share.isHolding());
    }

    public void generateStockHistory(@PathVariable long userId,
                                     Share share,
                                     Stock yahooStock,
                                     List<HistoricalQuote> historicalQuote,
                                     StockHistoryInfoDto stockHistory) {
        stockHistory.setUserId(userId);
        stockHistory.setShareId(share.getShareId());
        stockHistory.setTicker(share.getTicker());
        stockHistory.setStockName(yahooStock.getName());
        stockHistory.setHistory(historicalQuote);
    }

    public List<StockInfoDto> getDividendData(long userId,
                                              String startDate,
                                              String endDate) throws ParseException {
        List<StockInfoDto> stockInfo = new ArrayList<>();
        CalendarDatesDto dates = this.extractSimpleDateFormat(startDate, endDate);
        List<Share> shares = shareRepository.getMonthlyDividends(dates.getStart(), dates.getEnd());
        getStockList(userId, stockInfo, shares);
        return stockInfo;
    }

    public void getStockList(long userId,
                             List<StockInfoDto> stockInfo,
                             List<Share> shares) {
        for (Share share : shares) {
            Stock yahooStock = this.stockService.getYahooStockData(share.getTicker());
            if (yahooStock != null) {
                StockInfoDto stock = new StockInfoDto();
                if (yahooStock.isValid()) {
                    generateStock(userId, share, yahooStock, stock);
                    stockInfo.add(stock);
                }
            }
        }
    }

    public List<StockInfoDto> getAllDividendData(long userId) {
        List<StockInfoDto> stockInfo = new ArrayList<>();
        List<Share> shares = shareRepository.findByUserInfoAndHolding(userId);
        getStockList(userId, stockInfo, shares);
        return stockInfo;
    }

    public List<StockHistoryInfoDto> getStockHistoryData(long userId)
            throws IOException {
        List<StockHistoryInfoDto> stockHistoryInfo = new ArrayList<>();
        List<Share> shares = shareRepository.findByUserInfoAndHolding(userId);
        for (Share share: shares ) {
            Stock yahooStock = YahooFinance.get(share.getTicker(), true);
            List<HistoricalQuote> historicalQuote = yahooStock.getHistory();
            StockHistoryInfoDto historyDto = new StockHistoryInfoDto();
            if (yahooStock != null) {
                if (yahooStock.isValid()) {
                    generateStockHistory(userId, share, yahooStock, historicalQuote, historyDto);
                    stockHistoryInfo.add(historyDto);
                }
            }
        }
        return stockHistoryInfo;
    }

    public CalendarDatesDto extractSimpleDateFormat(String startDate,
                                                    String endDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        CalendarDatesDto dates = new CalendarDatesDto();
        dates.setStart(sdf.parse(startDate));
        dates.setEnd(sdf.parse(endDate));
        return dates;
    }

    public List<StockInfoDto> getTopMovers(long userId) {
        List<StockInfoDto> stockInfo = new ArrayList<>();
        List<StockInfoDto> topMovers = new ArrayList<>();
        List<Share> shares = shareRepository.findByUserInfoAndHolding(userId);
        getStockList(userId, stockInfo, shares);
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
        user.setUserId(userId);
        Date exDate = null;
        Date payDate = null;
        if (shareList != null && shareList.size() > 0) {
            for (ShareListDto share: shareList) {
                String ticker = share.getTicker().toUpperCase();
                Stock yahooStock = this.stockService.getYahooStockData(ticker);
                if (yahooStock != null) {
                    Share shareInfo = shareRepository.findByTicker(ticker);
                    Portfolio portfolio = portfolioRepository.findByUserId(userId);
                    if (yahooStock.getDividend().getExDate() != null) {
                        exDate = yahooStock.getDividend().getExDate().getTime();
                    }
                    if (yahooStock.getDividend().getPayDate() != null) {
                        payDate = yahooStock.getDividend().getPayDate().getTime();
                    }
                    if (shareInfo != null) {
                        shareInfo = shareRepository.findByTicker(share.getTicker());
                        shareInfo.setUserInfo(user);
                        shareInfo.setBuyPrice(share.getBuy());
                        shareInfo.setShares(share.getShares());
                        shareInfo.setExDate(exDate);
                        shareInfo.setPayDate(payDate);
                        shareInfo.setAccount(share.getAccount());
                    } else {
                        shareInfo = new Share();
                        shareInfo.setUserInfo(user);
                        shareInfo.setTicker(share.getTicker());
                        shareInfo.setShares(share.getShares());
                        shareInfo.setAccount(share.getAccount());
                        shareInfo.setBuyPrice(share.getBuy());
                        shareInfo.setExDate(exDate);
                        shareInfo.setPayDate(payDate);
                        if (share.getTradeDate() != null) {
                            shareInfo.setTradeDate(share.getTradeDate());
                        }
                    }
                    shareInfo.setHolding(true);
                    shares.add(shareInfo);
                    saveStockHistoryByAction(shareInfo, yahooStock,"Buy");
                    updateShareListToPortfolio(user, share, yahooStock, portfolio);
                }
            }
            shareRepository.saveAll(shares);
        }
    }

    private void updateShareListToPortfolio(Users user, ShareListDto share, Stock yahooStock, Portfolio portfolio) {
        BigDecimal portfolioValue = BigDecimal.valueOf(0);
        BigDecimal dividend = BigDecimal.valueOf(0);
        BigDecimal investment = BigDecimal.valueOf(0);
        BigDecimal price;
        if(portfolio != null) {
            if (yahooStock.isValid()) {
                price = yahooStock.getQuote().getPrice();
                if (yahooStock.getDividend().getAnnualYield() != null) {
                    dividend = yahooStock.getDividend().getAnnualYield();
                }
                portfolioValue = portfolio.getPortfolio()
                        .add(price.multiply(share.getShares()));
                investment = portfolio.getInvestment()
                        .add(share.getBuy().multiply(share.getShares()));
            }
            if (portfolio.getAnnualDividend() != null) {
                dividend = portfolio.getAnnualDividend()
                        .add(dividend.multiply(share.getShares()))
                        .setScale(2, RoundingMode.FLOOR);
            }
        } else {
            portfolio = new Portfolio();
            if (yahooStock.isValid()) {
                price = yahooStock.getQuote().getPrice();
                if (yahooStock.getDividend().getAnnualYield() != null) {
                    dividend = (yahooStock.getDividend().getAnnualYield())
                            .multiply(share.getShares())
                            .setScale(2, RoundingMode.FLOOR);
                }
                portfolioValue = price.multiply(share.getShares());
            }
            portfolio.setUserInfo(user);
            investment = share.getBuy().multiply(share.getShares());
        }
        portfolio.setPortfolio(portfolioValue);
        portfolio.setInvestment(investment);
        portfolio.setAnnualDividend(dividend);
        portfolioRepository.save(portfolio);
        this.portfolioService.savePortfolioHistory(portfolio);
    }

    private void saveStockHistoryByAction(Share share, Stock yahooStock, String action) {
        String ticker = share.getTicker().toUpperCase();
        ShareHistory stockHistory = new ShareHistory();
        stockHistory.setShare(share);
        stockHistory.setTicker(ticker);
        stockHistory.setUserId(share.getUser());
        stockHistory.setName(yahooStock.getName());
        if ("Buy".equals(action)) {
            stockHistory.setSharePrice(share.getBuyPrice());
        } else {
            stockHistory.setSharePrice(share.getSellPrice());
        }
        stockHistory.setShares(share.getShares());
        if (share.getTradeDate() != null) {
            stockHistory.setTradeDate(share.getTradeDate());
        }
        stockHistory.setAction(action);
        shareHistoryRepository.save(stockHistory);
    }

    private void updateShareToPortfolio(Users user, Share share, Stock yahooStock, Portfolio portfolio) {
        BigDecimal portfolioValue = BigDecimal.valueOf(0);
        BigDecimal dividend = BigDecimal.valueOf(0);
        BigDecimal investment = BigDecimal.valueOf(0);
        BigDecimal price;
        if(portfolio != null) {
            if (yahooStock.isValid()) {
                price = yahooStock.getQuote().getPrice();
                if (yahooStock.getDividend().getAnnualYield() != null) {
                    dividend = yahooStock.getDividend().getAnnualYield();
                }
                if (portfolio.getPortfolio() != null) {
                    portfolioValue = portfolio.getPortfolio()
                            .add(price.multiply(share.getShares()));
                } else {
                    portfolioValue = price.multiply(share.getShares());
                }
                if (portfolio.getInvestment() != null) {
                    investment = portfolio.getInvestment()
                            .add(share.getBuyPrice().multiply(share.getShares()));
                } else {
                    investment = share.getBuyPrice().multiply(share.getShares());
                }

            }
            if (portfolio.getAnnualDividend() != null) {
                dividend = portfolio.getAnnualDividend()
                        .add(dividend.multiply(share.getShares()))
                        .setScale(2, RoundingMode.FLOOR);
            } else {
                dividend = dividend.multiply(share.getShares())
                        .setScale(2, RoundingMode.FLOOR);
            }
            portfolio.setTradeDate(share.getTradeDate());
            portfolio.setPortfolio(portfolioValue);
            portfolio.setInvestment(investment);
            portfolio.setAnnualDividend(dividend);
            portfolioRepository.save(portfolio);
            this.portfolioService.savePortfolioHistory(portfolio);
        } else {
            Portfolio initialPortfolio = new Portfolio();
            initialPortfolio.setUserInfo(user);
            investment = share.getBuyPrice().multiply(share.getShares());
            if (yahooStock.isValid()) {
                price = yahooStock.getQuote().getPrice();
                if (yahooStock.getDividend().getAnnualYield() != null) {
                    dividend = (yahooStock.getDividend().getAnnualYield())
                              .multiply(share.getShares())
                              .setScale(2, RoundingMode.FLOOR);
                }
                portfolioValue = price.multiply(share.getShares());
            }
            initialPortfolio.setTradeDate(share.getTradeDate());
            initialPortfolio.setPortfolio(portfolioValue);
            initialPortfolio.setInvestment(investment);
            initialPortfolio.setAnnualDividend(dividend);
            portfolioRepository.save(initialPortfolio);
            this.portfolioService.savePortfolioHistory(initialPortfolio);
        }
    }

    public void deleteShareFromPortfolio(Share share, Stock yahooStock, Portfolio portfolio) {
        BigDecimal portfolioValue = BigDecimal.valueOf(0);
        BigDecimal dividend = BigDecimal.valueOf(0);
        BigDecimal investment = BigDecimal.valueOf(0);
        BigDecimal price;
        if(portfolio != null) {
            if (yahooStock.isValid()) {
                price = yahooStock.getQuote().getPrice();
                if (yahooStock.getDividend().getAnnualYield() != null) {
                    dividend = (yahooStock.getDividend().getAnnualYield())
                            .multiply(share.getShares())
                            .setScale(2, RoundingMode.FLOOR);
                }
                portfolioValue = portfolio.getPortfolio()
                        .subtract(price.multiply(share.getShares()));
                investment = portfolio.getInvestment()
                        .subtract(share.getBuyPrice().multiply(share.getShares()));
            }
            if (portfolio.getAnnualDividend() != null) {
                dividend = portfolio.getAnnualDividend().subtract(dividend);
            }
            portfolio.setPortfolio(portfolioValue);
            portfolio.setInvestment(investment);
            portfolio.setAnnualDividend(dividend);
            portfolioRepository.save(portfolio);
        }
    }

    public Calendar extractCalendarDateFormat(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar;
    }

}
