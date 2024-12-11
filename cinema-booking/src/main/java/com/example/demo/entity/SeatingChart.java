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
  public SeatingChart() {
  }

  public SeatingChart(String row, Integer seatNumber) {
    this.row = row;
    this.seatNumber = seatNumber;
  }

  public Integer getSeatId() {
    return seatId;
  }

  public void setSeatId(Integer seatId) {
    this.seatId = seatId;
  }

  public String getRow() {
    return row;
  }

  public void setRow(String row) {
    this.row = row;
  }

  public Integer getSeatNumber() {
    return seatNumber;
  }

  public void setSeatNumber(Integer seatNumber) {
    this.seatNumber = seatNumber;
  }

  // Custom Getter for formatted seat
  public String getFormattedSeat() {
    return row + seatNumber;
  }

}
