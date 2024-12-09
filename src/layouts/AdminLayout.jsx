// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Menu from '../components/Menu/Menu';
import NavBar from '../components/NavBar/NavBar';
import './AdminLayout.scss';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <NavBar />
      <div className="admin-wrapper">
        <aside className="admin-sidebar">
          <Menu />
        </aside>
        <main className="admin-main">
          <div className="admin-content">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;