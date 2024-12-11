import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SeatingChart.scss';

const SeatingChart = ({ currentSeats, selectedSeats, setSelectedSeats }) => {
  const reservedSeats = currentSeats
    .filter(seat => seat.reservationStatus === "reserved")
    .map(seat => seat.seatId);

  console.log("currentSeats: ", currentSeats);
  console.log("reservedSeats: ", reservedSeats);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/seating');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Seats data:', data); // Log the data to verify
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received from API');
      }
      setSeats(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
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

  if (loading) {
    return <div>Loading seats...</div>;
  }

  if (error) {
    return <div style={{color: 'red'}}>Error: {error}</div>;
  }

  // Group seats by row
  const seatRows = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const rowKeys = Object.keys(seatRows).sort(); // Sort rows alphabetically if needed

  return (
    <div className="seating-chart">
      {rowKeys.map((row) => (
        <div key={row} className="row-container">
          <span className="row-label">{row}</span>
          {seatRows[row].map((seat) => (
            <button
              key={seat.seatId}
              className={`seat${selectedSeats.includes(seat) ? '-selected' : ''} ${reservedSeats.includes(seat.seatId) ? 'seat-disabled' : ''}`}
              onClick={() => handleSeatClick(seat)}
              disabled={reservedSeats.includes(seat.seatId)}
            >
              {seat.formattedSeat}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SeatingChart;
