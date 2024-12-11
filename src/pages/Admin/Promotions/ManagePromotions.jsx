// ManagePromotions.jsx
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import './ManagePromotions.scss';

const API_BASE_URL = 'http://localhost:8080';

const ManagePromotions = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newPromotion, setNewPromotion] = useState({
    promoCode: '',
    startDate: '',
    expDate: '',
    description: '',
    isActive: true
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.token) {
        setError('You must be logged in to access this page');
        setLoading(false);
        navigate('/login');
        return;
      }
      await fetchPromotions();
    };
    fetchData();
  }, [auth.token, navigate]);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/promotions`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        }
      });
      setPromotions(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching promotions:', err);
      setError('Failed to load promotions');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewPromotion({
      ...newPromotion,
      [e.target.name]: e.target.value
    });
  };

  const handleAddPromotion = async (e) => {
    e.preventDefault();
    if (!auth.token) {
      setError('You must be logged in to add promotions');
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/api/promotions`, 
        newPromotion,
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess('Promotion created successfully');
      setError(null);
      setNewPromotion({
        promoCode: '',
        startDate: '',
        expDate: '',
        description: '',
        isActive: true
      });
      fetchPromotions();
    } catch (err) {
      console.error('Error creating promotion:', err);
      setError('Failed to create promotion');
      setSuccess(null);
    }
  };

  if (!auth.token) {
    return <div className="error-message">Please log in to continue</div>;
  }

  if (loading) return <div className="loading">Loading promotions...</div>;
  
  return (
    <div className="manage-promotions">
      <h2>Manage Promotions</h2>
      
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleAddPromotion}>
        <h3>Add New Promotion</h3>
        <div className="form-group">
          <label>Promotion Code:</label>
          <input 
            type="text" 
            name="promoCode" 
            value={newPromotion.promoCode} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Start Date:</label>
          <input 
            type="date" 
            name="startDate" 
            value={newPromotion.startDate} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Expiry Date:</label>
          <input 
            type="date" 
            name="expDate" 
            value={newPromotion.expDate} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input 
            type="text" 
            name="description" 
            value={newPromotion.description} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit" className="submit-button">Add Promotion</button>
      </form>

      <div className="promotions-list">
        <h3>Existing Promotions</h3>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Start Date</th>
              <th>Expiry Date</th>
              <th>Description</th>
              <th>Status</th>
              <th>Use Count</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map(promotion => (
              <tr key={promotion.promoId}>
                <td>{promotion.promoCode}</td>
                <td>{new Date(promotion.startDate).toLocaleDateString()}</td>
                <td>{new Date(promotion.expDate).toLocaleDateString()}</td>
                <td>{promotion.description}</td>
                <td>{promotion.isActive ? 'Active' : 'Inactive'}</td>
                <td>{promotion.useCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePromotions;