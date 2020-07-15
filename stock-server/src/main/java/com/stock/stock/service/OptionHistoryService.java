package com.stock.stock.service;

import com.stock.stock.dto.OptionHistoryDto;
import com.stock.stock.entity.OptionHistory;
import com.stock.stock.repository.OptionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import yahoofinance.Stock;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OptionHistoryService {

    @Autowired
    public StockService stockService;

    @Autowired
    private OptionHistoryRepository optionHistoryRepository;

    public List<OptionHistoryDto> getUserOptionHistoryDtos(@PathVariable long user) {
        List<OptionHistoryDto> optionInfo = new ArrayList<>();
        List<OptionHistory> userOptions = optionHistoryRepository.findByUserId(user);
        getStockHistoryList(optionInfo, userOptions);
        return optionInfo;
    }

    public void getStockHistoryList(List<OptionHistoryDto> optionInfo, List<OptionHistory> options) {
        for (OptionHistory option : options) {
            String ticker = option.getTicker().toUpperCase();
            Stock yahooStock = this.stockService.getYahooStockData(ticker);
            OptionHistoryDto optionHistory = new OptionHistoryDto();
            if (yahooStock.isValid()) {
                generateOptionHistory(option, yahooStock, optionHistory);
                optionInfo.add(optionHistory);
            }
        }
    }

    public void generateOptionHistory(OptionHistory option, Stock yahooStock, OptionHistoryDto optionHistory) {
        BigDecimal units = BigDecimal.valueOf(100);
        String name = yahooStock.getName();
        optionHistory.setOptionId(option.getOption().getOptionId());
        optionHistory.setName(name);
        optionHistory.setTicker(option.getTicker());
        optionHistory.setAction(option.getAction());
        optionHistory.setExpire(option.getExpire());
        optionHistory.setContracts(option.getContracts());
        optionHistory.setTradeDate(option.getTradeDate());
        optionHistory.setActionPrice(option.getActionPrice());
        BigDecimal contracts = option.getContracts().multiply(units);
        if (option.getActionPrice() != null) {
            optionHistory.setCost(contracts.multiply(option.getActionPrice()));
        }
        if (option.getOptionPrice() != null) {
            optionHistory.setEquity(contracts.multiply(option.getOptionPrice()));
        }
        if (optionHistory.getEquity() != null && optionHistory.getCost() != null) {
            BigDecimal returns = optionHistory.getEquity().subtract(optionHistory.getCost());
            optionHistory.setReturns(returns);
        }
        optionHistory.setOptionType(option.getOptionType());
        optionHistory.setStrikePrice(option.getStrikePrice());
        optionHistory.setOptionPrice(option.getOptionPrice());
    }

}
