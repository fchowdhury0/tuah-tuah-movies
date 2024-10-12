import React, { useEffect, useState } from 'react';
import './AdminView.css'

const App = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  /* populate the movie form with the input and send to database?*/
  const [movieForm, setMovieForm] = useState();

  function showAddComponent() {
    setShowAdd(!showAdd);
  }

  function showDeleteComponent() {
    setShowDelete(!showDelete)
  }


  return (
    <div className="app">
      <div className="top-bar">
        <button className="login-button">Logout</button>
        <button className="preview-button">Preview User View</button>
      </div>
      <div className="button-container">
        <button className="add-movie-button" onClick={showAddComponent}>Add Movie</button>
      </div>
      {showAdd && (
        <div className="form-container">
          <input type="text" placeholder="Movie Title" />
          <input type="text" placeholder="Description" />
          <input type="text" placeholder="Poster" />
          <input type="text" placeholder="Trailer" />
          <input type="text" placeholder="Status" />
          <input type="text" placeholder="ID" />
          <button className="add-movie-button">Save Movie</button>

        </div>
      )}
      {/* should reveal a component for finding a movie to */}
      <button className="delete-movie-button" onClick={showDeleteComponent}>Delete Movie</button>

      {showDelete && (
        <div className="form-container">
          <input className="text-input"type="text" placeholder="Search for movie to delete"/>


        </div>
      )}

    </div>

  );
};

export default App;