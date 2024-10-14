// src/components/MovieCard/MovieCard.jsx
import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import convertYouTubeUrl from '../../utils/convertYouTubeUrl'; // Adjust the path as necessary
import TrailerModal from '../TrailerModal/TrailerModal.jsx'; // Adjust the path as necessary
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const toggleButton = () => {
    setShowButton(!showButton)
  }

  const toggleTrailer = () => {
    setShowTrailer((prev) => !prev);
  };

  // Convert the trailer URL to embed format
  const embedTrailerUrl = convertYouTubeUrl(movie.trailerUrl);

  return (
    <div className="movie">
      <div className="movie-title">
        <p>{movie.title}</p>
      </div>

      <div className="movie-poster" onClick={toggleTrailer}>
        <img src={movie.posterUrl} alt={`${movie.title} Poster`} />
      </div>

      <div className="movie-info">
        <span>{movie.status}</span>
        <h3>{movie.title}</h3>
        {movie.status === 'Currently Running' && (
          <Link to="/bookmovie" className="book-button">Book Movie</Link>
        )}
      </div>

      {showTrailer && (
        <TrailerModal
          trailerUrl={embedTrailerUrl}
          title={movie.title}
          onClose={toggleTrailer}
        />
      )}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    trailerUrl: PropTypes.string.isRequired,
    // Add other movie properties as needed
  }).isRequired,
};

export default MovieCard;
