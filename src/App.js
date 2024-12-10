// src/App.js

import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import './App.scss';

// Layouts
import AdminLayout from './layouts/AdminLayout.jsx';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import ManageMovies from './pages/Admin/Movies/ManageMovies/ManageMovies';
import ManagePromotions from './pages/Admin/Promotions/ManagePromotions';
import ScheduleMovie from './pages/Admin/Schedule/ScheduleMovie';
import ManageUsers from './pages/Admin/Users/ManageUsers';

// Regular User Pages
import BookMovie from './pages/BookMovie/BookMovie.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import EditProfile from './pages/EditProfile/EditProfile.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Logout from './pages/Logout/Logout';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation.jsx';
import OrderTickets from './pages/OrderTickets/OrderTickets.jsx';
import Register from './pages/Register/Register.jsx';
import RegistrationConfirmation from './pages/RegistrationConfirmation/RegistrationConfirmation.jsx';

// New Forgot Password and Reset Password Pages
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';

// 404 Page
import NotFound from './pages/NotFound/NotFound.jsx';

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate replace to="/home" />, // Redirect root to /home
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "ordertickets",
      element: <OrderTickets />
    },
    {
      path: `bookmovies/:id`,
      element: <BookMovie />
    },
    {
      path: "orderconfirmation",
      element: <OrderConfirmation />
    },
    {
      path: "/login",
      element: <Login />
    },
    { path: "/logout",
      element: <Logout />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/registration-confirmation",
      element: <RegistrationConfirmation />
    },
    {
      path: "/editprofile",
      element: <EditProfile />
    },
      {
	  path: "/checkout",
	  element: <Checkout />
      },
      {
	  path: "/forgot-password",
	  element: <ForgotPassword />
      },

      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            path: '',
            element: <AdminDashboard />
          },
          {
            path: 'managemovies',
            element: <ManageMovies />
          },
          {
            path: 'manageusers',
            element: <ManageUsers />
          },
          {
            path: 'managepromotions',
            element: <ManagePromotions />
          },
          {
            path: 'schedulemovie',
            element: <ScheduleMovie />
          }
        ]
      },
    {
      path: '*',
      element: <NotFound />, // Fallback Route for 404
    },
  ]);

  return (
    <div className="wrapper">
      <RouterProvider router={router} />
    </div>
  );
  
};

export default App;
