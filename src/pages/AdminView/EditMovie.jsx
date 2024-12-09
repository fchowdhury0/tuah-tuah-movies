import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import SeatingChart from '../../components/Seating/SeatingChart';

const EditMovie = () => {
  const { id } = useParams();
  const location = useLocation();
  const { currentMovie } = location.state || {};
  console.log("current movie: " + currentMovie)
  const [movie] = useState({
    title: currentMovie.title,
    showtimes: ['12:00 PM', '2:30 PM', '5:00 PM', '7:30 PM'],
    availableSeats: Array.from({ length: 50 }, (_, i) => `Seat ${i + 1}`),
  });
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };
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
    console.log(selectedSeats)
  };

  return (
    <div>
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
                <button className="showtime-button" onClick={() => setSelectedShowtime(time)}>{time}</button>

              </li>
            ))}
          </ul>
          <h3>Select Seats:</h3>
          <div style={{ margin: '10px 0' }}>
              <h5> Screen </h5>
              <div className="seating-container">
              <SeatingChart selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
              </div>
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

export default EditMovie;


