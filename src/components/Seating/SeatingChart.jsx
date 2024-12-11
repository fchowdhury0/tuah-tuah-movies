import './SeatingChart.scss'
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const seatingArray = [
  ['A1', 'A2', 'A3'],
  ['B1', 'B2', 'B3']
];
const SeatingChart = ({ selectedSeats, setSelectedSeats }) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [seats, setSeats] = useState([]);
  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = () => {
    fetch('http://localhost:8080/api/seating')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Seats data:', data); // Log the data to verify
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }
        setSeats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
  const location = useLocation();
  const navigate = useNavigate();

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((s) => s !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
    console.log(selectedSeats);
  };
  

  return (
    <div className="seating-chart">
      {seats.map((seat) => (
        <div key={seat}>
            <button
              className={`seat${selectedSeats.includes(seat) ? '-selected' : ''}`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat.formattedSeat}
            </button>
        </div>
      ))}
    </div>
  )

}

export default SeatingChart