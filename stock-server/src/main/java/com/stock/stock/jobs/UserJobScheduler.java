package com.stock.stock.jobs;

import org.quartz.*;
import org.quartz.utils.Key;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class UserJobScheduler {

    @Value("${quartz.enabled}")
    boolean isSchedulerEnabled = false;

    private final Scheduler scheduler;

    public UserJobScheduler(Scheduler scheduler) {
        this.scheduler = scheduler;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        exerciseSchedules();
        if (isSchedulerEnabled) {
            try {
                scheduler.start();
            } catch (SchedulerException e) {
                System.out.println("Failed to start Scheduler" + e);
            }
        }
    }

    public void exerciseSchedules() {
        scheduleUserStockHistoryJob();
        scheduleUserOptionHistoryJob();
    }

    /* To schedule at specific time use CronScheduleBuilder */
    public void scheduleUserStockHistoryJob() {
        try {
            JobKey job  = new JobKey(UserStockHistorySchedulerJob.JOB_NAME, Key.DEFAULT_GROUP);
            String description = "Synchronize Stock Information from Yahoo";
            createCronJob(job, description, UserStockHistorySchedulerJob.class
            );
        } catch (SchedulerException e) {
            System.out.println("Failed to schedule User Stock Job" + e);
        }
    }

    public void scheduleUserOptionHistoryJob() {
        try {
            JobKey job  = new JobKey(UserOptionHistorySchedulerJob.JOB_NAME, Key.DEFAULT_GROUP);
            String description = "Synchronize Option Information from Yahoo";
            createCronJob(job, description, UserOptionHistorySchedulerJob.class
            );
        } catch (SchedulerException e) {
            System.out.println("Failed to schedule User Stock Job" + e);
        }
    }

    private void createCronJob(JobKey job, String jobDescription, Class jobClass) throws SchedulerException {
        Trigger trigger = TriggerBuilder.newTrigger()
                .withIdentity("trigger-" + job.getName(),
                        job.getGroup())
                .withDescription("Triggers at server start up")
                .forJob(job)
                .build();
        Set<Trigger> triggers = new HashSet<>();
        triggers.add(trigger);

        JobDetail jobDetail = JobBuilder.newJob(jobClass)
                .withIdentity(job)
                .withDescription(jobDescription)
                .build();
        if (!scheduler.checkExists(job)) {
            scheduler.scheduleJob(jobDetail, triggers, false);
        }
    }

}
