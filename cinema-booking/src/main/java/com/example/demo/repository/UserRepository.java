package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.userPaymentCards upc LEFT JOIN FETCH upc.paymentCard WHERE u.username = :username")
    Optional<User> findByUsernameWithPaymentCards(@Param("username") String username);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.userPaymentCards upc LEFT JOIN FETCH upc.paymentCard WHERE u.userId = :userId")
    Optional<User> findByIdWithPaymentCards(@Param("userId") Long userId);
}