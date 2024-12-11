// PricesRepository.java
package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Prices;

public interface PricesRepository extends JpaRepository<Prices, Long> {
    List<Prices> findByIsActiveTrue();
    Optional<Prices> findByCategoryAndIsActiveTrue(String category);
}