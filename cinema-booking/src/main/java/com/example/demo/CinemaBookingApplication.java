package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class CinemaBookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(CinemaBookingApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(MovieRepository repository) {
        return args -> {
            repository.save(new Movie(
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
                "tt0816692", // imdbId
                "https://m.media-amazon.com/images/M/MV5BZjBhZWRjYjQtMjNjNS00ZTZkLTg1NjAtZGY4Y2U3MDE2YzI4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" // posterUrl
            ));
            // Add more movies as needed
        };
    }
}
