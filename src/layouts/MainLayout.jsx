import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer.jsx';
import NavBar from '../components/NavBar/NavBar.jsx';
import './MainLayout.scss';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <NavBar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;