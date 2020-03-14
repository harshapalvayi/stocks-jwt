package com.stock.stock.controller;

import com.stock.stock.model.MessageResponse;
import com.stock.stock.model.StockDetails;
import com.stock.stock.repository.StockDetailRepository;
import com.stock.stock.repository.StockRepository;
import com.stock.stock.model.Stocks;
import com.stock.stock.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(value = "/api/stocks")
public class StockController {

    @Autowired
    public StockService stockService;

    @Autowired
    public StockRepository stockRepository;

    @Autowired
    public StockDetailRepository stockDetailRepository;

    @PostMapping(value = "/upload")
    public ResponseEntity<?> uploadStocks(@RequestBody List<StockDetails> stockDetails) {
        try {
            stockService.processExcelFile(stockDetails);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<?> postStocks(@RequestBody Stocks stockData) {
        try {
            stockService.saveStock(stockData);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @PostMapping(value = "/edit")
    public ResponseEntity<?> editStocks(@RequestBody Stocks stockData) {
        try {
            stockService.editStock(stockData);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity.badRequest().body(MessageResponse.failure(e));
        }
    }

    @GetMapping(value = "/delete/{id}")
    public void deleteStock(@PathVariable long id) {
        stockRepository.findById(id);
    }

    @GetMapping(value = "/ticker/{ticker}")
    public String getStockName(@PathVariable String ticker) {
        return this.stockService.getYahooStockData(ticker).getName();
    }

    @GetMapping(value = "/all/{userId}")
    public List<Stocks> getAllStocks(@PathVariable long userId) {
        return stockRepository.findByUserId(userId);
    }

    @GetMapping(value = "/all")
    public List<StockDetails> getAllStocksDetails() {
        return stockDetailRepository.findBy();
    }

    @GetMapping(value = "/total")
    public double getTotal() {
        return stockRepository.total();
    }

    @GetMapping(value = "/dividend/{startDate}/{endDate}")
    public List<Stocks> getDividend(@PathVariable String startDate, @PathVariable String endDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start = sdf.parse(startDate);
        Date end = sdf.parse(endDate);
        return stockRepository.dividends(start, end);
    }
}
