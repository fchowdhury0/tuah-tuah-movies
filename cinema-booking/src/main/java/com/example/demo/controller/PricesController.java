// src/main/java/com/example/demo/controller/PricesController.java

package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Prices;
import com.example.demo.service.PricesService;

@RestController
@RequestMapping("/api/tickets/pricing")
public class PricesController {

    @Autowired
    private PricesService pricesService;

    // GET: Retrieve all active prices
    @GetMapping
    public ResponseEntity<List<Prices>> getAllActivePrices() {
        try {
            List<Prices> prices = pricesService.getActivePrices();
            return ResponseEntity.ok(prices);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT: Update a specific price by pricingId
    @PutMapping("/{pricingId}")
    public ResponseEntity<Prices> updatePrice(
            @PathVariable Long pricingId,
            @RequestBody PriceUpdateRequest request) {
        try {
            Prices updatedPrice = pricesService.updatePrice(
                    pricingId,
                    request.getBasePrice(),
                    request.getEffectiveDate(),
                    request.getIsActive()
            );
            return ResponseEntity.ok(updatedPrice);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // DTO for Update Requests
    public static class PriceUpdateRequest {
        private Double basePrice;
        private LocalDate effectiveDate;
        private Boolean isActive;

        // Getters and Setters
        public Double getBasePrice() {
            return basePrice;
        }

        public void setBasePrice(Double basePrice) {
            this.basePrice = basePrice;
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
}