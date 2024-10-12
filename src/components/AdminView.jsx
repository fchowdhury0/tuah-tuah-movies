import React, { useEffect, useState } from 'react';
import './AdminView.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const App = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  /* populate the movie form with the input and send to database?*/
  const formik = useFormik({
    initialValues: {
      movieTitle: '',
      description: '',
      posterUrl: '',
      trailerUrl: '',
      status: '',
      id: ''
    }
  })

  console.log('Form values', formik.values)

  function showAddComponent() {
    setShowAdd(!showAdd);
  }

  function showDeleteComponent() {
    setShowDelete(!showDelete)
  }


  return (
    <div>
      <div className="top-bar">
        <button className="login-button">Logout</button>
        <button className="preview-button">Preview User View</button>
      </div>
      <div className="button-container">
        <button className="add-movie-button" onClick={showAddComponent}>Add Movie</button>
      </div>
      {showAdd && (
        <div className="form-container">

            <input
              type="text"
              id="movieTitle"
              placeholder="Movie Title"
              onChange={formik.handleChange}
              value={formik.values.movieTitle} />
            <input 
              type="text"
              id="description"
              placeholder="Description"
              onChange={formik.handleChange}
              value={formik.values.description} />
            <input
              type="text"
              id="poster"
              placeholder="PosterUrl"
              onChange={formik.handleChange}
              value={formik.values.posterUrl} />
            <input
              type="text"
              id="poster"
              placeholder="TrailerUrl"
              onChange={formik.handleChange}
              value={formik.values.trailerUrl}/>
            <input
              type="text"
              id="status"
              placeholder="Status" 
              onChange={formik.handleChange}
              value={formik.values.status}/>
            <input
              type="text"
              id="id"
              placeholder="ID"             
              onChange={formik.handleChange}
              value={formik.values.id}/>
            <button className="add-movie-button">Submit</button>


        </div>
      )}
      {/* should reveal a component for finding a movie to */}
      <button className="delete-movie-button" onClick={showDeleteComponent}>Delete Movie</button>

      {showDelete && (
        <div className="form-container">
          <input className="text-input" type="text" placeholder="Search for movie to delete" />


        </div>
      )}

    </div>

  );
};

export default App;