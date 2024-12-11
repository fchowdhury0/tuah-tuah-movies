import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const { tickets, total, userInfo, paymentInfo} = location.state || {
    };
    const finalTotal = total + total*0.05 + total*0.05;
    const navigate = useNavigate();
    const [orderNumber, setOrderNumber] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState(["A1"]);
    
//    const selectMovie = (movie) => {
//	setSelectedMovie(movie);
//    }
    console.log('in OrderConfirmation movie title', selectedMovie);

    useEffect(() => {
	if (!selectedMovie) {
            setSelectedMovie({
		title: 'Inception',  // Random title for testing
		director: 'Director Name',    // Example fields
		year: '2024',                 // Example fields
		genre: 'Action',              // Example fields
            });
	}
    }, [selectedMovie]);

    useEffect(() => {
	if(!selectedShowtime) {
	    setSelectedShowtime('2024-12-11T15:00:00');
	}
    },[selectedShowtime]);
    

    useEffect(() => {
	const generatedOrderNumber = Math.floor(Math.random() * 1000);
        setOrderNumber(generatedOrderNumber);
    }, []);

    const sendConfirmationEmail = async () => {
	console.log('Tickets ordered:', tickets);
	console.log('Total amount:', total);
	console.log('Selected Movie:', selectedMovie.title);
	
	if (!selectedMovie || !selectedMovie.title) {
	    console.error('Selected movie is undefined or missing title');
//            return; // Stop execution if the movie data is missing
	}
	if (!selectedShowtime) {
            console.error('Showtime is missing');
//	    return; // Stop execution if showtime is missing
	}
	if (!selectedMovie || !selectedMovie.title) {
	    console.error('Selected movie is undefined or missing title');
	    //return;
	}
	if (!selectedShowtime) {
	    console.error('Showtime is missing');
	    //return;
	}
	
	const seatsStr = selectedSeats.join(', '); // Format seats as a comma-separated string
	if (!seatsStr) {
            console.error('Seats are missing');
            return; // Stop execution if seats are missing
	}
//	try {
	const payload = {
	    email: userInfo.email,
	    emailType: 'booking', // Assuming it's a booking email, could be changed dynamically
	    movieTitle: selectedMovie.title,
	    showtime: selectedShowtime,
	    seats: seatsStr, // Pass formatted seats as a string
            };
	console.log('Payload:', payload);
	try {    
            const response = await axios.post('http://localhost:8080/api/movies/sendConfirmationEmail', null, {
		params: payload
	    });
            console.log('Email sent successfully:', response.data);


	} catch (error) {
            console.error('Failed to send confirmation email:', error);
	    console.log('Email:', userInfo.email);
	    console.log('Tickets ordered:', tickets);
	    console.log('Total amount:', total);
	    console.log('Selected Movie:', selectedMovie);
	    console.log('Showtime:', selectedShowtime);
	    console.log('Seats:', seatsStr);
	}
    };

    useEffect(() => {
	if (selectedMovie && selectedShowtime && selectedSeats.length > 0) {
            sendConfirmationEmail();
	}
    }, [selectedMovie, selectedShowtime, selectedSeats]);

    const toHome = () => {
        navigate('/home');
    }

    return (
        <div className="order-confirmation" style={{ color: 'white' }}>
            <h2>Order Confirmation</h2>
	    <h3>Order Number: {orderNumber}</h3>
	    
            <h3>Movie Tickets</h3>
            {Object.entries(tickets).map(([type, count]) => (
                <p key={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} Tickets: {count}
                </p>
            ))}
            <h3>Total Amount (including 5% sales tax and 5% fee): ${finalTotal.toFixed(2)}</h3>
            <h3>User Information</h3>
            <p>Name: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            <p>Billing Address: {userInfo.address}</p>
            <h3>Payment Information</h3>
            <p>Card Number: {paymentInfo.cardNumber.replace(/\d(?=\d{4})/g, "*")}</p>
            <p>Expiration Date: {paymentInfo.expirationDate}</p>
            <button onClick={toHome} className="home-button" type="submit">Done</button>
        </div>
    );
};

export default OrderConfirmation;
