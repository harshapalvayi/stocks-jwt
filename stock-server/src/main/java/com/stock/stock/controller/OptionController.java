package com.stock.stock.controller;

import com.stock.stock.dto.OptionsInfoDto;
import com.stock.stock.dto.StockInfoDto;
import com.stock.stock.model.MessageResponse;
import com.stock.stock.model.Options;
import com.stock.stock.model.Share;
import com.stock.stock.repository.OptionRepository;
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
    public OptionRepository optionRepository;

    @GetMapping(value = "/options/{userId}")
    public List<OptionsInfoDto> getAllOptions(@PathVariable long userId) {
        return  this.optionService.getOptionsInfoDtos(userId);
    }

    @PostMapping(value = "/options/{userId}")
    public ResponseEntity<?> postOptions(@PathVariable(value = "userId") long userId,
                                        @RequestBody Options optionData) {
        try {
            optionService.saveUserOption(optionData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @PutMapping(value = "/options/trade/{userId}")
    public ResponseEntity<?> tradeStocks(@PathVariable(value = "userId") long userId,
                                         @RequestBody Options optionData) {
        try {
            optionService.tradeOption(optionData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

}
