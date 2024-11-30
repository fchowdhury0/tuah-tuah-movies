package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.PaymentCardRequest;
import com.example.demo.entity.UserPaymentCard;
import com.example.demo.service.UserPaymentCardService;

@RestController
@RequestMapping("/api/userPaymentCard")
@CrossOrigin(origins = "http://localhost:3000")
public class UserPaymentCardController {

    @Autowired
    private UserPaymentCardService userPaymentCardService;

    @PostMapping
    public ResponseEntity<?> addPaymentCard(@RequestBody PaymentCardRequest request) {
        try {
            UserPaymentCard savedCard = userPaymentCardService.addPaymentCard(request);
            return ResponseEntity.ok(savedCard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePaymentCard(@PathVariable Long id) {
        try {
            userPaymentCardService.deletePaymentCard(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}