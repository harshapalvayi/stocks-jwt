package com.stock.stock.service;

import com.google.gson.*;
import com.stock.stock.dto.OptionsChainData;
import com.stock.stock.dto.OptionsData;
import com.stock.stock.entity.*;
import com.stock.stock.model.*;
import com.stock.stock.repository.OptionActivityRepository;
import com.stock.stock.repository.OptionRepository;
import com.stock.stock.repository.UserRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;
import java.io.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Service
public class OptionService {

    public final StockService stockService;

    @Autowired
    public  OptionHistoryService optionHistoryService;

    private final UserRepository userRepository;

    private final OptionRepository optionRepository;

    private final OptionActivityRepository optionActivityRepository;

    public OptionService(StockService stockService,
                         UserRepository userRepository,
                         OptionRepository optionRepository,
                         OptionActivityRepository optionActivityRepository) {
        this.stockService = stockService;
        this.userRepository = userRepository;
        this.optionRepository = optionRepository;
        this.optionActivityRepository = optionActivityRepository;
    }

    public List<Options> getAllUserActiveOptions() {
        return optionRepository.findAllByHolding(true);
    }

    public List<OptionsData> getOptionsInfoData(long userid) {
        List<OptionsData> optionInfo = new ArrayList<>();
        List<Options> userShares = optionRepository.findByUserIdAndHolding(userid, true);
        getOptionInfoList(userid, optionInfo, userShares);
        return optionInfo;
    }

