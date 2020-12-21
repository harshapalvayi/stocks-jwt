package com.stock.stock.service;

import com.stock.stock.dto.OptionsChainData;
import com.stock.stock.dto.Quote;
import com.stock.stock.entity.Options;
import com.stock.stock.entity.OptionsHistory;
import com.stock.stock.repository.OptionHistoryRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OptionHistoryService {

    public final StockService stockService;

    public final OptionService optionService;

    private final OptionHistoryRepository optionHistoryRepository;

    public OptionHistoryService(StockService stockService,
                                OptionService optionService,
                                OptionHistoryRepository optionHistoryRepository) {
        this.stockService = stockService;
        this.optionService = optionService;
        this.optionHistoryRepository = optionHistoryRepository;
    }

    public List<OptionsHistory> getUserOptionHistoryData(long userId, Date tradeDate) throws IOException {
        List<OptionsHistory> optionInfo = new ArrayList<>();
        if (tradeDate != null) {
            String stringDate = DateService.convertDateToString(tradeDate);
            List<OptionsHistory> userOptions = optionHistoryRepository.findByUserIdAndTradeDate(userId, stringDate);
            if (userOptions.size() > 0) {
                optionInfo.addAll(userOptions);
            }
        }
        return optionInfo;
    }

     public void loadUserOptionHistoryDetails(Options optionData) throws ParseException {
       if (optionData != null) {
           recordOptionHistory(optionData);
       } else {
           List<Options> optionInfo = this.optionService.getAllUserActiveOptions();
           for (Options option: optionInfo) {
               recordOptionHistory(option);
           }
       }
    }

    public void recordOptionHistory(Options option) throws ParseException {
        Date endDate;
        Date currDate = new Date();
        Date startDate = option.getTradeDate();
        endDate = option.getExpire();
        if (currDate.compareTo(endDate) > 0) {
            endDate = option.getExpire();
        } else {
            endDate = DateService.getDateWithoutTimeUsingCalendar(currDate);
        }
        ArrayList<Date> dates = DateService.calculateWorkingDatesBetween(startDate, endDate);
        for (Date date: dates) {
            System.out.println(date);
            long timestamp = DateService.calculateTimestampForOption(date);
            OptionsHistory userOption;
            String stringDate = DateService.convertDateToString(date);
            userOption = optionHistoryRepository
                    .findByOptionIdAndUserIdAndTradeDate(
                            option.getOptionId(),
                            option.getUser().getUserId(),
                            stringDate);
            if (userOption == null) {
                userOption = new OptionsHistory();
            }
            OptionsChainData yahooOption = this.optionService
                    .getYahooOptionDataByTimestamp(option.getOptionSymbol(), timestamp);
            if (yahooOption != null) {
                Quote quote = yahooOption.quote;
                if (quote != null && quote.regularMarketPrice != null) {
                    userOption.setMarketPrice(quote.regularMarketPrice);
                }
            }
            userOption.setUserId(option.getUser().getUserId());
            userOption.setOptionId(option.getOptionId());
            userOption.setContracts(option.getContracts());
            userOption.setTicker(option.getTicker());
            userOption.setTradeDate(date);
            optionHistoryRepository.save(userOption);
        }
    }

}
