package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Promotions;

@Repository
public interface PromotionsRepository extends JpaRepository<Promotions, Integer> {
}
