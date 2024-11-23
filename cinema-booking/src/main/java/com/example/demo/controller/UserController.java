package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
  
    @Autowired
    private UserRepository userRepository;

    /**
     * Get user by username with payment cards.
     *
     * @param username the username to search for
     * @return ResponseEntity containing the User object with payment cards
     */
    @GetMapping
    public ResponseEntity<User> getUser(@RequestParam String username) {
        User user = userRepository.findByUsernameWithPaymentCards(username)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        return ResponseEntity.ok(user);
    }

    /**
     * Get user's payment cards by user ID.
     *
     * @param userId the ID of the user
     * @return ResponseEntity containing the User object with payment cards
     */
    @GetMapping("/{userId}/payment-cards")
    public ResponseEntity<User> getUserPaymentCards(@PathVariable Long userId) {
        User user = userRepository.findByIdWithPaymentCards(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return ResponseEntity.ok(user);
    }

    /**
     * Update user profile.
     *
     * @param id the ID of the user to update
     * @param updatedUser the updated user data
     * @return ResponseEntity containing the updated User object
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // Update user fields
        user.setEmail(updatedUser.getEmail());
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setStatus(updatedUser.getStatus());
        user.setUsername(updatedUser.getUsername());

        // Save the updated user
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
}