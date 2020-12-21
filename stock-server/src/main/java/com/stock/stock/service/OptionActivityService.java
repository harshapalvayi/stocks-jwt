package com.stock.stock.service;

import com.stock.stock.dto.OptionActivityData;
import com.stock.stock.entity.OptionsActivity;
import com.stock.stock.repository.OptionActivityRepository;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OptionActivityService {

    public final StockService stockService;

    public final OptionService optionService;

    private final OptionActivityRepository optionActivityRepository;

    public OptionActivityService(StockService stockService,
                                OptionService optionService,
                                OptionActivityRepository optionActivityRepository) {
        this.stockService = stockService;
        this.optionService = optionService;
        this.optionActivityRepository = optionActivityRepository;
    }

    public List<OptionActivityData> getUserOptionActivityData(long user) {
        List<OptionActivityData> optionInfo = new ArrayList<>();
        List<OptionsActivity> userOptions = optionActivityRepository.findByUserId(user);
        getOptionActivityList(optionInfo, userOptions);
        return optionInfo;
    }

    public List<OptionActivityData> getUserOptionActivityDataByTicker(long user, String ticker) {
        List<OptionActivityData> optionInfo = new ArrayList<>();
        List<OptionsActivity> userOptions = optionActivityRepository.findByUserIdAndTicker(user, ticker.toUpperCase());
        getOptionActivityList(optionInfo, userOptions);
        return optionInfo;
    }

    public void getOptionActivityList(List<OptionActivityData> optionInfo, List<OptionsActivity> options) {
        for (OptionsActivity option : options) {
            String ticker = option.getTicker().toUpperCase();
            Stock yahooStock = this.stockService.getYahooStockData(ticker);
            OptionActivityData optionHistory = new OptionActivityData();
            if (yahooStock.isValid()) {
                generateOptionActivityData(option, yahooStock, optionHistory);
                optionInfo.add(optionHistory);
            }
        }
    }

    public void generateOptionActivityData(OptionsActivity option, Stock yahooStock, OptionActivityData optionActivity) {
        BigDecimal units = BigDecimal.valueOf(100);
        String name = yahooStock.getName();
        optionActivity.setName(name);
        optionActivity.setTicker(option.getTicker());
        optionActivity.setAction(option.getAction());
        optionActivity.setExpire(option.getExpire());
        optionActivity.setOptionId(option.getOptionId());
        optionActivity.setContracts(option.getContracts());
        optionActivity.setTradeDate(option.getTradeDate());
        optionActivity.setActionPrice(option.getActionPrice());
        BigDecimal contracts = option.getContracts().multiply(units);
        if (option.getActionPrice() != null) {
            optionActivity.setCost(contracts.multiply(option.getActionPrice()));
        }
        if (option.getOptionPrice() != null) {
            optionActivity.setEquity(contracts.multiply(option.getOptionPrice()));
        }
        if (optionActivity.getEquity() != null && optionActivity.getCost() != null) {
            BigDecimal returns = optionActivity.getEquity().subtract(optionActivity.getCost());
            optionActivity.setReturns(returns);
        }
        optionActivity.setOptionType(option.getOptionType());
        optionActivity.setStrikePrice(option.getStrikePrice());
        optionActivity.setOptionPrice(option.getOptionPrice());
    }

}
