import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ManageFees.scss';

const ManageFees = () => {
  const [bookingFee, setBookingFee] = useState('');

  useEffect(() => {
    axios.get('/api/admin/booking-fee')
      .then(response => setBookingFee(response.data.fee))
      .catch(error => console.error('Error fetching booking fee:', error));
  }, []);

  const handleChange = (e) => {
    setBookingFee(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/admin/booking-fee', { fee: bookingFee })
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
          <input type="number" value={bookingFee} onChange={handleChange} required />
        </div>
        <button type="submit">Update Booking Fee</button>
      </form>
    </div>
  );
};

export default ManageFees;