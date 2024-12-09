package com.example.demo.entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, nullable = false)
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    private String passwordHash;

    @Column(unique = true, nullable = false)
    private String email;

    private String firstName;
    private String lastName;

    @Column(nullable = false)
    private String role;

    private boolean status;

    @Column(name = "is_subscribed", nullable = false)
    private boolean isSubscribed;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<UserPaymentCard> userPaymentCards;

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    public Set<UserPaymentCard> getUserPaymentCards() {
        return userPaymentCards;
    }

    public void setUserPaymentCards(Set<UserPaymentCard> userPaymentCards) {
        this.userPaymentCards = userPaymentCards;
    }
}
