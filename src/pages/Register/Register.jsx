import axios from 'axios';
import { useFormik } from 'formik';
import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      promotions: promotions,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9_]{3,20}$/, 'Username must be 3-20 characters and can only contain letters, numbers, and underscores')
        .required('Username is required'),
      password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters and contain at least one letter and one number')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      firstName: Yup.string()
        .required('First name is required'),
      lastName: Yup.string()
        .required('Last name is required'),
    }),
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      const registrationData = {
        username: values.username,
        password: values.password,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
      };


      console.log('Submitting Registration Data:', registrationData);

      try {
        const res = await axios.post('http://localhost:8080/api/auth/register', registrationData, {
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('Registration Successful:', res.data);
        resetForm();
        navigate('/registration-confirmation');
      } catch (err) {
        if (err.response) {
          // Server responded with a status other than 2xx
          console.error('Registration Error:', err.response.data);
          setErrors({ submit: err.response.data });
        } else if (err.request) {
          // Request was made but no response received
          console.error('No response received:', err.request);
          setErrors({ submit: 'No response from server. Please try again later.' });
        } else {
          // Something else happened while setting up the request
          console.error('Unexpected Error:', err.message);
          setErrors({ submit: 'An unexpected error occurred.' });
        }
      } finally {
        setSubmitting(false);
      }
      
    },
  });
  
  const handlePromotions = (e) => {
    setPromotions(e.target.checked);
    formik.setFieldValue('promotions', e.target.checked)
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            {...formik.getFieldProps('username')}
            required
          />
          {formik.touched.username && formik.errors.username ? (
            <span className="error" role="alert">{formik.errors.username}</span>
          ) : null}
        </div>

        {/* First Name Field */}
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            {...formik.getFieldProps('firstName')}
            required
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <span className="error" role="alert">{formik.errors.firstName}</span>
          ) : null}
        </div>

        {/* Last Name Field */}
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            {...formik.getFieldProps('lastName')}
            required
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <span className="error" role="alert">{formik.errors.lastName}</span>
          ) : null}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            {...formik.getFieldProps('email')}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="error" role="alert">{formik.errors.email}</span>
          ) : null}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            {...formik.getFieldProps('password')}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="error" role="alert">{formik.errors.password}</span>
          ) : null}
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            {...formik.getFieldProps('confirmPassword')}
            required
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <span className="error" role="alert">{formik.errors.confirmPassword}</span>
          ) : null}
        </div>

        {/* Submit Error */}
        {formik.errors.submit && <span className="error" role="alert">{formik.errors.submit}</span>}
        <div className="promotions">
            <label>
              Sign up for promotional emails?  
              <input
                className="promotion-checkbox"
                type="checkbox"
                onChange={handlePromotions}
              />
            </label>
          </div>
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;