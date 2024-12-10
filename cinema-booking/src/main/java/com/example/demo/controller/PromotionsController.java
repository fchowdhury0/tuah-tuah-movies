package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Promotions;
import com.example.demo.service.PromotionsService;

@RestController
@RequestMapping("/api/promotions")
public class PromotionsController {

    private final PromotionsService promotionsService;

    public PromotionsController(PromotionsService promotionsService) {
        this.promotionsService = promotionsService;
    }

    @GetMapping
    public List<Promotions> getAllPromotions() {
        return promotionsService.findAll();
    }

    @GetMapping("/{id}")
    public Promotions getPromotion(@PathVariable Integer id) {
        return promotionsService.findById(id).orElse(null);
    }

    // Create, update, and apply promo codes
}
