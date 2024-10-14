import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const { tickets, total, userInfo, paymentInfo } = location.state || {};

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
            <p>Address: {userInfo.address}</p>
            <h3>Payment Information</h3>
            <p>Card Number: {paymentInfo.cardNumber.replace(/\d(?=\d{4})/g, "*")}</p> {/* Mask all but the last 4 digits */}
            <p>Expiration Date: {paymentInfo.expirationDate}</p>
        </div>
    );
};

export default OrderConfirmation;
