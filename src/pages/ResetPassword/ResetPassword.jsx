// src/pages/ResetPassword/ResetPassword.jsx

import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResetPassword.scss';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/reset-password',
        null,
        {
          params: {
            token: token,
            newPassword: newPassword
          }
        }
      );
      setMessage('Your password has been reset successfully.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h2 className="reset-password-title">Reset Password</h2>
        <form onSubmit={handleSubmit} className="reset-password-form" noValidate>
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">New Password:</label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              className={`form-input ${error ? 'input-error' : ''}`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter your new password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm New Password:</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className={`form-input ${error ? 'input-error' : ''}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your new password"
            />
          </div>

          {message && <div className="success-message" role="alert">{message}</div>}
          {error && <div className="error-message" role="alert">{error}</div>}

          <button 
            type="submit" 
            className="submit-button" 
            disabled={isSubmitting || !newPassword || !confirmPassword}
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        <button 
          onClick={() => navigate('/login')}
          className="back-login-button"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;