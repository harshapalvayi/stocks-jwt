package com.stock.stock.service;

import com.stock.stock.dto.*;
import com.stock.stock.entity.Stocks;
import com.stock.stock.entity.Users;
import com.stock.stock.model.AccountType;
import com.stock.stock.repository.StockActivityRepository;
import com.stock.stock.repository.StockRepository;
import com.stock.stock.repository.UserRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import yahoofinance.Stock;
import yahoofinance.YahooFinance;
import yahoofinance.histquotes.HistoricalQuote;
import yahoofinance.histquotes.Interval;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.ParseException;
import java.util.*;

@Service
public class StockService {

    private final UserRepository userRepository;

    private final StockRepository stockRepository;

    private final StockActivityRepository stockActivityRepository;

    public StockService(UserRepository userRepository,
                        StockRepository stockRepository,
                        StockActivityRepository stockActivityRepository) {
        this.userRepository = userRepository;
        this.stockRepository = stockRepository;
        this.stockActivityRepository = stockActivityRepository;
    }

    public yahoofinance.Stock getYahooStockData(String quote) {
        try {
            return YahooFinance.get(quote);
        } catch (IOException e) {
            e.printStackTrace();
            return new yahoofinance.Stock(quote);
        }
    }

    public Stock getYahooStockDataForTradeDate(String quote, Date date) {
        Stock stock = null;
        try {
            Calendar calendar = Calendar.getInstance();
            if (date != null) {
                Date currDate = new Date();
                if (DateService.compareDates(currDate, date)) {
                    stock =  YahooFinance.get(quote);
                } else {
                    calendar.setTime(date);
                    stock = YahooFinance.get(quote, calendar, Interval.DAILY);
                }
            }
            return stock;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return new yahoofinance.Stock(quote);
        }
    }

    public void updateStockAcctType(AccountType acctData, long userId) {
        Stocks currentStocks = stockRepository.findByStockIdAndUserId(acctData.getStockId(), userId);
        Users user = userRepository.findByUserId(userId);
        if (currentStocks != null && user != null) {
            currentStocks.setAccount(acctData.getAccount());
            stockRepository.save(currentStocks);
        }
    }

    public List<StocksData> getUserActiveStocksInfoData(long userId) throws IOException {
        List<StocksData> stockInfo = new ArrayList<>();
        List<Stocks> userStocks = stockRepository.findByUserIdAndHolding(userId, true);
        if (userStocks.size() > 0) {
            getStockList(userId, stockInfo, userStocks);
        }
        return stockInfo;
    }

    public  List<Stocks> getAllUserActiveStocks() {
        return  stockRepository.findAllByHolding(true);
    }

    public void generateStockData(long userId, Stocks stocks, Stock yahooStock, StocksData stock) throws IOException {
        BigDecimal buyPrice = stockActivityRepository.getShareBuyPrice(stocks.getTicker(), userId);
        BigDecimal sharesByUserId = stockActivityRepository.getBuySharesByUserId(stocks.getTicker(), userId);
        stock.setUserId(userId);
        stock.setStockId(stocks.getStockId());
        stock.setTicker(stocks.getTicker());
        stock.setShares(stocks.getShares());
        stock.setStockName(yahooStock.getName());
        stock.setMarketPrice(yahooStock.getQuote(true).getPrice());
        BigDecimal change = yahooStock.getQuote(true).getChangeInPercent();
        stock.setPercentChange(change);
        stock.setEquity((sharesByUserId).multiply(stock.getMarketPrice()));
        if (buyPrice.compareTo(BigDecimal.valueOf(0)) > 0) {
            stock.setBuyPrice(buyPrice.divide(sharesByUserId, RoundingMode.FLOOR));
        }
        stock.setCost(sharesByUserId.multiply(buyPrice));
        stock.setReturns(stock.getCost().subtract(stock.getEquity()));
        if (stocks.getAccount() != null) {
            stock.setAccount(stocks.getAccount());
        }
        if (yahooStock.getDividend().getExDate() != null) {
            stock.setExDate(yahooStock.getDividend().getExDate().getTime());
        }
        if (yahooStock.getDividend().getPayDate() != null) {
            stock.setPayDate(yahooStock.getDividend().getPayDate().getTime());
        }
        stock.setStockExchange(yahooStock.getStockExchange());
        stock.setLow(yahooStock.getQuote(true).getYearLow());
        stock.setHigh(yahooStock.getQuote(true).getYearHigh());
        stock.setDividend(yahooStock.getDividend().getAnnualYield());
        stock.setHolding(stocks.isHolding());
    }

