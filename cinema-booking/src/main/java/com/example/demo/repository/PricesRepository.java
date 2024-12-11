
package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Prices;

@Repository
public interface PricesRepository extends JpaRepository<Prices, Long> {

  List<Prices> findById(Integer id);
}
