import React, { useEffect, useState } from 'react';
import './GenreFilter.scss'

const GenreFilter = ({ selectedGenre, handleGenreSearch }) => {

  const genreOptions = ['Action', 'Adventure', 'Crime', 'Drama', 
    'Fantasy', 'Horror', 'Thriller', 'Sci-Fi'];


  return (
    <div className="genre-filter">
      {genreOptions.map((genre => (
          <button onClick={() => handleGenreSearch(genre)} className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}>
            {genre}
          </button>
      )))}
    </div>
  )
  


};
export default GenreFilter;
