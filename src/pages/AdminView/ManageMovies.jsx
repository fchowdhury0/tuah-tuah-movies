import React, { useEffect, useState } from 'react';
import './AdminView.scss'
import { useFormik, Formik, Form } from 'formik';
import * as Yup from 'yup';
import AddMovieForm from './AddMovieForm.jsx';
import Footer from '../../components/Footer/footer.jsx'
import MovieCard from '../../components/MovieCard/MovieCard'
import Menu from '../../components/Menu/Menu.jsx'
import NavBar from '../../components/NavBar/navbar.jsx'


const ManageMovies = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);
  
  function showAddComponent() {
    setShowAdd(!showAdd);
  }

  function showDeleteComponent() {
    setShowDelete(!showDelete)
  }

  const fetchMovies = () => {
    fetch('http://localhost:8080/api/movies')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Movies data:', data); // Log the data to check for Interstellar
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
      console.log(movies)
  };

  return (
    <div className="main">
      <div className="top-style">
        <div className="button-container">
          <button className="add-movie-button" onClick={showAddComponent}>Add Movie</button>
        </div>
        {/* TODO should reveal a component for finding a movie*/}
        <div className="button-container">
          <button className="delete-movie-button" onClick={showDeleteComponent}>Delete Movie</button>
        </div>

      </div>
      {showAdd && (
          <div className="form-container">
            <Formik
              /*these are the form values, may be updated as needed*/
              initialValues={{
                movieTitle: '',
                description: '',
                posterUrl: '',
                trailerUrl: '',
                status: '',
                id: ''
              }}
              onSubmit={async (formsData, { setSubmitting }) => {
                setSubmitting(true)
                console.log(formsData)
                setSubmitting(false)
              }}>
              {({ values, handleChange, onSubmit }) => (
                <AddMovieForm values={values} handleChange={handleChange} onSubmit={onSubmit} />
              )}
            </Formik>

          </div>
        )}
      {showDelete && (
          <div className="form-container">
            <input className="text-input" type="text" placeholder="Search for movie to delete" />


          </div>
        )}
      <div className="admin-view">
        <div className="box box1">Active Movies</div>
      </div>
      <section>
        <h2>Currently Running</h2>
        <div className="container">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div>No movies found.</div>
          )}
        </div>
      </section>
    </div>

  );
};

export default ManageMovies;
