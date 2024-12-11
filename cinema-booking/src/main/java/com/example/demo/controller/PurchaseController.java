package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Purchases;
import com.example.demo.service.PurchaseService;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;
    
    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @GetMapping
    public List<Purchases> getAllPurchases() {
        return purchaseService.findAll();
    }

    @GetMapping("/{id}")
    public Purchases getPurchase(@PathVariable Integer id) {
        return purchaseService.findById(id).orElse(null);
    }
    
    // Payment processing endpoint, etc.
}
