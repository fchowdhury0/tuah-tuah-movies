package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ShowSeatingChart;
import com.example.demo.service.ShowSeatingChartService;

@RestController
@RequestMapping("/api/show-seats")
public class ShowSeatingChartController {

    private final ShowSeatingChartService showSeatingChartService;

    public ShowSeatingChartController(ShowSeatingChartService showSeatingChartService) {
        this.showSeatingChartService = showSeatingChartService;
    }

    @GetMapping
    public List<ShowSeatingChart> getAllShowSeats() {
        return showSeatingChartService.findAll();
    }

    @GetMapping("/{id}")
    public List<ShowSeatingChart> getShowSeat(@PathVariable Integer id) {
      return showSeatingChartService.findByShowId(id);
    }

    // Endpoints for reserving/canceling seats could go here
}
