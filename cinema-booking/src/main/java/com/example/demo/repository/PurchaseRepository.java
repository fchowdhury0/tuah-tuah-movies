package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Purchases;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchases, Integer> {
}
