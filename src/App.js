import './App.css';
import React from 'react'; 
import MovieCard from './components/MovieCard'; 
import { useEffect } from 'react';
import { useState } from 'react';


const App = () => {
  const [movies, setMovies] = useState([3]);
  return (
    <div className="app">
      <h1>Movies</h1>


     <div className="container">
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
