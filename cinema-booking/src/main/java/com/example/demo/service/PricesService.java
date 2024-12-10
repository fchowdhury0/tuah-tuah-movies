package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Prices;
import com.example.demo.repository.PricesRepository;

@Service
public class PricesService {
    @Autowired
    private PricesRepository pricesRepository;

    public Prices getPrices() {
        return pricesRepository.findById(1L)
            .orElseThrow(() -> new RuntimeException("Prices not found"));
    }

    public Prices updatePrices(Double adult, Double child, Double senior) {
        Prices prices = pricesRepository.findById(1L)
            .orElseThrow(() -> new RuntimeException("Prices not found"));
        prices.setAdult(adult);
        prices.setChild(child);
        prices.setSenior(senior);
        return pricesRepository.save(prices);
    }
}
