package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.BookingFee;
import com.example.demo.repository.BookingFeeRepository;

@Service
public class BookingFeeService {

    @Autowired
    private BookingFeeRepository bookingFeeRepository;

    public Double getBookingFee() {
        // Assume single record with id=1
        Optional<BookingFee> feeOpt = bookingFeeRepository.findById(1L);
        if (feeOpt.isPresent()) {
            return feeOpt.get().getFee();
        } else {
            // If not present, create one with default 0.00
            BookingFee fee = new BookingFee();
            fee.setFee(0.00);
            bookingFeeRepository.save(fee);
            return 0.00;
        }
    }

    public void updateBookingFee(Double newFee) {
        Optional<BookingFee> feeOpt = bookingFeeRepository.findById(1L);
        BookingFee fee;
        if (feeOpt.isPresent()) {
            fee = feeOpt.get();
        } else {
            fee = new BookingFee();
        }
        fee.setFee(newFee);
        bookingFeeRepository.save(fee);
    }
}
