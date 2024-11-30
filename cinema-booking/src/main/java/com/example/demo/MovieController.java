package com.example.demo;

import com.example.demo.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);

    @Autowired
    private MovieRepository movieRepository;

    @Autowired  // Add this annotation to inject EmailService
    private EmailService emailService;
    
    // Get all movies
    @GetMapping
    public List<Movie> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        for (Movie movie : movies) {
            logger.info("Movie: {} - PosterUrl: {}, TrailerUrl: {}", movie.getTitle(), movie.getPosterUrl(), movie.getTrailerUrl());
        }
        return movies;
    }


    // Search for movies by title
    @GetMapping("/search")
    public List<Movie> searchMovies(@RequestParam String title) {
        List<Movie> movies = movieRepository.findByTitleContainingIgnoreCase(title);
        logger.info("Searched movies with title '{}': {}", title, movies);
        return movies;
    }

    // Get movies by status (e.g., Currently Running, Coming Soon)
    @GetMapping("/status/{status}")
    public List<Movie> getMoviesByStatus(@PathVariable String status) {
        List<Movie> movies = movieRepository.findByStatus(status);
        logger.info("Movies with status '{}': {}", status, movies);
        return movies;
    }

    // Add a new movie (protected endpoint)
    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        Movie savedMovie = movieRepository.save(movie);
        logger.info("Added new movie: {}", savedMovie);
        return savedMovie;
    }

    @PostMapping("/sendConfirmationEmail")
    public ResponseEntity<String> sendConfirmationEmail(@RequestParam String email) {
        if (!isValidEmail(email)) {
            logger.warn("Invalid email address: {}", email);
            return ResponseEntity.badRequest().body("Invalid email address.");
        }
       
	try {
	    emailService.sendConfirmationEmail(email, "Booking Confirmation", "Thank you for your booking!\n Movie: \n Showtime: \n Seats: \n");
            logger.info("Confirmation email sent to {}", email);
            return ResponseEntity.ok("Confirmation email sent successfully!");
	    
        } catch (Exception e) {
            logger.error("Error sending email to {}: {}", email, e.getMessage());
            return ResponseEntity.status(500).body("Failed to send confirmation email.");
        }
    }
    
    // Utility method to validate email format
    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        return email != null && email.matches(emailRegex);
    }
    
        // Other endpoints as needed...
}
