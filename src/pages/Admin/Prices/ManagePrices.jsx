// src/components/ManagePrices.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ManagePrices.scss';

const API_BASE_URL = 'http://localhost:8080';

const ManagePrices = () => {
  const [prices, setPrices] = useState([]);
  const [formPrices, setFormPrices] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/tickets/pricing`)
      .then(response => {
        console.log('Fetched Prices:', response.data); // Debugging line
        setPrices(response.data);
        const initialForm = {};
        response.data.forEach(price => {
          initialForm[price.category] = price.basePrice;
        });
        setFormPrices(initialForm);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching prices:', error);
        setError('Failed to fetch prices.');
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormPrices({
      ...formPrices,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatePromises = prices.map(price => {
      if (price.id === undefined || price.id === null) {
        console.error(`Missing id for category: ${price.category}`);
        return Promise.reject(new Error(`Missing id for category: ${price.category}`));
      }

      return axios.put(`${API_BASE_URL}/api/tickets/pricing/${price.id}`, {
        basePrice: parseFloat(formPrices[price.category]),
        effectiveDate: price.effectiveDate,
        isActive: price.isActive,
      });
    });

    Promise.all(updatePromises)
      .then(() => {
        setSuccess('Prices updated successfully');
        setError(null);
      })
      .catch(error => {
        console.error('Error updating prices:', error);
        setError('Failed to update prices. Please try again.');
        setSuccess(null);
      });
  };

  if (loading) {
    return <div>Loading current prices...</div>;
  }

  return (
    <div className="manage-prices">
      <h2>Manage Ticket Prices</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="current-prices">
        <h3>Current Prices</h3>
        {prices.map(price => (
          <p key={price.id}><strong>{price.category}:</strong> ${price.basePrice}</p>
        ))}
      </div>

      {/* Debugging Section: Display fetched prices
      <pre>{JSON.stringify(prices, null, 2)}</pre> */}

      <form onSubmit={handleSubmit}>
        {prices.map(price => (
          <div className="form-group" key={price.id}>
            <label htmlFor={price.category}>{price.category} Ticket Price:</label>
            <input 
              type="number" 
              id={price.category}
              name={price.category} 
              value={formPrices[price.category]} 
              onChange={handleChange} 
              required 
              min="0" 
              step="0.01"
              placeholder={`Enter ${price.category.toLowerCase()} ticket price`}
            />
          </div>
        ))}
        <button type="submit">Update Prices</button>
      </form>
    </div>
  );
};

export default ManagePrices;