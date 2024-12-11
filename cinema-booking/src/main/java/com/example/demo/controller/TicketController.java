// src/main/java/com/example/demo/controller/TicketController.java
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

import com.example.demo.dto.PriceUpdateDTO;
import com.example.demo.entity.Prices;
import com.example.demo.entity.Ticket;
import com.example.demo.service.PricesService;
import com.example.demo.service.TicketService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;
    private final PricesService pricesService;

    @Autowired
    public TicketController(TicketService ticketService, PricesService pricesService) {
        this.ticketService = ticketService;
        this.pricesService = pricesService;
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

    // DTO for updating multiple prices
    public static class UpdatePricesRequest {
        private List<PriceUpdateDTO> prices;

        public List<PriceUpdateDTO> getPrices() {
            return prices;
        }

        public void setPrices(List<PriceUpdateDTO> prices) {
            this.prices = prices;
        }
    }

    // Get all active prices
    @GetMapping("/prices")
    public ResponseEntity<List<Prices>> getCurrentPrices() {
        List<Prices> activePrices = pricesService.getActivePrices();
        return ResponseEntity.ok(activePrices);
    }

    // Update multiple ticket prices (Admin only)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/prices")
    public ResponseEntity<?> updateTicketPrices(@RequestBody UpdatePricesRequest request) {
        try {
            List<Prices> updatedPrices = pricesService.updatePrices(request.getPrices());
            return ResponseEntity.ok(updatedPrices);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating prices: " + e.getMessage());
        }
    }
}