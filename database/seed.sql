-- Removes all rows from tables in the database, leaving the structure intact. 
DO $$ 
BEGIN
    EXECUTE (
        SELECT string_agg('TRUNCATE TABLE "' || tablename || '" RESTART IDENTITY CASCADE;', ' ')
        FROM pg_tables
        WHERE schemaname = 'public'
    );
END $$;

INSERT INTO movies (title, category, director, producer, synopsis, trailerUrl, ratingCode, showDate, releaseDate, status, imdb_id, posterUrl) VALUES
    ('Inception', 'Sci-Fi', 'Christopher Nolan', 'Emma Thomas', 'A thief who steals corporate secrets through the use of dream-sharing technology.', 'https://www.youtube.com/watch?v=YoHD9XEInc0', 'PG-13', '2024-09-01', '2010-07-16', 'Currently Running', 'tt1375666', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'),
    ('The Dark Knight', 'Action', 'Christopher Nolan', 'Charles Roven', 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.', 'https://www.youtube.com/watch?v=EXeTwQWrcwY', 'PG-13', '2024-09-02', '2008-07-18', 'Currently Running', 'tt0468569', 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'),
    ('Avengers: Endgame', 'Action', 'Anthony Russo, Joe Russo', 'Kevin Feige', 'After the devastating events of Avengers: Infinity War, the universe is in ruins.', 'https://www.youtube.com/watch?v=TcMBFSGVi1c', 'PG-13', '2024-09-03', '2019-04-26', 'Currently Running', 'tt4154796', 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg'),
    ('Parasite', 'Thriller', 'Bong Joon-ho', 'Kwak Sin-ae', 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', 'https://www.youtube.com/watch?v=PhPROyE0OaM', 'R', '2024-09-04', '2019-05-30', 'Currently Running', 'tt6751668', 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg'),
    ('Dune', 'Sci-Fi', 'Denis Villeneuve', 'Mary Parent', 'A noble family becomes embroiled in a war for control over the galaxy''s most valuable asset.', 'https://www.youtube.com/watch?v=n9xhJrPXop4', 'PG-13', '2024-09-06', '2021-10-22', 'Currently Running', 'tt1160419', 'https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg'),
    ('The Godfather', 'Crime', 'Francis Ford Coppola', 'Albert S. Ruddy', 'An organized crime dynasty''s aging patriarch transfers control of his clandestine empire to his reluctant son.', 'https://www.youtube.com/watch?v=sY1S34973zA', 'R', '2024-09-07', '1972-03-24', 'Currently Running', 'tt0068646', 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'),
    ('Forrest Gump', 'Drama', 'Robert Zemeckis', 'Wendy Finerman', 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabama man.', 'https://www.youtube.com/watch?v=bLvqoHBptjg', 'PG-13', '2024-09-08', '1994-07-06', 'Currently Running', 'tt0109830', 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'),
    ('The Shawshank Redemption', 'Drama', 'Frank Darabont', 'Niki Marvin', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'https://www.youtube.com/watch?v=6hB3S9bIaco', 'R', '2024-09-09', '1994-09-23', 'Currently Running', 'tt0111161', 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg'),
    ('Killers of the Flower Moon', 'Crime', 'Martin Scorsese', 'Dan Friedkin', 'In 1920s Oklahoma, the Osage Nation became incredibly wealthy from oil, and members of the tribe began to be murdered under mysterious circumstances.', 'https://www.youtube.com/watch?v=7cx9nCHsemc', 'R', '2024-09-18', '2023-10-20', 'Coming Soon', 'tt5537002', 'https://m.media-amazon.com/images/M/MV5BMjE4ZTZlNDAtM2Q3YS00YjFhLThjN2UtODg2ZGNlN2E2MWU2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg'),
    ('The Hunger Games: The Ballad of Songbirds and Snakes', 'Adventure', 'Francis Lawrence', 'Nina Jacobson', 'Set 64 years before the original Hunger Games, the story follows Coriolanus Snow, who is a mentor to a tribute.', 'https://www.youtube.com/watch?v=RDE6Uz73A7g', 'PG-13', '2024-09-19', '2023-11-17', 'Coming Soon', 'tt10545296', 'https://m.media-amazon.com/images/M/MV5BOTZmMmY2MzctMjU2Yy00YjJlLTk1NjAtY2U4MmMxOWZkZWY4XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg'),
    ('Furiosa', 'Action', 'George Miller', 'Doug Mitchell', 'A prequel to Mad Max: Fury Road, focusing on the backstory of the character Furiosa.', 'https://www.youtube.com/watch?v=XJMuhwVlca4', 'R', '2024-09-20', '2024-05-24', 'Coming Soon', 'tt13623136', 'https://m.media-amazon.com/images/I/91N6gMpR27L._AC_UY327_FMwebp_QL65_.jpg'),
    ('Fantastic Beasts: The Secrets of Dumbledore', 'Fantasy', 'David Yates', 'David Heyman', 'Albus Dumbledore assigns Newt Scamander to lead a team of wizards and witches to thwart Grindelwald’s plans.', 'https://www.youtube.com/watch?v=Y9dr2zw-TXQ', 'PG-13', '2024-09-21', '2022-04-15', 'Coming Soon', 'tt4123432', 'https://m.media-amazon.com/images/M/MV5BZGQ1NjQyNDMtNzFlZS00ZGIzLTliMWUtNGJkMGMzNTBjNDg0XkEyXkFqcGdeQXVyMTE1NDI5MDQx._V1_SX300.jpg'),
	('The Nun II', 'Horror', 'Michael Chaves', 'Peter Safran', 'Set in 1956 France, a priest is murdered and a nun uncovers the sinister origins of a demonic entity.', NULL, 'R', '2024-09-23', '2023-09-08', 'Coming Soon', 'tt12636876', 'https://m.media-amazon.com/images/I/71r3i3uwVvL._AC_UY327_FMwebp_QL65_.jpg');

-- Shows
INSERT INTO shows (show_time, show_duration, show_room, movie_id, seats_remaining)
VALUES 
    ('2024-10-01 15:00:00', 120, 1, 1, 5),
    ('2024-10-01 18:00:00', 150, 2, 2, 5);

-- PLACEHOLDER Seating Chart
INSERT INTO seating_chart (row, seat_number)
VALUES 
    ('A', 1), 
    ('A', 2), 
    ('A', 3),
	('B', 1), 
    ('B', 2), 
    ('B', 3);

-- Insert Show Seating Chart Entries
INSERT INTO show_seating_chart (show_id, seat_id, reservation_status)
VALUES 
    (1, 1, 'reserved'),  -- Mark as reserved
    (1, 2, 'reserved'),  -- Mark as reserved
    (2, 1, 'open');      -- Keep this open

-- Users
INSERT INTO users (username, password_hash, email, first_name, last_name, role, status)
VALUES 
    ('admin_user', 'abcd1234', 'admin@fakemovietheater.com', 'Admin', 'User', 'admin', FALSE),
	('admin_user2', 'abcd1234', 'admin2@fakemovietheater.com', 'Admin', 'User', 'admin', TRUE),
    ('customer1', 'abcd1234', 'customer1@example.com', 'John', 'Doe', 'customer', FALSE);

-- Payment Cards
INSERT INTO paymentCard (card_number, card_exp, card_billing_address, card_zip, card_city, card_state, cvv_hash, first_name, last_name, save_card)
VALUES 
    ('4111111111111111', '2025-12-31', '123 Main St', '12345', 'Anytown', 'GA', 'hashed_cvv', 'John', 'Doe', TRUE);

-- Tickets
INSERT INTO ticket (show_seating_id, ticket_price)
VALUES 
    (1, 12.50),  
    (2, 15.00); 