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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Movie;
import com.example.demo.entity.User;
import com.example.demo.exception.ResourceNotFoundException;
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

    // Existing movie management endpoints
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        try {
            List<Movie> movies = movieRepository.findAll();
            logger.info("Retrieved {} movies", movies.size());
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
            logger.info("Found {} movies matching title '{}'", movies.size(), title);
            return ResponseEntity.ok(movies);
        } catch (Exception e) {
            logger.error("Error searching movies with title '{}': {}", title, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/genre")
    public ResponseEntity<List<Movie>> searchMoviesByGenre(@RequestParam String category) {
        try {
            List<Movie> movies = movieRepository.findByCategory(category);
            logger.info("Found {} movies matching category '{}'", movies.size(), category);
            return ResponseEntity.ok(movies);
        } catch (Exception e) {
            logger.error("Error searching movies with category '{}': {}", category, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Movie>> getMoviesByStatus(@PathVariable String status) {
        try {
            List<Movie> movies = movieRepository.findByStatus(status);
            logger.info("Found {} movies with status '{}'", movies.size(), status);
            return ResponseEntity.ok(movies);
        } catch (Exception e) {
            logger.error("Error fetching movies with status '{}': {}", status, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        try {
            Movie newMovie = new Movie(
              movie.getTitle(), 
              movie.getCategory(), 
              movie.getCastMembers(), 
              movie.getDirector(), 
              movie.getProducer(), 
              movie.getSynopsis(), 
              movie.getReviews(), 
              movie.getTrailerUrl(), 
              movie.getRatingCode(), 
              movie.getReleaseDate(), 
              movie.getStatus(), 
              movie.getImdbId(), 
              movie.getPosterUrl());
            Movie savedMovie = movieRepository.save(newMovie);
            logger.info("Successfully added new movie: {}", savedMovie.getTitle());
            return ResponseEntity.ok(savedMovie);
        } catch (Exception e) {
            logger.error("Error adding new movie: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
      };
      
    @PostMapping("/sendConfirmationEmail")
    public ResponseEntity<String> sendConfirmationEmail(
            @RequestParam String email,
            @RequestParam(defaultValue = "booking") String emailType,
            @RequestParam(required = false) String movieTitle,
            @RequestParam(required = false) String showtime,
            @RequestParam(required = false) String seats) {
        
        logger.info("Received email request - email: {}, type: {}, movie: {}, showtime: {}, seats: {}", 
            email, emailType, movieTitle, showtime, seats);
    
        if (!isValidEmail(email)) {
            logger.warn("Invalid email address: {}", email);
            return ResponseEntity.badRequest().body("Invalid email address.");
        }
    
        try {
            String subject;
            String body;
    
            if ("booking".equalsIgnoreCase(emailType)) {
                // For booking emails, require all booking parameters
                if (movieTitle == null || showtime == null || seats == null) {
                    String missingParams = String.join(", ", 
                        movieTitle == null ? "movieTitle" : "",
                        showtime == null ? "showtime" : "",
                        seats == null ? "seats" : ""
                    ).trim();
                    String error = "Missing required booking parameters: " + missingParams;
                    logger.warn(error);
                    return ResponseEntity.badRequest().body(error);
                }
    
                subject = "Movie Booking Confirmation";
                body = String.format("""
                    Thank you for your booking!
                    
                    Booking Details:
                    Movie: %s
                    Showtime: %s
                    Seats: %s
                    
                    We look forward to seeing you!
                    
                    Best regards,
                    Hawk Tuah Movies Team
                    """, movieTitle, showtime, seats);
            } else if ("registration".equalsIgnoreCase(emailType)) {
                subject = "Registration Successful";
                body = "Welcome! Your registration was successful.\n" +
                      "You can now log in and enjoy our services.";
            } else if ("password".equalsIgnoreCase(emailType)) {
                subject = "Password Reset Request";
                body = "You have requested a password reset.\n" +
                      "Please follow the instructions to reset your password.";
            } else {
                logger.warn("Invalid email type: {}", emailType);
                return ResponseEntity.badRequest()
                    .body("Invalid email type. Supported types: booking, registration, password");
            }
    
            emailService.sendConfirmationEmail(email, subject, body);
            logger.info("Successfully sent {} email to {}", emailType, email);
            return ResponseEntity.ok(String.format("%s email sent successfully!", emailType));
    
        } catch (Exception e) {
            logger.error("Error sending {} email to {}: {}", emailType, email, e.getMessage());
            return ResponseEntity.internalServerError()
                .body(String.format("Failed to send %s email: %s", emailType, e.getMessage()));
        }
    }
    
    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return email != null && email.matches(emailRegex);
    }
}