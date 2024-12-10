import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ManagePrices.scss';

const ManagePrices = () => {
  const [prices, setPrices] = useState({
    adult: '',
    child: '',
    senior: '',
  });

  useEffect(() => {
    axios.get('/api/admin/prices')
      .then(response => setPrices(response.data))
      .catch(error => console.error('Error fetching prices:', error));
  }, []);

  const handleChange = (e) => {
    setPrices({
      ...prices,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/admin/prices', prices)
      .then(() => alert('Prices updated successfully'))
      .catch(error => {
        console.error('Error updating prices:', error);
        alert('Failed to update prices');
      });
  };

  return (
    <div className="manage-prices">
      <h2>Manage Ticket Prices</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Adult Ticket Price:</label>
          <input type="number" name="adult" value={prices.adult} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Child Ticket Price:</label>
          <input type="number" name="child" value={prices.child} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Senior Ticket Price:</label>
          <input type="number" name="senior" value={prices.senior} onChange={handleChange} required />
        </div>
        <button type="submit">Update Prices</button>
      </form>
    </div>
  );
};

export default ManagePrices;