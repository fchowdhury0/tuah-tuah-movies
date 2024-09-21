package csci_4050.cinema-booking.src.main.java.com.example.demo;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category;
    private String cast;
    private String director;
    private String producer;
    private String synopsis;
    private String reviews;
    private String trailerUrl; // URL to the trailer
    private String ratingCode; // MPAA-US film rating code
    private LocalDate showDate;
    private LocalDate releaseDate; // For Coming Soon movies
    private String status; // Currently Running or Coming Soon

    // Getters and Setters
}
