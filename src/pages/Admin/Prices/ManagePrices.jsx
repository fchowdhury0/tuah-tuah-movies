import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import './ManagePrices.scss';

const API_BASE_URL = 'http://localhost:8080';

const ManagePrices = () => {
  const { auth } = useContext(AuthContext);
  const [prices, setPrices] = useState({
    adult: '',
    child: '',
    senior: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure we have a token before making the request
    if (!auth.loading && auth.token) {
      axios.get(`${API_BASE_URL}/api/tickets/prices`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      })
        .then(response => {
          setPrices(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching prices:', error);
          setError('Failed to fetch prices. Please check your credentials.');
          setLoading(false);
        });
    } else if (!auth.loading && !auth.token) {
      // If no token is present, handle it (e.g., redirect or show an error)
      setError('You must be logged in to view prices.');
      setLoading(false);
    }
  }, [auth]); // Rerun if auth changes

  const handleChange = (e) => {
    setPrices({
      ...prices,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!auth.token) {
      setError('You must be logged in to update prices.');
      return;
    }

    axios.post(`${API_BASE_URL}/api/tickets/prices`, prices, {
      headers: {
        'Authorization': `Bearer ${auth.token}`, // Use token from auth
      },
    })
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

  if (auth.loading || loading) {
    return <div>Loading current prices...</div>;
  }

  return (
    <div className="manage-prices">
      <h2>Manage Ticket Prices</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="current-prices">
        <h3>Current Prices</h3>
        <p><strong>Adult:</strong> ${prices.adult}</p>
        <p><strong>Child:</strong> ${prices.child}</p>
        <p><strong>Senior:</strong> ${prices.senior}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="adult">Adult Ticket Price:</label>
          <input 
            type="number" 
            id="adult"
            name="adult" 
            value={prices.adult} 
            onChange={handleChange} 
            required 
            min="0" 
            step="0.01"
            placeholder="Enter adult ticket price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="child">Child Ticket Price:</label>
          <input 
            type="number" 
            id="child"
            name="child" 
            value={prices.child} 
            onChange={handleChange} 
            required 
            min="0" 
            step="0.01"
            placeholder="Enter child ticket price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="senior">Senior Ticket Price:</label>
          <input 
            type="number" 
            id="senior"
            name="senior" 
            value={prices.senior} 
            onChange={handleChange} 
            required 
            min="0" 
            step="0.01"
            placeholder="Enter senior ticket price"
          />
        </div>
        <button type="submit">Update Prices</button>
      </form>
    </div>
  );
};

export default ManagePrices;