// src/layouts/AdminLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/footer.jsx';
import Menu from '../components/Menu/Menu.jsx';
import NavBar from '../components/NavBar/navbar.jsx';
import './AdminLayout.scss'; // Import SCSS for AdminLayout

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <NavBar />
      <div className="admin-container">
        <Menu />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;