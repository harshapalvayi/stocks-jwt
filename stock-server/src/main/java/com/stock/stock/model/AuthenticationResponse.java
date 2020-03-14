package com.stock.stock.model;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable {

    private final String jwtToken;
    private long  id;
    private String type = "Bearer";
    private String name;
    private String email;

    public AuthenticationResponse(String accessToken) {
        this.jwtToken = accessToken;
    }

    public AuthenticationResponse(String accessToken, long id, String username, String email) {
        this.jwtToken = accessToken;
        this.id = id;
        this.name = username;
        this.email = email;
    }

    public long getId() { return id; }

    public void setId(long id) { this.id = id; }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJwtToken() {
        return jwtToken;
    }
}
