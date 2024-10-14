package com.example.demo;

import com.example.demo.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);

    @Autowired
    private MovieRepository movieRepository;

    // Get all movies
    @GetMapping
    public List<Movie> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        logger.info("Fetched movies: {}", movies);
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

    // Other endpoints as needed...
}
