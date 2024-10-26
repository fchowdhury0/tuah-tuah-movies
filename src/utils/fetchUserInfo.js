import React, { useEffect, useState } from 'react';

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const fetchUserInfo = () => {
  fetch('http://localhost:8080/auth/')
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Movies data:', data); // Log the data to verify
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
};

export default fetchUserInfo;