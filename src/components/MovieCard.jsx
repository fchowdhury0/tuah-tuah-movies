import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const MovieCard = () => {
    const [movieData, setMovieData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/movies')
        .then((res) => res.json())
        .then(data => setMovieData(data.rows))
        .catch(err => console.log(err));        
    }, []);

    if (!movieData || movieData.length === 0) {
        return <div>Loading...</div>;
      }    
    

return (
    <div className="movie">
        <div>
            <p>Movie Title</p>
        </div>

        <div>
            <img src={movieData[0].posterurl} alt="Movie Poster" />
        </div>

        <div>
            <span>Now Showing</span>
            <h3>{movieData[0].title}</h3>
        </div>
    </div>

    
);
}

export default MovieCard;