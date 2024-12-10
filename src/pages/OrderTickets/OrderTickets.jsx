import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import './OrderTickets.scss';

const API_BASE_URL = 'http://localhost:8080';

const OrderTickets = () => {
  const { state } = useLocation();
  const { seatCount, selectedSeats } = state || { seatCount: 0, selectedSeats: [] };

  const [tickets, setTickets] = useState({
    adult: 0,
    child: 0,
    senior: 0,
  });

  const [ticketPrices, setTicketPrices] = useState(null); 
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current prices from the backend
    axios.get(`${API_BASE_URL}/api/tickets/prices`)
      .then(response => {
        setTicketPrices(response.data);
      })
      .catch(err => {
        console.error('Error fetching ticket prices:', err);
        setError('Failed to load ticket prices. Please try again later.');
      });
  }, []);

  const handleTicketChange = (type, increment) => {
    setTickets((prev) => {
      const newCount = Math.max(0, prev[type] + increment); // Ensure no negative tickets
      if (newCount > seatCount) {
        alert(`You cannot select more than ${seatCount} tickets!`);
        return prev; // Prevent exceeding the allowed number of tickets
      }
      const newTickets = { ...prev, [type]: newCount };
      calculateTotal(newTickets, ticketPrices);
      return newTickets;
    });
  };

  const calculateTotal = (updatedTickets, prices) => {
    if (!prices) return; // If prices not yet loaded, do nothing
    let newTotal = 0;
    for (const type in updatedTickets) {
      newTotal += updatedTickets[type] * prices[type];
    }
    setTotal(newTotal);
  };

  const handleOrderSubmit = () => {
    console.log('Tickets ordered:', tickets);
    console.log('Total amount:', total);
    setTickets({ adult: 0, child: 0, senior: 0 });
    setTotal(0);
    navigate('/checkout', { state: { tickets, total, seatCount, selectedSeats } });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // If prices haven't loaded yet, show a loading message
  if (!ticketPrices) {
    return <div className="loading-message">Loading ticket prices...</div>;
  }

  return (
    <div className="order-tickets">
      <NavBar />
      <h1>Order Tickets</h1>
      <p>Maximum Tickets Allowed: {seatCount}</p>
      <div className="ticket-type-container">
        {Object.keys(tickets).map((type) => (
          <div key={type} className="ticket-type">
            <span>{type.charAt(0).toUpperCase() + type.slice(1)} Ticket</span>
            <div className="ticket-controls">
              <button className="calc-button" onClick={() => handleTicketChange(type, -1)}>-</button>
              <span>{tickets[type]}</span>
              <button className="calc-button" onClick={() => handleTicketChange(type, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      {/* Display the total */}
      <h2 className="total-display">Total: ${total.toFixed(2)}</h2> {/* Format total to two decimal places */}

      {/* Button to proceed to checkout */}
      <button 
        className="continue-button" 
        onClick={handleOrderSubmit} 
        disabled={total === 0}
      >
        Continue to Checkout
      </button>
      
      {/* Display success or error messages */}
      {error && <div className="error-message">{error}</div>}
      {/* Add success message handling if needed */}
    </div>
  );
};

export default OrderTickets;