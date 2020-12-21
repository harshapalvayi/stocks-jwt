package com.stock.stock.controller;

import com.stock.stock.dto.OptionActivityData;
import com.stock.stock.dto.OptionsChainData;
import com.stock.stock.dto.OptionsData;
import com.stock.stock.model.MessageResponse;
import com.stock.stock.repository.OptionRepository;
import com.stock.stock.service.OptionActivityService;
import com.stock.stock.service.OptionHistoryService;
import com.stock.stock.service.OptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(value = "/api/options")
public class OptionController {

    public final OptionService optionService;

    public final OptionHistoryService optionHistoryService;

    public final OptionActivityService optionActivityService;

    public final OptionRepository optionRepository;

    public OptionController(OptionService optionService,
                            OptionActivityService optionActivityService,
                            OptionHistoryService optionHistoryService,
                            OptionRepository optionRepository) {
        this.optionService = optionService;
        this.optionHistoryService = optionHistoryService;
        this.optionActivityService = optionActivityService;
        this.optionRepository = optionRepository;
    }

    @GetMapping(value = "/{userId}")
    public List<OptionsData> getAllUserActiveOptions(@PathVariable long userId) {
        return  this.optionService.getOptionsInfoData(userId);
    }

    @PostMapping(value = "/{userId}")
    public ResponseEntity<?> postOptions(@PathVariable(value = "userId") long userId,
                                         @RequestBody OptionsData optionData) {
        try {
            optionService.saveUserOptionData(optionData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @GetMapping(value = "/history/{userId}")
    public List<OptionActivityData> getAllUserOptionsActivityData(@PathVariable long userId) {
        return  this.optionActivityService.getUserOptionActivityData(userId);
    }

    @GetMapping(value = "/history/{userId}/{ticker}")
    public List<OptionActivityData> getOptionActivityDataByTicker(@PathVariable long userId,
                                                                  @PathVariable String ticker) {
        return  this.optionActivityService.getUserOptionActivityDataByTicker(userId, ticker);
    }

    @GetMapping(value = "/data/{ticker}")
    public OptionsChainData getOptionDetails(@PathVariable String ticker) {
        String stockTicker = ticker.toUpperCase();
        return  this.optionService.getYahooOptionData(stockTicker);
    }

    @GetMapping(value = "/data/{ticker}/{expiry}")
    public OptionsChainData getOptionDetailsByTimestamp(@PathVariable String ticker,
                                                        @PathVariable long expiry) {
        String stockTicker = ticker.toUpperCase();
        return  this.optionService.getYahooOptionDataByTimestamp(stockTicker, expiry);
    }

    @PutMapping(value = "/trade/{userId}")
    public ResponseEntity<?> tradeOptions(@PathVariable(value = "userId") long userId,
                                         @RequestBody OptionsData optionData) {
        try {
            optionService.tradeOption(optionData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @DeleteMapping(value = "/{optionId}/{userId}")
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
