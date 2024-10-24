package com.example.demo;

public class PasswordResetRequest {
    private String email;

    // Constructors
    public PasswordResetRequest() {}

    public PasswordResetRequest(String email) {
        this.email = email;
    }

    // Getters and Setters

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
