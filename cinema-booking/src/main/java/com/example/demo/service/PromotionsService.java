package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Promotions;
import com.example.demo.repository.PromotionsRepository;

@Service
public class PromotionsService {

    private final PromotionsRepository promotionsRepository;

    public PromotionsService(PromotionsRepository promotionsRepository) {
        this.promotionsRepository = promotionsRepository;
    }

    public List<Promotions> findAll() {
        return promotionsRepository.findAll();
    }

    public Optional<Promotions> findById(Integer id) {
        return promotionsRepository.findById(id);
    }

    // Methods to apply promotions, update usage counts, etc.
}
