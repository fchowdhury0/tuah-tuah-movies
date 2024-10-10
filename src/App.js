import { default as React, default as React, useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import SearchIcon from './components/search.svg';

const App = () => {
  const [movieData, setMovieData] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const DATABASE_URL = 'http://localhost:3001/movies';

  useEffect(() => {
    fetch('http://localhost:8081/api/movies')
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log('Fetched data:', data);
        setMovieData(data.rows || data); // Adjust based on response structure
    })
    .catch(err => {
        console.error('Fetch error:', err);
    });
  }, []);
  console.log(movieData)

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    filterMovies(value);
    console.log(searchTerm)
    console.log(filterMovies(value))
  }

  const filterMovies = (searchTerm) => {
    const filteredMovies = movieData.filter((movie) =>
      movie.title.includes(searchTerm)
    );
    setMovieData(filteredMovies)
  }

  if (!movieData || movieData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <h1>Hawk Tuah Movies</h1>

      <div className="search">
        <input
          placeholder="Search for a movie"
          value = {searchTerm}
          onChange={(e) =>             
            setSearchTerm(e.target.value)
          }
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick = {handleInputChange}
        />
      </div>

      
      <div className="container">
        {movieData.map((movie) => (
          <MovieCard 
          movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
