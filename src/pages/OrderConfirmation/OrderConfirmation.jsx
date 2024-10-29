import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmation = () => {
    const location = useLocation();
    const { tickets, total, userInfo, paymentInfo } = location.state || {};
    const navigate = useNavigate();

    const sendConfirmationEmail = async () => {
        try {
            await axios.post("http://localhost:8080/api/movies/sendConfirmationEmail", null, {
                params: { email: userInfo.email }
            });
            console.log("Confirmation email sent!");
        } catch (error) {
            console.error("Failed to send confirmation email:", error);
        }
    };
    useEffect(() => {
        sendConfirmationEmail();
    }, []);
    
    const toHome = () => {
	navigate('/home');
    }
    return (
        <div className="order-confirmation" style={{ color: 'white' }}>
            <h2>Order Confirmation</h2>
            <h3>Movie Tickets</h3>
	    {Object.entries(tickets).map(([type, count]) => (
		<p key={type}>
		    {type.charAt(0).toUpperCase() + type.slice(1)} Tickets: {count}
		</p>
	    ))}
            <h3>Total Amount: ${total.toFixed(2)}</h3>
            <h3>User Information</h3>
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            <p>Billing Address: {userInfo.address}</p>
            <h3>Payment Information</h3>
            <p>Card Number: {paymentInfo.cardNumber.replace(/\d(?=\d{4})/g, "*")}</p> {/* Mask all but the last 4 digits */}
            <p>Expiration Date: {paymentInfo.expirationDate}</p>
	    <button onClick={toHome}  className="home-button" type="submit">Done</button> 
        </div>
    );
};

export default OrderConfirmation;
