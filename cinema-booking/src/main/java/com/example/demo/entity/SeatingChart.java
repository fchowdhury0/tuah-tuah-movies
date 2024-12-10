package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "seating_chart")
public class SeatingChart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seatId;

    @Column(name = "row", nullable = false)
    private String row;

    @Column(name = "seat_number", nullable = false)
    private Integer seatNumber;
    
    // Getters, setters, constructors...
}
