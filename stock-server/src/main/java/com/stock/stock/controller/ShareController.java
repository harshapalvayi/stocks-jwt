package com.stock.stock.controller;

import com.stock.stock.dto.ShareListDto;
import com.stock.stock.dto.StockHistoryDto;
import com.stock.stock.dto.StockHistoryInfoDto;
import com.stock.stock.dto.StockInfoDto;
import com.stock.stock.model.MessageResponse;
import com.stock.stock.entity.Share;
import com.stock.stock.repository.ShareRepository;
import com.stock.stock.service.AccountService;
import com.stock.stock.service.ShareHistoryService;
import com.stock.stock.service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(value = "/api")
public class ShareController {

    @Autowired
    public ShareService shareService;

    @Autowired
    public ShareHistoryService shareHistoryService;

    @Autowired
    public AccountService accountService;

    @Autowired
    public ShareRepository shareRepository;

    @GetMapping(value = "/shares/{userId}")
    public List<StockInfoDto> getAllUserActiveShares(@PathVariable long userId) {
        return  this.shareService.getUserActiveStocksInfoDtos(userId);
    }

    @GetMapping(value = "/shares/history/{userId}")
    public List<StockHistoryDto> getAllUserShares(@PathVariable long userId) {
        return  this.shareHistoryService.getUserShareHistoryDtos(userId);
    }

    @PostMapping(value = "/shares/{userId}")
    public ResponseEntity<?> postStocks(@PathVariable(value = "userId") long userId,
                                        @RequestBody Share shareData) {
        try {
            shareService.saveUserStock(shareData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @DeleteMapping(value = "/shares/{shareId}/{userId}")
    public ResponseEntity<?> deleteStock(@PathVariable(value = "shareId") long shareId,
                                         @PathVariable(value = "userId") long userId) {
        try {
            shareService.deleteUserStock(shareId, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @PutMapping(value = "/shares/trade/{userId}")
    public ResponseEntity<?> tradeStocks(@PathVariable(value = "userId") long userId,
                                        @RequestBody Share stockData) {
        try {
            shareService.tradeStock(stockData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @PostMapping(value = "/shares/upload/{userId}")
    public ResponseEntity<?> uploadStocks(@PathVariable(value = "userId")  long userId,
                                          @RequestBody List<ShareListDto> shares) {
        try {
            shareService.processExcelFile(userId, shares);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @GetMapping(value = "/shares/dividend/{userId}/{startDate}/{endDate}")
    public List<StockInfoDto> getDividend(@PathVariable long userId, @PathVariable String startDate,
                                          @PathVariable String endDate) throws ParseException {
        return shareService.getDividendData(userId, startDate, endDate);
    }

    @GetMapping(value = "/shares/dividend/{userId}")
    public List<StockInfoDto> getDividend(@PathVariable long userId)  {
        return shareService.getAllDividendData(userId);
    }

    @GetMapping(value = "/stocks/history/{userId}")
    public List<StockHistoryInfoDto> getStockHistory(@PathVariable long userId)
            throws IOException {
        return shareService.getStockHistoryData(userId);
    }

    @GetMapping(value = "/shares/topMovers/{userId}")
    public List<StockInfoDto> getTopMovers(@PathVariable long userId) {
        return shareService.getTopMovers(userId);
    }
}
