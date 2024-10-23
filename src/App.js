// src/App.js
import React from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer/footer.jsx';
import Menu from './components/Menu/Menu.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import AdminView from './pages/AdminView/AdminView';
import ManageMovies from './pages/AdminView/ManageMovies.jsx';
import ManagePromotions from './pages/AdminView/ManagePromotions';
import ManageUsers from './pages/AdminView/ManageUsers.jsx';
import ScheduleMovie from './pages/AdminView/ScheduleMovie.jsx';
import BookMovie from './pages/BookMovie/BookMovie.jsx';
import Checkout from './pages/Checkout/Checkout';
import EditProfile from './pages/EditProfile/EditProfile';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation.jsx';
import OrderTickets from './pages/OrderTickets/OrderTickets.jsx';
import Register from './pages/Register/Register';
import RegistrationConfirmation from './pages/RegistrationConfirmation/RegistrationConfirmation';

const App = () => {
  /*this is the layout for admin view pages*/
  const AdminLayout = ()  => {
    return (
      <div className="admin-main">
        <NavBar />
        <div className="admin-container">
          <div className="menu-container"><Menu/></div>
          <div className="content-container"><Outlet/></div>
        </div>
        <Footer/>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate replace to="/home" /> /* Redirect root to /home */
    },
    {
      path: "/home",
      element:<Home />
    },
    {
      path:"/login",
      element: <Login />
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
	path: "/ordertickets",
	element: <OrderTickets/>
    },
      {
	  path: "/bookmovie",
	  element: <BookMovie/>
      },
      {
          path: "/orderconfirmation",
          element: <OrderConfirmation/>
      },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path:"/admin/home",
          element: <AdminView/>
        },
        {
          path:"/admin/managemovies",
          element: <ManageMovies/>
        },
        {
          path:"/admin/manageusers",
          element: <ManageUsers/>
        },
        {
          path:"/admin/managepromotions",
          element: <ManagePromotions/>
        },
        {
          path:"/admin/schedulemovie",
          element: <ScheduleMovie/>
        }
      ]


      

    },
    {
      path: "*",
      element: <div className="app">404 Not Found</div> /* Fallback Route */
    }

  ])

  return (
    <RouterProvider router={router} />
  );
};

export default App;
