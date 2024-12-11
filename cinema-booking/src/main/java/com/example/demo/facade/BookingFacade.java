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

    public BookingFacade(
        BookingService bookingService, 
        ShowSeatingChartService showSeatingChartService, 
        TicketService ticketService,
        BookingFeeService bookingFeeService,
        UserService userService
    ) {
        this.bookingService = bookingService;
        this.showSeatingChartService = showSeatingChartService;
        this.ticketService = ticketService;
        this.bookingFeeService = bookingFeeService;
        this.userService = userService;
    }

    /**
     * Book tickets for a given show and seats.
     *
     * @param username the username of the booking user
     * @param showId the ID of the show
     * @param seatIds a list of seat IDs the user wants to book
     * @param paymentCardNumber the payment card number to charge (simulated)
     * @return the created Booking object
     */
    public Booking bookTickets(String username, Long showId, List<Integer> seatIds, String paymentCardNumber) {
        // 1. Validate user
        User user = userService.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Check seat availability
        List<ShowSeatingChart> showSeats = showSeatingChartService.findByShowId(showId);
        for (Integer seatId : seatIds) {
            ShowSeatingChart seat = showSeats.stream()
                .filter(s -> s.getSeatId().equals(seatId))
                .findFirst().orElseThrow(() -> new RuntimeException("Seat not found: " + seatId));
            if (!"open".equalsIgnoreCase(seat.getReservationStatus())) {
                throw new RuntimeException("Seat not available: " + seatId);
            }
        }

        // 3. Reserve seats and create tickets
        BigDecimal totalTicketPrice = BigDecimal.ZERO;
        for (Integer seatId : seatIds) {
            double price = 10.00; // Example fixed price per ticket
            Ticket ticket = new Ticket();
            // Assuming you have logic to set ShowSeatingChart, etc.
            // Here, you might query the ShowSeatingChart entity and link it.
            // For simplicity, just set the ticket price and status.
            ticket.setTicketPrice(price);
            Ticket savedTicket = ticketService.save(ticket);
            
            totalTicketPrice = totalTicketPrice.add(BigDecimal.valueOf(price));
        }

        // 4. Add booking fee
        Double bookingFee = bookingFeeService.getBookingFee();
        BigDecimal totalCost = totalTicketPrice.add(BigDecimal.valueOf(bookingFee));

        // 5. Simulate payment processing
        if (!simulatePaymentProcessing(paymentCardNumber, totalCost)) {
            throw new RuntimeException("Payment failed");
        }

        // 6. Create Booking record
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBookingDate(LocalDateTime.now());
        booking.setTotalBookingCost(totalCost);
        booking.setNumberOfTickets(seatIds.size());
        
        return bookingService.findById(bookingService.save(booking).getBookingId())
               .orElseThrow(() -> new RuntimeException("Booking not found after save"));
    }

    // A simple simulated payment processing method
    private boolean simulatePaymentProcessing(String paymentCardNumber, BigDecimal amount) {
        // For demo: if paymentCardNumber starts with "4", we pretend it's successful
        // Otherwise, fail payment. This is just a stub for demonstration.
        return paymentCardNumber.startsWith("4");
    }
}
