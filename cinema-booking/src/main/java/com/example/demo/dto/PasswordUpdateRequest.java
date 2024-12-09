package com.example.demo.dto;

public class PasswordUpdateRequest {
    private String token;
    private String newPassword;

    // Constructors
    public PasswordUpdateRequest() {}

    public PasswordUpdateRequest(String token, String newPassword) {
        this.token = token;
        this.newPassword = newPassword;
    }

    // Getters and Setters

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}
