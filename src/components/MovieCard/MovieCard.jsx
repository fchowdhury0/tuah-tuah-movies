// src/components/MovieCard/MovieCard.jsx
import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import convertYouTubeUrl from '../../utils/convertYouTubeUrl'; // Adjust the path as necessary
import TrailerModal from '../TrailerModal/TrailerModal.jsx'; // Adjust the path as necessary
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const navigate = useNavigate();

  const handleBookMovie = () => {
    navigate(`/bookmovies/${movie.id}`, { state: { currentMovie: movie} });
  };

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

      <div className="movie-poster">
        <img src={movie.posterUrl} alt={`${movie.title} Poster`} />
        <div className="movie-buttons">
          {movie.status === "Currently Running" && (
            <button className="book-button" onClick={handleBookMovie}>Book Now</button>
          )}
          <button className="watch-trailer" onClick={toggleTrailer}>Watch Trailer</button>
        </div>
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
