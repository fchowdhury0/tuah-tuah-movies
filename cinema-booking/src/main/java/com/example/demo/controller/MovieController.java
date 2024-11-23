package com.example.demo.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public String sendConfirmationEmail(@RequestParam String email) {
        emailService.sendConfirmationEmail(email, "Booking", "thank you");
        return "Confirmation email sent successfully!";
    }
    
    // Other endpoints as needed...
}
