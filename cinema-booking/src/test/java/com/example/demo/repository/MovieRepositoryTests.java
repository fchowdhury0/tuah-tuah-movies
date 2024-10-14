package com.example.demo.repository;

import com.example.demo.Movie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test") // Activates 'test' profile to use application-test.properties
class MovieRepositoryTests {

    @Autowired
    private MovieRepository movieRepository;

    @BeforeEach
    void setUp() {
        // Clean the repository before each test to ensure test isolation
        movieRepository.deleteAll();
    }

    @Test
    @DisplayName("Test saving a new movie")
    void testSaveNewMovie() {
        Movie movie = new Movie(
            "Inception", // title
            "Sci-Fi", // category
            "Leonardo DiCaprio, Joseph Gordon-Levitt", // castMembers
            "Emma Thomas", // director
            "Christopher Nolan", // producer
            "A thief who steals corporate secrets through the use of dream-sharing technology.", // synopsis
            "Mind-bending and thrilling.", // reviews
            "https://www.youtube.com/embed/YoHD9XEInc0", // trailerUrl
            "PG-13", // ratingCode
            LocalDate.of(2024, 9, 15), // showDate
            LocalDate.of(2010, 7, 16), // releaseDate
            "Released", // status
            "tt1375666", // imdbId
            "https://m.media-amazon.com/images/M/MV5BMmU2MzE0YjUtM2UwMC00YWE3LTk3ZTAtNjJkNGViMGYxZjNkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" // posterUrl
        );

        Movie savedMovie = movieRepository.save(movie);

        assertNotNull(savedMovie.getId(), "Saved movie should have an autogenerated ID");
        assertEquals("Inception", savedMovie.getTitle(), "Movie title should match");
    }

    @Test
    @DisplayName("Test finding a movie by IMDb ID")
    void testFindByImdbId() {
        // Arrange
        Movie movie = new Movie(
            "The Dark Knight",
            "Action",
            "Christian Bale, Heath Ledger",
            "Emma Thomas",
            "Christopher Nolan",
            "Batman raises the stakes in his war on crime.",
            "Outstanding performance by Heath Ledger.",
            "https://www.youtube.com/embed/EXeTwQWrcwY",
            "PG-13",
            LocalDate.of(2024, 9, 20),
            LocalDate.of(2008, 7, 18),
            "Released",
            "tt0468569",
            "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtYTA0NC00ZmU2LTg5MGEtYzNjZGI2ZGE3ZTFmXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
        );

        movieRepository.save(movie);

        // Act
        Optional<Movie> foundMovie = movieRepository.findByImdbId("tt0468569");

        // Assert
        assertTrue(foundMovie.isPresent(), "Movie should be found by IMDb ID");
        assertEquals("The Dark Knight", foundMovie.get().getTitle(), "Movie title should match");
    }

