import { Link } from 'react-router-dom';
import "./navbar.scss";
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const NavBar = () => {
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  const fetchUserToken = async () => {
    try {
      // need to also check localStorage in when rememberMe
      const token = (sessionStorage.getItem('token') || localStorage.getItem('token')); // Retrieve the JWT from sessionStorage
      if (token) {
      setDecodedToken(jwtDecode(token));
      setUsername(decodedToken.sub)
      console.log(decodedToken.sub)
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
    
  };
  
  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/user?username=${encodeURIComponent(username)}`);
      setUser(result.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
    console.log(user)
  };
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
  
  useEffect(() => {
    fetchUserToken();
  }, []);
  
  useEffect(() => {
    loadUser();
  }, [])
  

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/admin/home" className="links">userName</Link>
      </div>
      <div className="links">
        <Link to="/editprofile" className="links">Edit Profile</Link>
      </div>
    </div>
  )
}

export default NavBar;