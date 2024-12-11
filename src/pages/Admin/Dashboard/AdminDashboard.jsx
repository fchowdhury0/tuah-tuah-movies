// src/pages/Admin/Dashboard/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import

import './AdminDashboard.scss';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  const [stats, setStats] = useState({
    totalMovies: 0,
    activeMovies: 0,
    totalUsers: 0,
    activePromotions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchStats = async () => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    };

    try {
      setLoading(true);
      setError(null);
      
      // Fetch all movies
      const moviesResponse = await fetch('http://localhost:8080/api/movies', fetchOptions);
      if (!moviesResponse.ok) throw new Error(`Movies API error: ${moviesResponse.statusText}`);
      const movies = await moviesResponse.json();
      
      // Fetch active movies
      const activeMoviesResponse = await fetch(
        'http://localhost:8080/api/movies/status/Currently Running', 
        fetchOptions
      );
      if (!activeMoviesResponse.ok) throw new Error(`Active movies API error: ${activeMoviesResponse.statusText}`);
      const activeMovies = await activeMoviesResponse.json();
      
      // Updated users endpoint to match UserController path
      const usersResponse = await fetch('http://localhost:8080/api/user/all', fetchOptions);
      if (!usersResponse.ok) {
        console.error('Users API error status:', usersResponse.status);
        throw new Error(`Users API error: ${usersResponse.statusText}`);
      }
      const users = await usersResponse.json();
      console.log('Users response:', users); // Debug log

      setStats({
        totalMovies: Array.isArray(movies) ? movies.length : 0,
        activeMovies: Array.isArray(activeMovies) ? activeMovies.length : 0,
        totalUsers: Array.isArray(users) ? users.length : 0,
        activePromotions: 0,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message || 'Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button className="retry-button" onClick={handleRetry}>
            Retry Load
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="stats-grid">
        <div className="stats-card">
          <h3>Total Movies</h3>
          <div className="stats-value">{stats.totalMovies}</div>
        </div>
        <div className="stats-card">
          <h3>Active Movies</h3>
          <div className="stats-value">{stats.activeMovies}</div>
        </div>
        <div className="stats-card">
          <h3>Total Users</h3>
          <div className="stats-value">{stats.totalUsers}</div>
        </div>
        <div className="stats-card">
          <h3>Active Promotions</h3>
          <div className="stats-value">{stats.activePromotions}</div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn add-movie" onClick={() => navigate('/admin/managemovies')}>
            Manage Movies
          </button>
          <button className="action-btn schedule" onClick={() => navigate('/admin/schedulemovie')}>
            Schedule Movie
          </button>
          <button className="action-btn promotion" onClick={() => navigate('/admin/managepromotions')}>
            Manage Promotions
          </button>
          <button className="action-btn prices" onClick={() => navigate('/admin/manageprices')}>
            Manage Prices
          </button>
          <button className="action-btn fees" onClick={() => navigate('/admin/managefees')}>
            Manage Booking Fees
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;