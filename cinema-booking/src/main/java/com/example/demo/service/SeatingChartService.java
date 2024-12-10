package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.SeatingChart;
import com.example.demo.repository.SeatingChartRepository;

@Service
public class SeatingChartService {
    private final SeatingChartRepository seatingChartRepository;

    public SeatingChartService(SeatingChartRepository seatingChartRepository) {
        this.seatingChartRepository = seatingChartRepository;
    }

    public List<SeatingChart> findAll() {
        return seatingChartRepository.findAll();
    }

    public Optional<SeatingChart> findById(Integer id) {
        return seatingChartRepository.findById(id);
    }

    // Other methods as needed
}
