import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                // Perform logout API call if needed
                await axios.post('http://localhost:8080/api/auth/logout'); // Adjust the URL based on your backend
                // Optionally, clear local storage or cookies here
                localStorage.removeItem('token'); // Assuming you store JWT in localStorage
                // Redirect to the home or login page
                history.push('/login'); // Adjust to your login route
            } catch (error) {
                console.error('Logout failed', error);
            }
        };

        handleLogout();
    }, [history]);

    return <div>Logging out...</div>; // You can customize the loading message
};

export default Logout;
