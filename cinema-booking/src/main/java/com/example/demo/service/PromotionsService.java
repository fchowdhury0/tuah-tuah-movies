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

    public Promotions save(Promotions promotion) {
        promotion.setDateAdded(java.time.LocalDateTime.now());
        promotion.setIsActive(true);
        promotion.setUseCount(0);
        return promotionsRepository.save(promotion);
    }

    public Promotions update(Integer id, Promotions promotionDetails) {
        Promotions promotion = promotionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found"));
        promotion.setPromoCode(promotionDetails.getPromoCode());
        promotion.setStartDate(promotionDetails.getStartDate());
        promotion.setExpDate(promotionDetails.getExpDate());
        promotion.setDescription(promotionDetails.getDescription());
        promotion.setIsActive(promotionDetails.getIsActive());
        return promotionsRepository.save(promotion);
    }

    // public String applyPromoCode(String promoCode) {
    //     Promotions promotion = promotionsRepository.findByPromoCode(promoCode)
    //             .orElseThrow(() -> new RuntimeException("Invalid promo code"));
    //     if (promotion.getIsActive() && promotion.getExpDate().isAfter(java.time.LocalDate.now())) {
    //         promotion.setUseCount(promotion.getUseCount() + 1);
    //         promotionsRepository.save(promotion);
    //         return "Promo code applied successfully.";
    //     } else {
    //         return "Promo code is inactive or expired.";
    //     }
    // }

    public Promotions incrementUseCount(Integer id) {
        Promotions promotion = promotionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found"));
        promotion.setUseCount(promotion.getUseCount() + 1);
        return promotionsRepository.save(promotion);
    }
}