import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.scss";

const NavBar = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  const fetchUserToken = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      console.log("Retrieved token:", token);

      if (token) {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        console.log("Decoded token:", decoded);

        // The username usually is in `sub` (subject) claim
        setUsername(decoded.sub);
        console.log("Username:", decoded.sub);
      } else {
        console.log("No token found in storage");
      }
    } catch (err) {
      console.error("Error decoding token:", err.message);
      setError(err.message || 'Failed to decode token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserToken();
  }, []);

  useEffect(() => {
    console.log("Updated decodedToken:", decodedToken);
  }, [decodedToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Determine if user is admin
  const isAdmin = decodedToken && decodedToken.role && decodedToken.role.toLowerCase() === 'admin';

  return (
    <div className="navbar">
      <div className="logo">
        {/* If admin, logo sends to /admin, otherwise /home */}
        <Link to={isAdmin ? "/admin" : "/home"} className="links">
          {"Hawk Tuah Movies"}
        </Link>
      </div>
      <div className="links">
        <Link to="/editprofile" className="links">Account</Link>
        <Link to="/home" className="links">Movies</Link>
        {!decodedToken && (
          <>
            <Link to="/login" className="links">Login</Link>
            <Link to="/register" className="links">Register</Link>
          </>
        )}
        {decodedToken && (
          <>
            <Link to="/logout" className="links">Logout</Link>
          </>
        )}
      </div>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default NavBar;
