package com.example.demo.dto;

public class JwtResponse {
    private String jwt;

    public JwtResponse(String jwt) {
        this.jwt = jwt;
    }

    // Getter
    public String getJwt() {
        return jwt;
    }

    // Setter
    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}