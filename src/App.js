import React, { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
    fetch(`http://localhost:8081/api/movies/search?title=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movies: {error}</div>;
  }

  // Separate movies based on status
  const currentlyRunning = movies.filter(movie => movie.status === 'Currently Running');
  const comingSoon = movies.filter(movie => movie.status === 'Coming Soon');

  return (
    <div className="app">
      <h1>Hawk Tuah Movies</h1>

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

      <button className="login-button">Login</button>

      <section>
        <h2>Currently Running</h2>
        <div className="container">
          {currentlyRunning.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section>
        <h2>Coming Soon</h2>
        <div className="container">
          {comingSoon.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
