import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './BookMovie.scss'
import NavBar from '../../components/NavBar/navbar.jsx';

const BookMovie = () => {
  const { id } = useParams();
  const location = useLocation();
  const { currentMovie } = location.state || {};
  console.log("current movie: " + currentMovie)
  const [movie] = useState({
    title: currentMovie.title,
    showtimes: ['12:00 PM', '2:30 PM', '5:00 PM', '7:30 PM'],
    availableSeats: Array.from({ length: 50 }, (_, i) => `Seat ${i + 1}`),
  });

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const navigate = useNavigate();

  const handleSeatChange = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = () => {
    const seatCount = selectedSeats.length;
    navigate('/ordertickets', { state: { seatCount, selectedSeats } });
  };

  return (
    <div className="container">
	<NavBar />
	<div className="book-movie">
        <div className="movie-detail">
          <div className="movie-poster">
          <img src={currentMovie.posterUrl} alt={`${currentMovie.title} Poster`} />
          </div>

          <div className="movie-text">
            <p>{currentMovie.synopsis}</p>
            <p><strong>GENRE:</strong>{currentMovie.category}</p>
          </div>
        </div>
        <div className="showtimes">
          <h1>{currentMovie.title}</h1>
          <h2>Available Showtimes</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {movie.showtimes.map((time, index) => (
              <li key={index}>
                <button onClick={() => setSelectedShowtime(time)}>{time}</button>

              </li>
            ))}
          </ul>
          <h3>Select Seats:</h3>
          <div style={{ margin: '10px 0' }}>
            <details>
              <summary>Select available seats</summary>
              <div style={{ maxHeight: '150px', overflowY: 'scroll' }}>
                {movie.availableSeats.map((seat, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="checkbox"
                        value={seat}
                        checked={selectedSeats.includes(seat)}
                        onChange={() => handleSeatChange(seat)}
                      />
                      {seat}
                    </label>
                  </div>
                ))}
              </div>
            </details>
          </div>
          <h4>Continue to Checkout</h4>
          <p>Selected Showtime: {selectedShowtime}</p>
          <p>Number of Seats Selected: {selectedSeats.length}</p>
          <button onClick={handleBooking} disabled={selectedSeats.length === 0 || !selectedShowtime}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default BookMovie;


