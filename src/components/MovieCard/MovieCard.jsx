import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import React, { useState } from "react";
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const toggleButton = () => {
    setShowButton(!showButton)
  }

  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };

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
        <div className="trailer-overlay" onClick={toggleTrailer}>
          <div className="trailer-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="560"
              height="315"
              src={movie.trailerUrl}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button className="close-trailer" onClick={toggleTrailer}>Close</button>
          </div>
        </div>
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
