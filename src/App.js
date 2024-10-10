import React, { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';


const App = () => {
  const [movieData, setMovieData] = useState([]);
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
