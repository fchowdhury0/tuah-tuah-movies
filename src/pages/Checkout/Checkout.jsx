import React, { useState } from 'react';
import ManageMovies from '../AdminView/ManageMovies.jsx';
import Footer from '../../components/Footer/footer.jsx';
import Menu from '../../components/Menu/Menu.jsx';
import NavBar from '../../components/NavBar/navbar.jsx';
import { useLocation, useNavigate } from 'react-router-dom';


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
    
    const handleSubmit = (e) => {
	e.preventDefault();
	console.log('User Info:', userInfo);
	console.log('Payment Info:', paymentInfo);

	navigate('/orderconfirmation', {
            state: {
                tickets,
                total,
                userInfo,
                paymentInfo
            }
        });
    };

    const handleCancel = () => {
	navigate('/home');
    }
    const handleCheckout = () => {
      navigate('/home');
        }
    
    return (
	<div className="main-checkout" style={{color:'white'}}>
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
		    
		    <button onClick = {handleChange} className="submit-button" type="submit">Complete Checkout</button>
		    <button onClick={handleCheckout}  className="cancel-button" type="submit">Cancel</button> 
		</form>
	    </div>
	    <Footer />
	</div>
    );
};

export default Checkout;

