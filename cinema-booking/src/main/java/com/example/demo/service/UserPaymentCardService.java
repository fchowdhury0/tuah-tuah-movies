package com.example.demo.service;

import com.example.demo.dto.PaymentCardRequest;
import com.example.demo.entity.UserPaymentCard;

public interface UserPaymentCardService {
    UserPaymentCard addPaymentCard(PaymentCardRequest request);
    void deletePaymentCard(Long id);
}