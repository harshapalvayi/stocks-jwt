package com.stock.stock.service;

import com.stock.stock.dto.PortfolioDto;
import com.stock.stock.entity.Portfolio;
import com.stock.stock.entity.PortfolioHistory;
import com.stock.stock.repository.PortfolioHistoryRepository;
import com.stock.stock.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class PortfolioService {

    @Autowired
    public StockService stockService;

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private PortfolioHistoryRepository portfolioHistoryRepository;

    public PortfolioDto getPortfolio(long userId) {
        PortfolioDto portfolioDto = new PortfolioDto();
        BigDecimal percentChange;
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        if (portfolio != null) {
            portfolioDto.setUserId(userId);
            portfolioDto.setPortfolio(portfolio.getPortfolio());
            portfolioDto.setInvestment(portfolio.getInvestment());
            if (portfolio.getInvestment() != null && portfolio.getPortfolio() != null) {
                int result = (portfolio.getPortfolio()).compareTo(BigDecimal.valueOf(0));
                if (result > 0) {
                    percentChange = ((((portfolio.getInvestment().subtract(portfolio.getPortfolio()))
                            .multiply(BigDecimal.valueOf(100)))
                            .divide(portfolio.getPortfolio(), RoundingMode.FLOOR))
                            .setScale(2, RoundingMode.FLOOR)).abs();
                } else {
                    percentChange = (((portfolio.getInvestment().subtract(portfolio.getPortfolio()))
                            .multiply(BigDecimal.valueOf(100)))
                            .setScale(2, RoundingMode.FLOOR)).abs();
                }
                portfolioDto.setPercentChange(percentChange);
                BigDecimal position = portfolio.getInvestment().subtract(portfolio.getPortfolio()).abs();
                portfolioDto.setPosition(position);
            }
            if (portfolio.getAnnualDividend() != null) {
                portfolioDto.setAnnualDividend(portfolio.getAnnualDividend());
            }
        }
        return portfolioDto;
    }

    public void savePortfolioHistory(Portfolio portfolio) {
        PortfolioHistory portfolioHistory = new PortfolioHistory();
        portfolioHistory.setUserId(portfolio.getUserInfo().getUserId());
        portfolioHistory.setPortfolio(portfolio);
        portfolioHistory.setPortfolioValue(portfolio.getPortfolio());
        portfolioHistory.setAnnualDividend(portfolio.getAnnualDividend());
        portfolioHistory.setInvestment(portfolio.getInvestment());
        portfolioHistory.setTradeDate(portfolio.getTradeDate());
        portfolioHistoryRepository.save(portfolioHistory);
    }


    public void deletePortfolio(long userId) {
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        if (portfolio != null) {
            portfolioRepository.delete(portfolio);
        }
    }
}
