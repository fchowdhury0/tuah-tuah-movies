// src/components/Booking.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Booking.css';

const Booking = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movie details
    fetch(`http://localhost:8081/api/movies/${movieId}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error(err));

    // Fetch showtimes for the movie
    fetch(`http://localhost:8081/api/movies/${movieId}/showtimes`)
      .then(res => res.json())
      .then(data => setShowtimes(data))
      .catch(err => console.error(err));
  }, [movieId]);

  const handleNext = () => {
    if (selectedShowtime) {
      navigate(`/booking/${movieId}/showtime/${selectedShowtime}`);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="booking-container">
      <h2>Book: {movie.title}</h2>
      <div className="showtimes">
        <h3>Select Showtime:</h3>
        {showtimes.map(showtime => (
          <div key={showtime.id}>
            <input
              type="radio"
              id={`showtime-${showtime.id}`}
              name="showtime"
              value={showtime.id}
              onChange={(e) => setSelectedShowtime(e.target.value)}
            />
            <label htmlFor={`showtime-${showtime.id}`}>
              {new Date(showtime.time).toLocaleString()}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleNext} disabled={!selectedShowtime}>
        Next
      </button>
    </div>
  );
};

export default Booking;
