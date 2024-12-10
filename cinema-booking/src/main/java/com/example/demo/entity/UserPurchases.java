package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_purchases")
public class UserPurchases {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userPurchaseId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "purchase_id", nullable = false)
    private Purchases purchase;

    // Getters, setters, constructors...
}
