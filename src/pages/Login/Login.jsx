import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure correct import
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import './Login.scss';

const Login = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    setLoading(true);

    try {
      const payload = { username: usernameInput, password };
      const response = await axios.post('http://localhost:8080/api/auth/login', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { jwt } = response.data;
      console.log("JWT token:", jwt);

      if (jwt) {
        // Store JWT token
        if (rememberMe) {
          localStorage.setItem('token', jwt);
        } else {
          sessionStorage.setItem('token', jwt);
        }

        // Decode the token
        const decoded = jwtDecode(jwt);
        console.log("Decoded token:", decoded);

        // Check role - ensure the role is included in the token claims
        // If your backend sets `role` in lowercase:
        const userRole = decoded.role ? decoded.role.toLowerCase() : null;

        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        setError('Token not found in response.');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else if (err.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleCheck = () => {
    setRememberMe((prev) => !prev);
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="login-page">
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username:</label>
              <input
                id="username"
                type="text"
                name="username"
                className={`form-input ${error ? 'input-error' : ''}`}
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>

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

            {error && <div className="error-message" role="alert">{error}</div>}

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting || !usernameInput || !password}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <div className="forgot-password">
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>

            <div className="register-link">
              Don't have an account? <Link style={{ color: "#6299c3" }} to="/register">Register Here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
