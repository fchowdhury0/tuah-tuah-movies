import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const MovieCard = (movie) => {
return (
    <div className="movie">
        <div>
            <p>{movie.movie.title}</p>
        </div>

        <div>
            <img src={movie.movie.posterurl} alt="Movie Poster" />
        </div>

        <div>
            <span>{movie.movie.status}</span>
            <h3>{movie.title}</h3>
        </div>
    </div>

    
);
}

export default MovieCard;