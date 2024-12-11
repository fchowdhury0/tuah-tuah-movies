import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RegistrationConfirmation.scss';

const RegistrationConfirmation = ({ email }) => {
  useEffect(() => {
    // Trigger the email when the component mounts
    const sendConfirmationEmail = async () => {
      if (!email) {
        console.error("Email is not provided.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/api/registration/sendConfirmationEmail",
          null, // No body needed since we use query params
          {
            params: { email }, // Email passed as a query parameter
          }
        );
        console.log(response.data); // Log success message
      } catch (error) {
        console.error("Error sending confirmation email:", error.response?.data || error.message);
      }
    };

    sendConfirmationEmail();
  }, [email]);

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h2>Registration Successful!</h2>
        <p>Thank you for registering. Your account has been created successfully.</p>
        <p>You can now <Link style={{ color: "#0f6ab5" }} to="/login">log in</Link> to your account.</p>
        {/* <img
          src="/images/success.svg" // maybe add an image here
          alt="Success"
          className="confirmation-image"
        /> */}
      </div>
    </div>
  );
};

export default RegistrationConfirmation;