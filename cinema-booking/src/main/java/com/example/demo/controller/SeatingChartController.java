package com.example.demo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.SeatingChart;
import com.example.demo.repository.SeatingChartRepository;
import com.example.demo.service.SeatingChartService;

@RestController
@RequestMapping("/api/seating")
public class SeatingChartController {
  private static final Logger logger = LoggerFactory.getLogger(SeatingChartController.class);
  private final SeatingChartService seatingChartService;
  @Autowired
  private SeatingChartRepository seatingChartRepository;

  public SeatingChartController(SeatingChartService seatingChartService) {
    this.seatingChartService = seatingChartService;
  } 

  @GetMapping
  public ResponseEntity<List<SeatingChart>> getAllSeats() {
    try {
      List<SeatingChart> seats = seatingChartRepository.findAll();
      logger.info("Retrieved {} seats", seats.size());
      return ResponseEntity.ok(seats);
    } catch (Exception e) {
      logger.error("Error fetching all seats: {}", e.getMessage());
      return ResponseEntity.internalServerError().build();
    }
  }

  @GetMapping("/{id}")
  public SeatingChart getSeat(@PathVariable Integer id) {
    return seatingChartService.findById(id).orElse(null);
  }
}
