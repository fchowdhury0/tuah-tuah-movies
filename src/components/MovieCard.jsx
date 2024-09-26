import React from "react";

const MovieCard = () => {
return (
    <div className="movie">
        <div>
            <p>Movie Title</p>
        </div>

        <div>
            <img src={'https://via.placeholder.com/400'} alt="Movie Poster" />
        </div>

        <div>
            <span>Now Showing</span>
            <h3>Movie Title</h3>
        </div>
    </div>

    
);
}

export default MovieCard;