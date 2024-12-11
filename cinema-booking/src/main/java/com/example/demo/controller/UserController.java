package com.example.demo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            logger.info("Retrieved {} users", users.size());
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            logger.error("Error retrieving all users: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> getUser(@RequestParam String username) {
        try {
            User user = userRepository.findByUsernameWithPaymentCards(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
            logger.info("Retrieved user: {}", username);
            return ResponseEntity.ok(user);
        } catch (ResourceNotFoundException e) {
            logger.error("User not found: {}", username);
            throw e;
        }
    }

    @GetMapping("/{userId}/payment-cards")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> getUserPaymentCards(@PathVariable Long userId) {
        try {
            User user = userRepository.findByIdWithPaymentCards(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
            logger.info("Retrieved payment cards for user: {}", userId);
            return ResponseEntity.ok(user);
        } catch (ResourceNotFoundException e) {
            logger.error("User not found: {}", userId);
            throw e;
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        try {
            User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

            user.setEmail(updatedUser.getEmail());
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setStatus(updatedUser.getStatus());
            user.setUsername(updatedUser.getUsername());
            user.setRole(updatedUser.getRole());

            User savedUser = userRepository.save(user);
            logger.info("Updated user: {} with role: {}", id, updatedUser.getRole());
            return ResponseEntity.ok(savedUser);
        } catch (ResourceNotFoundException e) {
            logger.error("User not found for update: {}", id);
            throw e;
        } catch (Exception e) {
            logger.error("Error updating user {}: {}", id, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}