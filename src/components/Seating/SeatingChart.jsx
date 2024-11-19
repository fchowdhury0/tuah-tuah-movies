import './SeatingChart.scss'
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const seatingArray = [
  ['A1', 'A2', 'A3'],
  ['B1', 'B2', 'B3']
];
const SeatingChart = ({ selectedSeats, setSelectedSeats }) => {
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
      {seatingArray.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((seat, seatIndex) => (
            <button
              key={seatIndex}
              className={`seat${selectedSeats.includes(seat) ? '-selected' : ''}`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat}
            </button>

          ))}
        </div>
      ))}
    </div>
  )

}

export default SeatingChart