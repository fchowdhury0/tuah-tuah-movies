import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Make sure to import jwtDecode
import './Login.scss';

const Login = () => {
  const [userStatus, setUserStatus] = useState({
    status: false
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    userId: null,
    username: "",
    passwordHash: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    status: false,
    isSubscribed: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Construct the payload
      const payload = { username, password };

      // Send POST request to /api/auth/login
      const response = await axios.post('http://localhost:8080/api/auth/login', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Extract JWT token from response
      const { jwt } = response.data;
      console.log(jwt);

      // Store JWT token
      const tokenData = jwtDecode(jwt);
      if (rememberMe) {
        localStorage.setItem('token', JSON.stringify(tokenData));
      } else {
        sessionStorage.setItem('token', JSON.stringify(tokenData));
      }


      //GET user information with username
      try {
        setUsername(JSON.parse(sessionStorage.getItem('token')))
        console.log("username: " + username)
        const result = await axios.get(`http://localhost:8080/api/user?username=${encodeURIComponent(username)}`);
        setUser(result.data);
        console.log(user)
        setUser({
          status: true
        })
        console.log("user: " + JSON.stringify(user))
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }

      //PUT user status into user info
      try {
        const response = await axios.put(`http://localhost:8080/api/user/${user.userId}`, user, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('User updated successfully:', response.data);
        setLoading(false)
      } catch (error) {
        console.error('Error updating user:', error);
      }


      // Navigate to home or protected routeif
      if (!loading) {
        navigate('/');
      }
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else if (err.request) {
        // Request was made but no response received
        setError('No response from server. Please try again later.');
      } else {
        // Something else happened
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };


  const handleCheck = () => {
    setRememberMe((prev) => !prev);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              className={`form-input ${error ? 'input-error' : ''}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              className={`form-input ${error ? 'input-error' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleCheck}
              />
              Remember Me
            </label>
          </div>

          {/* Error Message */}
          {error && <div className="error-message" role="alert">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting || !username || !password}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>

          {/* Register Link */}
          <div className="register-link">
            Don't have an account? <Link style={{ color: "#6299c3" }} to="/register">Register Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
