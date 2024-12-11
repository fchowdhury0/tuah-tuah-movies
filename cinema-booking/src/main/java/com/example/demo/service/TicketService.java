package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Ticket;
import com.example.demo.repository.TicketRepository;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> findAll() {
        return ticketRepository.findAll();
    }

    public Optional<Ticket> findById(Integer id) {
        return ticketRepository.findById(id);
    }

    public void deleteById(Integer id) {
        ticketRepository.deleteById(id);
    }

    public Ticket save(Ticket ticket) {
        return ticketRepository.save(ticket);
    }
    // Additional logic for pricing, creation, etc.
}