    public void generateStockActivityData(long userId,
                                          Stocks stocks,
                                          Stock yahooStock,
                                          List<HistoricalQuote> historicalQuote,
                                          StockHistoryDetailsData stockHistory) {
        stockHistory.setUserId(userId);
        stockHistory.setStockId(stocks.getStockId());
        stockHistory.setTicker(stocks.getTicker());
        stockHistory.setStockName(yahooStock.getName());
        stockHistory.setHistory(historicalQuote);
    }

    public List<StocksData> getDividendData(long userId,
                                            String startDate,
                                            String endDate) throws ParseException, IOException {
        List<StocksData> stockInfo = new ArrayList<>();
        CalendarDates dates = DateService.extractSimpleDateFormat(startDate, endDate);
        List<Stocks> shares = stockRepository.getMonthlyDividends(dates.getStart(), dates.getEnd());
        getStockList(userId, stockInfo, shares);
        return stockInfo;
    }

    public void getStockList(long userId,
                             List<StocksData> stockInfo,
                             List<Stocks> shares) throws IOException {
        for (Stocks share : shares) {
            Stock yahooStock = this.getYahooStockData(share.getTicker().toUpperCase());
            StocksData stock = new StocksData();
            if (yahooStock.isValid()) {
                generateStockData(userId, share, yahooStock, stock);
                stockInfo.add(stock);
            }
        }
    }

    public List<StocksData> getAllDividendData(long userId) throws IOException {
        List<StocksData> stockInfo = new ArrayList<>();
        List<Stocks> shares = stockRepository.findByUserIdAndHolding(userId, true);
        getStockList(userId, stockInfo, shares);
        return stockInfo;
    }

    public List<StockHistoryDetailsData> getStockActivityData(long userId)
            throws IOException {
        List<StockHistoryDetailsData> stockHistoryInfo = new ArrayList<>();
        List<Stocks> shares = stockRepository.findByUserIdAndHolding(userId, true);
        for (Stocks share: shares) {
            Stock yahooStock = YahooFinance.get(share.getTicker(), true);
            List<HistoricalQuote> historicalQuote = yahooStock.getHistory();
            StockHistoryDetailsData historyDto = new StockHistoryDetailsData();
            if (yahooStock.isValid()) {
                generateStockActivityData(userId, share, yahooStock, historicalQuote, historyDto);
                stockHistoryInfo.add(historyDto);
            }
        }
        return stockHistoryInfo;
    }

    public List<StocksData> getTopMovers(long userId) throws IOException {
        List<StocksData> stockInfo = new ArrayList<>();
        List<StocksData> topMovers = new ArrayList<>();
        List<Stocks> shares = stockRepository.findByUserIdAndHolding(userId, true);
        getStockList(userId, stockInfo, shares);
        if (stockInfo.size() > 0) {
            stockInfo.sort(StocksData.stockPercentageChange);
            if (stockInfo.size() > 5) {
                topMovers = stockInfo.subList(stockInfo.size() - 5, stockInfo.size());
            } else if (stockInfo.size() < 5) {
                topMovers = stockInfo.subList(0, stockInfo.size());
            }
        }
        return topMovers;
    }

