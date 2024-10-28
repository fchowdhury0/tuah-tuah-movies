import React, { useEffect, useState } from 'react';

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

import axios from 'axios';

const fetchUserInfo = () => {
  /*
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
    */

  const [loading, setLoading] = useState();
  const [error, setError] = useState(null)
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {

    const api = axios.create({
      baseURL: 'http://localhost:8080/api/users'
    })

    api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(token);
      return config;
    }, (error) => Promise.reject(error));
  });

};

export default fetchUserInfo;