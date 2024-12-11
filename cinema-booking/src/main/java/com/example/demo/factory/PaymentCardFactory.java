package com.example.demo.factory;

import com.example.demo.dto.PaymentCardRequest;
import com.example.demo.entity.PaymentCard;

public interface PaymentCardFactory {
    PaymentCard createPaymentCard(PaymentCardRequest request, String firstName, String lastName, String hashedCvv);
}
