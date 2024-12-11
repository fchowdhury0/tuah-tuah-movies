package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ShowSeatingChart;

@Repository
public interface ShowSeatingChartRepository extends JpaRepository<ShowSeatingChart, Integer> {

  List<ShowSeatingChart> findByShowId(Integer showId);
}
