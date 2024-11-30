import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/footer.jsx';
import NavBar from '../../components/NavBar/navbar.jsx';
import './EditProfile.scss';

import { getAuthToken } from '../../utils/auth';
import axiosInstance from '../../utils/axiosInstance';

const EditProfile = () => {
  const navigate = useNavigate();

  // State for user data
  const [user, setUser] = useState({
    userId: null,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    isSubscribed: false,
    userPaymentCards: []
  });
    
    // const [username, setUsername] = useState();
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const [decodedToken, setDecodedToken] = useState(null);
    // const [newPassword, setNewPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [success, setSuccess] = useState('');
    // const navigate = useNavigate();

  // UI State Management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Password State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Email State
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  // Toggle Sections
  const [activeSection, setActiveSection] = useState('basicInfo');

  // Add Card State
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zip: '',
    saveCard: true
  });

  // Handle Add Card
  const handleAddCard = async (e) => {
    e.preventDefault();
    setError('');

    if (user.userPaymentCards.length >= 3) {
      setError('Maximum of 3 cards allowed');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/userPaymentCard', {
        userId: user.userId,
        cardNumber: newCard.cardNumber,
        expiryDate: newCard.expiryDate,
        cvv: newCard.cvv,
        billingAddress: newCard.billingAddress,
        city: newCard.city,
        state: newCard.state,
        zip: newCard.zip,
        saveCard: newCard.saveCard
      });

      setUser(prevUser => ({
        ...prevUser,
        userPaymentCards: [...prevUser.userPaymentCards, response.data]
      }));

      setShowAddCard(false);
      setNewCard({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        billingAddress: '',
        city: '',
        state: '',
        zip: '',
        saveCard: true
      });
      setSuccess('Card added successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add card');
    }
  };

    const fetchUserToken = async () => {
    try {
      const token = getAuthToken();
      console.log("Retrieved token:", token);
      if (!token) {
        console.log("No token found. Redirecting to login.");
        navigate('/login');
        return;
      }

      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
      if (!decoded || !decoded.sub) {
        throw new Error("Invalid token structure.");
      }

      const usernameFromToken = decoded.sub;
      console.log("Username from token:", usernameFromToken);
      await fetchUserData(usernameFromToken);
    } catch (err) {
      console.error("Error decoding token:", err.message);
      setError('Failed to authenticate user.');
      setLoading(false);
    }
  };

  // Fetch User Data Based on Username
  const fetchUserData = async (username) => {
    try {
      setLoading(true);
      console.log("Fetching user data for:", username);
      const response = await axiosInstance.get(`/api/user?username=${encodeURIComponent(username)}`);
      console.log("Raw user data received:", response.data);

      // Ensure userPaymentCards is properly initialized
      const userPaymentCards = response.data.userPaymentCards || [];
      console.log("Payment cards:", userPaymentCards);

      setUser({
        userId: response.data.userId,
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        isSubscribed: response.data.isSubscribed,
        userPaymentCards: userPaymentCards
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
      console.error("Response data:", err.response?.data);
      setError(err.response?.data?.message || 'Failed to load user data.');
    } finally {
      setLoading(false);
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
//    setChangeEmail(false)
    setChangePassword(false)
    setPaymentMethods(false)
  }
  const [promotions, setPromotions] = useState(false);
  const showPromotions = () => {
    setPromotions(true)
    setBasicInfo(false)
    setChangePassword(false)
    setPaymentMethods(false)
  }

//  }
  const [changePassword, setChangePassword] = useState(false);
  const showChangePassword = () => {
    setChangePassword(true)
    setPromotions(false)
    setBasicInfo(false)
    setPaymentMethods(false)
  }
  const [paymentMethods, setPaymentMethods] = useState(false);
  const showPaymentMethods = () => {
    setPaymentMethods(true)
    setPromotions(false)
    setChangePassword(false)
    setBasicInfo(false)
  }

  // Load Token and Fetch User Data
  useEffect(() => {
    fetchUserToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update User Profile Information
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const updatedUser = { ...user };
      const response = await axiosInstance.put(
        `/api/user/${user.userId}`,
        updatedUser,
        {
          headers: { 'Content-Type': 'application/json' } // Axios instance already includes Authorization
        }
      );
      console.log('Profile updated:', response.data);
      setUser({
        userId: response.data.userId,
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        isSubscribed: response.data.isSubscribed,
        userPaymentCards: response.data.userPaymentCards || []
      });
      setSuccess("Profile updated successfully.");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error updating profile.';
      setError(errorMessage);
      console.error('Error updating profile:', error);
    }
  };

  // Update Email
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newEmail.trim() !== confirmEmail.trim()) {
      setError("New email and confirm email do not match.");
      return;
    }

    try {
      const response = await axiosInstance.put(`/api/user/${user.userId}/email`, { email: newEmail.trim() });
      console.log("Email updated:", response.data);
      setUser((prevUser) => ({ ...prevUser, email: response.data.email }));
      setSuccess("Email updated successfully.");
      setNewEmail('');
      setConfirmEmail('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update email.';
      setError(errorMessage);
      console.error("Error updating email:", err);
    }
  };

  // Update Password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await axiosInstance.put(`/api/user/${user.userId}/password`, { newPassword });
      console.log("Password updated:", response.data);
      setSuccess("Password updated successfully.");
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update password.';
      setError(errorMessage);
      console.error("Error updating password:", err);
    }
  };

  // Render Sections Based on Active Section
  const renderSection = () => {
    switch (activeSection) {
      case 'basicInfo':
        return (
          <div className="basic-info">
            <form className="form" onSubmit={handleProfileUpdate}>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Subscribed to Promotions:</label>
                <input
                  type="checkbox"
                  checked={user.isSubscribed}
                  onChange={(e) => setUser({ ...user, isSubscribed: e.target.checked })}
                />
              </div>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
              <div className="save-button">
                <button type="submit">Save Changes</button>
              </div>
            </form>
          </div>
        );
      case 'promotions':
        return (
          <div className="promotions">
            {user.isSubscribed ? (
              <h3>You are currently subscribed to promotions.</h3>
            ) : (
              <h3>You are not subscribed to promotions.</h3>
            )}
          </div>
        );
      case 'changeEmail':
        return (
          <div className="change-email">
            <form onSubmit={handleEmailUpdate}>
              <div className="form-group">
                <label>New Email:</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm New Email:</label>
                <input
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
              <button type="submit">Update Email</button>
            </form>
          </div>
        );
      case 'changePassword':
        return (
          <div className="change-password">
            <form onSubmit={handlePasswordUpdate}>
              <div className="form-group">
                <label>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
              <button type="submit">Update Password</button>
            </form>
          </div>
        );
      case 'paymentMethods':
        return (
          <div className="payment-methods">
            <h3>Payment Methods</h3>
            <div className="payment-cards-list">
              {Array.isArray(user.userPaymentCards) && user.userPaymentCards.length > 0 ? (
                user.userPaymentCards.map((userCard) => (
                  <div key={userCard.userCardId} className="payment-card">
                    <p>
                      <strong>Card Number:</strong> **** **** **** 
                      {userCard.paymentCard?.cardNumber?.slice(-4) || 'XXXX'}
                    </p>
                    <p>
                      <strong>Billing Address:</strong> 
                      {`${userCard.paymentCard?.cardBillingAddress || ''}, 
                      ${userCard.paymentCard?.cardCity || ''}, 
                      ${userCard.paymentCard?.cardState || ''}, 
                      ${userCard.paymentCard?.cardZip || ''}`}
                    </p>
                    <p>
                      <strong>Expiry Date:</strong>
                      {userCard.paymentCard?.cardExp ? 
                        new Date(userCard.paymentCard.cardExp).toLocaleDateString(undefined, 
                          { month: '2-digit', year: '2-digit' }
                        ) : 'N/A'
                      }
                    </p>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCard(userCard.userCardId)}
                    >
                      Delete Card
                    </button>
                  </div>
                ))
              ) : (
                <p>No payment methods found.</p>
              )}
            </div>

            {user.userPaymentCards.length < 3 && !showAddCard && (
              <button 
                className="add-card-button"
                onClick={() => setShowAddCard(true)}
              >
                Add New Card
              </button>
            )}

            {showAddCard && (
              <form className="add-card-form" onSubmit={handleAddCard}>
                <h4>Add New Card</h4>
                <div className="form-group">
                  <label>Card Number:</label>
                  <input
                    type="text"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                    pattern="\d{16}"
                    maxLength="16"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date (MM/YY):</label>
                    <input
                      type="text"
                      value={newCard.expiryDate}
                      onChange={(e) => setNewCard({...newCard, expiryDate: e.target.value})}
                      pattern="\d{2}/\d{2}"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV:</label>
                    <input
                      type="text"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                      pattern="\d{3,4}"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Billing Address:</label>
                  <input
                    type="text"
                    value={newCard.billingAddress}
                    onChange={(e) => setNewCard({...newCard, billingAddress: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City:</label>
                    <input
                      type="text"
                      value={newCard.city}
                      onChange={(e) => setNewCard({...newCard, city: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State:</label>
                    <input
                      type="text"
                      value={newCard.state}
                      onChange={(e) => setNewCard({...newCard, state: e.target.value})}
                      maxLength="2"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP:</label>
                    <input
                      type="text"
                      value={newCard.zip}
                      onChange={(e) => setNewCard({...newCard, zip: e.target.value})}
                      pattern="\d{5}"
                      maxLength="5"
                      required
                    />
                  </div>
                </div>
                {error && <p className="error">{error}</p>}
                <div className="form-buttons">
                  <button type="submit">Add Card</button>
                  <button type="button" onClick={() => setShowAddCard(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // Handle Delete Payment Card
  const handleDeleteCard = async (userCardId) => {
    if (!window.confirm('Are you sure you want to delete this payment method?')) {
      return;
    }
    try {
      const response = await axiosInstance.delete(`/api/userPaymentCard/${userCardId}`);
      console.log('Payment card deleted:', response.data);
      setUser((prevUser) => ({
        ...prevUser,
        userPaymentCards: prevUser.userPaymentCards.filter(card => card.userCardId !== userCardId)
      }));
      setSuccess("Payment card deleted successfully.");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete payment card.';
      setError(errorMessage);
      console.error("Error deleting payment card:", err);
    }
  };

  if (loading) {
    return <div className="edit-profile">Loading...</div>;
  }

  return (
    <div className="main">
      <NavBar />
      <div className="account-banner">
        <h2>MY ACCOUNT</h2>
        <div className="account-items">
          <h3
            onClick={() => setActiveSection('basicInfo')}
            className={activeSection === 'basicInfo' ? 'active' : ''}
          >
            Basic Info
          </h3>
          <h3
            onClick={() => setActiveSection('promotions')}
            className={activeSection === 'promotions' ? 'active' : ''}
          >
            Promotions
          </h3>
          <h3
            onClick={() => setActiveSection('changeEmail')}
            className={activeSection === 'changeEmail' ? 'active' : ''}
          >
            Change Email
          </h3>
          <h3
            onClick={() => setActiveSection('changePassword')}
            className={activeSection === 'changePassword' ? 'active' : ''}
          >
            Change Password
          </h3>
          <h3
            onClick={() => setActiveSection('paymentMethods')}
            className={activeSection === 'paymentMethods' ? 'active' : ''}
          >
            Payment Methods
          </h3>
        </div>
      </div>
      <div className="edit-profile-content">
        {renderSection()}
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;