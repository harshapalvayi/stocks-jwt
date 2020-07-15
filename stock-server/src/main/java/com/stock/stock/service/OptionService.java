package com.stock.stock.service;

import com.google.gson.*;
import com.stock.stock.dto.OptionsChainDto;
import com.stock.stock.dto.OptionsInfoDto;
import com.stock.stock.entity.*;
import com.stock.stock.model.*;
import com.stock.stock.repository.OptionHistoryRepository;
import com.stock.stock.repository.OptionRepository;
import com.stock.stock.repository.PortfolioRepository;
import com.stock.stock.repository.UserRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import yahoofinance.Stock;

import java.io.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Service
public class OptionService {

    @Autowired
    public StockService stockService;

    @Autowired
    public PortfolioService portfolioService;

    @Autowired
    private OptionRepository optionRepository;

    @Autowired
    private OptionHistoryRepository optionHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    public List<OptionsInfoDto> getOptionsInfoDtos(@PathVariable long userid) {
        List<OptionsInfoDto> optionInfo = new ArrayList<>();
        List<Options> userShares = optionRepository.findByUserId(userid);
        getOptionList(userid, optionInfo, userShares);
        return optionInfo;
    }

    /*https://query1.finance.yahoo.com/v7/finance/options/AAPL*/

    public OptionsChainDto getYahooOptionData(String quote) {
       OptionsChainDto optionsList = new OptionsChainDto();
        try {
            URL url = new URL("https://query1.finance.yahoo.com/v7/finance/options/" + quote);
            int responseCode = getResponseCode(url);
            if (responseCode != 200) {
                throw new RuntimeException("HttpResponse code" + responseCode);
            } else {
                optionsList = getOptionsDtoObj(optionsList, url);
            }
            return optionsList;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return optionsList;
        }
    }

    public int getResponseCode(URL url) throws IOException {
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.connect();
        return connection.getResponseCode();
    }

    public OptionsChainDto getYahooOptionDataByTimestamp(String quote, long expiry) {
        OptionsChainDto optionsList = new OptionsChainDto();
        try {
            URL url = new URL("https://query1.finance.yahoo.com/v7/finance/options/" + quote + "?date=" + expiry);
            int responseCode = getResponseCode(url);
            if (responseCode != 200) {
                throw new RuntimeException("HttpResponse code" + responseCode);
            } else {
                optionsList = getOptionsDtoObj(optionsList, url);
            }
            return optionsList;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return optionsList;
        }
    }

    public OptionsChainDto getOptionsDtoObj(OptionsChainDto optionsList, URL url) throws IOException, ParseException {
        JSONObject jsonObject = null;
        Scanner sc = new Scanner(url.openStream());
        String inline = "";
        while (sc.hasNext()) {
            inline += (sc.nextLine());
        }

        JSONParser parse = new JSONParser();
        JSONObject obj = (JSONObject) parse.parse(inline);

        JSONObject subObj = (JSONObject) obj.get("optionChain");
        JSONArray jsonArray = (JSONArray) subObj.get("result");

        for (Object o : jsonArray) {
            jsonObject = (JSONObject) o;
        }

        Gson gson = new GsonBuilder()
                .registerTypeAdapter(Date.class, new DateDeserializer())
                .create();

        if (jsonObject != null) {
            optionsList = gson.fromJson(jsonObject.toString(), OptionsChainDto.class);
        }
        return optionsList;
    }

    public void getOptionList(long userId, List<OptionsInfoDto> optionInfoList, List<Options> options) {
        for (Options option: options) {
            Stock yahooStock = this.stockService.getYahooStockData(option.getTicker());
            OptionsInfoDto optionDto = new OptionsInfoDto();
            if (yahooStock != null) {
                if (yahooStock.isValid()) {
                    generateOption(userId, option, yahooStock, optionDto);
                    optionInfoList.add(optionDto);
                }
            }
        }
    }

    public void generateOption(long user_id, Options option, Stock yahooStock, OptionsInfoDto optionDto) {
        optionDto.setUserId(user_id);
        optionDto.setOptionId(option.getOptionId());
        optionDto.setTicker(option.getTicker());
        optionDto.setContracts(option.getContracts());
        optionDto.setAccount(option.getAccount());
        optionDto.setBuyPrice(option.getBuyPrice());
        optionDto.setName(yahooStock.getName());
        optionDto.setStrikePrice(option.getStrikePrice());
        optionDto.setOptionType(option.getOptionType());
        optionDto.setExpire(option.getExpire());
        optionDto.setOptionPrice(option.getOptionPrice());
        optionDto.setStockExchange(yahooStock.getStockExchange());
    }

