import { React, useState, useEffect } from 'react';
import Footer from '../../components/Footer/footer.jsx';
import NavBar from '../../components/NavBar/navbar.jsx';
import './EditProfile.scss';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import api from '../../utils/api.js';

/*check console log for form values*/
const EditProfile = () => {

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
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, [])

  const loadUser = async () => {
    try {
      const result = await api.get(`http://localhost:8080/api/user/${id}`);
      setUser(result.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement authentication logic here
    // For now, just navigate back to Home
  };
  /* subscribed should be initially set to the value in database */
  const [subscribed, setSubscribed] = useState(false)
  const handleSubscribe = () => {
    setSubscribed(!subscribed)
  }
  const [basicInfo, setBasicInfo] = useState(true);
  const showBasicInfo = () => {
    setBasicInfo(true)
    setPromotions(false)
    setChangeEmail(false)
    setChangePassword(false)
    setPaymentMethods(false)
  }
  const [promotions, setPromotions] = useState(false);
  const showPromotions = () => {
    setPromotions(true)
    setBasicInfo(false)
    setChangeEmail(false)
    setChangePassword(false)
    setPaymentMethods(false)
  }
  const [changeEmail, setChangeEmail] = useState(false);
  const showChangeEmail = () => {
    setChangeEmail(true)
    setPromotions(false)
    setBasicInfo(false)
    setChangePassword(false)
    setPaymentMethods(false)
  }
  const [changePassword, setChangePassword] = useState(false);
  const showChangePassword = () => {
    setChangePassword(true)
    setPromotions(false)
    setChangeEmail(false)
    setBasicInfo(false)
    setPaymentMethods(false)
  }
  const [paymentMethods, setPaymentMethods] = useState(false);
  const showPaymentMethods = () => {
    setPaymentMethods(true)
    setPromotions(false)
    setChangeEmail(false)
    setChangePassword(false)
    setBasicInfo(false)
  }
  return (
    <div className="main">
      <NavBar />
      <div className="account-banner">
        <h2>MY ACCOUNT</h2>
        <div className="account-items">
          <h3 onClick={showBasicInfo}>Basic Info</h3>
          <h3 onClick={showPromotions}>Promotions</h3>
          <h3 onClick={showChangeEmail}>Change Email</h3>
          <h3 onClick={showChangePassword}>Change Password</h3>
          <h3 onClick={showPaymentMethods}>Payment Methods</h3>
        </div>
      </div>
      {basicInfo && (
        <div className="basic-info">
          <div className="item">
            <span> Basic Information </span>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="firstName"
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="lastName"
              />
            </div>
          </form>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="Email"
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="phoneNumber"
              />
            </div>
          </form>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Street Address:</label>
              <input
                type="streetAddress"
              />
            </div>
            <div className="form-group">
              <label>City, Country:</label>
              <input
                type="cityCountry"
              />
            </div>
          </form>
          <div className="">
            <button type="submit">Save</button>
          </div>
        </div>
      )}
      {promotions && (
        <div>
          {subscribed && (
            <div className="promotions">
              <h2>You are currently receiving promotional emails</h2>
              <h3 onClick={handleSubscribe}>Click to unsubscribe</h3>
            </div>
          )}
          {!subscribed && (
            <div className="promotions">
              <h2>You are not currently receiving promotional emails</h2>
              <h3 onClick={handleSubscribe}>Click to subscribe</h3>
            </div>
          )}
        </div>
      )}
      {changeEmail && (
        <div className="change-email">
          <input
            type="text"
            label="Current Email"
            placeholder=""
          />

        </div>
      )}
      {paymentMethods && (
        <div className="payment-methods">
          <div className="item">
            <span>Payment Information</span>
          </div>
          <form className="form">
            <div className="form-group">
              <label>Credit Card Number:</label>
              <input
                type="creditCardNumber"
              />
            </div>
            <div className="form-group">
              <label>Expiration Date:</label>
              <input
                type="expirationDate"
              />
            </div>
            <div className="form-group">
              <label>CCV:</label>
              <input
                type="ccv"
              />
            </div>
          </form>
          <div className="">
            <button type="submit">Save</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )

}

export default EditProfile;