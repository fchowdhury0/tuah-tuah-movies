/* Checkout.jsx */

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer.jsx';
import NavBar from '../../components/NavBar/NavBar.jsx';
import './Checkout.scss';

const Checkout = () => {
  const location = useLocation();
  const { tickets, total } = location.state || { tickets: {}, total: 0 };
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]); // Assume cart items will be passed or fetched
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in userInfo) {
      setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    } else {
      setPaymentInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    }
  };

  const handleEdit = () => {
    navigate('/bookmovie');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Tickets:', tickets);
    console.log('Total:', total);
    console.log('User Info:', userInfo);
    console.log('Payment Info:', paymentInfo);

    navigate('/orderconfirmation', {
      state: {
        tickets,
        total,
        userInfo,
        paymentInfo,
      },
    });
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <div className="main-checkout">
      <NavBar />
      <h1>Checkout</h1>
      <div className="checkout-container">
        <h2>Your Cart</h2>
        <div>
          {Object.entries(tickets).map(([type, count]) => (
            <p key={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)} Tickets: {count}
            </p>
          ))}
        </div>
        <h2>Total Amount: ${total.toFixed(2)}</h2>
        <h2>Shipping Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              value={userInfo.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Billing Address</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Billing Address"
              value={userInfo.address}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <h2>Payment Information</h2>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="Card Number"
              value={paymentInfo.cardNumber}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="expirationDate">Expiration Date (MM/YY)</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              placeholder="Expiration Date (MM/YY)"
              value={paymentInfo.expirationDate}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="CVV"
              value={paymentInfo.cvv}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="button-group">
            <button className="submit-button" type="submit">
              Complete Checkout
            </button>
            <button
              onClick={handleCancel}
              className="cancel-button"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="edit-button"
              type="button"
            >
              Edit Order
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
