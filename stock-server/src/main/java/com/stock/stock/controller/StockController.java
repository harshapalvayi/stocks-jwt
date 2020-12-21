package com.stock.stock.controller;

import com.stock.stock.dto.*;
import com.stock.stock.model.MessageResponse;
import com.stock.stock.model.Stock;
import com.stock.stock.repository.StockRepository;
import com.stock.stock.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(value = "/api/stocks")
public class StockController {

    public final TradeService tradeService;

    private final StockService stockService;

    public final AccountService accountService;

    public final StockHistoryService stockHistoryService;

    public final StockActivityService stockActivityService;

    public final StockRepository stockRepository;

    public StockController(StockService stockService,
                           TradeService tradeService,
                           AccountService accountService,
                           StockRepository stockRepository,
                           StockActivityService stockActivityService,
                           StockHistoryService stockHistoryService) {
        this.stockService = stockService;
        this.tradeService = tradeService;
        this.accountService = accountService;
        this.stockActivityService = stockActivityService;
        this.stockHistoryService = stockHistoryService;
        this.stockRepository = stockRepository;
    }

    @GetMapping(value = "/{userId}")
    public List<StocksData> getAllUserActiveStocks(@PathVariable long userId)
            throws IOException {
        return this.stockService.getUserActiveStocksInfoData(userId);
    }

    @PostMapping(value = "/{userId}")
    public ResponseEntity<?> postStocks(@PathVariable(value = "userId") long userId,
                                        @RequestBody ShareData shareData) {
        try {
            tradeService.saveUserStockData(shareData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @GetMapping(value = "/activity/{userId}")
    public List<StockActivityData> getAllUserStocks(@PathVariable long userId)
            throws IOException {
        return  this.stockActivityService.getUserStockActivityData(userId);
    }

    @GetMapping(value = "/activity/{userId}/{ticker}")
    public List<StockActivityData> getStockActivityByUserAndTicker(@PathVariable long userId,
                                                           @PathVariable String ticker)
            throws IOException {
        return  this.stockActivityService.getUserStockActivityDataByTicker(userId, ticker);
    }

    @DeleteMapping(value = "/{stockId}/{userId}")
    public ResponseEntity<?> deleteStock(@PathVariable(value = "stockId") long stockId,
                                         @PathVariable(value = "userId") long userId) {
        if (!stockRepository.existsByStockId(stockId)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Record not found in the database"));
        }
        try {
            tradeService.deleteUserStock(stockId, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity
                    .badRequest().body(MessageResponse.failure(e));
        }
    }

    @PutMapping(value = "/trade/{userId}")
    public ResponseEntity<?> tradeStocks(@PathVariable(value = "userId") long userId,
                                         @RequestBody ShareData shareData) {
        try {
            tradeService.tradeStock(shareData, userId);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @PostMapping(value = "/upload/Excel/{userId}")
    public ResponseEntity<?> uploadStocksFromExcelFile(@PathVariable(value = "userId")  long userId,
                                                       @RequestBody List<StockListData> shares) {
        try {
            stockService.processExcelFile(userId, shares);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @GetMapping(value = "/dividend/{userId}/{startDate}/{endDate}")
    public List<StocksData> getDividend(@PathVariable long userId,
                                        @PathVariable String startDate,
                                        @PathVariable String endDate) throws ParseException, IOException {
        return stockService.getDividendData(userId, startDate, endDate);
    }

    @GetMapping(value = "/dividend/{userId}")
    public List<StocksData> getDividend(@PathVariable long userId) throws IOException {
        return stockService.getAllDividendData(userId);
    }

    @GetMapping(value = "/history/{userId}")
    public List<StockHistoryDetailsData> getStockHistory(@PathVariable long userId)
            throws IOException {
        return stockService.getStockActivityData(userId);
    }

    @GetMapping(value = "/topMovers/{userId}")
    public List<StocksData> getTopMovers(@PathVariable long userId) throws IOException {
        return stockService.getTopMovers(userId);
    }

    @GetMapping(value = "/{userId}/{ticker}")
    public Stock getStockDetails(@PathVariable long userId,
                                 @PathVariable String ticker) {
        yahoofinance.Stock stock = this.stockService.getYahooStockData(ticker);

        Date exDate = stock.getDividend().getExDate() != null ? stock.getDividend().getExDate().getTime(): null;
        Date payDate = stock.getDividend().getPayDate() != null ? stock.getDividend().getPayDate().getTime(): null;

        return new Stock(stock.getSymbol(),
                stock.getName(),
                stock.getQuote().getPrice(),
                stock.getDividend().getAnnualYield(),
                payDate,
                exDate,
                stock.getQuote().getYearHigh(),
                stock.getQuote().getYearLow(),
                stock.getStockExchange());
    }

    /* Under construction */
    @PostMapping(value = "/upload/PDF/{userId}")
    public List<String> uploadStocksFromPdfFile(@PathVariable(value = "userId") long userId,
                                                @RequestParam("file") MultipartFile file) throws IOException {
        return stockService.processPdfFile(userId, file);
    }

}
