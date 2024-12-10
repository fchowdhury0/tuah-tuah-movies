package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "show_seating_chart")
public class ShowSeatingChart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer showSeatingId;

    @ManyToOne
    @JoinColumn(name = "show_id", nullable = false)
    private Shows show;

    @ManyToOne
    @JoinColumn(name = "seat_id", nullable = false)
    private SeatingChart seat;

    @Column(name = "reservation_status", nullable = false)
    private String reservationStatus; // 'open', 'reserved', 'selected'
    
    // Getters, setters, constructors...
}
