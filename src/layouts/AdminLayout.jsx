// src/layouts/AdminLayout.jsx
import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Menu from '../components/Menu/Menu';
import NavBar from '../components/NavBar/NavBar';
import './AdminLayout.scss';

const AdminLayout = () => {
  const location = useLocation();
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    return path.charAt(0).toUpperCase() + path.slice(1) || 'Dashboard';
  };

  return (
    <div className="admin-layout">
      <NavBar />
      <div className="admin-wrapper">
        <aside className="admin-sidebar">
          <Menu />
        </aside>
        <main className="admin-main">
          <div className="admin-content">
            <Suspense fallback={
              <div className="loading-spinner">
                Loading...
              </div>
            }>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;