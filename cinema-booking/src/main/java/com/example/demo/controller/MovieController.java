package com.example.demo.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Movie;
import com.example.demo.repository.MovieRepository;
import com.example.demo.service.EmailService;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private EmailService emailService;
    
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        try {
            List<Movie> movies = movieRepository.findAll();
            for (Movie movie : movies) {
                logger.info("Movie: {} - PosterUrl: {}, TrailerUrl: {}", 
                    movie.getTitle(), movie.getPosterUrl(), movie.getTrailerUrl());
            }
            return ResponseEntity.ok(movies);
        } catch (Exception e) {
            logger.error("Error fetching all movies: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam String title) {
        try {
            List<Movie> movies = movieRepository.findByTitleContainingIgnoreCase(title);
            logger.info("Searched movies with title '{}': {}", title, movies);
            return ResponseEntity.ok(movies);
        } catch (Exception e) {
            logger.error("Error searching movies with title '{}': {}", title, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Movie>> getMoviesByStatus(@PathVariable String status) {
        try {
            List<Movie> movies = movieRepository.findByStatus(status);
            logger.info("Movies with status '{}': {}", status, movies);
            return ResponseEntity.ok(movies);
        } catch (Exception e) {
            logger.error("Error fetching movies with status '{}': {}", status, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        try {
            Movie savedMovie = movieRepository.save(movie);
            logger.info("Added new movie: {}", savedMovie);
            return ResponseEntity.ok(savedMovie);
        } catch (Exception e) {
            logger.error("Error adding new movie: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/sendConfirmationEmail")
    public ResponseEntity<String> sendConfirmationEmail(@RequestParam String email) {
        if (!isValidEmail(email)) {
            logger.warn("Invalid email address: {}", email);
            return ResponseEntity.badRequest().body("Invalid email address.");
        }

        try {
            emailService.sendConfirmationEmail(
                email, 
                "Booking Confirmation", 
                "Thank you for your booking!\nMovie: \nShowtime: \nSeats: \n"
            );
            logger.info("Confirmation email sent to {}", email);
            return ResponseEntity.ok("Confirmation email sent successfully!");
        } catch (Exception e) {
            logger.error("Error sending email to {}: {}", email, e.getMessage());
            return ResponseEntity.internalServerError()
                .body("Failed to send confirmation email.");
        }
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return email != null && email.matches(emailRegex);
    }
}