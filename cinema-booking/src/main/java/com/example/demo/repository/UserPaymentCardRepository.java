package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.UserPaymentCard;

@Repository
public interface UserPaymentCardRepository extends JpaRepository<UserPaymentCard, Long> {
}