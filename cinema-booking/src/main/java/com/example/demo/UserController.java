package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
  
  @Autowired
  private UserRepository userRepository;

  @GetMapping
  Optional<User> getUser(@RequestParam String username){
    
    return userRepository.findByUsername(username);
  } 

  @PutMapping("/{id}")
  Optional<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
    return userRepository.findById(id)
    .map(user -> {
      user.setEmail(updatedUser.getEmail());
      user.setFirstName(updatedUser.getFirstName());
      user.setLastName(updatedUser.getLastName());
      user.setStatus(updatedUser.getStatus());
      user.setUsername(updatedUser.getUsername());
      User savedUser = userRepository.save(user);
      return savedUser;
    });
  }

  
}
