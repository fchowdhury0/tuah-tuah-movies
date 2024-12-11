package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.ShowSeatingChart;
import com.example.demo.repository.ShowSeatingChartRepository;

@Service
public class ShowSeatingChartService {
  private final ShowSeatingChartRepository repository;

  public ShowSeatingChartService(ShowSeatingChartRepository repository) {
    this.repository = repository;
  }

  public List<ShowSeatingChart> findAll() {
    return repository.findAll();
  }

  public Optional<ShowSeatingChart> findById(Integer id) {
    return repository.findById(id);
  }

  public List<ShowSeatingChart> findByShowId(Integer id) {
    return repository.findByShowId(id);
  }

  // Methods for reserving seats, updating statuses, etc.
}
