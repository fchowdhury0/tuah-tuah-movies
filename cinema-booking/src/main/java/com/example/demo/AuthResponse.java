package com.example.demo;

public class AuthResponse {
    private String jwt;

    // Constructors
    public AuthResponse() {}

    public AuthResponse(String jwt) {
        this.jwt = jwt;
    }

    // Getter and Setter

    public String getJwt() { 
        return jwt; 
    }

    public void setJwt(String jwt) { 
        this.jwt = jwt; 
    }
}
