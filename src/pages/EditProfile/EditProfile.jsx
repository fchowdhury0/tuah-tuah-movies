import React from 'react';
import Footer from '../../components/Footer/footer.jsx';
import NavBar from '../../components/NavBar/NavBar.jsx';
import './EditProfile.scss';

/*check console log for form values*/
const EditProfile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement authentication logic here
    // For now, just navigate back to Home
  };
  return (
    <div className="main">
      <NavBar />
      <div className="content-container">
        <h2> Welcome, userName!</h2>
        <div className="item">
          <span> Personal Information </span>
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
      <Footer />
    </div>
  )

}

export default EditProfile;