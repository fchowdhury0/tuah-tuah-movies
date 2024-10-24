import axios from 'axios';
import React, { useState } from 'react';
import './ForgotPassword.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      setMessage(response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="forgot-password-form" noValidate>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Registered Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              className={`form-input ${error ? 'input-error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your registered email"
            />
          </div>

          {message && <div className="success-message" role="alert">{message}</div>}
          {error && <div className="error-message" role="alert">{error}</div>}

          <button type="submit" className="submit-button" disabled={isSubmitting || !email}>
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;