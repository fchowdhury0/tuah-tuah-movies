import { React, useState, useEffect } from 'react';
import Footer from '../../components/Footer/footer.jsx';
import NavBar from '../../components/NavBar/navbar.jsx';
import './EditProfile.scss';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import api from '../../utils/api.js';
//import { jwtDecode } from 'jwt-decode';


/*check console log for form values*/
const EditProfile = () => {

  const [user, setUser] = useState({
    userId: null,
    username: "",
    passwordHash: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    status: false,
    isSubscribed: false
  });

  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserToken();
    console.log("ran fetchUserToken")
  }, []);


  const fetchUserToken = async () => {
    try {
      // need to also check localStorage in when rememberMe
      const token = (sessionStorage.getItem('token') || localStorage.getItem('token'));
      const parsedToken = JSON.parse(token)
      if (!token) {
        navigate("/login")
        throw new Error('No JWT found in storage');
      } else {
        setUsername(parsedToken.sub)
        console.log("decoded sub: " + username)
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }

  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/user?username=${encodeURIComponent(username)}`);
        setUser(result.data);
        console.log("user: " + JSON.stringify(user))
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    if (username) {
      loadUser();
    }
  }, [username]);

  const handleEditProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/user/${user.userId}`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
    });
    console.log('User updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating user:', error);
  }

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
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show an error message if there is an error
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
          <form className="form" onSubmit={handleEditProfile}>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="firstName"
                value={user.firstName}
                onChange={(e) => {
                  setUser({
                  ...user,
                  firstName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="lastName"
                value={user.lastName}
                onChange={(e) => {
                  setUser({
                  ...user,
                  lastName: e.target.value,
                  });
                }}
              />
            </div>
          </form>
          <form className="form" onSubmit={handleEditProfile}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="Email"
                placeholder={user.email}
                disabled={true}
              />
            </div>
          </form>
          <div className="save-button">
            <button onClick={handleEditProfile} type="submit">Save</button>
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
          <div className="save-button">
            <button type="submit">Save</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )

}

export default EditProfile;
