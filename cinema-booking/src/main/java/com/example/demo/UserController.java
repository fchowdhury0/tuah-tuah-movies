package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
  
  @Autowired
  private UserRepository userRepository;

  @GetMapping
  List<User> getAllUsers(){
    return userRepository.findAll();
  } 

  @PostMapping 
  User newUser(@RequestBody User newUser) {
    return userRepository.save(newUser);
  }
  
}