    public void saveUserOption(OptionsInfoDto optionData, long userId) {
        String action = "Buy";
        String ticker = optionData.getTicker().toUpperCase();
        Options currentOption = optionRepository.findByTicker(optionData.getTicker());
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        Stock yahooStock = this.stockService.getYahooStockData(ticker);
        Users user = new Users();
        user.setUserId(userId);
        if (currentOption != null) {
            currentOption.setAccount(optionData.getAccount());
            currentOption.setTradeDate(optionData.getTradeDate());
            currentOption.setOptionType(optionData.getOptionType());
            currentOption.setOptionPrice(optionData.getOptionPrice());
            currentOption.setStrikePrice(optionData.getStrikePrice());
            currentOption.setBuyPrice(currentOption.getBuyPrice().add(optionData.getBuyPrice()));
            currentOption.setContracts(currentOption.getContracts().add(optionData.getContracts()));
        } else {
            currentOption = new Options();
            currentOption.setTicker(ticker);
            currentOption.setUserInfo(user);
            currentOption.setExpire(optionData.getExpire());
            currentOption.setAccount(optionData.getAccount());
            currentOption.setTradeDate(optionData.getTradeDate());
            currentOption.setInitialDate(optionData.getTradeDate());
            currentOption.setContracts(optionData.getContracts());
            currentOption.setOptionType(optionData.getOptionType());
            currentOption.setOptionPrice(optionData.getOptionPrice());
            currentOption.setBuyPrice(optionData.getBuyPrice());
            currentOption.setStrikePrice(optionData.getStrikePrice());
            currentOption.setHolding(true);
        }
        optionRepository.save(currentOption);
        performOtherActions(optionData, currentOption, portfolio, yahooStock, user, action);
    }

    public void performOtherActions(OptionsInfoDto optionData,
                                    Options currentOption,
                                    Portfolio portfolio,
                                    Stock yahooStock,
                                    Users user,
                                    String action) {
        optionData.setOptionId(currentOption.getOptionId());
        saveOptionHistoryByAction(optionData, currentOption, yahooStock, action);
        updateOptionToPortfolio(user, optionData, portfolio);
    }

    private void saveOptionHistoryByAction(OptionsInfoDto optionData, Options option, Stock yahooStock, String action) {
        String ticker = option.getTicker().toUpperCase();
        OptionHistory optionHistory = new OptionHistory();
        optionHistory.setOption(option);
        optionHistory.setTicker(ticker);
        optionHistory.setName(yahooStock.getName());
        optionHistory.setOptionType(option.getOptionType());
        optionHistory.setUserId(option.getUserInfo().getUserId());
        if ("Buy".equals(action)) {
            optionHistory.setActionPrice(optionData.getBuyPrice());
        } else {
            optionHistory.setActionPrice(optionData.getSellPrice());
        }
        optionHistory.setContracts(optionData.getContracts());
        if (option.getTradeDate() != null) {
            optionHistory.setTradeDate(option.getTradeDate());
        }
        optionHistory.setExpire(optionData.getExpire());
        optionHistory.setAction(action);
        optionHistory.setOptionPrice(optionData.getOptionPrice());
        optionHistory.setStrikePrice(option.getStrikePrice());
        optionHistoryRepository.save(optionHistory);
    }

    private void updateOptionToPortfolio(Users user, OptionsInfoDto optionData, Portfolio portfolio) {
        BigDecimal portfolioValue;
        BigDecimal investment;
        BigDecimal buyValue;
        BigDecimal optionValue;
        BigDecimal dividend = BigDecimal.valueOf(0);
        BigDecimal units = BigDecimal.valueOf(100);
        if(portfolio != null) {
            optionValue = (optionData.getContracts().multiply(units)).multiply(optionData.getOptionPrice());
            buyValue = (optionData.getContracts().multiply(units)).multiply(optionData.getBuyPrice());
            portfolioValue = portfolio.getPortfolio().add(optionValue);
            investment = portfolio.getInvestment().add(buyValue);
            portfolio.setPortfolio(portfolioValue);
            portfolio.setInvestment(investment);
            portfolio.setAnnualDividend(portfolio.getAnnualDividend());
            if (optionData.getTradeDate() != null) {
                portfolio.setTradeDate(optionData.getTradeDate());
            }
            portfolioRepository.save(portfolio);
            this.portfolioService.savePortfolioHistory(portfolio);
        } else {
            Portfolio newPortfolio = new Portfolio();
            buyValue = (optionData.getContracts().multiply(units)).multiply(optionData.getBuyPrice());
            optionValue = (optionData.getContracts().multiply(units)).multiply(optionData.getOptionPrice());
            investment = buyValue;
            portfolioValue = optionValue;
            newPortfolio.setUserInfo(user);
            newPortfolio.setPortfolio(portfolioValue);
            newPortfolio.setInvestment(investment);
            newPortfolio.setAnnualDividend(dividend);
            if (optionData.getTradeDate() != null) {
                newPortfolio.setTradeDate(optionData.getTradeDate());
            }
            portfolioRepository.save(newPortfolio);
            this.portfolioService.savePortfolioHistory(newPortfolio);
        }
    }

