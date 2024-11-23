import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import NavBar from '../../components/NavBar/navbar.jsx';
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
      role: 'customer',
      isSubscribed: promotions,
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      billingAddress: '',
      zip: '',
      city: '',
      state: '',
      saveCard: false,
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

      // Credit Card Validations
      cardNumber: Yup.string()
        .matches(/^\d{16}$/, 'Card number must be exactly 16 digits')
        .required('Credit Card Number is required'),
      expiryDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Expiry date must be in MM/YY or MM/YYYY format')
        .required('Expiry Date is required'),
      cvv: Yup.string()
        .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
        .required('CVV is required'),
      cardholderName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Cardholder name can only contain letters and spaces')
        .required('Cardholder Name is required'),
      billingAddress: Yup.string()
        .required('Billing Address is required'),
      zip: Yup.string()
        .matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format')
        .required('ZIP Code is required'),
      city: Yup.string()
        .required('City is required'),
      state: Yup.string()
        .matches(/^[A-Z]{2}$/, 'State must be a 2-letter code')
        .required('State is required'),
      saveCard: Yup.boolean(), // Optional field
    }),
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      const registrationData = {
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        role: "customer",
        isSubscribed: values.isSubscribed,

        // Credit Card Data
        creditCard: {
          cardNumber: values.cardNumber,
          expiryDate: values.expiryDate,
          cvv: values.cvv, // **⚠️ Security Warning:** Do NOT store CVV codes
          cardholderName: values.cardholderName,
          billingAddress: values.billingAddress,
          zip: values.zip,
          city: values.city,
          state: values.state,
          saveCard: values.saveCard, // Include saveCard field
        },
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
          const errorMessage = err.response.data.message || 'Registration failed. Please try again.';
          setErrors({ submit: errorMessage });
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
    formik.setFieldValue('isSubscribed', e.target.checked);
  };

  const handleSaveCard = (e) => {
    formik.setFieldValue('saveCard', e.target.checked);
  };

  return (
    <div>
      <NavBar />
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="form-flex-container">
            {/* Left Column: User Information */}
            <div className="form-column">
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
            </div>

            {/* Right Column: Payment Information */}
            <div className="form-column">
              {/* Credit Card Section */}
              <h3>Credit Card Information</h3>

              {/* Cardholder Name Field */}
              <div className="form-group">
                <label htmlFor="cardholderName">Cardholder Name:</label>
                <input
                  id="cardholderName"
                  type="text"
                  name="cardholderName"
                  {...formik.getFieldProps('cardholderName')}
                  required
                />
                {formik.touched.cardholderName && formik.errors.cardholderName ? (
                  <span className="error" role="alert">{formik.errors.cardholderName}</span>
                ) : null}
              </div>

              {/* Card Number Field */}
              <div className="form-group">
                <label htmlFor="cardNumber">Credit Card Number:</label>
                <input
                  id="cardNumber"
                  type="text"
                  name="cardNumber"
                  {...formik.getFieldProps('cardNumber')}
                  maxLength="16"
                  required
                />
                {formik.touched.cardNumber && formik.errors.cardNumber ? (
                  <span className="error" role="alert">{formik.errors.cardNumber}</span>
                ) : null}
              </div>

              {/* Expiry Date Field */}
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date (MM/YY or MM/YYYY):</label>
                <input
                  id="expiryDate"
                  type="text"
                  name="expiryDate"
                  {...formik.getFieldProps('expiryDate')}
                  placeholder="MM/YY or MM/YYYY"
                  required
                />
                {formik.touched.expiryDate && formik.errors.expiryDate ? (
                  <span className="error" role="alert">{formik.errors.expiryDate}</span>
                ) : null}
              </div>

              {/* CVV Field */}
              <div className="form-group">
                <label htmlFor="cvv">CVV:</label>
                <input
                  id="cvv"
                  type="text"
                  name="cvv"
                  {...formik.getFieldProps('cvv')}
                  maxLength="4"
                  required
                />
                {formik.touched.cvv && formik.errors.cvv ? (
                  <span className="error" role="alert">{formik.errors.cvv}</span>
                ) : null}
              </div>

              {/* Billing Address Section */}
              <h3>Billing Address</h3>

              {/* Billing Address Field */}
              <div className="form-group">
                <label htmlFor="billingAddress">Billing Address:</label>
                <input
                  id="billingAddress"
                  type="text"
                  name="billingAddress"
                  {...formik.getFieldProps('billingAddress')}
                  required
                />
                {formik.touched.billingAddress && formik.errors.billingAddress ? (
                  <span className="error" role="alert">{formik.errors.billingAddress}</span>
                ) : null}
              </div>

              {/* ZIP Code Field */}
              <div className="form-group">
                <label htmlFor="zip">ZIP Code:</label>
                <input
                  id="zip"
                  type="text"
                  name="zip"
                  {...formik.getFieldProps('zip')}
                  required
                />
                {formik.touched.zip && formik.errors.zip ? (
                  <span className="error" role="alert">{formik.errors.zip}</span>
                ) : null}
              </div>

              {/* City Field */}
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  {...formik.getFieldProps('city')}
                  required
                />
                {formik.touched.city && formik.errors.city ? (
                  <span className="error" role="alert">{formik.errors.city}</span>
                ) : null}
              </div>

              {/* State Field */}
              <div className="form-group">
                <label htmlFor="state">State (2-letter code):</label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  {...formik.getFieldProps('state')}
                  maxLength="2"
                  required
                />
                {formik.touched.state && formik.errors.state ? (
                  <span className="error" role="alert">{formik.errors.state}</span>
                ) : null}
              </div>

              {/* Save Payment Information Checkbox */}
              <div className="form-group save-card">
                <label htmlFor="saveCard">
                  <input
                    id="saveCard"
                    type="checkbox"
                    name="saveCard"
                    checked={formik.values.saveCard}
                    onChange={handleSaveCard}
                  />
                  Do you want us to save this payment information?
                </label>
              </div>
            </div>
          </div>

          {/* Promotions Checkbox */}
          <div className="promotions">
            <label htmlFor="isSubscribed">
              <input
                id="isSubscribed"
                type="checkbox"
                name="isSubscribed"
                checked={formik.values.isSubscribed}
                onChange={handlePromotions}
                className="promotion-checkbox"
              />
              Sign me up for promotional emails
            </label>
          </div>

          {/* Submit Error */}
          {formik.errors.submit && <span className="error" role="alert">{formik.errors.submit}</span>}

          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;