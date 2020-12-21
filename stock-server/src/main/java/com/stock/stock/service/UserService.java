package com.stock.stock.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.luckycatlabs.sunrisesunset.SunriseSunsetCalculator;
import com.stock.stock.dto.OptionsChainData;
import com.stock.stock.dto.SunInfo;
import com.stock.stock.entity.Users;
import com.stock.stock.repository.UserRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.shredzone.commons.suncalc.SunTimes;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.Scanner;
import java.util.TimeZone;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return user;
    }

    public void updateTheme(long userId, String type) {
        Users user = userRepository.findByUserId(userId);
        if (user != null) {
            user.setTheme(type);
            userRepository.save(user);
        }
    }

    public void updateContent(long userId, String content, String type) {
        Users user = userRepository.findByUserId(userId);
        if (user != null) {
            if ("email".equals(type)) {
                user.setEmail(content);
            } else {
                user.setPassword(content);
            }
            userRepository.save(user);
        }
    }

    public void save(Users user) {
        userRepository.save(user);
    }

}
