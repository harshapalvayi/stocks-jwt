package com.stock.stock.controller;

import com.stock.stock.dto.PortfolioDto;
import com.stock.stock.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(value = "/api")
public class PortfolioController {

    @Autowired
    public PortfolioService portfolioService;

    @GetMapping(value = "/portfolio/portfolio/{userId}")
    public PortfolioDto getPortfolio(@PathVariable(value = "userId")  long userId) throws ParseException {
        return portfolioService.getPortfolio(userId);
    }

    @DeleteMapping(value = "/portfolio/portfolio/{userId}")
    public void deletePortfolio(@PathVariable(value = "userId")  long userId) {
         portfolioService.deletePortfolio(userId);
    }
}
