// src/App.js

import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import './App.scss';
import { AuthProvider } from './context/AuthContext';

// Layouts
import AdminLayout from './layouts/AdminLayout.jsx';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import ManageFees from './pages/Admin/Fees/ManageFees';
import AddMovie from './pages/Admin/Movies/AddMovie/AddMovie';
import EditMovie from './pages/Admin/Movies/ManageMovies/EditMovie.jsx';
import ManageMovies from './pages/Admin/Movies/ManageMovies/ManageMovies';
import ManagePrices from './pages/Admin/Prices/ManagePrices';
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

// Forgot Password Pages
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';

// Reset Password Page
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';

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
    { 
      path: "/logout",
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
      path: "/reset-password",
      element: <ResetPassword />
    },
    {
      path: '/admin',
      element: <AdminLayout />, // Wrap admin routes with AdminLayout
      children: [
        {
          path: '', // Accessible at /admin
          element: <AdminDashboard />,
        },
        {
          path: 'managemovies', // /admin/managemovies
          element: <ManageMovies />,
        },
        {
          path: 'manageusers', // /admin/manageusers
          element: <ManageUsers />,
        },
        {
          path: 'managepromotions', // /admin/managepromotions
          element: <ManagePromotions />,
        },
        {
          path: 'schedulemovie', // /admin/schedulemovie
          element: <ScheduleMovie />,
        },
        {
          path: 'addmovie', // /admin/addmovie
          element: <AddMovie />,
        },
        {
          path: `editmovie/:id`,
          element: <EditMovie />,
        },
        {
          path: 'manageprices', // /admin/manageprices
          element: <ManagePrices />,
        },
        {
          path: 'managefees', // /admin/managefees
          element: <ManageFees />,
        }
      ],
    },
    {
      path: '*',
      element: <NotFound />, // Fallback for 404
    },
  ]);

  return (
    <AuthProvider>
      <div className="wrapper">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;