package com.stock.stock.service;

import com.stock.stock.dto.CalendarDates;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class DateService {

    public static String convertDateToString(Date date) {
        SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        String convertDate = null;
        try {
            convertDate = format1.format(date);
        } catch (Exception e1) {
            e1.printStackTrace();
        }
        return convertDate;
    }

    public static Calendar extractCalendarDateFormat(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar;
    }

    public static String convertCalenderToString(Calendar calender) {
        Date date = calender.getTime();
        SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        String convertDate = null;
        try {
            convertDate = format1.format(date);
        } catch (Exception e1) {
            e1.printStackTrace();
        }
        return convertDate;
    }

    public static ArrayList<Date> calculateWorkingDates(int days) {
        ArrayList<Date> dates = new ArrayList<>();
        Calendar cal = Calendar.getInstance();
        IntStream.range(0, days).forEach(i -> {
            do {
                cal.add(Calendar.DAY_OF_MONTH, -1);
            } while (isWeekend(cal));
            dates.add(cal.getTime());
        });
        return (ArrayList<Date>) dates.stream().sorted(Date::compareTo).collect(Collectors.toList());
    }

    private static boolean isWeekend(Calendar calendar) {
        return calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY ||
                calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY;
    }

    public static ArrayList<Date> calculateAllDates(ArrayList<Date> givenDates, Date endDate) {
        Date currDate = new Date();
        Calendar start = Calendar.getInstance();
        start.setTime(endDate);

        Calendar end = Calendar.getInstance();
        end.setTime(currDate);

        while(start.before(end) || start.equals(end)) {
            givenDates.add(start.getTime());
            start.add(Calendar.DATE, 1);
        }
        return givenDates;
    }

    public static ArrayList<Date> calculateAllDatesUntil(Date tillDate) {
        ArrayList<Date> allDates = new ArrayList<>();
        Date currDate = new Date();
        Calendar start = Calendar.getInstance();
        Calendar end = Calendar.getInstance();
        if (tillDate.compareTo(currDate) > 0) {
            start.setTime(currDate);
            end.setTime(tillDate);
        } else {
            start.setTime(tillDate);
            end.setTime(currDate);
        }
        while(start.before(end) || start.equals(end)) {
            allDates.add(start.getTime());
            start.add(Calendar.DATE, 1);
        }
        return allDates;
    }

    public static ArrayList<Date> calculateWorkingDatesBetween(Date firstDate, Date lastDate) {
        Date startDate = getDateWithoutTimeUsingCalendar(firstDate);
        Date endDate = getDateWithoutTimeUsingCalendar(lastDate);
        ArrayList<Date> dates = new ArrayList<>();
        ArrayList<Date> workDates = new ArrayList<>();
        Calendar start = Calendar.getInstance();
        Calendar end = Calendar.getInstance();
        if (startDate.compareTo(endDate) > 0) {
            start.setTime(endDate);
            end.setTime(startDate);
        } else {
            start.setTime(startDate);
            end.setTime(endDate);
        }
        while(start.before(end) || start.equals(end)) {
            dates.add(start.getTime());
            start.add(Calendar.DATE, 1);
        }
        int days = dates.size();
        workDates.add(end.getTime());
        IntStream.range(0, days).forEach(i -> {
            do {
                end.add(Calendar.DAY_OF_MONTH, -1);
            } while (isWeekend(end));
            workDates.add(end.getTime());
        });
        return workDates;
    }

    public static long calculateTimestamp(Date date) {
        return date.getTime() / 1000;
    }

    public static long calculateTimestampForOption(Date date) throws ParseException {
        SimpleDateFormat completeDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String stringDate = dateFormat.format(date);
        Date convertedDate = completeDateFormat.parse(stringDate + " 20:00:00");
        return calculateTimestamp(convertedDate);
    }
    public static Date getDateWithoutTimeUsingCalendar(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    public static CalendarDates extractSimpleDateFormat(String startDate,
                                                        String endDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        CalendarDates dates = new CalendarDates();
        dates.setStart(sdf.parse(startDate));
        dates.setEnd(sdf.parse(endDate));
        return dates;
    }

    public static boolean compareDates(Date date1, Date date2) throws ParseException {
        boolean check;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date d1 = sdf.parse(sdf.format(date1));
        Date d2 = sdf.parse(sdf.format(date2));
        check = d1.compareTo(d2) == 0;
      return check;
    }
}
