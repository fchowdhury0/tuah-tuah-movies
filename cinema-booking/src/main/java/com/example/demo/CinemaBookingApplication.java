package csci_4050.cinema-booking.src.main.java.com.example.demo;

@SpringBootApplication
public class CinemaBookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(CinemaBookingApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(MovieRepository repository) {
        return args -> {
            repository.save(new Movie(
                // need to add initialize with sample data
            ));
            // need to more movies
        };
    }
}
