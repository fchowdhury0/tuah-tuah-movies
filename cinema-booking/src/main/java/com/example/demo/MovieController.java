package csci_4050.cinema-booking.src.main.java.com.example.demo;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/search")
    public List<Movie> searchMovies(@RequestParam String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title);
    }

    @GetMapping("/status/{status}")
    public List<Movie> getMoviesByStatus(@PathVariable String status) {
        return movieRepository.findByStatus(status);
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

}

