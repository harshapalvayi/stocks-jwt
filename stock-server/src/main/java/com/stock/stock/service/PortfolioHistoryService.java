package com.stock.stock.service;

import com.stock.stock.dto.PortfolioHistoryDto;
import com.stock.stock.entity.PortfolioHistory;
import com.stock.stock.repository.PortfolioHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PortfolioHistoryService {

    @Autowired
    public PortfolioService portfolioService;

    @Autowired
    private PortfolioHistoryRepository portfolioHistoryRepository;

    public List<PortfolioHistoryDto> getUserPortfolioHistoryDtos(@PathVariable long user) {
        List<PortfolioHistoryDto> portfolioInfo = new ArrayList<>();
        List<PortfolioHistory> userOptions = portfolioHistoryRepository.findByUserId(user);
        getPortfolioHistoryList(portfolioInfo, userOptions);
        return portfolioInfo;
    }

    public void getPortfolioHistoryList(List<PortfolioHistoryDto> portfolioInfo, List<PortfolioHistory> portfolioHistories) {
        for (PortfolioHistory history : portfolioHistories) {
            PortfolioHistoryDto optionHistory = new PortfolioHistoryDto();
            generatePortfolioHistory(history, optionHistory);
            portfolioInfo.add(optionHistory);
        }
    }

    public void generatePortfolioHistory(PortfolioHistory history, PortfolioHistoryDto optionHistory) {
        BigDecimal portfolio = history.getPortfolioValue();
        BigDecimal investment = history.getInvestment();
        BigDecimal annual_dividend = history.getAnnualDividend();
        BigDecimal position = history.getPosition();
        Date trade_dt = history.getTradeDate();
        optionHistory.setUserId(history.getUserId());
        optionHistory.setPortfolioId(history.getPortfolio().getPortfolioId());
        optionHistory.setPortfolio(portfolio);
        optionHistory.setInvestment(investment);
        optionHistory.setAnnualDividend(annual_dividend);
        optionHistory.setPosition(position);
        optionHistory.setTradeDate(trade_dt);
    }

}
