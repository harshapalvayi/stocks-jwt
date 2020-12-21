package com.stock.stock.controller;

import com.stock.stock.dto.PortfolioData;
import com.stock.stock.dto.PortfolioHistoryData;
import com.stock.stock.service.PortfolioService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(value = "/api/portfolio")
public class PortfolioController {

    public final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping(value = "/{userId}")
    public PortfolioData getTotalPortfolio(@PathVariable long userId) throws IOException {
        return  this.portfolioService.getTotalPortfolio(userId);
    }

    @GetMapping(value = "/stocks/{userId}")
    public PortfolioData getStockPortfolio(@PathVariable long userId) throws IOException {
        return  this.portfolioService.getStockPortfolio(userId);
    }

    @GetMapping(value = "/options/{userId}")
    public PortfolioData getOptionPortfolio(@PathVariable long userId) throws IOException {
        return  this.portfolioService.getOptionPortfolio(userId);
    }

    @GetMapping(value = "/weekly/{userId}")
    public List<PortfolioData> getWeeklyPortfolio(@PathVariable long userId) throws IOException {
        return  this.portfolioService.calculateTotalPortfolio(userId, "weekly", 7);
    }

    @GetMapping(value = "/monthly/{userId}")
    public List<PortfolioData> getMonthlyPortfolio(@PathVariable long userId) throws IOException {
        return  this.portfolioService.calculateTotalPortfolio(userId, "monthly", 20);
    }

    @GetMapping(value = "/yearly/{userId}")
    public List<PortfolioData> getYearlyPortfolio(@PathVariable long userId) throws IOException {
        return  this.portfolioService.calculateTotalPortfolio(userId, "yearly", 240);
    }

    @GetMapping(value = "/all/{userId}")
    public List<PortfolioData> getAllPortfolio(@PathVariable long userId) throws IOException {
        return  this.portfolioService.calculateTotalPortfolio(userId, "all", 0);
    }

    @GetMapping(value = "/history/{userId}")
    public List<PortfolioHistoryData> getPortfolioHistory(@PathVariable long userId) throws IOException {
        return  this.portfolioService.getPortfolioHistory(userId);
    }
}
