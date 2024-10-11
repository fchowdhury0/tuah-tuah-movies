import React, { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';

const App = () => {
  return(
  <div className="app">
    <div style={{ boxShadow: "0px 13px 10px -7px rgba(0, 0, 0, 0.1)" }} className="add-movie">
      <button className="" >Add Movie</button>
    </div>
  </div>

  );
};

export default App;