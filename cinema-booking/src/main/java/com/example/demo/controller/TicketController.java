package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

import com.example.demo.entity.Prices;
import com.example.demo.entity.Ticket;
import com.example.demo.service.PricesService;
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

    @Autowired
    private PricesService pricesService;

    public static class UpdatePricesRequest {
        private Double adult;
        private Double child;
        private Double senior;

        public Double getAdult() {
            return adult;
        }

        public void setAdult(Double adult) {
            this.adult = adult;
        }

        public Double getChild() {
            return child;
        }

        public void setChild(Double child) {
            this.child = child;
        }

        public Double getSenior() {
            return senior;
        }

        public void setSenior(Double senior) {
            this.senior = senior;
        }
    }

    @GetMapping("/prices")
    public ResponseEntity<Map<String, Object>> getCurrentPrices() {
        Prices p = pricesService.getPrices();
        Map<String, Object> priceMap = new HashMap<>();
        priceMap.put("adult", p.getAdult());
        priceMap.put("child", p.getChild());
        priceMap.put("senior", p.getSenior());
        return ResponseEntity.ok(priceMap);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/prices")
    public ResponseEntity<?> updateTicketPrices(@RequestBody UpdatePricesRequest request) {
        Prices updated = pricesService.updatePrices(request.getAdult(), request.getChild(), request.getSenior());
        return ResponseEntity.ok("Ticket prices updated to: " +
            "Adult: " + updated.getAdult() +
            ", Child: " + updated.getChild() +
            ", Senior: " + updated.getSenior());
    }

    // Other existing endpoints...
}