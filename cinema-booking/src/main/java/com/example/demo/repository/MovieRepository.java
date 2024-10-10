package com.example.demo.repository;

import com.example.demo.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    
    /**
     * Finds a Movie by its IMDb ID.
     *
     * @param imdbId The IMDb ID of the movie.
     * @return An Optional containing the found Movie or empty if not found.
     */
    Optional<Movie> findByImdbId(String imdbId);
    
    /**
     * Finds all Movies with titles containing the specified keyword (case-insensitive).
     *
     * @param title The keyword to search in movie titles.
     * @return A list of Movies matching the search criteria.
     */
    List<Movie> findByTitleContainingIgnoreCase(String title);
    
    /**
     * Finds all Movies with the specified status.
     *
     * @param status The status of the movies to retrieve.
     * @return A list of Movies matching the specified status.
     */
    List<Movie> findByStatus(String status);
}
