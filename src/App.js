// src/App.js
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import RegistrationConfirmation from './components/RegistrationConfirmation';
import AdminView from './components/AdminView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} /> {/* Redirect root to /home */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registration-confirmation" element={<RegistrationConfirmation />} />
        <Route path="/admin" element={<AdminView/>} />
        {/* Add other routes here in future */}
        <Route path="*" element={<div className="app">404 Not Found</div>} /> {/* Fallback Route */}
      </Routes>
    </Router>
  );
};

export default App;