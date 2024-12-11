import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import SeatingChart from '../../components/Seating/SeatingChart';
import './BookMovie.scss';

const BookMovie = () => {
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


  // Generate next 7 days for date selection
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const [movie] = useState({
    title: currentMovie.title,
    dates: generateDates(),
    showtimesByDate: {
      // Example showtimes for each date
      [new Date().toLocaleDateString()]: ['12:00 PM', '2:30 PM', '5:00 PM', '7:30 PM'],
      [new Date(Date.now() + 86400000).toLocaleDateString()]: ['1:00 PM', '3:30 PM', '6:00 PM', '8:30 PM'],
      // Add more dates as needed
    },
    availableSeats: Array.from({ length: 50 }, (_, i) => `Seat ${i + 1}`),
  });

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

  const handleSeatChange = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

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
  const uniqueDates = [...new Set(show.map(show => new Date(show.showDate).toLocaleDateString()))];
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

          <div className="booking-summary">
            <h4>Booking Summary</h4>
            <p>Selected Date: {selectedDate}</p>
            <p>Selected Showtime: {selectedShowtime}</p>
            <p>Number of Seats Selected: {selectedSeats.length}</p>
            <button
              className="continue-button"
              onClick={handleBooking}
              disabled={selectedSeats.length === 0 || !selectedShowtime}
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