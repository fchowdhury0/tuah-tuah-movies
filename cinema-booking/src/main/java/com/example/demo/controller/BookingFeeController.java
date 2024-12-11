package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.BookingFeeService;

@RestController
@RequestMapping("/api/admin")
public class BookingFeeController {

    @Autowired
    private BookingFeeService bookingFeeService;

    // GET endpoint to retrieve the current booking fee
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/booking-fee")
    public ResponseEntity<Map<String, Object>> getBookingFee() {
        Double fee = bookingFeeService.getBookingFee();
        return ResponseEntity.ok(Map.of("fee", fee));
    }

    // POST endpoint to update the booking fee
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/booking-fee")
    public ResponseEntity<String> updateBookingFee(@RequestBody Map<String, Object> request) {
        if (!request.containsKey("fee")) {
            return ResponseEntity.badRequest().body("Missing 'fee' field");
        }
    
        Object feeObj = request.get("fee");
        Double newFee;
        try {
            newFee = Double.valueOf(feeObj.toString()); // Parse string to double
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid fee value");
        }
    
        bookingFeeService.updateBookingFee(newFee);
        return ResponseEntity.ok("Booking fee updated successfully.");
    }
    
}
