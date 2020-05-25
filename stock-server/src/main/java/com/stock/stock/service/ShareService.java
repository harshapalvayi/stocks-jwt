package com.stock.stock.service;

import com.stock.stock.dto.*;
import com.stock.stock.model.AccountType;
import com.stock.stock.model.Portfolio;
import com.stock.stock.model.Share;
import com.stock.stock.model.Users;
import com.stock.stock.repository.PortfolioRepository;
import com.stock.stock.repository.ShareRepository;
import com.stock.stock.repository.UserRepository;
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
    public StockService stockService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShareRepository shareRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    public void saveUserStock(Share shareData, long userId) {
        String ticker = shareData.getTicker().toUpperCase();
        Share currentShare = shareRepository.findByTicker(shareData.getTicker());
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        Users user = new Users();
        user.setUserid(userId);
        Stock yahooStock = this.stockService.getYahooStockData(ticker);
        if (yahooStock.isValid()) {
            if (currentShare != null) {
                currentShare.setBuy(shareData.getBuy());
                currentShare.setTicker(ticker);
                currentShare.setUser(user);
                currentShare.setAccount(shareData.getAccount());
                currentShare.setShares(shareData.getShares());
                updateShareToPortfolio(user, shareData, yahooStock, portfolio);
            } else {
                currentShare = new Share();
                currentShare.setBuy(shareData.getBuy());
                currentShare.setTicker(ticker);
                currentShare.setUser(user);
                currentShare.setAccount(shareData.getAccount());
                currentShare.setShares(shareData.getShares());
                updateShareToPortfolio(user, shareData, yahooStock, portfolio);
            }
            if (yahooStock.getDividend().getPayDate() != null) {
                currentShare.setPaydate(yahooStock.getDividend().getPayDate().getTime());
            }
            if (yahooStock.getDividend().getExDate() != null) {
                currentShare.setExdate(yahooStock.getDividend().getExDate().getTime());
            }
            currentShare.setHolding(true);
            shareRepository.save(currentShare);
        }
    }

    public void updateShareAcctType(AccountType acctData, long userId) {
        Share currentShare = shareRepository.findByShareId(acctData.getShareid());
        Users user = userRepository.findByUserid(userId);
        if (currentShare != null && user != null) {
            currentShare.setAccount(acctData.getAccount());
            shareRepository.save(currentShare);
        }
    }

    public void tradeStock(Share shareData, long userId) {
        String ticker = shareData.getTicker().toUpperCase();
        Share currentShare = shareRepository.findByShareId(shareData.getShareid());
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        Users user = userRepository.findByUserid(userId);
        if (currentShare != null && user != null) {
            currentShare.setShareid(shareData.getShareid());
            currentShare.setUser(user);
            currentShare.setTicker(ticker);
            /* sell logic */
            if(shareData.getSell() != null) {
                if ((shareData.getShares()).compareTo(currentShare.getShares()) > 0) {
                    BigDecimal shares = currentShare.getShares().subtract(shareData.getShares());
                    currentShare.setShares(shares);
                    if (currentShare.getShares().compareTo(BigDecimal.valueOf(0)) > 0) {
                        currentShare.setHolding(true);
                    } else {
                        currentShare.setHolding(false);
                    }
                } else {
                    currentShare.setShares(BigDecimal.valueOf(0));
                    currentShare.setHolding(false);
                }
                currentShare.setSell(shareData.getSell());
                BigDecimal lossOrGains = (shareData.getSell()
                        .subtract(currentShare.getBuy()))
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
                BigDecimal shares = currentShare.getShares().add(shareData.getShares());
                BigDecimal buy = currentShare.getBuy()
                                            .add(shareData.getBuy())
                                            .divide(new BigDecimal(2), RoundingMode.FLOOR);
                currentShare.setBuy(buy);
                currentShare.setShares(shares);
                currentShare.setHolding(true);
                BigDecimal buyValue = shareData.getBuy().multiply(shareData.getShares()).abs();
                if (portfolio != null) {
                    portfolio.setPortfolio(portfolio.getPortfolio().add(buyValue));
                }
            }
            if (portfolio != null) {
                portfolioRepository.save(portfolio);
            }
            shareRepository.save(currentShare);
        }
    }

    public List<StockInfoDto> getStockInfoDtos(@PathVariable long userid) {
        List<StockInfoDto> stockInfo = new ArrayList<StockInfoDto>();
        List<Share> userShares = shareRepository.findByUserId(userid);
        getStockList(userid, stockInfo, userShares);
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
        BigDecimal change = yahooStock.getQuote().getChangeInPercent();
        stock.setPercentChange(change);
        stock.setCost((share.getShares()).multiply(share.getBuy()));
        stock.setEquity((share.getShares()).multiply(stock.getPrice()));
        if (share.getAccount() != null) {
            stock.setAccount(share.getAccount());
        }
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
                                     StockHistoryInfoDto stockHistory) {
        stockHistory.setUserid(user_id);
        stockHistory.setShareid(share.getShareid());
        stockHistory.setTicker(share.getTicker());
        stockHistory.setStockName(yahooStock.getName());
        stockHistory.setHistory(historicalQuote);
    }

    public List<StockInfoDto> getDividendData(long userId, String startDate, String endDate) throws ParseException {
        List<StockInfoDto> stockInfo = new ArrayList<StockInfoDto>();
        CalendarDatesDto dates = this.extractSimpleDateFormat(startDate, endDate);
        List<Share> shares = shareRepository.getMonthlyDividends(dates.getStart(), dates.getEnd());
        getStockList(userId, stockInfo, shares);
        return stockInfo;
    }

    public void getStockList(long userId, List<StockInfoDto> stockInfo, List<Share> shares) {
        for (Share share : shares) {
            Stock yahooStock = this.stockService.getYahooStockData(share.getTicker());
            StockInfoDto stock = new StockInfoDto();
            if (yahooStock.isValid()) {
                generateStock(userId, share, yahooStock, stock);
                stockInfo.add(stock);
            }
        }
    }

    public List<StockInfoDto> getAllDividendData(long userId) {
        List<StockInfoDto> stockInfo = new ArrayList<StockInfoDto>();
        List<Share> shares = shareRepository.findByUserId(userId);
        getStockList(userId, stockInfo, shares);
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
        List<Share> shares = shareRepository.findByUserId(userId);
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
        user.setUserid(userId);
        Date exdate = null;
        Date paydate = null;
        if (shareList != null && shareList.size() > 0) {
            for (ShareListDto share: shareList) {
                Stock yahooStock = this.stockService.getYahooStockData(share.getTicker());
                boolean isPresent = shareRepository.existsByTicker(share.getTicker());
                Portfolio portfolio = portfolioRepository.findByUserId(userId);
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
                    shareInfo.setAccount(share.getAccount());
                    shareInfo.setBuy(share.getBuy());
                    shareInfo.setExdate(exdate);
                    shareInfo.setPaydate(paydate);
                    shareInfo.setHolding(true);
                    shares.add(shareInfo);
                    updateShareListToPortfolio(user, share, yahooStock, portfolio);
                } else {
                    Share shareData = shareRepository.findByTicker(share.getTicker());
                    shareData.setUserInfo(user);
                    shareData.setShares(share.getShares());
                    shareData.setBuy(share.getBuy());
                    shareData.setExdate(exdate);
                    shareData.setPaydate(paydate);
                    shareData.setAccount(share.getAccount());
                    shareData.setHolding(true);
                    shares.add(shareData);
                    updateShareListToPortfolio(user, share,  yahooStock, portfolio);
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
                dividend = portfolio.getAnnualDividend().add(dividend);
            }
            portfolio.setPortfolio(portfolioValue);
            portfolio.setInvestment(investment);
            portfolio.setAnnualDividend(dividend);
            portfolioRepository.save(portfolio);
        } else {
            Portfolio initialPortfolio = new Portfolio();
            initialPortfolio.setUserInfo(user);
            investment = share.getBuy().multiply(share.getShares());
            if (yahooStock.isValid()) {
                price = yahooStock.getQuote().getPrice();
                if (yahooStock.getDividend().getAnnualYield() != null) {
                    dividend = yahooStock.getDividend().getAnnualYield();
                }
                portfolioValue = price.multiply(share.getShares());
            }
            initialPortfolio.setPortfolio(portfolioValue);
            initialPortfolio.setInvestment(investment);
            initialPortfolio.setAnnualDividend(dividend);
            portfolioRepository.save(initialPortfolio);
        }
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
                portfolioValue = portfolio.getPortfolio()
                        .add(price.multiply(share.getShares()));
                investment = portfolio.getInvestment()
                        .add(share.getBuy().multiply(share.getShares()));
            }
            if (portfolio.getAnnualDividend() != null) {
                dividend = portfolio.getAnnualDividend().add(dividend);
            }
            portfolio.setPortfolio(portfolioValue);
            portfolio.setInvestment(investment);
            portfolio.setAnnualDividend(dividend);
            portfolioRepository.save(portfolio);
        } else {
            Portfolio initialPortfolio = new Portfolio();
            initialPortfolio.setUserInfo(user);
            investment = share.getBuy().multiply(share.getShares());
            if (yahooStock.isValid()) {
                price = yahooStock.getQuote().getPrice();
                if (yahooStock.getDividend().getAnnualYield() != null) {
                    dividend = yahooStock.getDividend().getAnnualYield();
                }
                portfolioValue = price.multiply(share.getShares());
            }
            initialPortfolio.setPortfolio(portfolioValue);
            initialPortfolio.setInvestment(investment);
            initialPortfolio.setAnnualDividend(dividend);
            portfolioRepository.save(initialPortfolio);
        }
    }

    public Calendar extractCalendarDateFormat(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar;
    }

}
