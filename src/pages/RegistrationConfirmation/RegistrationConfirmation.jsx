// src/components/RegistrationConfirmation.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './RegistrationConfirmation.css';

const RegistrationConfirmation = () => {
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h2>Registration Successful!</h2>
        <p>Thank you for registering. Your account has been created successfully.</p>
        <p>You can now <Link to="/login">log in</Link> to your account.</p>
        {/* <img
          src="/images/success.svg" maybe add an image here
          alt="Success"
          className="confirmation-image"
        /> */}
      </div>
    </div>
  );
};

export default RegistrationConfirmation;
