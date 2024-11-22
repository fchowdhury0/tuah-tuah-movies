import { Link } from 'react-router-dom';
import "./navbar.scss";
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Make sure this is correctly imported

const NavBar = () => {
  const [lastClicked, setLastClicked] = useState(null);

  useEffect(() => {
    const savedLastClicked = localStorage.getItem('lastClicked');
    if (savedLastClicked) {
      setLastClicked(savedLastClicked)
    }
  }, []) 

  const handleLinkChange = (linkName) => {
    setLastClicked(linkName);
    localStorage.setItem('lastClicked', linkName);
    console.log("LastClicked: " + lastClicked)
  }
  const [username, setUsername] = useState();
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
  console.log("decodedToken: " + decodedToken)
  const fetchUserToken = async () => {
    try {
      const token = (sessionStorage.getItem('token') || localStorage.getItem('token'));
      if (token) {
        const decoded = jwtDecode(token); // Decode the token
        setDecodedToken(decoded);
        console.log("decodedToken: " + decodedToken)
        setUsername(decoded.sub); // Set the username from the decoded token
        console.log(decoded.sub);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  console.log("decodedToken: " + decodedToken)
  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/user?username=${encodeURIComponent(username)}`);
      setUser(result.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
    console.log(user);
  };

  useEffect(() => {
    fetchUserToken();
  }, []);

  useEffect(() => {
    if (username) { // Only load user if username is set
      loadUser();
    }
  }, [username]); // Depend on username to trigger loadUser
  console.log("decodedToken: " + decodedToken)
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/home" className="links">{"Hawk Tuah Movies"}</Link>
      </div>
      <div className="links">
        <Link onClick={() => (handleLinkChange('editprofile'))} to="/editprofile" className={`links${(lastClicked === 'editprofile') ? '-selected' : ''}`}>Account</Link>
        <Link onClick={() => (handleLinkChange('home'))} to="/home" className={`links${(lastClicked === 'home') ? '-selected' : ''}`}>Movies</Link>
        <Link onClick={() => (handleLinkChange('login'))} to="/login" className={`links${(lastClicked === 'login') ? '-selected' : ''}`}>Login</Link>
        <Link onClick={() => (handleLinkChange('register'))} to="/register" className={`links${(lastClicked === 'register') ? '-selected' : ''}`}>Register</Link>
      </div>
    </div>
  );
}

export default NavBar;
