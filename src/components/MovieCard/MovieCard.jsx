import PropTypes from 'prop-types';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import convertYouTubeUrl from '../../utils/convertYouTubeUrl';
import TrailerModal from '../TrailerModal/TrailerModal.jsx';
import './MovieCard.css';

const MovieCard = ({ movie, isAdmin }) => {
  console.log("isAdmin: " + isAdmin)
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  const handleBookMovie = () => {
    navigate(`/bookmovies/${movie.id}`, { state: { currentMovie: movie } });
  };

  const handleEditMovie = () => {
    navigate(`/editmovie/${movie.id}`, { state: { currentMovie: movie } });
  };

  const toggleTrailer = () => {
    setShowTrailer((prev) => !prev);
  };

  // Safely convert the trailer URL to embed format
  const embedTrailerUrl = movie.trailerUrl ? convertYouTubeUrl(movie.trailerUrl) : null;

  return (
    <div className="movie">
      <div className="movie-title">
        <p>{movie.title}</p>
      </div>

      <div className="movie-poster">
        <img src={movie.posterUrl} alt={`${movie.title} Poster`} />
        {isAdmin ? (
          <div className="movie-buttons">
            <button className="book-button" onClick={handleEditMovie}>Edit</button>
          </div>
        ) : (
          <div className="movie-buttons">
          {movie.status === "Currently Running" && (
            <button className="book-button" onClick={handleBookMovie}>Book Now</button>
          )}
          {movie.trailerUrl && (
            <button className="watch-trailer-button" onClick={toggleTrailer}>Watch Trailer</button>
          )}
        </div>
        )}
      </div>

      {showTrailer && embedTrailerUrl ? (
        <TrailerModal
          trailerUrl={embedTrailerUrl}
          title={movie.title}
          onClose={toggleTrailer}
        />
      ) : showTrailer ? (
        <div className="no-trailer">
          <p>Trailer not available.</p>
          <button onClick={toggleTrailer}>Close</button>
        </div>
      ) : null}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    trailerUrl: PropTypes.string,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default MovieCard;
