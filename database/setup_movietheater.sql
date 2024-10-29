BEGIN;
-- Drops all existing tables in the database. Resets the PK ids.
DO $$ 
BEGIN
    EXECUTE (
        SELECT string_agg('DROP TABLE IF EXISTS "' || tablename || '" CASCADE;', ' ')
        FROM pg_tables
        WHERE schemaname = 'public'
    );
END $$;

-- Drop Indexes
DROP INDEX IF EXISTS idx_users_username;
DROP INDEX IF EXISTS idx_movies_title;
DROP INDEX IF EXISTS idx_promotions_code;

-- Drop Types
DROP TYPE IF EXISTS role_enum;

-- Create Types
CREATE TYPE role_enum AS ENUM ('admin', 'customer');


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

-- Create the users table with role and status columns
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role role_enum DEFAULT 'customer' NOT NULL, 
    status BOOLEAN DEFAULT FALSE,
	is_subscribed BOOLEAN DEFAULT FALSE
);

COMMENT ON TABLE users IS 'Stores information on customers and admins, including login credentials, roles, and login status.';
--COMMENT ON COLUMN users.role IS 'Defines the user role as either admin or customer. Default is customer.';
--COMMENT ON COLUMN users.status IS 'Tracks the user login state. FALSE indicates logged out; TRUE indicates logged in.';

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
    ticket_price NUMERIC NOT NULL
);
COMMENT ON TABLE ticket IS 'Stores ticket details such as price and seating information.';

CREATE TABLE IF NOT EXISTS booking (
    booking_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_booking_cost NUMERIC NOT NULL,
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
    total_paid NUMERIC NOT NULL,
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

CREATE TABLE IF NOT EXISTS promotions ( 
	promo_id SERIAL PRIMARY KEY,
	promo_code VARCHAR(25) NOT NULL UNIQUE,
	start_date DATE NOT NULL,
	exp_date DATE NOT NULL,
	date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	created_by INT NOT NULL REFERENCES users(user_id),
	is_active BOOLEAN DEFAULT false, 
	description TEXT,
	use_count INT DEFAULT 0
);
COMMENT ON TABLE promotions IS 'Stores promotional codes along with their details.';


-- Create Indexes to improve performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_movies_title ON movies(title);
CREATE INDEX idx_promotions_code ON promotions(promo_code);

--
-- TRIGGER FUNCTIONS AND TRIGGERS
--

-- TRIGGER FUNCTION: update promotion status to new if the current date falls between the start date and end date
CREATE OR REPLACE FUNCTION update_promotion_status() 
RETURNS TRIGGER AS $$
BEGIN
    IF CURRENT_DATE BETWEEN NEW.start_date AND NEW.exp_date THEN
        NEW.is_active := true;
    ELSE
        NEW.is_active := false;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: update promotion status to new if the current date falls between the start date and end date
CREATE TRIGGER set_promotion_status
BEFORE INSERT OR UPDATE ON promotions
FOR EACH ROW 
EXECUTE FUNCTION update_promotion_status();

-- Trigger function: limiting saved payment cards to 2
CREATE OR REPLACE FUNCTION limit_saved_cards()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM user_payment_card WHERE user_id = NEW.user_id) >= 2 THEN
        RAISE EXCEPTION 'A user can only have up to 2 cards saved at once.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- (IN PROG) Trigger: limiting saved payment cards to 2 )
--CREATE TRIGGER check_card_limit
--BEFORE INSERT ON user_payment_card
--FOR EACH ROW EXECUTE FUNCTION limit_saved_cards();

-- Trigger function: tracking number of open seats in a particular showing
    CREATE OR REPLACE FUNCTION update_seats_remaining()
    RETURNS TRIGGER AS $$
    BEGIN
        IF NEW.reservation_status = 'reserved' THEN
            IF (SELECT seats_remaining FROM shows WHERE show_id = NEW.show_id) <= 0 THEN
                RAISE EXCEPTION 'No seats available.';
            ELSE
                UPDATE shows SET seats_remaining = seats_remaining - 1 WHERE show_id = NEW.show_id;
            END IF;
        ELSIF OLD.reservation_status = 'reserved' AND NEW.reservation_status = 'open' THEN
            UPDATE shows SET seats_remaining = seats_remaining + 1 WHERE show_id = NEW.show_id;
        END IF;
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

-- Trigger: tracking number of open seats in a particular showing
CREATE TRIGGER adjust_seats_count
AFTER INSERT OR UPDATE OF reservation_status ON show_seating_chart
FOR EACH ROW EXECUTE FUNCTION update_seats_remaining();

COMMIT;