import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/footer.jsx';
import NavBar from '../components/NavBar/navbar.jsx';
import './MainLayout.scss'; // Import SCSS for MainLayout

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
