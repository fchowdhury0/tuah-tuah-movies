-- Removes all rows from tables in the database, leaving the structure intact. 
DO $$ 
BEGIN
    EXECUTE (
        SELECT string_agg('TRUNCATE TABLE "' || tablename || '" RESTART IDENTITY CASCADE;', ' ')
        FROM pg_tables
        WHERE schemaname = 'public'
    );
END $$;

SET TIME ZONE 'America/New_York';

INSERT INTO movies (title, category, director, producer, synopsis, trailerUrl, ratingCode, releaseDate, status, imdb_id, posterUrl) VALUES
    ('Inception', 'Sci-Fi', 'Christopher Nolan', 'Emma Thomas', 'A thief who steals corporate secrets through the use of dream-sharing technology.', 'https://www.youtube.com/watch?v=YoHD9XEInc0', 'PG-13', '2010-07-16', 'Currently Running', 'tt1375666', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'),
    ('The Dark Knight', 'Action', 'Christopher Nolan', 'Charles Roven', 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.', 'https://www.youtube.com/watch?v=EXeTwQWrcwY', 'PG-13', '2008-07-18', 'Currently Running', 'tt0468569', 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'),
    ('Avengers: Endgame', 'Action', 'Anthony Russo, Joe Russo', 'Kevin Feige', 'After the devastating events of Avengers: Infinity War, the universe is in ruins.', 'https://www.youtube.com/watch?v=TcMBFSGVi1c', 'PG-13', '2019-04-26', 'Currently Running', 'tt4154796', 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg'),
    ('Parasite', 'Thriller', 'Bong Joon-ho', 'Kwak Sin-ae', 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', 'https://www.youtube.com/watch?v=PhPROyE0OaM', 'R', '2019-05-30', 'Currently Running', 'tt6751668', 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg'),
    ('Dune', 'Sci-Fi', 'Denis Villeneuve', 'Mary Parent', 'A noble family becomes embroiled in a war for control over the galaxy''s most valuable asset.', 'https://www.youtube.com/watch?v=n9xhJrPXop4', 'PG-13', '2021-10-22', 'Currently Running', 'tt1160419', 'https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg'),
    ('The Godfather', 'Crime', 'Francis Ford Coppola', 'Albert S. Ruddy', 'An organized crime dynasty''s aging patriarch transfers control of his clandestine empire to his reluctant son.', 'https://www.youtube.com/watch?v=sY1S34973zA', 'R', '1972-03-24', 'Currently Running', 'tt0068646', 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'),
    ('Forrest Gump', 'Drama', 'Robert Zemeckis', 'Wendy Finerman', 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabama man.', 'https://www.youtube.com/watch?v=bLvqoHBptjg', 'PG-13', '1994-07-06', 'Currently Running', 'tt0109830', 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'),
    ('The Shawshank Redemption', 'Drama', 'Frank Darabont', 'Niki Marvin', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'https://www.youtube.com/watch?v=6hB3S9bIaco', 'R', '1994-09-23', 'Currently Running', 'tt0111161', 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg'),
    ('Killers of the Flower Moon', 'Crime', 'Martin Scorsese', 'Dan Friedkin', 'In 1920s Oklahoma, the Osage Nation became incredibly wealthy from oil, and members of the tribe began to be murdered under mysterious circumstances.', 'https://www.youtube.com/watch?v=7cx9nCHsemc', 'R', '2023-10-20', 'Coming Soon', 'tt5537002', 'https://m.media-amazon.com/images/M/MV5BMjE4ZTZlNDAtM2Q3YS00YjFhLThjN2UtODg2ZGNlN2E2MWU2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg'),
    ('The Hunger Games: The Ballad of Songbirds and Snakes', 'Adventure', 'Francis Lawrence', 'Nina Jacobson', 'Set 64 years before the original Hunger Games, the story follows Coriolanus Snow, who is a mentor to a tribute.', 'https://www.youtube.com/watch?v=RDE6Uz73A7g', 'PG-13', '2023-11-17', 'Coming Soon', 'tt10545296', 'https://m.media-amazon.com/images/M/MV5BOTZmMmY2MzctMjU2Yy00YjJlLTk1NjAtY2U4MmMxOWZkZWY4XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg'),
    ('Furiosa', 'Action', 'George Miller', 'Doug Mitchell', 'A prequel to Mad Max: Fury Road, focusing on the backstory of the character Furiosa.', 'https://www.youtube.com/watch?v=XJMuhwVlca4', 'R', '2024-05-24', 'Coming Soon', 'tt13623136', 'https://m.media-amazon.com/images/I/91N6gMpR27L._AC_UY327_FMwebp_QL65_.jpg'),
    ('Fantastic Beasts: The Secrets of Dumbledore', 'Fantasy', 'David Yates', 'David Heyman', 'Albus Dumbledore assigns Newt Scamander to lead a team of wizards and witches to thwart Grindelwald’s plans.', 'https://www.youtube.com/watch?v=Y9dr2zw-TXQ', 'PG-13', '2022-04-15', 'Coming Soon', 'tt4123432', 'https://m.media-amazon.com/images/M/MV5BZGQ1NjQyNDMtNzFlZS00ZGIzLTliMWUtNGJkMGMzNTBjNDg0XkEyXkFqcGdeQXVyMTE1NDI5MDQx._V1_SX300.jpg'),
	('The Nun II', 'Horror', 'Michael Chaves', 'Peter Safran', 'Set in 1956 France, a priest is murdered and a nun uncovers the sinister origins of a demonic entity.', NULL, 'R', '2023-09-08', 'Coming Soon', 'tt12636876', 'https://m.media-amazon.com/images/I/71r3i3uwVvL._AC_UY327_FMwebp_QL65_.jpg');

-- PLACEHOLDER Seating Chart
INSERT INTO seating_chart (row, seat_number)
VALUES 
    ('A', 1), 
    ('A', 2), 
    ('A', 3),
	('A', 4),
	('A', 5),
	('A', 6),
	('A', 7),
	('A', 8),
	('A', 9),
	('A', 10),
	('A', 11),
	('A', 12),
	('A', 13),
    ('B', 1), 
    ('B', 2), 
    ('B', 3),
	('B', 4),
	('B', 5),
	('B', 6),
	('B', 7),
	('B', 8),
	('B', 9),
	('B', 10),
	('B', 11),
	('B', 12),
	('B', 13),
    ('C', 1), 
    ('C', 2), 
    ('C', 3),
	('C', 4),
	('C', 5),
	('C', 6),
	('C', 7),
	('C', 8),
	('C', 9),
	('C', 10),
	('C', 11),
	('C', 12),
	('C', 13),
	('D', 1), 
    ('D', 2), 
    ('D', 3),
	('D', 4),
	('D', 5),
	('D', 6),
	('D', 7),
	('D', 8),
	('D', 9),
	('D', 10),
	('D', 11),
	('D', 12),
	('D', 13),
	('E', 1), 
    ('E', 2), 
    ('E', 3),
	('E', 4),
	('E', 5),
	('E', 6),
	('E', 7),
	('E', 8),
	('E', 9),
	('E', 10),
	('E', 11),
	('E', 12),
	('E', 13),
	('F', 1), 
    ('F', 2), 
    ('F', 3),
	('F', 4),
	('F', 5),
	('F', 6),
	('F', 7),
	('F', 8),
	('F', 9),
	('F', 10),
	('F', 11),
	('F', 12),
	('F', 13),
	('G', 1), 
    ('G', 2), 
    ('G', 3),
	('G', 4),
	('G', 5),
	('G', 6),
	('G', 7),
	('G', 8),
	('G', 9),
	('G', 10),
	('G', 11),
	('G', 12),
	('G', 13);
	
-- Shows
INSERT INTO shows (show_date, show_time, show_duration, show_room, movie_id)
VALUES 
	('2024-10-01', '15:00:00', 120, 1, 1),
	('2024-10-01', '15:00:00', 150, 2, 2),
	('2024-10-01', '18:00:00', 120, 1, 1),
	('2024-10-01', '21:00:00', 120, 1, 1),
	('2024-10-02', '15:00:00', 150, 2, 2),
	('2024-10-02', '15:00:00', 120, 1, 1);
	
CALL initialize_seats_remaining();

-- Users ADD ADMINS
INSERT INTO users (username, password_hash, email, first_name, last_name, role, status)
VALUES 
    ('admin_user1', 'abcd1234', 'admin1@fakemovietheater.com', 'Admin', 'User', 'admin', TRUE),
	('admin_user2', '$2a$10$Yul1UoAxIKZrFVZJ.X21yegzGpW1jgC2hnVPmXJCNTuWumVXEvGmm', 'admin2@fakemovietheater.com', 'Admin', 'User', 'admin', TRUE),
    ('admin_user3', '$2a$10$zu0TQpRFKpGUzsvPhmgo8.ZIfmutBxF25RienFMLWk2IhblqgClNu', 'admin3@fakemovietheater.com', 'Admin', 'User', 'admin', TRUE),
    ('admin_user4', '$2a$10$n.swT7/VU/j8pUOdwk8UruSeRgi/mqswv51Xqvm9.MN3L1EjoK2ke', 'admin4@fakemovietheater.com', 'Admin', 'User', 'admin', TRUE),
    ('customer1', 'abcd1234', 'customer1@example.com', 'John', 'Doe', 'customer', TRUE);

-- Payment Cards
INSERT INTO payment_card (card_number, card_exp, card_billing_address, card_zip, card_city, card_state, cvv, user_id, first_name, last_name, save_card)
VALUES 
    ('4111111111111111', '2025-12-31', '123 Main St', '12345', 'Anytown', 'GA', '000', 5, 'John', 'Doe', TRUE);

-- Tickets
INSERT INTO ticket (show_seating_id, ticket_price)
VALUES 
    (1, 15.00),  
    (9, 15.00), 
    (13, 15.00), 
    (14, 15.00), 
    (19, 15.00), 
    (20, 15.00),
    (21, 15.00);

--update show_seating_chart
UPDATE show_seating_chart
SET reservation_status = 'reserved'
WHERE show_id = 1 AND seat_id IN (1);

UPDATE show_seating_chart
SET reservation_status = 'reserved'
WHERE show_id = 2 AND seat_id IN (3);

UPDATE show_seating_chart
SET reservation_status = 'reserved'
WHERE show_id = 3 AND seat_id IN (1,2);

UPDATE show_seating_chart
SET reservation_status = 'reserved'
WHERE show_id = 4 AND seat_id IN (1,2,3);




