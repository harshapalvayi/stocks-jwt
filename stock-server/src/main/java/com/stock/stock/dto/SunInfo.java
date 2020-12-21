package com.stock.stock.dto;

import java.time.ZonedDateTime;
import java.util.Calendar;

public class SunInfo {
    public Calendar sunrise;
    public Calendar sunset;
    public ZonedDateTime rise;
    public ZonedDateTime set;
    public String theme;

    public SunInfo() {

    }

    public Calendar getSunrise() {
        return sunrise;
    }

    public void setSunrise(Calendar sunrise) {
        this.sunrise = sunrise;
    }

    public Calendar getSunset() {
        return sunset;
    }

    public void setSunset(Calendar sunset) {
        this.sunset = sunset;
    }

    public ZonedDateTime getRise() {
        return rise;
    }

    public void setRise(ZonedDateTime rise) {
        this.rise = rise;
    }

    public ZonedDateTime getSet() {
        return set;
    }

    public void setSet(ZonedDateTime set) {
        this.set = set;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public SunInfo(Calendar sunrise, Calendar sunset, String theme) {
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.theme = theme;
    }

    public SunInfo(ZonedDateTime rise, ZonedDateTime set, String theme) {
        this.rise = rise;
        this.set = set;
        this.theme = theme;
    }
}
