package com.stock.stock.service;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;

import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.Date;

public class DateDeserializer implements JsonDeserializer<Date> {

    private int MILLISECONDS = 1000;
    @Override
    public Date deserialize(JsonElement element, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {

        Timestamp stamp = new Timestamp(element.getAsLong());
        return new Date(stamp.getTime()*MILLISECONDS);
    }
}
