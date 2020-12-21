package com.stock.stock.controller;

import com.stock.stock.model.AccountType;
import com.stock.stock.model.BrokerageAccounts;
import com.stock.stock.model.MessageResponse;
import com.stock.stock.service.AccountService;
import com.stock.stock.service.OptionService;
import com.stock.stock.service.StockService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(value = "/api/account")
public class BrokerageAcctController {

    public final AccountService accountService;

    public final StockService stockService;

    public final OptionService optionService;

    public BrokerageAcctController(AccountService accountService,
                                   StockService stockService,
                                   OptionService optionService) {
        this.accountService = accountService;
        this.stockService = stockService;
        this.optionService = optionService;
    }

    @GetMapping(value = "")
    public List<BrokerageAccounts> getAccounts() {
        return this.accountService.getBrokerageAccounts();
    }

    @PutMapping(value = "/stockAcctType/{userId}")
    public ResponseEntity<?> updateStockAcctType(@PathVariable long userId,
                                      @RequestBody AccountType acctData) {
        try {
            stockService.updateStockAcctType(acctData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @PutMapping(value = "/optionAcctType/{userId}")
    public ResponseEntity<?> updateOptionAcctType(@PathVariable(value = "userId") long userId,
                                                 @RequestBody AccountType acctData) {
        try {
            optionService.updateOptionAcctType(acctData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }
}
