// src/pages/Admin/Movies/ManageMovies.jsx

import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import MovieCard from '../../../../components/MovieCard/MovieCard.jsx';
import AddMovieForm from '../AddMovie/AddMovie.jsx';
import './ManageMovies.scss';

const ManageMovies = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const toggleAdd = () => {
    setShowAdd(!showAdd);
  };

  const toggleDelete = () => {
    setShowDelete(!showDelete);
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/movies');
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid data format received from API');
      }
      setMovies(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddMovie = async (formData, { setSubmitting, resetForm }) => {
    try {
      const { showTimes, ...dataToSend } = formData; // Exclude showTimes
      const response = await axios.post('http://localhost:8080/api/movies', dataToSend);
      console.log('Movie added:', response.data);
      fetchMovies();
      resetForm();
      setShowAdd(false);
      setSubmitting(false);
    } catch (err) {
      console.error('Error adding movie:', err);
      setError(err.response?.data?.message || err.message);
      setSubmitting(false);
    }
  };

  const handleDeleteMovie = async (values, { setSubmitting, resetForm }) => {
    try {
      const { searchTerm } = values;
      // Find the movie by title (assuming titles are unique)
      const movieToDelete = movies.find(
        (movie) => movie.movieTitle.toLowerCase() === searchTerm.toLowerCase()
      );

      if (!movieToDelete) {
        setError('Movie not found.');
        setSubmitting(false);
        return;
      }

      // Confirm deletion
      const confirmDelete = window.confirm(
        `Are you sure you want to delete "${movieToDelete.movieTitle}"?`
      );
      if (!confirmDelete) {
        setSubmitting(false);
        return;
      }

      // Replace the URL with your actual API endpoint and use movie's unique identifier
      await axios.delete(`http://localhost:8080/api/movies/${movieToDelete.id}`);
      console.log('Movie deleted:', movieToDelete.movieTitle);
      fetchMovies(); // Refresh the movies list
      resetForm();
      setShowDelete(false);
      setSubmitting(false);
    } catch (err) {
      console.error('Error deleting movie:', err);
      setError(err.response?.data?.message || err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="manage-movies">
      <div className="top-style">
        <div className="button-container">
          <button className="add-movie-button" onClick={toggleAdd}>
            {showAdd ? 'Cancel' : 'Add Movie'}
          </button>
        </div>
        <div className="button-container">
          <button className="delete-movie-button" onClick={toggleDelete}>
            {showDelete ? 'Cancel' : 'Delete Movie'}
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="form-container">
          <Formik
            initialValues={{
              movieTitle: '',
              category: '',
              cast: [''],
              director: '',
              producer: '',
              synopsis: '',
              reviews: '',
              trailerImageUrl: '',
              trailerVideoUrl: '',
              mpaaRating: '',
            }}
            onSubmit={handleAddMovie}
          >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <AddMovieForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </Formik>
        </div>
      )}

      {showDelete && (
        <div className="form-container">
          <Formik
            initialValues={{ searchTerm: '' }}
            onSubmit={handleDeleteMovie}
          >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form className="delete-movie-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="searchTerm">Search Movie to Delete</label>
                  <Field
                    type="text"
                    id="searchTerm"
                    name="searchTerm"
                    placeholder="Enter movie title"
                    className="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Deleting...' : 'Delete Movie'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {error && <div className="error">Error: {error}</div>}

      <div className="admin-view">
        <div className="box box1">Active Movies</div>
      </div>

      <section>
        <h2>Currently Running</h2>
        <div className="container">
          {loading ? (
            <div>Loading movies...</div>
          ) : movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} isAdmin={true} />)
          ) : (
            <div>No movies found.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ManageMovies;