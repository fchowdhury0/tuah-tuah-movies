// src/pages/Admin/Movies/ScheduleMovie.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ScheduleMovie.scss';

function ScheduleMovie() {
  const [shows, setShows] = useState([]);
  const [formData, setFormData] = useState({
    showId: null,
    showTime: '',
    showDuration: '',
    showRoom: '',
    movieId: '',
    seatsRemaining: ''
  });

  const fetchShows = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/shows');
      setShows(response.data);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { showId, ...data } = formData;
    data.showDuration = parseInt(data.showDuration, 10);
    data.showRoom = parseInt(data.showRoom, 10);
    data.movieId = parseInt(data.movieId, 10);
    data.seatsRemaining = parseInt(data.seatsRemaining, 10);

    try {
      if (showId === null) {
        // Create new show
        await axios.post('/api/shows', data);
      } else {
        // Update existing show
        await axios.put(`/api/shows/${showId}`, data);
      }
      setFormData({
        showId: null,
        showTime: '',
        showDuration: '',
        showRoom: '',
        movieId: '',
        seatsRemaining: ''
      });
      fetchShows();
    } catch (error) {
      console.error('Error saving show:', error);
    }
  };

  const handleEdit = (show) => {
    setFormData({
      showId: show.showId,
      showTime: show.showTime,
      showDuration: show.showDuration,
      showRoom: show.showRoom,
      movieId: show.movieId,
      seatsRemaining: show.seatsRemaining
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/shows/${id}`);
      fetchShows();
    } catch (error) {
      console.error('Error deleting show:', error);
    }
  };

  return (
    <div className="schedule-movies-container">
      <h1>Schedule Movies</h1>

      <form onSubmit={handleSubmit} className="show-form">
        <div className="form-group">
          <label htmlFor="showTime">Show Time (YYYY-MM-DDTHH:MM:SS):</label>
          <input
            type="text"
            name="showTime"
            id="showTime"
            value={formData.showTime}
            onChange={handleChange}
            required
            placeholder="e.g. 2024-12-31T15:00:00"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="showDuration">Show Duration (minutes):</label>
          <input
            type="number"
            name="showDuration"
            id="showDuration"
            value={formData.showDuration}
            onChange={handleChange}
            required
            placeholder="e.g. 120"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="showRoom">Show Room:</label>
          <input
            type="number"
            name="showRoom"
            id="showRoom"
            value={formData.showRoom}
            onChange={handleChange}
            required
            placeholder="e.g. 3"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="movieId">Movie ID:</label>
          <input
            type="number"
            name="movieId"
            id="movieId"
            value={formData.movieId}
            onChange={handleChange}
            required
            placeholder="e.g. 101"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="seatsRemaining">Seats Remaining:</label>
          <input
            type="number"
            name="seatsRemaining"
            id="seatsRemaining"
            value={formData.seatsRemaining}
            onChange={handleChange}
            required
            placeholder="e.g. 50"
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          {formData.showId ? 'Update Show' : 'Add Show'}
        </button>
      </form>

      <h2>Existing Shows</h2>
      {shows.length > 0 ? (
        <table className="shows-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Show Time</th>
              <th>Duration</th>
              <th>Room</th>
              <th>Movie ID</th>
              <th>Seats Remaining</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show) => (
              <tr key={show.showId}>
                <td>{show.showId}</td>
                <td>{show.showTime}</td>
                <td>{show.showDuration}</td>
                <td>{show.showRoom}</td>
                <td>{show.movieId}</td>
                <td>{show.seatsRemaining}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(show)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(show.showId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No shows scheduled.</p>
      )}
    </div>
  );
}

export default ScheduleMovie;