package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PaymentCardRequest;
import com.example.demo.entity.PaymentCard;
import com.example.demo.entity.User;
import com.example.demo.entity.UserPaymentCard;
import com.example.demo.factory.DefaultPaymentCardFactory;
import com.example.demo.factory.PaymentCardFactory;
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
    
    // Use a factory to create payment cards
    private PaymentCardFactory paymentCardFactory = new DefaultPaymentCardFactory();

    @Override
    public UserPaymentCard addPaymentCard(PaymentCardRequest request) {
        // Get user
        User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Hash the CVV
        String hashedCvv = passwordEncoder.encode(request.getCvv());
        
        // Create payment card using the factory method
        PaymentCard paymentCard = paymentCardFactory.createPaymentCard(
            request, user.getFirstName(), user.getLastName(), hashedCvv
        );

        PaymentCard savedPaymentCard = paymentCardRepository.save(paymentCard);

        // Link User and PaymentCard
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
