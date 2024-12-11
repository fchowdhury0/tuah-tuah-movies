import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import NavBar from '../../../../components/NavBar/NavBar.jsx';
import { useFormik } from 'formik';
import './ManageMovies.scss';
import SeatingChart from '../../../../components/Seating/SeatingChart.jsx';


const EditMovie = () => {
  const location = useLocation();
  const { currentMovie } = location.state || {};

  const [show, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (currentMovie && currentMovie.id) {
      fetchShows();
    }
    console.log('Shows data:', show); // Log the data to verify
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
        const filteredShows = data.filter(show => show.movieId === currentMovie.id);
        console.log('current movieId: ' + currentMovie.id)
        setShows(filteredShows);
        setLoading(false);
        console.log('Shows data:', show); // Log the data to verify
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchSeats = (show) => {
    fetch(`http://localhost:8080/api/show-seats/${show.showId}`)
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
        setSeats(data)
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    console.log("seats: " + JSON.stringify(seats, null, 2))
  }

  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());
  const [showTime, setShowTimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log("selectedDate: " + selectedDate)
    console.log("show.showDate: " + show[0].showDate)
    const filteredShowTimes = show
      .filter(show => show.movieId === currentMovie.id);
    const refilteredShowTimes = filteredShowTimes
      .filter(show => new Date(show.showDate).toLocaleDateString() === date)
    setShowTimes(refilteredShowTimes)
    setSelectedShowtime(''); // Reset showtime when date changes
    console.log("showtimes: " + JSON.stringify(refilteredShowTimes, null, 2))
  };

  const handleSelectShowTime = (show) => {
    setSelectedShowtime(show.showTime)
    fetchSeats(show)
  }

  const handleBooking = () => {
    const seatCount = selectedSeats.length;
    navigate('/ordertickets', {
      state: {
        seatCount,
        selectedSeats,
        selectedDate,
        selectedShowtime
      }
    });
  };
  let uniqueDates = [...new Set(show.map(show => new Date(show.showDate).toLocaleDateString()))];
  uniqueDates = uniqueDates.reverse()
  console.log(uniqueDates)

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

          <h2>Available Showtimes</h2>
          <ul className="showtime-list">
            {showTime.map((show, index) => (
              <li key={index}>
                <button
                  className={`showtime-button ${selectedShowtime === show.showTime ? 'active' : ''}`}
                  onClick={() => handleSelectShowTime(show)}
                >
                  {new Date(show.showTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </button>
              </li>
            ))}
          </ul>
          {selectedShowtime !== '' && (
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
        </div>
      </div>
    </div>
  );
};

export default EditMovie;


