-- Drops all existing tables in the database. Resets the PK ids.
DO $$ 
BEGIN
    EXECUTE (
        SELECT string_agg('DROP TABLE IF EXISTS "' || tablename || '" CASCADE;', ' ')
        FROM pg_tables
        WHERE schemaname = 'public'
    );
END $$;


CREATE TABLE IF NOT EXISTS movies (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    cast_members TEXT,
    director VARCHAR(100),
    producer VARCHAR(100),
    synopsis TEXT,
    reviews TEXT, 
    trailerUrl VARCHAR(255),
    posterUrl VARCHAR(255),
    imdb_id VARCHAR(20) UNIQUE,
    ratingCode VARCHAR(10),
    showDate DATE,
    releaseDate DATE,
    status VARCHAR(20) CHECK (status IN ('Currently Running', 'Coming Soon', 'Archived'))
);
COMMENT ON TABLE movies IS 'Stores movie details including title, cast, director, and show information, etc.';

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    f_name VARCHAR(100),
    l_name VARCHAR(100)
);
COMMENT ON TABLE users IS 'Stores information on customers, including login credentials and personal details, etc.';

CREATE TABLE IF NOT EXISTS admins (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);
COMMENT ON TABLE admins IS 'Stores system administrators information including login credentials.';

CREATE TABLE IF NOT EXISTS paymentCard (
    card_id SERIAL PRIMARY KEY,
    card_number VARCHAR(20) UNIQUE NOT NULL,
    card_exp DATE NOT NULL,
    card_billing_address VARCHAR(255) NOT NULL,
    card_zip VARCHAR(10) NOT NULL,
    card_city VARCHAR(100) NOT NULL,
    card_state VARCHAR(10) NOT NULL, 
    cvv_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    save_card BOOLEAN DEFAULT FALSE
);
COMMENT ON TABLE paymentCard IS 'Stores payment card details used by users for booking and purchases.';

CREATE TABLE IF NOT EXISTS shows (
    show_id SERIAL PRIMARY KEY,
    show_time TIME NOT NULL, 
    show_duration INT NOT NULL, 
	show_room INT NOT NULL,
    movie_id INT REFERENCES movies(movie_id),
    seats_remaining INT
);
COMMENT ON TABLE shows IS 'Stores showtimes and seat availability for each movie.';

CREATE TABLE IF NOT EXISTS seating_chart (
    seat_id SERIAL PRIMARY KEY,
    row VARCHAR(10) NOT NULL,
    seat_number INT NOT NULL
);
COMMENT ON TABLE seating_chart IS 'Stores the layout of the seating chart: rows and seat numbers.';

CREATE TABLE IF NOT EXISTS show_seating_chart (
    show_seating_id SERIAL PRIMARY KEY,
    show_id INT REFERENCES shows(show_id),
    seat_id INT REFERENCES seating_chart(seat_id),
    reservation_status VARCHAR(10) DEFAULT 'open' CHECK (reservation_status IN ('open', 'reserved', 'selected'))
);
COMMENT ON TABLE show_seating_chart IS 'Links seating chart to specific shows. Tracks reservations for each seat.';

CREATE TABLE IF NOT EXISTS ticket ( 
    ticket_id SERIAL PRIMARY KEY,
    show_seating_id INT REFERENCES show_seating_chart(show_seating_id),
    ticket_price INT NOT NULL
);
COMMENT ON TABLE ticket IS 'Stores ticket details such as price and seating information.';

CREATE TABLE IF NOT EXISTS booking (
    booking_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_booking_cost INT NOT NULL,
    number_of_tickets INT NOT NULL
);
COMMENT ON TABLE booking IS 'Stores information about bookings made by users. A booking may have one or more tickets. The total cost of a booking and number of tickets is stored';

CREATE TABLE IF NOT EXISTS booking_ticket (
    booking_ticket_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES booking(booking_id),
    ticket_id INT REFERENCES ticket(ticket_id)
);
COMMENT ON TABLE booking_ticket IS 'Links tables bookings to tickets. Tracks ticket purchases for each booking.';

CREATE TABLE IF NOT EXISTS purchases (
    transaction_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES booking(booking_id),
    user_id INT REFERENCES users(user_id),
    total_paid INT NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_card INT REFERENCES paymentCard(card_id)    
);
COMMENT ON TABLE purchases IS 'Stores transaction details for each booking, such as payment method and total amount paid.';

CREATE TABLE IF NOT EXISTS user_purchases (
    user_purchase_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    purchase_id INT REFERENCES purchases(transaction_id)
);
COMMENT ON TABLE user_purchases IS 'Links tables users and purchases. Tracks customer purchase transaction history.';

CREATE TABLE IF NOT EXISTS user_payment_card (
    user_card_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    card_id INT REFERENCES paymentCard(card_id),
	CONSTRAINT unique_user_card UNIQUE (user_id, card_id)
);
COMMENT ON TABLE user_payment_card IS 'Links tables users and payment_card. Tracks credit card information for users for use in future transactions.';


-- need trigger for limiting user saved payment cards to 2
-- need trigger for tracking number of open seats in a particular showing 