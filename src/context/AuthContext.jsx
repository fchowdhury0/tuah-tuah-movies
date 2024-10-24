import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    isAuthenticated: false,
    loading: true,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      setAuth({
        token: token,
        isAuthenticated: true,
        loading: false,
        user: null, // You can decode JWT to get user info or fetch from backend
      });
      // Optionally, fetch user details here
    } else {
      setAuth({
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      });
    }
  }, []);

  const login = (token) => {
    setAuth({
      token: token,
      isAuthenticated: true,
      loading: false,
      user: null,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setAuth({
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};