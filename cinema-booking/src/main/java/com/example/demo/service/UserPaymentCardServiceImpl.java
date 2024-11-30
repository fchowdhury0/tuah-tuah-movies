package com.example.demo.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PaymentCardRequest;
import com.example.demo.entity.PaymentCard;
import com.example.demo.entity.User;
import com.example.demo.entity.UserPaymentCard;
import com.example.demo.repository.PaymentCardRepository;
import com.example.demo.repository.UserPaymentCardRepository;
import com.example.demo.repository.UserRepository;

@Service
public class UserPaymentCardServiceImpl implements UserPaymentCardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentCardRepository paymentCardRepository;

    @Autowired
    private UserPaymentCardRepository userPaymentCardRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserPaymentCard addPaymentCard(PaymentCardRequest request) {
        // Get user
        User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Parse expiry date
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yy");
        LocalDate expiry = LocalDate.parse("01/" + request.getExpiryDate(), 
            DateTimeFormatter.ofPattern("dd/MM/yy"));

        // Create and save payment card
        PaymentCard paymentCard = new PaymentCard();
        paymentCard.setCardNumber(request.getCardNumber());
        paymentCard.setCardExp(expiry);
        paymentCard.setCardBillingAddress(request.getBillingAddress());
        paymentCard.setCardZip(request.getZip());
        paymentCard.setCardCity(request.getCity());
        paymentCard.setCardState(request.getState());
        paymentCard.setCvvHash(passwordEncoder.encode(request.getCvv()));
        paymentCard.setFirstName(user.getFirstName());
        paymentCard.setLastName(user.getLastName());
        paymentCard.setSaveCard(request.isSaveCard());

        PaymentCard savedPaymentCard = paymentCardRepository.save(paymentCard);

        // Create and save user payment card link
        UserPaymentCard userPaymentCard = new UserPaymentCard(user, savedPaymentCard);
        return userPaymentCardRepository.save(userPaymentCard);
    }

    @Override
    public void deletePaymentCard(Long id) {
        UserPaymentCard userPaymentCard = userPaymentCardRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Payment card not found"));
        userPaymentCardRepository.delete(userPaymentCard);
    }
}