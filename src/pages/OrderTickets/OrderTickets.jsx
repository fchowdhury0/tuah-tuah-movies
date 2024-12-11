import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import './OrderTickets.scss';

const API_BASE_URL = 'http://localhost:8080';

const OrderTickets = () => {
  const { state } = useLocation();
  const { seatCount, selectedSeats, selectedMovie, selectedShowtime } = state || { seatCount: 0, selectedSeats: [], selectedMovie: {}, selectedShowtime: '' };

  const [tickets, setTickets] = useState({
    Adult: 0,
    Child: 0,
    Senior: 0,
  });

  const [ticketPrices, setTicketPrices] = useState({});
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/tickets/prices`)
      .then(response => {
        const prices = {};
        response.data.forEach(price => {
          prices[price.category] = price.basePrice;
        });
        setTicketPrices(prices);
      })
      .catch(err => {
        console.error('Error fetching ticket prices:', err);
        setError('Failed to load ticket prices. Please try again later.');
      });
  }, []);

  const handleTicketChange = (type, increment) => {
    setTickets(prev => {
      const updatedCount = Math.max(0, prev[type] + increment);
      const updatedTickets = { ...prev, [type]: updatedCount };
      const totalTickets = Object.values(updatedTickets).reduce((sum, count) => sum + count, 0);

      if (totalTickets > seatCount) {
        alert(`You cannot select more than ${seatCount} tickets!`);
        return prev;
      }

      calculateTotal(updatedTickets, ticketPrices);
      return updatedTickets;
    });
  };

  const calculateTotal = (updatedTickets, prices) => {
    let newTotal = 0;
    for (const type in updatedTickets) {
      newTotal += updatedTickets[type] * (prices[type] || 0);
    }
    setTotal(newTotal);
  };

  const handleOrderSubmit = () => {
    console.log('Tickets ordered:', tickets);
    console.log('Total amount:', total);
    setTickets({ Adult: 0, Child: 0, Senior: 0 });
    setTotal(0);
    navigate('/checkout', { state: { tickets, total, seatCount, selectedSeats, selectedMovie, selectedShowtime } });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (Object.keys(ticketPrices).length === 0) {
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
            <span>{type} Ticket</span>
            <div className="ticket-controls">
              <button 
                className="calc-button" 
                onClick={() => handleTicketChange(type, -1)} 
                disabled={tickets[type] === 0}
              >
                -
              </button>
              <span>{tickets[type]}</span>
              <button 
                className="calc-button" 
                onClick={() => handleTicketChange(type, 1)} 
                disabled={Object.values(tickets).reduce((sum, count) => sum + count, 0) >= seatCount}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2 className="total-display">Total: ${total.toFixed(2)}</h2>
      <button 
        className="continue-button" 
        onClick={handleOrderSubmit} 
        disabled={total === 0}
      >
        Continue to Checkout
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default OrderTickets;