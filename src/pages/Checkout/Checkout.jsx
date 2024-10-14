import React, { useState } from 'react';
import ManageMovies from '../AdminView/ManageMovies.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Menu from '../../components/Menu/Menu.jsx';
import NavBar from '../../components/NavBar/NavBar.jsx';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
const location = useLocation();
    const { tickets, total } = location.state || { tickets: {}, total: 0 };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your payment processing logic here
    console.log('User Info:', userInfo);
    console.log('Payment Info:', paymentInfo);
    // Clear cart or redirect user after successful payment
  };

  return (
    <div style={{ color: 'white', backgroundColor: 'black', padding: '20px' }}>
    
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
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userInfo.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
           placeholder="Billing Address"
            value={userInfo.address}
            onChange={handleChange}
            required
          />

          <h2>Payment Information</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="expirationDate"
            placeholder="Expiration Date (MM/YY)"
            value={paymentInfo.expirationDate}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChange={handleChange}
            required
          />

          <button type="submit">Complete Checkout</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
