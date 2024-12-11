package com.example.demo.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate;

    @Column(name = "total_booking_cost", nullable = false)
    private BigDecimal totalBookingCost;

    @Column(name = "number_of_tickets", nullable = false)
    private Integer numberOfTickets;

    @OneToMany(mappedBy = "booking")
    private List<BookingTicket> bookingTickets;

    public BigDecimal getTotalBookingCost() {
        return totalBookingCost;
    }

    public void setTotalBookingCost(BigDecimal totalBookingCost) {
        this.totalBookingCost = totalBookingCost;
    }

    public Integer getNumberOfTickets() {
        return numberOfTickets;
    }

    public void setNumberOfTickets(Integer numberOfTickets) {
        this.numberOfTickets = numberOfTickets;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public void setBookingTickets(List<BookingTicket> bookingTickets) {
        this.bookingTickets = bookingTickets;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }

    public Integer getBookingId() {
        return bookingId;
    }
    // Getters, setters, constructors...
}
