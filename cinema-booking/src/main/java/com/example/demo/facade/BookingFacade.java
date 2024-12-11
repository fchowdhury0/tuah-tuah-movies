// src/main/java/com/example/demo/facade/BookingFacade.java
package com.example.demo.facade;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.entity.Booking;
import com.example.demo.entity.ShowSeatingChart;
import com.example.demo.entity.Ticket;
import com.example.demo.entity.User;
import com.example.demo.service.BookingFeeService;
import com.example.demo.service.BookingService;
import com.example.demo.service.PricesService;
import com.example.demo.service.ShowSeatingChartService;
import com.example.demo.service.TicketService;
import com.example.demo.service.UserService;

@Component
public class BookingFacade {

    private final BookingService bookingService;
    private final ShowSeatingChartService showSeatingChartService;
    private final TicketService ticketService;
    private final BookingFeeService bookingFeeService;
    private final UserService userService;
    private final PricesService pricesService;

    public BookingFacade(
        BookingService bookingService, 
        ShowSeatingChartService showSeatingChartService, 
        TicketService ticketService,
        BookingFeeService bookingFeeService,
        UserService userService,
        PricesService pricesService
    ) {
        this.bookingService = bookingService;
        this.showSeatingChartService = showSeatingChartService;
        this.ticketService = ticketService;
        this.bookingFeeService = bookingFeeService;
        this.userService = userService;
        this.pricesService = pricesService;
    }

    public Booking bookTickets(String username, Long showId, List<Integer> seatIds, String paymentCardNumber) {
        User user = userService.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        List<ShowSeatingChart> showSeats = showSeatingChartService.findByShowId(showId);
        for (Integer seatId : seatIds) {
            ShowSeatingChart seat = showSeats.stream()
                .filter(s -> s.getSeatId().equals(seatId))
                .findFirst().orElseThrow(() -> new RuntimeException("Seat not found: " + seatId));
            if (!"open".equalsIgnoreCase(seat.getReservationStatus())) {
                throw new RuntimeException("Seat not available: " + seatId);
            }
        }

        BigDecimal totalTicketPrice = BigDecimal.ZERO;
        for (Integer seatId : seatIds) {
            // Determine category based on seat or user (implement as needed)
            String category = "Adult"; // Example
            double price = pricesService.getPriceByCategory(category).getBasePrice();
            Ticket ticket = new Ticket();
            ticket.setTicketPrice(price);
            Ticket savedTicket = ticketService.save(ticket);
            totalTicketPrice = totalTicketPrice.add(BigDecimal.valueOf(price));
        }

        Double bookingFee = bookingFeeService.getBookingFee();
        BigDecimal totalCost = totalTicketPrice.add(BigDecimal.valueOf(bookingFee));

        if (!simulatePaymentProcessing(paymentCardNumber, totalCost)) {
            throw new RuntimeException("Payment failed");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBookingDate(LocalDateTime.now());
        booking.setTotalBookingCost(totalCost);
        booking.setNumberOfTickets(seatIds.size());

        return bookingService.findById(bookingService.save(booking).getBookingId())
               .orElseThrow(() -> new RuntimeException("Booking not found after save"));
    }

    private boolean simulatePaymentProcessing(String paymentCardNumber, BigDecimal amount) {
        return paymentCardNumber.startsWith("4");
    }
}