package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.BookingFeeService;

@RestController
@RequestMapping("/api/fees")
public class PublicBookingFeeController {

    @Autowired
    private BookingFeeService bookingFeeService;

    // Publicly accessible GET endpoint to retrieve the current booking fee
    @GetMapping("/booking-fee")
    public ResponseEntity<Map<String, Object>> getBookingFee() {
        Double fee = bookingFeeService.getBookingFee();
        return ResponseEntity.ok(Map.of("fee", fee));
    }
}
