package com.stock.stock.service;

import com.stock.stock.dto.OptionsInfoDto;
import com.stock.stock.model.*;
import com.stock.stock.repository.OptionRepository;
import com.stock.stock.repository.PortfolioRepository;
import com.stock.stock.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import yahoofinance.Stock;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class OptionService {

    @Autowired
    public StockService stockService;

    @Autowired
    private OptionRepository optionRepository;

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

    public void getOptionList(long userId, List<OptionsInfoDto> optionInfoList, List<Options> options) {
        for (Options option: options) {
            Stock yahooStock = this.stockService.getYahooStockData(option.getTicker());
            OptionsInfoDto optionDto = new OptionsInfoDto();
            if (yahooStock.isValid()) {
                generateOption(userId, option, yahooStock, optionDto);
                optionInfoList.add(optionDto);
            }
        }
    }

    public void generateOption(long user_id, Options option, Stock yahooStock, OptionsInfoDto optionDto) {
        optionDto.setUserid(user_id);
        optionDto.setOptionid(option.getOptionid());
        optionDto.setTicker(option.getTicker());
        optionDto.setContracts(option.getContracts());
        optionDto.setName(yahooStock.getName());
        optionDto.setBuy(option.getBuy());
        optionDto.setPrice(yahooStock.getQuote().getPrice());
        optionDto.setAccount(option.getAccount());
    }

    public void saveUserOption(Options optionData, long userId) {
        String ticker = optionData.getTicker().toUpperCase();
        Options currentOption = optionRepository.findByTicker(optionData.getTicker());
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        Users user = new Users();
        user.setUserid(userId);
        if (currentOption != null) {
            currentOption.setBuy(currentOption.getBuy().add(optionData.getBuy()));
            currentOption.setContracts(currentOption.getContracts().add(optionData.getContracts()));
            currentOption.setAccount(optionData.getAccount());
            updateOptionToPortfolio(user, optionData, portfolio);
        } else {
            currentOption = new Options();
            currentOption.setBuy(optionData.getBuy());
            currentOption.setTicker(ticker);
            currentOption.setUserInfo(user);
            currentOption.setContracts(optionData.getContracts());
            currentOption.setAccount(optionData.getAccount());
            updateOptionToPortfolio(user, optionData, portfolio);
            currentOption.setHolding(true);
        }
        optionRepository.save(currentOption);
    }

    private void updateOptionToPortfolio(Users user, Options optionData, Portfolio portfolio) {
        BigDecimal portfolioValue = BigDecimal.valueOf(0);
        BigDecimal dividend = BigDecimal.valueOf(0);
        BigDecimal investment;
        BigDecimal units = BigDecimal.valueOf(100);
        BigDecimal contractValue;
        if(portfolio != null) {
            contractValue = (optionData.getContracts().multiply(units)).multiply(optionData.getBuy());
            portfolioValue = portfolio.getPortfolio().add(contractValue);
            investment = portfolio.getInvestment().add(contractValue);
            portfolio.setPortfolio(portfolioValue);
            portfolio.setInvestment(investment);
            portfolio.setAnnualDividend(portfolio.getAnnualDividend());
            portfolioRepository.save(portfolio);
        } else {
            Portfolio newPortfolio = new Portfolio();
            contractValue = (optionData.getContracts().multiply(units)).multiply(optionData.getBuy());
            investment = contractValue;
            portfolioValue = contractValue;
            newPortfolio.setUserInfo(user);
            newPortfolio.setPortfolio(portfolioValue);
            newPortfolio.setInvestment(investment);
            newPortfolio.setAnnualDividend(dividend);
            portfolioRepository.save(newPortfolio);
        }
    }

    public void tradeOption(Options optionData, long userId) {
        Options currentOption = optionRepository.findByOptionid(optionData.getOptionid());
        Portfolio portfolio = portfolioRepository.findByUserId(userId);
        Users user = userRepository.findByUserid(userId);
        BigDecimal units = BigDecimal.valueOf(100);
        BigDecimal contractValue;
        if (currentOption != null && user != null) {
            /* sell logic */
            if(optionData.getSell() != null) {
                if ((optionData.getContracts()).compareTo(currentOption.getContracts()) >= 0) {
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
                currentOption.setSell(optionData.getSell());
                contractValue = optionData.getContracts().multiply(units);
                BigDecimal lossOrGains = (optionData.getSell()
                        .subtract(currentOption.getBuy()))
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
                BigDecimal contracts = currentOption.getContracts().add(optionData.getContracts());
                BigDecimal avgBuy = currentOption.getBuy()
                        .add(optionData.getBuy())
                        .divide(new BigDecimal(2), RoundingMode.FLOOR);
                currentOption.setBuy(avgBuy);
                currentOption.setContracts(contracts);
                currentOption.setHolding(true);
                contractValue = optionData.getContracts().multiply(units);
                BigDecimal buyValue = optionData.getBuy().multiply(contractValue).abs();
                if (portfolio != null) {
                    portfolio.setPortfolio(portfolio.getPortfolio().add(buyValue));
                }
            }
            if (portfolio != null) {
                portfolioRepository.save(portfolio);
            }
            optionRepository.save(currentOption);
        }
    }

    public void updateOptionAcctType(AccountType acctData, long userId) {
        Options currentOption = optionRepository.findByOptionid(acctData.getOptionid());
        Users user = userRepository.findByUserid(userId);
        if (currentOption != null && user != null) {
            currentOption.setAccount(acctData.getAccount());
            optionRepository.save(currentOption);
        }
    }
}
