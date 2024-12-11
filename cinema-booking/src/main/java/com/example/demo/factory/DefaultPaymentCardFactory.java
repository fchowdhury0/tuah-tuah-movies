package com.example.demo.factory;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.example.demo.dto.PaymentCardRequest;
import com.example.demo.entity.PaymentCard;

public class DefaultPaymentCardFactory implements PaymentCardFactory {

    @Override
    public PaymentCard createPaymentCard(PaymentCardRequest request, String firstName, String lastName, String hashedCvv) {
        // Parse expiry date: "MM/yy" -> "01/MM/yy"
        LocalDate expiry = LocalDate.parse("01/" + request.getExpiryDate(), DateTimeFormatter.ofPattern("dd/MM/yy"));

        PaymentCard paymentCard = new PaymentCard();
        paymentCard.setCardNumber(request.getCardNumber());
        paymentCard.setCardExp(expiry);
        paymentCard.setCardBillingAddress(request.getBillingAddress());
        paymentCard.setCardZip(request.getZip());
        paymentCard.setCardCity(request.getCity());
        paymentCard.setCardState(request.getState());
        paymentCard.setCvvHash(hashedCvv);
        paymentCard.setFirstName(firstName);
        paymentCard.setLastName(lastName);
        paymentCard.setSaveCard(request.isSaveCard());

        return paymentCard;
    }
}
