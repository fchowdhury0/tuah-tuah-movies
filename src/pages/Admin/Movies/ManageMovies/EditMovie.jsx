import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import NavBar from '../../../../components/NavBar/NavBar.jsx';
import { useFormik } from 'formik';
import './ManageMovies.scss';
import SeatingChart from '../../../../components/Seating/SeatingChart.jsx';


const EditMovie = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      poster: '',
      synopsis: '',
      genre: '',
      cast: '',
      director: '',
    }
  })

  const [newShowtime, setNewShowtime] = useState('');
  const [newShowDate, setNewShowDate] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  function showAddComponent() {
    setShowAdd(!showAdd)
  }
  const { id } = useParams();
  const location = useLocation();
  const { currentMovie } = location.state || {};
  console.log("current movie: " + currentMovie)
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
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const navigate = useNavigate();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedShowtime(''); // Reset showtime when date changes
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
            <p><strong>RATING:</strong>{currentMovie.ratingcode}</p>
          </div>
        </div>
        <div className="showtimes">
          <h1>{currentMovie.title}</h1>

          <div className="date-selector">
            <h2>Select Date</h2>
            <div className="date-buttons">
              {movie.dates.map((date) => (
                <button
                  key={date.toLocaleDateString()}
                  className={`date-button ${selectedDate === date.toLocaleDateString() ? 'active' : ''}`}
                  onClick={() => handleDateSelect(date.toLocaleDateString())}
                >
                  {date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </button>
              ))}
            </div>
            <button className="add-button" onClick={showAddComponent}>Add Show Date</button>
            {showAdd && (
              <div className="form-group">
                <form>
                  <select 
                    value={newShowDate}
                    >
                      <option value="10:00 PM">10:00 PM</option>
                  </select>
                  <button type="submit">Submit</button>
                </form>
              </div>
            )}
          </div>

          <h2>Available Showtimes</h2>
          <ul className="showtime-list">
            {movie.showtimesByDate[selectedDate]?.map((time, index) => (
              <li key={index}>
                <button
                  className={`showtime-button ${selectedShowtime === time ? 'active' : ''}`}
                  onClick={() => setSelectedShowtime(time)}
                >
                  {time}
                </button>
              </li>
            ))}
          </ul>
          <button className="add-button">Add Showtime</button>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;


