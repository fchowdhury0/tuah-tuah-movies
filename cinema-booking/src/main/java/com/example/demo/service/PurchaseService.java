package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Purchases;
import com.example.demo.repository.PurchaseRepository;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;

    public PurchaseService(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    public List<Purchases> findAll() {
        return purchaseRepository.findAll();
    }

    public Optional<Purchases> findById(Integer id) {
        return purchaseRepository.findById(id);
    }

    // Methods for payment processing, linking to bookings, etc.
}
