package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.SeatingChart;
import com.example.demo.service.SeatingChartService;

@RestController
@RequestMapping("/api/seating")
public class SeatingChartController {

    private final SeatingChartService seatingChartService;

    public SeatingChartController(SeatingChartService seatingChartService) {
        this.seatingChartService = seatingChartService;
    }

    @GetMapping
    public List<SeatingChart> getAllSeats() {
        return seatingChartService.findAll();
    }

    @GetMapping("/{id}")
    public SeatingChart getSeat(@PathVariable Integer id) {
        return seatingChartService.findById(id).orElse(null);
    }
}
