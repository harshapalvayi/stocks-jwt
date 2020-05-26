package com.stock.stock.service;

import com.stock.stock.dto.PortfolioDto;
import com.stock.stock.model.Portfolio;
import com.stock.stock.model.Share;
import com.stock.stock.repository.PortfolioRepository;
import com.stock.stock.repository.ShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class PortfolioService {

    @Autowired
    public StockService stockService;

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private ShareRepository shareRepository;

    public PortfolioDto getPortfolio(long userId) {
        PortfolioDto portfolioDto = new PortfolioDto();
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        if (portfolio != null) {
            portfolioDto.setPortfolio(portfolio.getPortfolio());
            portfolioDto.setInvestment(portfolio.getInvestment());
            BigDecimal percentChange = ((((portfolio.getInvestment().subtract(portfolio.getPortfolio()))
                    .multiply(BigDecimal.valueOf(100)))
                    .divide(portfolio.getPortfolio(), RoundingMode.FLOOR))
                    .setScale(2, RoundingMode.FLOOR)).abs();
            portfolioDto.setPercentChange(percentChange);
        }
        List<Share> shares = shareRepository.findByUserId(userId);
        BigDecimal annualDividend = BigDecimal.valueOf(0);
        if (shares != null && shares.size() > 0) {
            for (Share share : shares) {
                Stock yahooStock = this.stockService.getYahooStockData(share.getTicker());
                if (yahooStock.isValid()) {
                    if (yahooStock.getDividend().getAnnualYield() != null) {
                        BigDecimal dividend = yahooStock.getDividend().getAnnualYield();
                        annualDividend = annualDividend.add(dividend.multiply(share.getShares()))
                        .setScale(2, RoundingMode.FLOOR);
                    }
                }
            }
            portfolioDto.setAnnualDividend(annualDividend);
        }
        return portfolioDto;
    }

    public void deletePortfolio(long userId) {
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        if (portfolio != null) {
            portfolioRepository.delete(portfolio);
        }
    }
}
