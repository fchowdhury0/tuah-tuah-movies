import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard.jsx';
import NavBar from '../../components/NavBar/NavBar.jsx';
import GenreFilter from '../../components/GenreFilter/GenreFilter'
import './Home.scss';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [selectedGenre, setSelectedGenre] = useState('')

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    fetch('http://localhost:8080/api/movies')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Movies data:', data); // Log the data to verify
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

  const handleGenreSearch = (genre) => {
    setSearchTerm('')
    setSelectedGenre(genre)
    
    if (selectedGenre === genre) {
      setSelectedGenre('')
      genre = ''
    }
    
    if (genre === '') {
      // If the search term is empty, fetch all movies
      setLoading(true); // Set loading to true before fetching
      fetchMovies();
      return;
    } else {

    // Set loading to true when initiating a search
    setLoading(true);

    // Update the API endpoint to use the correct port (8080)
    fetch(`http://localhost:8080/api/movies/genre?category=${genre}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Search failed! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Search results:', data); // Log the search results
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
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();

    // Trim the search term to remove unnecessary whitespace
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === '') {
      // If the search term is empty, fetch all movies
      setLoading(true); // Set loading to true before fetching
      fetchMovies();
      return;
    }

    // Set loading to true when initiating a search
    setLoading(true);

    // Update the API endpoint to use the correct port (8080)
    fetch(`http://localhost:8080/api/movies/search?title=${encodeURIComponent(trimmedSearchTerm)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Search failed! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Search results:', data); // Log the search results
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
    <div>
      <NavBar />
      <div className="app">
        {/* Search Bar */}
        <div className="search">
          <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
            <input
              type="text"
              placeholder="Search movies by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" type="submit">
              🔍
            </button>
          </form>
        </div>
        <div className="filter-container">
          <h4>Filter by Genre:</h4>
          <GenreFilter
            selectedGenre={selectedGenre}
            handleGenreSearch={handleGenreSearch}
          />
        </div>

        {/* Currently Running Movies Section */}
        <section>
          <h2>Currently Running</h2>
          <div className="container">
            {currentlyRunning.length > 0 ? (
              currentlyRunning.map((movie) => (
                <MovieCard isAdmin={false} key={movie.id} movie={movie} />
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
                <MovieCard isAdmin={false} key={movie.id} movie={movie} />
              ))
            ) : (
              <div>No Coming Soon movies found.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
