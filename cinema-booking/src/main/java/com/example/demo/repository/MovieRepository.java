package com.example.demo.repository;

import com.example.demo.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    
    // Find by IMDb ID
    Optional<Movie> findByImdbId(String imdbId);
    
    // Search by title, case-insensitive
    List<Movie> findByTitleContainingIgnoreCase(String title);
    
    // Find by status
    List<Movie> findByStatus(String status);
}
