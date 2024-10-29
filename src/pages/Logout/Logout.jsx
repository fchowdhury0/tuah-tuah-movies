import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Optionally, clear local storage or cookies here
        localStorage.removeItem('token') || sessionStorage.removeItem('token'); // Assuming you store JWT in localStorage
        // Redirect to the home or login page
        navigate('/home'); // Adjust to your login route
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div>Logging out...</div>
  ); // You can customize the loading message
};

export default Logout;
