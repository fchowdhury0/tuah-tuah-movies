import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const MovieCard = (movie, searchTerm) => {
  console.log(movie)
  return (
    <div className="movie">
      <div>
        <p>{movie.movie.title}</p>
      </div>

      <div>
        <img src={movie.movie.posterurl} alt="Movie Poster" />
        onMouseEnter
      </div>

      <div>
        <span>{movie.movie.status}</span>
        {/* I feel like it looks better without this
        <h3>{movie.movie.title}</h3> */}
      </div>
    </div>

  );
}


export default MovieCard;