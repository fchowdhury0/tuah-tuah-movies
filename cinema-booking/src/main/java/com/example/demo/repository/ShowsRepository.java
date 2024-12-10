package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Shows;

@Repository
public interface ShowsRepository extends JpaRepository<Shows, Long> {
}
