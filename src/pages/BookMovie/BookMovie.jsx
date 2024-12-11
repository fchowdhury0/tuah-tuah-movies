import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import SeatingChart from '../../components/Seating/SeatingChart';
import './BookMovie.scss';

const BookMovie = () => {
  const location = useLocation();
  const { currentMovie } = location.state || {};

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seats, setSeats] = useState([]);

  const [selectedDate, setSelectedDate] = useState('');
  const [filteredShowTimes, setFilteredShowTimes] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState(null); // Track selection by showId
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentMovie && currentMovie.id) {
      fetchShows();
    }
  }, [currentMovie]);

  const fetchShows = () => {
    fetch('http://localhost:8080/api/shows')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }
        // Filter shows by the current movie
        const movieShows = data.filter(show => show.movieId === currentMovie.id);
        setShows(movieShows);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchSeats = (selectedShow) => {
    fetch(`http://localhost:8080/api/show-seats/${selectedShow.showId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }
        setSeats(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Filter shows that match the chosen date
    const filtered = shows.filter(s => {
      const showTimeDate = new Date(s.showTime);
      return showTimeDate.toLocaleDateString() === date;
    });
    setFilteredShowTimes(filtered);
    setSelectedShowId(null); // Reset selection when date changes
  };

  const handleSelectShowTime = (show) => {
    setSelectedShowId(show.showId); // Store unique ID
    fetchSeats(show);
  };

  const handleBooking = () => {
    const seatCount = selectedSeats.length;
    // You may also want to pass the selected show information if needed
    const selectedShow = filteredShowTimes.find(s => s.showId === selectedShowId);
    const selectedShowtime = selectedShow ? selectedShow.showTime : '';

    navigate('/ordertickets', {
      state: {
        seatCount,
        selectedSeats,
        selectedDate,
        selectedShowtime
      }
    });
  };

  // Extract unique dates from the shows array using showTime
  let uniqueDates = [...new Set(shows.map(show => new Date(show.showTime).toLocaleDateString()))];
  // Sort the dates
  uniqueDates.sort((a, b) => new Date(a) - new Date(b));

  if (loading) {
    return <div>Loading shows...</div>;
  }

  if (error) {
    return <div style={{color: 'red'}}>Error: {error}</div>;
  }

  // Find the currently selected show's time for display
  const currentlySelectedShow = filteredShowTimes.find(s => s.showId === selectedShowId);
  const currentlySelectedShowtime = currentlySelectedShow ? new Date(currentlySelectedShow.showTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

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
            <p><strong>GENRE:</strong> {currentMovie.category}</p>
          </div>
        </div>
        <div className="showtimes">
          <h1>{currentMovie.title}</h1>

          <div className="date-selector">
            <h2>Select Date</h2>
            <div className="date-buttons">
              {uniqueDates.map((date) => (
                <button
                  key={date}
                  className={`date-button ${selectedDate === date ? 'active' : ''}`}
                  onClick={() => handleDateSelect(date)}
                >
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <>
              <h2>Available Showtimes for {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric'
              })}</h2>
              <ul className="showtime-list">
                {filteredShowTimes.map((show) => (
                  <li key={show.showId}>
                    <button
                      className={`showtime-button ${selectedShowId === show.showId ? 'active' : ''}`}
                      onClick={() => handleSelectShowTime(show)}
                    >
                      {new Date(show.showTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {selectedShowId && (
            <>
              <h3>Select Seats:</h3>
              <div className="seating-section">
                <h5>Screen</h5>
                <div className="seating-container">
                  <SeatingChart
                    currentSeats={seats}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                  />
                </div>
              </div>
            </>
          )}

          <div className="booking-summary">
            <h4>Booking Summary</h4>
            <p>Selected Date: {selectedDate || 'None'}</p>
            <p>Selected Showtime: {currentlySelectedShowtime || 'None'}</p>
            <p>Number of Seats Selected: {selectedSeats.length}</p>
            <button
              className="continue-button"
              onClick={handleBooking}
              disabled={selectedSeats.length === 0 || !selectedShowId}
            >
              Continue to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMovie;
