import './App.css';
import React from 'react'; 
import MovieCard from './components/MovieCard'; 
import { useEffect } from 'react';
import { useState } from 'react';


const App = () => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
      fetch('http://localhost:3001/movies')
      .then((res) => res.json())
      .then(data => setMovieData(data.rows))
      .catch(err => console.log(err));        
  }, []);

  if (!movieData || movieData.length === 0) {
      return <div>Loading...</div>;
    } 
    console.log(movieData);
  return (
    <div className="app">
      <h1>Hawk Tuah Movies</h1>


     <div className="container">
        {movieData.map((movie) => (
          <MovieCard movie = {movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
