package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId; // Renamed from user_id to userId

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String passwordHash; // Renamed from password_hash to passwordHash

    @Column(unique = true, nullable = false)
    private String email;

    private String firstName; // Renamed from f_name to firstName
    private String lastName;  // Renamed from l_name to lastName
    
    @Column(nullable = false)
    private String role;

    private boolean status;
    private boolean isSubscribed;

    // Constructors
    public User() {}

    public User(String username, String passwordHash, String email, String firstName, String lastName, String role, boolean status, boolean isSubscribed) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.status = status;
        this.isSubscribed = isSubscribed;
    }

    // Getters and Setters

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() { // Updated getter name
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) { // Updated setter name
        this.passwordHash = passwordHash;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getFirstName() { // Updated getter
        return firstName;
    }

    public void setFirstName(String firstName) { // Updated setter
        this.firstName = firstName;
    }

    public String getLastName() { // Updated getter
        return lastName;
    }

    public void setLastName(String lastName) { // Updated setter
        this.lastName = lastName;
    }

    public String getRole() {
      return role;
    }

    public void setRole(String role) {
      this.role = role;
    }
    public boolean getStatus() {
      return status;
    }

    public void setStatus(boolean status) {
      this.status = status;
    }

    public boolean getIsSubscribed() {
      return isSubscribed;
    }

    public void setIsSubscribed(boolean isSubscribed) {
      this.isSubscribed = isSubscribed;
    }
}
