package com.stock.stock.jobs;

import com.stock.stock.service.StockHistoryService;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

import java.io.IOException;
import java.text.ParseException;

@DisallowConcurrentExecution
public class UserStockHistorySchedulerJob extends QuartzJobBean {
    public static String JOB_NAME = "Stock History";

    private final StockHistoryService stockHistoryService;

    public UserStockHistorySchedulerJob(StockHistoryService stockHistoryService) {
        this.stockHistoryService = stockHistoryService;
    }

    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        try {
            stockHistoryService.loadUserStockHistoryDetails(null);
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
    }
}
