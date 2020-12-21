package com.stock.stock.jobs;

import com.stock.stock.service.OptionHistoryService;
import com.stock.stock.service.OptionService;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

import java.io.IOException;
import java.text.ParseException;

@DisallowConcurrentExecution
public class UserOptionHistorySchedulerJob extends QuartzJobBean {

    public static String JOB_NAME = "Option History";

    private final OptionHistoryService optionHistoryService;

    public UserOptionHistorySchedulerJob(OptionHistoryService optionHistoryService) {
        this.optionHistoryService = optionHistoryService;
    }

    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        try {
            optionHistoryService.loadUserOptionHistoryDetails(null);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
