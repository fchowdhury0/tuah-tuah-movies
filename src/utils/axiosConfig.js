import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Adjust based on your backend's URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // using cookies for auth
});

// Add interceptors if needed
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
