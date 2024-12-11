package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.dto.EmailRequest;
import com.example.demo.entity.Promotions;
import com.example.demo.service.PromotionsService;

@RestController
@RequestMapping("/api/promotions")
public class PromotionsController {

    private final PromotionsService promotionsService;

    @Autowired
    public PromotionsController(PromotionsService promotionsService) {
        this.promotionsService = promotionsService;
    }

    @PostMapping
    public ResponseEntity<Promotions> createPromotion(@RequestBody Promotions promotion) {
        try {
            Promotions savedPromotion = promotionsService.save(promotion);
            return ResponseEntity.ok(savedPromotion);
        } catch (Exception e) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, 
                "Error creating promotion: " + e.getMessage()
            );
        }
    }

    @GetMapping
    public List<Promotions> getAllPromotions() {
        return promotionsService.findAll();
    }

    @GetMapping("/{id}")
    public Promotions getPromotion(@PathVariable Integer id) {
        return promotionsService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Promotion not found"
            ));
    }

    @PutMapping("/{id}")
    public Promotions updatePromotion(@PathVariable Integer id, @RequestBody Promotions promotion) {
        return promotionsService.update(id, promotion);
    }

    @PostMapping("/send-emails")
    public ResponseEntity<String> sendPromotionEmails(@RequestBody EmailRequest emailRequest) {
        try {
            Promotions promotion = promotionsService.findById(emailRequest.getPromotionId())
                .orElseThrow(() -> new RuntimeException("Promotion not found"));
            promotionsService.sendPromotionEmails(promotion, emailRequest.getEmailSubject(), emailRequest.getEmailMessage());
            return ResponseEntity.ok("Emails sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error sending promotion emails: " + e.getMessage());
        }
    }
}