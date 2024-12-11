package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Promotions;
import com.example.demo.entity.User;
import com.example.demo.repository.PromotionsRepository;
import com.example.demo.repository.UserRepository;

@Service
public class PromotionsService {

    private final PromotionsRepository promotionsRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Autowired
    public PromotionsService(PromotionsRepository promotionsRepository,
                             UserRepository userRepository,
                             EmailService emailService) {
        this.promotionsRepository = promotionsRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public Promotions save(Promotions promotion) {
        try {
            // Get default admin user (ID 1)
            User defaultAdmin = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Default admin user not found"));
            
            // Set created_by to default admin
            promotion.setCreatedBy(defaultAdmin);
            
            // Set other default values
            promotion.setDateAdded(LocalDateTime.now());
            promotion.setUseCount(0);
            
            return promotionsRepository.save(promotion);
        } catch (Exception e) {
            throw new RuntimeException("Error saving promotion: " + e.getMessage());
        }
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

    public List<Promotions> findAll() {
        return promotionsRepository.findAll();
    }

    public Optional<Promotions> findById(Integer id) {
        return promotionsRepository.findById(id);
    }

    public Promotions incrementUseCount(Integer id) {
        Promotions promotion = promotionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found"));
        promotion.setUseCount(promotion.getUseCount() + 1);
        return promotionsRepository.save(promotion);
    }

    public void sendPromotionEmails(Promotions promotion, String emailSubject, String emailMessage) {
        List<User> subscribedUsers = userRepository.findAll().stream()
            .filter(User::getIsSubscribed)
            .toList();

        for (User user : subscribedUsers) {
            String personalizedMessage = String.format("%s\n\nPromotion Code: %s", emailMessage, promotion.getPromoCode());
            emailService.sendSimpleMessage(user.getEmail(), emailSubject, personalizedMessage);
        }
    }
}