    public void tradeOption(OptionsInfoDto optionData, long userId) {
        String action;
        Options currentOption = optionRepository.findByOptionId(optionData.getOptionId());
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        Users user = userRepository.findByUserId(userId);
        String ticker = optionData.getTicker().toUpperCase();
        Stock yahooStock = this.stockService.getYahooStockData(ticker);
        BigDecimal units = BigDecimal.valueOf(100);
        BigDecimal contractValue;
        if (currentOption != null && user != null) {
            /* sell logic */
            if(optionData.getSellPrice() != null) {
                action = "Sell";
                int result = (currentOption.getContracts()).compareTo(optionData.getContracts());
                if (result == 0) {
                    currentOption.setContracts(BigDecimal.valueOf(0));
                    currentOption.setHolding(false);
                } else if (result > 0) {
                    BigDecimal contracts = currentOption.getContracts().subtract(optionData.getContracts());
                    currentOption.setContracts(contracts);
                    if (currentOption.getContracts().compareTo(BigDecimal.valueOf(0)) > 0) {
                        currentOption.setHolding(true);
                    } else {
                        currentOption.setHolding(false);
                    }
                } else {
                    currentOption.setContracts(BigDecimal.valueOf(0));
                    currentOption.setHolding(false);
                }
                currentOption.setSellPrice(optionData.getSellPrice());
                currentOption.setOptionType(optionData.getOptionType());
                contractValue = optionData.getContracts().multiply(units);
                BigDecimal lossOrGains = (optionData.getSellPrice()
                        .subtract(currentOption.getBuyPrice()))
                        .multiply(contractValue).abs();
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
                BigDecimal contracts = currentOption.getContracts().add(optionData.getContracts());
                BigDecimal currentBuy = currentOption.getBuyPrice();
                BigDecimal currentContracts = currentOption.getContracts();
                BigDecimal optionBuy = optionData.getBuyPrice();
                BigDecimal optionContracts = optionData.getContracts();

                BigDecimal buy = ((currentBuy.multiply(currentContracts))
                        .add(optionBuy.multiply(optionContracts)))
                        .divide(contracts, RoundingMode.FLOOR);
                currentOption.setBuyPrice(buy);
                currentOption.setContracts(contracts);
                currentOption.setHolding(true);
                if (optionData.getTradeDate() != null) {
                    currentOption.setTradeDate(optionData.getTradeDate());
                }
                contractValue = optionData.getContracts().multiply(units);
                currentOption.setOptionType(optionData.getOptionType());
                BigDecimal buyValue = optionData.getBuyPrice().multiply(contractValue).abs();
                if (portfolio != null) {
                    portfolio.setPortfolio(portfolio.getPortfolio().add(buyValue));
                }
            }
            optionRepository.save(currentOption);
            performOtherActions(optionData, currentOption, portfolio, yahooStock, user, action);
        }
    }

    public void deleteUserOption(long optionId, long userId) {
        Options currentOption = optionRepository.findByOptionId(optionId);
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        deleteShareFromPortfolio(currentOption, portfolio);
        optionRepository.delete(currentOption);
    }

    public void updateOptionAcctType(AccountType acctData, long userId) {
        Options currentOption = optionRepository.findByOptionId(acctData.getOptionid());
        Users user = userRepository.findByUserId(userId);
        if (currentOption != null && user != null) {
            currentOption.setAccount(acctData.getAccount());
            optionRepository.save(currentOption);
        }
    }

    public void deleteShareFromPortfolio(Options optionData, Portfolio portfolio) {
        BigDecimal units = BigDecimal.valueOf(100);
        BigDecimal contractValue;
        if(portfolio != null) {
            contractValue = (optionData.getContracts().multiply(units)).multiply(optionData.getBuyPrice());
            BigDecimal portfolioValue = portfolio.getPortfolio().subtract(contractValue);
            BigDecimal investment = portfolio.getInvestment().subtract(contractValue);
            portfolio.setPortfolio(portfolioValue);
            portfolio.setInvestment(investment);
            portfolio.setAnnualDividend(portfolio.getAnnualDividend());
            portfolioRepository.save(portfolio);
        }
    }
}
