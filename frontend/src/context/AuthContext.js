import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, adminLogin as apiAdminLogin } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedAdmin = localStorage.getItem('isAdmin');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAdmin(savedAdmin === 'true');
    }
    setLoading(false);
  }, []);

  const login = async (phone, password) => {
    const res = await apiLogin({ phone, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAdmin', 'false');
    setUser(user);
    setIsAdmin(false);
    return user;
  };

  const register = async (name, phone, password) => {
    const res = await apiRegister({ name, phone, password });
    return res.data;
  };

  const adminLoginFn = async (password) => {
    const res = await apiAdminLogin({ password });
    const { token, admin } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(admin));
    localStorage.setItem('isAdmin', 'true');
    setUser(admin);
    setIsAdmin(true);
    return admin;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    setUser(null);
    setIsAdmin(false);
  };

  const updateUser = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
    localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, register, adminLoginFn, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
