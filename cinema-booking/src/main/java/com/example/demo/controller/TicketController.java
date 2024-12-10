package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Ticket;
import com.example.demo.service.TicketService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // Get all tickets
    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        List<Ticket> tickets = ticketService.findAll();
        return ResponseEntity.ok(tickets);
    }

    // Get ticket by ID
    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Integer id) {
        Optional<Ticket> ticketOpt = ticketService.findById(id);
        return ticketOpt.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // Create a new ticket (Admin only)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        Ticket createdTicket = ticketService.save(ticket);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTicket);
    }

    // Update an existing ticket (Admin only)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Integer id, @RequestBody Ticket ticketDetails) {
        Optional<Ticket> ticketOpt = ticketService.findById(id);
        if (!ticketOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Ticket ticket = ticketOpt.get();
        ticket.setTicketPrice(ticketDetails.getTicketPrice());

        Ticket updatedTicket = ticketService.save(ticket);
        return ResponseEntity.ok(updatedTicket);
    }

    // Delete a ticket (Admin only)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Integer id) {
        Optional<Ticket> ticketOpt = ticketService.findById(id);
        if (!ticketOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket not found.");
        }

        ticketService.deleteById(id);
        return ResponseEntity.ok("Ticket deleted successfully.");
    }

    // Existing endpoints for prices and promotions...

    // New endpoint to get current ticket prices
    @GetMapping("/prices")
    public ResponseEntity<?> getCurrentPrices() {
        // Implementation based on your PriceService
        return ResponseEntity.ok("Current prices data.");
    }

    // Endpoint to update ticket prices (admin only)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/prices")
    public ResponseEntity<?> updateTicketPrices(@RequestBody Object newPrices) {
        // Implementation based on your PriceService
        return ResponseEntity.ok("Ticket prices updated successfully.");
    }

    // Other existing endpoints...
}