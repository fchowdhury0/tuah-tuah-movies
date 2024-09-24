CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    cast_members TEXT,
    director VARCHAR(100),
    producer VARCHAR(100),
    synopsis TEXT,
    reviews TEXT, 
    trailerUrl VARCHAR(255),
    ratingCode VARCHAR(10),
    showDate DATE,
    releaseDate DATE,
    status VARCHAR(20) CHECK (status IN ('Currently Running', 'Coming Soon', 'Archived'))
);

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    f_name VARCHAR(100),
    l_name VARCHAR(100)    
);

CREATE TABLE IF NOT EXISTS admins (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);
