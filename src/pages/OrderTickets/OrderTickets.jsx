import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderTickets.scss';
import NavBar from '../../components/NavBar/navbar.jsx';

const OrderTickets = () => {
    const { state } = useLocation();
    const { seatCount, selectedSeats } = state || { seatCount: 0, selectedSeats: [] };
    
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
	    if (newCount > seatCount) {
		alert(`You cannot select more than ${seatCount} tickets!`);
		return prev; // Prevent exceeding the allowed number of tickets
	    }
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
	navigate('/checkout', {state: { tickets, total, seatCount, selectedSeats}});
    };

    return (
	<div className="order-tickets" style={{ color: 'white'}}>
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
	    <h2>Total: ${total.toFixed(2)}</h2> {/* Format total to two decimal places */}
	    
	    {/* Button to proceed to checkout */}
	    <button onClick={handleOrderSubmit} disabled={total === 0}>Continue to Checkout</button>
	</div>
	
    );
};

export default OrderTickets;