    public void processExcelFile(long userId, List<StockListData> shareList) {
        Date exDate = null;
        Date payDate = null;
        Users user = new Users();
        user.setUserId(userId);
        if (shareList != null && shareList.size() > 0) {
            for (StockListData share: shareList) {
                String ticker = share.getTicker().toUpperCase();
                Stock yahooStock = this.getYahooStockData(ticker);
                Stocks recordedStocks = stockRepository.findByTickerAndUserId(share.getTicker(), userId);
                if (yahooStock != null) {
                    if (yahooStock.getDividend().getExDate() != null) {
                        exDate = yahooStock.getDividend().getExDate().getTime();
                    }
                    if (yahooStock.getDividend().getPayDate() != null) {
                        payDate = yahooStock.getDividend().getPayDate().getTime();
                    }
                    if (recordedStocks == null) {
                        recordedStocks = new Stocks();
                        recordedStocks.setUser(user);
                        recordedStocks.setTicker(share.getTicker());
                        recordedStocks.setShares(share.getShares());
                        recordedStocks.setAccount(share.getAccount());
                        recordedStocks.setInitialDate(share.getTradeDate());
                        recordedStocks.setExDate(exDate);
                        recordedStocks.setPayDate(payDate);
                        recordedStocks.setTradeDate(share.getTradeDate());
                    }

                    if (share.getBuyPrice() != null) {
                        recordedStocks.setHolding(true);
                    }

                    if(share.getSellPrice() != null) {
                        int result = (recordedStocks.getShares()).compareTo(share.getShares());
                        if ( result == 0) {
                            recordedStocks.setShares(BigDecimal.valueOf(0));
                            recordedStocks.setHolding(false);
                        } else if (result > 0) {
                            BigDecimal shares = recordedStocks.getShares().subtract(share.getShares());
                            recordedStocks.setShares(shares);
                            recordedStocks.setHolding(true);
                        } else {
                            recordedStocks.setShares(BigDecimal.valueOf(0));
                            recordedStocks.setHolding(false);
                        }
                    }

                    /* Add recorded share to Share Table */
                    stockRepository.save(recordedStocks);

                    /* Add to share history table and portfolio table */
                    Stocks savedStocks = stockRepository.findByTickerAndUserId(recordedStocks.getTicker(), userId);
                    recordedStocks.setStockId(savedStocks.getStockId());
                    String action = processStockBuyOrSellData(share, recordedStocks);
                    recordedStocks.setShares(share.getShares());
                }
            }
        }
    }

    public String processStockBuyOrSellData(StockListData share, Stocks currentStocks) {
        /* sell logic */
        String action;
        BigDecimal shareCount;
        if(share.getSellPrice() != null) {
            action = "Sell";
            int result = (share.getShares()).compareTo(currentStocks.getShares());
            if ( result == 0) {
                currentStocks.setShares(BigDecimal.valueOf(0));
                currentStocks.setHolding(false);
            } else if (result > 0) {
                shareCount = currentStocks.getShares().subtract(share.getShares());
                currentStocks.setShares(shareCount);
                currentStocks.setHolding(true);
            } else {
                currentStocks.setShares(BigDecimal.valueOf(0));
                currentStocks.setHolding(false);
            }
        } else {
            /* buy logic */
            action = "Buy";
            if (currentStocks.getShares() != null) {
                shareCount = currentStocks.getShares().add(share.getShares());
            } else {
                shareCount = share.getShares();
            }
            currentStocks.setShares(shareCount);
            currentStocks.setHolding(true);
        }
        return action;
    }

    /* **** Under Construction **** */
    public ArrayList<String> processPdfFile(long userId, MultipartFile multipartFile) throws IOException {
        ArrayList<String> list = new ArrayList<>();
        if (!multipartFile.isEmpty()) {
            String fileName = multipartFile.getOriginalFilename();
            assert fileName != null;
            String prefix = fileName.substring(fileName.lastIndexOf("."));
            final File tempFile = File.createTempFile(fileName, prefix);
            multipartFile.transferTo(tempFile);

            PDDocument document = PDDocument.load(tempFile);
            //Instantiate PDFTextStripper class
            PDFTextStripper pdfStripper = new PDFTextStripper();
            //Retrieving text from PDF document
            String text = pdfStripper.getText(document);

            Scanner scanner = new Scanner(text);

            while(scanner.hasNextLine()) {
                final String lineFromFile = scanner.nextLine();
                if (lineFromFile.startsWith("Account Activity") || lineFromFile.startsWith("Page ")) {
                    continue;
                }
                list.add(lineFromFile);
            }
            //Closing the document
            document.close();
            scanner.close();
        }
        ArrayList<String> sortedList = new ArrayList<>();
        ListIterator<String> iterator = list.listIterator();
        while(iterator.hasNext()) {
            final String lineFromList = iterator.next();
            if (iterator.next().contains("Description Symbol Acct Type Transaction Date Qty Price Debit Credit")) {
                while(iterator.hasNext()) {
                    if (lineFromList.startsWith("Total Executed Trades Pending Settlement")) {
                        continue;
                    }
                    if (lineFromList.startsWith("Important Information")) {
                        break;
                    }
                    sortedList.add(iterator.next());
                }
            }
        }
        return sortedList;
    }

}
