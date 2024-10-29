import { Link } from 'react-router-dom';
import "./navbar.scss";
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode'; // Make sure this is correctly imported

const NavBar = () => {
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

    const fetchUserToken = async () => {
        try {
            const token = (sessionStorage.getItem('token') || localStorage.getItem('token'));
            if (token) {
                const decoded = jwtDecode(token); // Decode the token
                setDecodedToken(decoded);
		setUsername(decoded.sub); // Set the username from the decoded token
		console.log(decoded.sub);
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

    return (
        <div className="navbar">                                                                     
            <div className="logo">                                                                     
                <Link to="/admin/home" className="links">{username || "Hawk Tuah Movies"}</Link>                                 
            </div>                                                                                     
            <div className="links">                                                                    
                <Link to="/editprofile" className="links">Edit Profile</Link>                            
                <Link to="/home" className="links">Movies</Link>                                 
                <Link to="/login" className="links">Login</Link>                                 
                <Link to="/register" className="links">Register</Link>                           
                <Link to="/logout" className="links">Logout</Link>                               
            </div>                                                                               
        </div>
    );
}

export default NavBar;
