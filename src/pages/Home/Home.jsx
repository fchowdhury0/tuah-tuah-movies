// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import MovieCard from '../../components/MovieCard/MovieCard.jsx';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    fetch('http://localhost:8081/api/movies')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      fetchMovies();
      return;
    }
    fetch(`http://localhost:8081/api/movies/search?title=${encodeURIComponent(searchTerm)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Search failed! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  if (loading) {
    return <div className="app">Loading...</div>;
  }

  if (error) {
    return <div className="app">Error loading movies: {error}</div>;
  }

  // Separate movies based on status
  const currentlyRunning = movies.filter(movie => movie.status === 'Currently Running');
  const comingSoon = movies.filter(movie => movie.status === 'Coming Soon');

  return (
    <div className="app">
      <h1>Hawk Tuah Movies</h1>

      {/* Authentication Buttons Container */}
      <div className="auth-buttons">
        <button className="login-button" onClick={handleLogin}>Login</button>
        <button className="register-button" onClick={handleRegister}>Register</button>
      </div>

      {/* Search Bar */}
      <div className="search">
        <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
          <input
            type="text"
            placeholder="Search movies by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            🔍
          </button>
        </form>
      </div>

      {/* Currently Running Movies Section */}
      <section>
        <h2>Currently Running</h2>
        <div className="container">
          {currentlyRunning.length > 0 ? (
            currentlyRunning.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div>No Currently Running movies found.</div>
          )}
        </div>
      </section>

      {/* Coming Soon Movies Section */}
      <section>
        <h2>Coming Soon</h2>
        <div className="container">
          {comingSoon.length > 0 ? (
            comingSoon.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div>No Coming Soon movies found.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;