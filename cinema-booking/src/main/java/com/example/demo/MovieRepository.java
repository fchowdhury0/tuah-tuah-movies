package csci_4050.cinema-booking.src.main.java.com.example.demo;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByTitleContainingIgnoreCase(String title);
    List<Movie> findByStatus(String status);
}