    @Test
    @DisplayName("Test finding movies by title containing substring (case-insensitive)")
    void testFindByTitleContainingIgnoreCase() {
        // Arrange
        Movie movie1 = new Movie(
            "Interstellar",
            "Sci-Fi",
            "Matthew McConaughey, Anne Hathaway",
            "Emma Thomas",
            "Christopher Nolan",
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            "Excellent visuals and storytelling.",
            "https://www.youtube.com/embed/zSWdZVtXT7E",
            "PG-13",
            LocalDate.of(2024, 9, 10),
            LocalDate.of(2014, 11, 7),
            "Currently Running",
            "tt0816692",
            "https://m.media-amazon.com/images/M/MV5BZjBhZWRjYjQtMjNjNS00ZTZkLTg1NjAtZGY4Y2U3MDE2YzI4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        );

        Movie movie2 = new Movie(
            "Inception",
            "Sci-Fi",
            "Leonardo DiCaprio, Joseph Gordon-Levitt",
            "Emma Thomas",
            "Christopher Nolan",
            "A thief who steals corporate secrets through the use of dream-sharing technology.",
            "Mind-bending and thrilling.",
            "https://www.youtube.com/embed/YoHD9XEInc0",
            "PG-13",
            LocalDate.of(2024, 9, 15),
            LocalDate.of(2010, 7, 16),
            "Released",
            "tt1375666",
            "https://m.media-amazon.com/images/M/MV5BMmU2MzE0YjUtM2UwMC00YWE3LTk3ZTAtNjJkNGViMGYxZjNkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        );

        movieRepository.save(movie1);
        movieRepository.save(movie2);

        // Act
        List<Movie> foundMovies = movieRepository.findByTitleContainingIgnoreCase("in");

        // Assert
        assertEquals(2, foundMovies.size(), "Should find two movies containing 'in' in the title");
        assertTrue(foundMovies.stream().anyMatch(m -> m.getTitle().equals("Interstellar")), "Should contain 'Interstellar'");
        assertTrue(foundMovies.stream().anyMatch(m -> m.getTitle().equals("Inception")), "Should contain 'Inception'");
    }

    @Test
    @DisplayName("Test finding movies by status")
    void testFindByStatus() {
        // Arrange
        Movie movie1 = new Movie(
            "Dunkirk",
            "War",
            "Fionn Whitehead, Tom Glynn-Carney",
            "Emma Thomas",
            "Christopher Nolan",
            "Allied soldiers from Belgium, the British Empire and France are surrounded by the German Army.",
            "Intense and immersive.",
            "https://www.youtube.com/embed/F-eMt3SrfFU",
            "PG-13",
            LocalDate.of(2024, 9, 25),
            LocalDate.of(2017, 7, 21),
            "Released",
            "tt5013056",
            "https://m.media-amazon.com/images/M/MV5BNjI2YjQxZjktNjk1MC00NzJlLWJhNTctYTk3MjJlZjMxYzNkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        );

        Movie movie2 = new Movie(
            "Tenet",
            "Sci-Fi",
            "John David Washington, Robert Pattinson",
            "Emma Thomas",
            "Christopher Nolan",
            "Armed with only one word, Tenet, and fighting for the survival of the entire world.",
            "Complex and thrilling.",
            "https://www.youtube.com/embed/LdOM0x0XDM0",
            "PG-13",
            LocalDate.of(2024, 10, 1),
            LocalDate.of(2020, 8, 26),
            "Coming Soon",
            "tt6723592",
            "https://m.media-amazon.com/images/M/MV5BNjI2YjQxZjktNjk1MC00NzJlLWJhNTctYTk3MjJlZjMxYzNkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        );

        movieRepository.save(movie1);
        movieRepository.save(movie2);

        // Act
        List<Movie> releasedMovies = movieRepository.findByStatus("Released");
        List<Movie> comingSoonMovies = movieRepository.findByStatus("Coming Soon");

        // Assert
        assertEquals(1, releasedMovies.size(), "Should find one released movie");
        assertEquals("Dunkirk", releasedMovies.get(0).getTitle(), "Released movie should be 'Dunkirk'");

        assertEquals(1, comingSoonMovies.size(), "Should find one coming soon movie");
        assertEquals("Tenet", comingSoonMovies.get(0).getTitle(), "Coming soon movie should be 'Tenet'");
    }
/*
    @Test
    @DisplayName("Test duplicate IMDb ID insertion throws exception")
    void testDuplicateImdbIdThrowsException() {
        // Arrange
        Movie movie1 = new Movie(
            "Interstellar",
            "Sci-Fi",
            "Matthew McConaughey, Anne Hathaway",
            "Emma Thomas",
            "Christopher Nolan",
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            "Excellent visuals and storytelling.",
            "https://www.youtube.com/embed/zSWdZVtXT7E",
            "PG-13",
            LocalDate.of(2024, 9, 10),
            LocalDate.of(2014, 11, 7),
            "Currently Running",
            "tt0816692",
            "https://m.media-amazon.com/images/M/MV5BZjBhZWRjYjQtMjNjNS00ZTZkLTg1NjAtZGY4Y2U3MDE2YzI4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        );

        Movie movie2 = new Movie(
            "Interstellar Duplicate",
            "Sci-Fi",
            "Matthew McConaughey, Anne Hathaway",
            "Emma Thomas",
            "Christopher Nolan",
            "A duplicate entry for testing purposes.",
            "This should fail due to duplicate IMDb ID.",
            "https://www.youtube.com/embed/zSWdZVtXT7E",
            "PG-13",
            LocalDate.of(2024, 9, 10),
            LocalDate.of(2014, 11, 7),
            "Currently Running",
            "tt0816692", // Same IMDb ID as movie1
            "https://m.media-amazon.com/images/M/MV5BZjBhZWRjYjQtMjNjNS00ZTZkLTg1NjAtZGY4Y2U3MDE2YzI4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        );

        // Act
        movieRepository.save(movie1);

        // Assert
        Exception exception = assertThrows(DataIntegrityViolationException.class, () -> {
            movieRepository.saveAndFlush(movie2); // saveAndFlush to force immediate DB operation
        });

        String expectedMessagePart = "duplicate key value violates unique constraint";
        String actualMessage = exception.getCause().getMessage();

        assertTrue(actualMessage.contains(expectedMessagePart),
                "Exception message should contain duplicate key violation");
    }
*/
    @Test
    @DisplayName("Test deleting a movie")
    void testDeleteMovie() {
        // Arrange
        Movie movie = new Movie(
            "Dunkirk",
            "War",
            "Fionn Whitehead, Tom Glynn-Carney",
            "Emma Thomas",
            "Christopher Nolan",
            "Allied soldiers from Belgium, the British Empire and France are surrounded by the German Army.",
            "Intense and immersive.",
            "https://www.youtube.com/embed/F-eMt3SrfFU",
            "PG-13",
            LocalDate.of(2024, 9, 25),
            LocalDate.of(2017, 7, 21),
            "Released",
            "tt5013056",
            "https://m.media-amazon.com/images/M/MV5BNjI2YjQxZjktNjk1MC00NzJlLWJhNTctYTk3MjJlZjMxYzNkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        );

        Movie savedMovie = movieRepository.save(movie);

        // Act
        movieRepository.delete(savedMovie);

        // Assert
        Optional<Movie> deletedMovie = movieRepository.findById(savedMovie.getId());
        assertFalse(deletedMovie.isPresent(), "Movie should be deleted successfully");
    }

    // Additional tests can be added here...
}
