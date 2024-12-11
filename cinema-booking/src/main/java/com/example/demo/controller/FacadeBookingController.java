package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Booking;
import com.example.demo.facade.BookingFacade;

@RestController
@RequestMapping("/api/facade-booking")
public class FacadeBookingController {

    @Autowired
    private BookingFacade bookingFacade;

    @PostMapping("/book")
    public ResponseEntity<?> bookTickets(@RequestParam String username,
                                         @RequestParam Integer showId,
                                         @RequestBody List<Integer> seatIds,
                                         @RequestParam String paymentCardNumber) {
        try {
            Booking booking = bookingFacade.bookTickets(username, showId, seatIds, paymentCardNumber);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
