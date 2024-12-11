// Prices.java
package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pricing") // Updated table name from "prices" to "pricing"
public class Prices {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pricing_id") // Ensure this column exists in the "pricing" table
    private Long pricingId;

    @Column(name = "base_price")
    private Double basePrice;

    @Column(name = "category")
    private String category;

    @Column(name = "effective_date")
    private LocalDate effectiveDate;

    @Column(name = "is_active")
    private Boolean isActive;

    // Getters and Setters

    public Long getPricingId() {
        return pricingId;
    }

    public void setPricingId(Long pricingId) {
        this.pricingId = pricingId;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(LocalDate effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}