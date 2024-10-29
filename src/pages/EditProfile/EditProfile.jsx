import { React, useState, useEffect } from 'react';
import Footer from '../../components/Footer/footer.jsx';
import NavBar from '../../components/NavBar/navbar.jsx';
import './EditProfile.scss';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import api from '../../utils/api.js';
import { jwtDecode } from 'jwt-decode';


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
//    isSubscribed: false
  });
    
    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const[newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    fetchUserToken();
    console.log("ran fetchUserToken")
  }, []);

    const handlePasswordChange = (e) => {
	e.preventDefault();

	if (newPassword !== confirmPassword) {
	    setError('New password and confirm password do not match.');
	    setSuccess('');
	    return;
	}
	setError('');
	setSuccess("Password updated successfully");
  };

    const handleChangeEmail = (e) => {
	e.preventDefault();

	if (newEmail !== confirmEmail) {
	    setError("New email and Confirm Email do not match");
	    setSuccess('');
	    return;
	}
	setError('');
	setSuccess("Email updated successfully");

	setNewEmail('');
	setConfirmEmail('');

	
    };
    
    const fetchUserToken = async () => {
    try {
      // need to also check localStorage in when rememberMe
	setLoading(true);
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
		    <form className="form" onSubmit={handleSubmit}>
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
		    <form className="form" onSubmit={handleSubmit}>
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
		    <form onSubmit={handleChangeEmail}>
			<span STYLE="color:#FFFFFF">
			    <div className="form-group">
				<label htmlFor="current-password">Current Email</label>
				<input
				    type="email"
				    id="current-email"
				    placeholder="Enter current email"
				/>
			    </div>
			    <div className="form-group">
				<label htmlFor="new-email">New Email</label>
				    <input
					type="email"
					id="new-email"
					placeholder="Enter new email"
					value={newEmail}
					onChange={(e) => setNewEmail(e.target.value)}
				    />
			    </div>
			    <div className="form-group"> {/* Confirm New Email */}
				<label htmlFor="confirm-email">Confirm New Email</label>                                     
				<input
				    type="email"
				    id="confirm-email"
				    placeholder="Confirm new email"
				    value={confirmEmail}
				    onChange={(e) => setConfirmEmail(e.target.value)}
				/>                                                                           
			    </div>
			    {error && <p style={{ color: 'red' }}>{error}</p>}
			    {success && <p style={{ color: 'green' }}>{success}</p>}
			    <button type="submit">Update Email</button>
			</span>
		    </form>
		    
		    
		</div>
	    )}
	    {changePassword && (
		<div className="change-password">
		    <form onSubmit={handlePasswordChange}>
			<span STYLE="color:#FFFFFF">
			    <div className="form-group">
				<label htmlFor="current-password">Current Password</label>
				<input
				    type="password"  // Set type to "password" for security
				id="current-password"
				placeholder="Enter current password"
				/>
			    </div>
			    
			    <div className="form-group">
				<label htmlFor="new-password">New Password</label>
				<input
				    type="password"
				    id="new-password"
				    placeholder="Enter new password"
				    value={newPassword}
				    onChange={(e) => setNewPassword(e.target.value)}
				/>
			    </div>
			    
			    <div className="form-group">
				<label htmlFor="confirm-password">Confirm New Password</label>
				<input
				    type="password"
				    id="confirm-password"
				    placeholder="Confirm new password"
				    value={confirmPassword}
				    onChange={(e) => setConfirmPassword(e.target.value)}
				    
				/>
			    </div>
			    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if passwords do not match */}
			    {success && <p style={{ color: 'green' }}>{success}</p>}	    
			    <button type="submit">Update Password</button>
			</span>
		    </form>
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
