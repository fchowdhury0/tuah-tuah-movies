package com.example.demo;

import com.example.demo.repository.MovieRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import java.time.LocalDate;
import java.util.Optional;

@SpringBootApplication
public class CinemaBookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(CinemaBookingApplication.class, args);
    }

    /**
     * Initializes the database with sample movies.
     * This bean will NOT run when the 'test' profile is active.
     */
    @Bean
    @Profile("!test") // Exclude this bean when 'test' profile is active
    CommandLineRunner initDatabase(MovieRepository repository) {
        return args -> {
            String imdbId = "tt0816692"; // IMDb ID for "Interstellar"

            // Check if a movie with this IMDb ID already exists
            Optional<Movie> existingMovie = repository.findByImdbId(imdbId);
            if (existingMovie.isEmpty()) {
                Movie movie = new Movie(
                    "Interstellar", // title
                    "Sci-Fi", // category
                    "Matthew McConaughey, Anne Hathaway", // castMembers
                    "Emma Thomas", // director
                    "Christopher Nolan", // producer
                    "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", // synopsis
                    "Excellent visuals and storytelling.", // reviews
                    "https://www.youtube.com/embed/zSWdZVtXT7E", // trailerUrl
                    "PG-13", // ratingCode
                    LocalDate.of(2024, 9, 10), // showDate
                    LocalDate.of(2014, 11, 7), // releaseDate
                    "Currently Running", // status
                    imdbId, // imdbId
                    "https://m.media-amazon.com/images/M/MV5BZjBhZWRjYjQtMjNjNS00ZTZkLTg1NjAtZGY4Y2U3MDE2YzI4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" // posterUrl
                );
                repository.save(movie);
                System.out.println("Inserted movie with IMDb ID: " + imdbId);
            } else {
                System.out.println("Movie with IMDb ID " + imdbId + " already exists. Skipping insertion.");
            }

            // Add more movies as needed, following the same pattern
        };
    }
}
