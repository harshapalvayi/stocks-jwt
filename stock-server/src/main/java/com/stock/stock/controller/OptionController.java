package com.stock.stock.controller;

import com.stock.stock.dto.OptionHistoryDto;
import com.stock.stock.dto.OptionsChainDto;
import com.stock.stock.dto.OptionsInfoDto;
import com.stock.stock.model.MessageResponse;
import com.stock.stock.entity.Options;
import com.stock.stock.repository.OptionRepository;
import com.stock.stock.service.OptionHistoryService;
import com.stock.stock.service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(value = "/api")
public class OptionController {

    @Autowired
    public OptionService optionService;

    @Autowired
    public OptionHistoryService optionHistoryService;

    @Autowired
    public OptionRepository optionRepository;

    @GetMapping(value = "/options/{userId}")
    public List<OptionsInfoDto> getAllUserActiveOptions(@PathVariable long userId) {
        return  this.optionService.getOptionsInfoDtos(userId);
    }

    @GetMapping(value = "/options/history/{userId}")
    public List<OptionHistoryDto> getAllUserOptions(@PathVariable long userId) {
        return  this.optionHistoryService.getUserOptionHistoryDtos(userId);
    }

    @GetMapping(value = "/options/data/{ticker}")
    public OptionsChainDto getOptionDetails(@PathVariable String ticker) {
        String stockTicker = ticker.toUpperCase();
        return  this.optionService.getYahooOptionData(stockTicker);
    }

    @GetMapping(value = "/options/data/{ticker}/{expiry}")
    public OptionsChainDto getOptionDetailsByTimestamp(@PathVariable String ticker,
                                                       @PathVariable long expiry) {
        String stockTicker = ticker.toUpperCase();
        return  this.optionService.getYahooOptionDataByTimestamp(stockTicker, expiry);
    }

    @PostMapping(value = "/options/{userId}")
    public ResponseEntity<?> postOptions(@PathVariable(value = "userId") long userId,
                                        @RequestBody OptionsInfoDto optionData) {
        try {
            optionService.saveUserOption(optionData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @PutMapping(value = "/options/trade/{userId}")
    public ResponseEntity<?> tradeOptions(@PathVariable(value = "userId") long userId,
                                         @RequestBody OptionsInfoDto optionData) {
        try {
            optionService.tradeOption(optionData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @DeleteMapping(value = "/options/{optionId}/{userId}")
    public ResponseEntity<?> deleteStock(@PathVariable(value = "optionId") long optionId,
                                         @PathVariable(value = "userId") long userId) {
        try {
            optionService.deleteUserOption(optionId, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

}
