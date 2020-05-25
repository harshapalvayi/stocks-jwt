package com.stock.stock.controller;

import com.stock.stock.model.AccountType;
import com.stock.stock.model.BrokerageAccounts;
import com.stock.stock.model.MessageResponse;
import com.stock.stock.service.AccountService;
import com.stock.stock.service.OptionService;
import com.stock.stock.service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(value = "/api")
public class BrokerageAcctController {
    @Autowired
    public AccountService accountService;

    @Autowired
    public ShareService shareService;

    @Autowired
    public OptionService optionService;

    @GetMapping(value = "/account")
    public List<BrokerageAccounts> getAccounts() {
        return this.accountService.getBrokerageAccounts();
    }

    @PutMapping(value = "/account/shareAcctType/{userId}")
    public ResponseEntity<?> updateShareAcctType(@PathVariable(value = "userId") long userId,
                                      @RequestBody AccountType acctData) {
        try {
            shareService.updateShareAcctType(acctData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @PutMapping(value = "/account/optionAcctType/{userId}")
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
