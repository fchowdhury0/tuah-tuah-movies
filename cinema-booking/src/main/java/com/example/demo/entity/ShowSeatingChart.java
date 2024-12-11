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
  private Long showSeatingId;

  @Column(name = "show_id", nullable = false)
  private Integer showId;

  @Column(name = "seat_id", nullable = false)
  private Integer seatId;

  @Column(name = "reservation_status", nullable = false)
  private String reservationStatus; // 'open', 'reserved', 'selected'

  // Getters, setters, constructors...

  // Default constructor
  public ShowSeatingChart() {
  }

  // Parameterized constructor
  public ShowSeatingChart(Integer showId, Integer seatId, String reservationStatus) {
    this.showId = showId;
    this.seatId = seatId;
    this.reservationStatus = reservationStatus;
  }

  // Getters and Setters
  public Long getShowSeatingId() {
    return showSeatingId;
  }

  public Integer getShowId() {
    return showId;
  }

  public void setShowId(Integer showId) {
    this.showId = showId;
  }

  public Integer getSeatId() {
    return seatId;
  }

  public void setSeatId(Integer seatId) {
    this.seatId = seatId;
  }

  public String getReservationStatus() {
    return reservationStatus;
  }

  public void setReservationStatus(String reservationStatus) {
    this.reservationStatus = reservationStatus;
  }
}
