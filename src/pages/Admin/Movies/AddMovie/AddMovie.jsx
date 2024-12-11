// src/pages/Admin/Movies/AddMovie/AddMovie.jsx

import { Field, FieldArray, Form } from 'formik';
import React from 'react';
import './AddMovie.scss';

const AddMovieForm = ({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
  <Form className="add-movie-form" onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="title">Movie Title</label>
      <Field
        type="text"
        id="title"
        name="title"
        placeholder="Enter movie title"
        className="input"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="category">Category</label>
      <Field as="select" id="category" name="category" className="input" required>
        <option value="">Select Category</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Horror">Horror</option>
        <option value="Sci-Fi">Sci-Fi</option>
        {/* Add more categories as needed */}
      </Field>
    </div>

    <div className="form-group">
      <label htmlFor="status">Status</label>
      <Field as="select" id="status" name="status" className="input" required>
        <option value="">Select Status</option>
        <option value="Currently Running">Currently Running</option>
        <option value="Coming Soon">Coming Soon</option>
        {/* Add more categories as needed */}
      </Field>
    </div>

    <div className="form-group">
      <label>Cast</label>
      <Field
        type="text"
        id="castMembers"
        name="castMembers"
        placeholder="Actor 1, Actor 2, Actor 3..."
        className="input"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="director">Director</label>
      <Field
        type="text"
        id="director"
        name="director"
        placeholder="Enter director's name"
        className="input"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="producer">Producer</label>
      <Field
        type="text"
        id="producer"
        name="producer"
        placeholder="Enter producer's name"
        className="input"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="synopsis">Synopsis</label>
      <Field
        as="textarea"
        id="synopsis"
        name="synopsis"
        placeholder="Enter movie synopsis"
        className="textarea"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="reviews">Reviews</label>
      <Field
        as="textarea"
        id="reviews"
        name="reviews"
        placeholder="Enter reviews"
        className="textarea"
      />
    </div>

    <div className="form-group">
      <label htmlFor="posterUrl">Poster Image URL</label>
      <Field
        type="url"
        id="posterUrl"
        name="posterUrl"
        placeholder="Enter poster image URL"
        className="input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="trailerUrl">Trailer Video URL</label>
      <Field
        type="url"
        id="trailerUrl"
        name="trailerUrl"
        placeholder="Enter trailer video URL"
        className="input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="ratingCode">MPAA-US Film Rating</label>
      <Field as="select" id="ratingCode" name="ratingCode" className="input" required>
        <option value="">Select Rating</option>
        <option value="G">G - General Audiences</option>
        <option value="PG">PG - Parental Guidance Suggested</option>
        <option value="PG-13">PG-13 - Parents Strongly Cautioned</option>
        <option value="R">R - Restricted</option>
        <option value="NC-17">NC-17 - Adults Only</option>
      </Field>
    </div>

    <div className="form-group">
      <label>Show Dates and Times</label>
      <FieldArray name="showTimes">
        {({ push, remove }) => (
          <div>
            {values.showTimes && values.showTimes.length > 0 && values.showTimes.map((show, index) => (
              <div key={index} className="array-field">
                <Field
                  type="datetime-local"
                  name={`showTimes.${index}`}
                  className="input"
                  required
                />
                <button type="button" onClick={() => remove(index)} className="remove-button">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => push('')} className="add-button">
              Add Show Time
            </button>
          </div>
        )}
      </FieldArray>
    </div>

    <div className="form-group">
      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Add Movie'}
      </button>
    </div>
  </Form>
);

export default AddMovieForm;