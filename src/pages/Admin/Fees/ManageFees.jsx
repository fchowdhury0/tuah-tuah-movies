import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ManageFees.scss';

const API_BASE_URL = 'http://localhost:8080';

const ManageFees = () => {
  const [bookingFee, setBookingFee] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/admin/booking-fee`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` }
    })
      .then(response => {
        // response.data.fee should be a number
        setBookingFee(response.data.fee.toString()); // Store as string in state
      })
      .catch(error => console.error('Error fetching booking fee:', error));
  }, []);

  const handleChange = (e) => {
    setBookingFee(e.target.value); // still a string
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feeNumber = parseFloat(bookingFee); // Convert to number before POST
    axios.post(`${API_BASE_URL}/api/admin/booking-fee`, { fee: feeNumber }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}` }
    })
      .then(() => alert('Booking fee updated successfully'))
      .catch(error => {
        console.error('Error updating booking fee:', error);
        alert('Failed to update booking fee');
      });
  };

  return (
    <div className="manage-fees">
      <h2>Manage Online Booking Fee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Booking Fee:</label>
          <input 
            type="number" 
            value={bookingFee}
            onChange={handleChange} 
            step="0.01"
            required 
          />
        </div>
        <button type="submit">Update Booking Fee</button>
      </form>
    </div>
  );
};

export default ManageFees;
