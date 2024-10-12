import React, { useEffect, useState } from 'react';
import './AdminView.css'
import { useFormik, Formik, Form } from 'formik';
import * as Yup from 'yup';

const MovieForm = ({ values, handleChange, onSubmit  }) => (
  <Form className="form-container">
    <input
      type="text"
      id="movieTitle"
      placeholder="Movie Title"
      value={values.movieTitle} 
      onChange={handleChange}
      />
    <input
      type="text"
      id="description"
      placeholder="Description"
      onChange={handleChange}
      value={values.description} />
    <input
      type="text"
      id="posterUrl"
      placeholder="PosterUrl"
      onChange={handleChange}
      value={values.posterUrl} />
    <input
      type="text"
      id="trailerUrl"
      placeholder="TrailerUrl"
      onChange={handleChange}
      value={values.trailerUrl} />
    <input
      type="text"
      id="status"
      placeholder="Status"
      onChange={handleChange}
      value={values.status} />
    <input
      type="text"
      id="id"
      placeholder="ID"
      onChange={handleChange}
      value={values.id} />
    <button className="add-movie-button" type="submit">Submit</button>
  </Form>
);

export default MovieForm;