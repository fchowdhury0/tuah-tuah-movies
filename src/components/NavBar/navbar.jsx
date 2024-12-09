import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.scss";

const NavBar = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [user, setUser] = useState({
    username: "",
    passwordHash: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    status: false,
    isSubscribed: false
  });

  const fetchUserToken = async () => {
    try {
      // Retrieve token from sessionStorage or localStorage
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      console.log("Retrieved token:", token);

      if (token) {
        // Decode the token
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        console.log("Decoded token:", decoded);

        // Set the username from the decoded token
        setUsername(decoded.sub);
        console.log("Username:", decoded.sub);
      } else {
        console.log("No token found in storage");
      }
    } catch (err) {
      console.error("Error decoding token:", err.message);
      setError(err.message || 'Failed to decode token');
    } finally {
      // Ensure loading is set to false regardless of success or failure
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserToken();
  }, []);

  useEffect(() => {
    if (username) {
      // Optionally, fetch user data here
      // loadUser();
    }
  }, [username]);

  useEffect(() => {
    console.log("Updated decodedToken:", decodedToken);
  }, [decodedToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/home" className="links">{"Hawk Tuah Movies"}</Link>
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
      {/* Display errors if any */}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default NavBar;
