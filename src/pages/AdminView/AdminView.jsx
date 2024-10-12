import React, { useEffect, useState } from 'react';
import './AdminView.scss'
import { useFormik, Formik, Form } from 'formik';
import * as Yup from 'yup';
import AddMovieForm from './AddMovieForm';
import Footer from '../../components/Footer/Footer.jsx'

import Menu from '../../components/Menu/Menu'
import NavBar from '../../components/NavBar/NavBar'

/*check console log for form values*/
const App = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  function showAddComponent() {
    setShowAdd(!showAdd);
  }

  function showDeleteComponent() {
    setShowDelete(!showDelete)
  }

  return (
    <div className="">
      <div className="navbar">
        <NavBar/>
        <button className="login-button">Logout</button>
      </div>
      <div className="menu">
        <Menu />
      </div>
      <div className="button-container">
        <button className="add-movie-button" onClick={showAddComponent}>Add Movie</button>
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
      {/* TODO should reveal a component for finding a movie*/}
      <div className="button-container">
        <button className="delete-movie-button" onClick={showDeleteComponent}>Delete Movie</button>
      </div>
      {showDelete && (
        <div className="form-container">
          <input className="text-input" type="text" placeholder="Search for movie to delete" />


        </div>
      )}

    </div>

  );
};

export default App;