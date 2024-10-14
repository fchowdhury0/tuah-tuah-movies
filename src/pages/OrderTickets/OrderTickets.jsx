import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderTickets.scss';

const OrderTickets = () => {
  const [tickets, setTickets] = useState({
    adult: 0,
    child: 0,
    senior: 0,
  });

    const [total, setTotal] = useState(0);
    const [movie, setMovie] = useState('');
  const ticketPrices = {
    adult: 12.0,
    child: 8.0,
    senior: 10.0,
  };

    const navigate = useNavigate();

  const handleTicketChange = (type, increment) => {
    setTickets((prev) => {
      const newCount = Math.max(0, prev[type] + increment); // Ensure no negative tickets
      const newTickets = { ...prev, [type]: newCount };
      calculateTotal(newTickets);
      return newTickets;
    });
  };

  const calculateTotal = (updatedTickets) => {
    let newTotal = 0;
    for (const type in updatedTickets) {
      newTotal += updatedTickets[type] * ticketPrices[type];
    }
    setTotal(newTotal);
  };

  const handleOrderSubmit = () => {
      console.log('Tickets ordered:', tickets);
      console.log('Total amount:', total);
      setTickets({ adult: 0, child: 0, senior: 0 });
      setTotal(0);
      navigate('/checkout', {state: {tickets, total}});
  };

  return (
      <div className="order-tickets" style={{ color: 'white'}}>
      <h1>Order Tickets</h1>
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
  );
};

export default OrderTickets;
