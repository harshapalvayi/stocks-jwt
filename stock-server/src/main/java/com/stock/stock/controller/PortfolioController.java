package com.stock.stock.controller;

import com.stock.stock.dto.PortfolioDto;
import com.stock.stock.dto.PortfolioHistoryDto;
import com.stock.stock.dto.StockHistoryDto;
import com.stock.stock.service.PortfolioHistoryService;
import com.stock.stock.service.PortfolioService;
import com.stock.stock.service.ShareHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(value = "/api")
public class PortfolioController {

    @Autowired
    public PortfolioService portfolioService;

    @Autowired
    public PortfolioHistoryService portfolioHistoryService;

    @GetMapping(value = "/portfolio/{userId}")
    public PortfolioDto getPortfolio(@PathVariable(value = "userId")  long userId) {
        return portfolioService.getPortfolio(userId);
    }

    @GetMapping(value = "/portfolio/history/{userId}")
    public List<PortfolioHistoryDto> getAllUserShares(@PathVariable long userId) {
        return  this.portfolioHistoryService.getUserPortfolioHistoryDtos(userId);
    }

    @DeleteMapping(value = "/portfolio/{userId}")
    public void deletePortfolio(@PathVariable(value = "userId")  long userId) {
         portfolioService.deletePortfolio(userId);
    }
}
