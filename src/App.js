import './App.css';
import React from 'react';
import MovieCard from './components/MovieCard';
import { useEffect } from 'react';
import { useState } from 'react';
import SearchIcon from './components/search.svg';

const App = () => {
  const [movieData, setMovieData] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const DATABASE_URL = 'http://localhost:3001/movies';

  useEffect(() => {
    fetch(DATABASE_URL)
      .then((res) => res.json())
      .then(data => setMovieData(data.rows))
      .catch(err => console.log(err));
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