    public OptionsChainData getYahooOptionData(String quote) {
       OptionsChainData optionsList = new OptionsChainData();
        try {
            URL url = new URL("https://query1.finance.yahoo.com/v7/finance/options/" + quote);
            int responseCode = getResponseCode(url);
            if (responseCode != 200) {
                throw new RuntimeException("HttpResponse code" + responseCode);
            } else {
                optionsList = getOptionChainData(optionsList, url);
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

    public OptionsChainData getYahooOptionDataByTimestamp(String quote, long expiry) {
        OptionsChainData optionsList = new OptionsChainData();
        try {
            URL url = new URL("https://query2.finance.yahoo.com/v7/finance/options/" + quote + "?date=" + expiry);
            int responseCode = getResponseCode(url);
            if (responseCode != 200) {
                throw new RuntimeException("HttpResponse code" + responseCode);
            } else {
                optionsList = getOptionChainData(optionsList, url);
            }
            return optionsList;
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return optionsList;
        }
    }

    public OptionsChainData getOptionChainData(OptionsChainData optionsList, URL url)
            throws IOException, ParseException {
        JSONObject jsonObject = null;
        Scanner sc = new Scanner(url.openStream());
        String inline = "";
        while (sc.hasNext()) {
            inline = inline.concat(sc.nextLine());
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
            optionsList = gson.fromJson(jsonObject.toString(), OptionsChainData.class);
        }
        return optionsList;
    }

    public void getOptionInfoList(long userId, List<OptionsData> optionInfoList, List<Options> options) {
        for (Options option: options) {
            Stock yahooStock = this.stockService.getYahooStockData(option.getTicker());
            OptionsData optionDto = new OptionsData();
            if (yahooStock != null) {
                if (yahooStock.isValid()) {
                    generateOptionData(userId, option, yahooStock, optionDto);
                    optionInfoList.add(optionDto);
                }
            }
        }
    }

    public void generateOptionData(long userId, Options option, Stock yahooStock, OptionsData optionDto) {
        BigDecimal buyPrice = optionActivityRepository.getOptionBuyPrice(option.getTicker(), userId);
        BigDecimal optionsByUserId = optionActivityRepository.getBuyOptionsByUserId(option.getTicker(), userId);
        optionDto.setUserId(userId);
        optionDto.setOptionId(option.getOptionId());
        optionDto.setTicker(option.getTicker());
        optionDto.setContracts(option.getContracts());
        optionDto.setAccount(option.getAccount());
        optionDto.setName(yahooStock.getName());
        optionDto.setExpire(option.getExpire());
        optionDto.setOptionType(option.getOptionType());
        optionDto.setStrikePrice(option.getStrikePrice());
        optionDto.setOptionPrice(option.getOptionPrice());
        optionDto.setStockExchange(yahooStock.getStockExchange());
        optionDto.setBuyPrice(buyPrice.divide(optionsByUserId, RoundingMode.FLOOR));
    }

    public void saveUserOptionData(OptionsData optionData, long userId)  {
        String action = "Buy";
        String ticker = optionData.getTicker().toUpperCase();
        Options currentOption = optionRepository.findByTickerAndUserId(ticker, userId);
        Stock yahooStock = this.stockService.getYahooStockData(ticker);
        Users user = new Users();
        user.setUserId(userId);
        if (currentOption != null) {
            currentOption.setAccount(optionData.getAccount());
            currentOption.setTradeDate(optionData.getTradeDate());
            currentOption.setOptionType(optionData.getOptionType());
            currentOption.setOptionPrice(optionData.getOptionPrice());
            currentOption.setStrikePrice(optionData.getStrikePrice());
            currentOption.setContracts(currentOption.getContracts().add(optionData.getContracts()));
        } else {
            currentOption = new Options();
            currentOption.setTicker(ticker);
            currentOption.setUser(user);
            currentOption.setExpire(optionData.getExpire());
            currentOption.setAccount(optionData.getAccount());
            currentOption.setTradeDate(optionData.getTradeDate());
            currentOption.setInitialDate(optionData.getTradeDate());
            currentOption.setContracts(optionData.getContracts());
            currentOption.setOptionType(optionData.getOptionType());
            currentOption.setOptionPrice(optionData.getOptionPrice());
            currentOption.setStrikePrice(optionData.getStrikePrice());
            currentOption.setHolding(true);
        }
        currentOption.setOptionSymbol(optionData.getOptionSymbol());
        BigDecimal equity = optionData.getOptionPrice()
                .multiply(optionData.getContracts()
                .multiply(BigDecimal.valueOf(100)));
        currentOption.setEquity(equity);
        BigDecimal cost = optionData.getBuyPrice()
                .multiply(optionData.getContracts()
                .multiply(BigDecimal.valueOf(100)));
        currentOption.setCost(cost);
        /* Record in options table */
        optionRepository.save(currentOption);
        /* Record in options history table */
        try {
            optionHistoryService.loadUserOptionHistoryDetails(currentOption);
        } catch (java.text.ParseException e) {
            e.printStackTrace();
        }
        /* Record in options activity table */
        saveUserOptionActivityData(optionData, currentOption, yahooStock, action);
    }

    public void saveUserOptionActivityData(OptionsData optionData,
                                           Options currentOption,
                                           Stock yahooStock,
                                           String action) {
        optionData.setOptionId(currentOption.getOptionId());
        saveOptionActivityDataByAction(optionData, currentOption, yahooStock, action);
    }

    private void saveOptionActivityDataByAction(OptionsData optionData,
                                                Options option,
                                                Stock yahooStock,
                                                String action) {
        OptionsActivity optionsActivity = new OptionsActivity();
        String ticker = option.getTicker().toUpperCase();
        optionsActivity.setOption(option);
        optionsActivity.setTicker(ticker);
        optionsActivity.setName(yahooStock.getName());
        optionsActivity.setOptionType(option.getOptionType());
        optionsActivity.setUserId(option.getUser().getUserId());
        if ("Buy".equals(action)) {
            optionsActivity.setActionPrice(optionData.getBuyPrice());
        } else {
            optionsActivity.setActionPrice(optionData.getSellPrice());
        }
        optionsActivity.setContracts(optionData.getContracts());
        if (option.getTradeDate() != null) {
            optionsActivity.setTradeDate(option.getTradeDate());
        }
        optionsActivity.setOptionSymbol(optionData.getOptionSymbol());
        optionsActivity.setExpire(optionData.getExpire());
        optionsActivity.setAction(action);
        optionsActivity.setOptionPrice(optionData.getOptionPrice());
        optionsActivity.setStrikePrice(option.getStrikePrice());
        optionActivityRepository.save(optionsActivity);
    }

    public void tradeOption(OptionsData optionData, long userId) {
        String action;
        Options currentOption = optionRepository.findByOptionIdAndUserId(optionData.getOptionId(), userId);
        Users user = userRepository.findByUserId(userId);
        String ticker = optionData.getTicker().toUpperCase();
        Stock yahooStock = this.stockService.getYahooStockData(ticker);
        if (currentOption != null && user != null) {
            /* sell logic */
            if (optionData.getSellPrice() != null) {
                action = "Sell";
                int result = (currentOption.getContracts()).compareTo(optionData.getContracts());
                if (result == 0) {
                    currentOption.setContracts(BigDecimal.valueOf(0));
                    currentOption.setHolding(false);
                } else if (result > 0) {
                    BigDecimal contracts = currentOption.getContracts().subtract(optionData.getContracts());
                    currentOption.setContracts(contracts);
                    currentOption.setHolding(currentOption.getContracts().compareTo(BigDecimal.valueOf(0)) > 0);
                } else {
                    currentOption.setContracts(BigDecimal.valueOf(0));
                    currentOption.setHolding(false);
                }
            } else {
                /* buy logic */
                action = "Buy";
                BigDecimal contracts = currentOption.getContracts().add(optionData.getContracts());
                currentOption.setContracts(contracts);
                currentOption.setHolding(true);
                if (optionData.getTradeDate() != null) {
                    currentOption.setTradeDate(optionData.getTradeDate());
                }
            }
            currentOption.setOptionType(optionData.getOptionType());
            optionRepository.save(currentOption);
            /* Record in options history table */
            try {
                optionHistoryService.loadUserOptionHistoryDetails(currentOption);
            } catch (java.text.ParseException e) {
                e.printStackTrace();
            }
            saveUserOptionActivityData(optionData, currentOption, yahooStock, action);
        }
    }

    public void deleteUserOption(long optionId, long userId) {
        Options currentOption = optionRepository.findByOptionIdAndUserId(optionId, userId);
        optionRepository.delete(currentOption);
    }

    public void updateOptionAcctType(AccountType acctData, long userId) {
        Options currentOption = optionRepository.findByOptionIdAndUserId(acctData.getOptionId(), userId);
        Users user = userRepository.findByUserId(userId);
        if (currentOption != null && user != null) {
            currentOption.setAccount(acctData.getAccount());
            optionRepository.save(currentOption);
        }
    }
}
