// src/main/java/com/example/demo/service/PricesService.java
package com.example.demo.service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PriceUpdateDTO;
import com.example.demo.entity.Prices;
import com.example.demo.repository.PricesRepository;

@Service
public class PricesService {

    @Autowired
    private PricesRepository pricesRepository;

    public List<Prices> getActivePrices() {
        return pricesRepository.findByIsActiveTrue();
    }

    public Prices getPriceByCategory(String category) {
        return pricesRepository.findByCategoryAndIsActiveTrue(category)
                .orElseThrow(() -> new RuntimeException("Price not found for category: " + category));
    }

    public Prices updatePrice(Long pricingId, Double basePrice, LocalDate effectiveDate, Boolean isActive) {
        Prices prices = pricesRepository.findById(pricingId)
                .orElseThrow(() -> new RuntimeException("Prices not found"));
        prices.setBasePrice(basePrice);
        prices.setEffectiveDate(effectiveDate);
        prices.setIsActive(isActive);
        return pricesRepository.save(prices);
    }

    public List<Prices> updatePrices(List<PriceUpdateDTO> pricesList) {
        for (PriceUpdateDTO dto : pricesList) {
            Prices existingPrice = pricesRepository.findById(dto.getPricingId())
                    .orElseThrow(() -> new RuntimeException("Price not found for ID: " + dto.getPricingId()));
            
            existingPrice.setCategory(dto.getCategory());
            existingPrice.setBasePrice(dto.getBasePrice());
            
            try {
                LocalDate effectiveDate = LocalDate.parse(dto.getEffectiveDate());
                existingPrice.setEffectiveDate(effectiveDate);
            } catch (DateTimeParseException e) {
                throw new RuntimeException("Invalid date format for pricingId " + dto.getPricingId());
            }
            
            existingPrice.setIsActive(dto.getIsActive());
            pricesRepository.save(existingPrice);
        }
        return pricesRepository.findAll();
    }
}