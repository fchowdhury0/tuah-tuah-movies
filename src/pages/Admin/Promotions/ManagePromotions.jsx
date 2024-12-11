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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newPromotion, setNewPromotion] = useState({
    promoCode: '',
    startDate: '',
    expDate: '',
    description: '',
    isActive: true,
    sendEmail: false,
    emailSubject: '',
    emailMessage: ''
  });

  useEffect(() => {
    if (auth.token) {
      fetchPromotions();
    }
  }, [auth.token]);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/promotions`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        }
      });
      setPromotions(response.data);
    } catch (err) {
      setError('Failed to load promotions');
      console.error('Error fetching promotions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPromotion(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateDates = () => {
    const start = new Date(newPromotion.startDate);
    const end = new Date(newPromotion.expDate);
    if (end <= start) {
      setError('Expiry date must be after start date');
      return false;
    }
    return true;
  };

  const handleAddPromotion = async (e) => {
    e.preventDefault();
    if (!auth.token) {
      setError('You must be logged in to add promotions');
      return;
    }

    if (!validateDates()) {
      return;
    }

    setSubmitting(true);
    setError(null);
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/promotions`, 
        newPromotion,
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (newPromotion.sendEmail) {
        await axios.post(
          `${API_BASE_URL}/api/promotions/send-emails`,
          {
            promotionId: response.data.promoId,
            emailSubject: newPromotion.emailSubject,
            emailMessage: newPromotion.emailMessage
          },
          {
            headers: {
              'Authorization': `Bearer ${auth.token}`,
              'Content-Type': 'application/json'
            }
          }
        );
      }

      setSuccess('Promotion created successfully');
      setNewPromotion({
        promoCode: '',
        startDate: '',
        expDate: '',
        description: '',
        isActive: true,
        sendEmail: false,
        emailSubject: '',
        emailMessage: ''
      });
      fetchPromotions();
    } catch (err) {
      setError('Failed to create promotion');
      console.error('Error creating promotion:', err);
    } finally {
      setSubmitting(false);
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
            min={new Date().toISOString().split('T')[0]}
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
            min={newPromotion.startDate || new Date().toISOString().split('T')[0]}
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

        <div className="form-group">
          <label>
            <input 
              type="checkbox" 
              name="sendEmail" 
              checked={newPromotion.sendEmail} 
              onChange={handleChange}
            />
            Send Email to Subscribed Users
          </label>
        </div>

        {newPromotion.sendEmail && (
          <>
            <div className="form-group">
              <label>Email Subject:</label>
              <input 
                type="text" 
                name="emailSubject" 
                value={newPromotion.emailSubject} 
                onChange={handleChange} 
                required
              />
            </div>
            <div className="form-group">
              <label>Email Message:</label>
              <textarea 
                name="emailMessage" 
                value={newPromotion.emailMessage} 
                onChange={handleChange} 
                required
                rows="4"
              />
            </div>
          </>
        )}

        <button 
          type="submit" 
          className="submit-button" 
          disabled={submitting}
        >
          {submitting ? 'Adding...' : 'Add Promotion'}
        </button>
      </form>

      <div className="promotions-list">
        <h3>Existing Promotions</h3>
        {promotions.length > 0 ? (
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
        ) : (
          <p>No promotions found</p>
        )}
      </div>
    </div>
  );
};

export default ManagePromotions;