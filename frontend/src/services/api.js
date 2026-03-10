import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api'
});

// Attach token to every request
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
API.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(err);
  }
);

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const adminLogin = (data) => API.post('/auth/admin-login', data);
export const getMe = () => API.get('/auth/me');

// Menu
export const getTodayMenu = () => API.get('/menu/today');

// Subscriptions
export const getMySubscription = () => API.get('/subscriptions/my');
export const pauseDate = (date) => API.post('/subscriptions/pause', { date });

// Orders
export const getMyOrders = () => API.get('/orders/my');

// User
export const updateProfile = (data) => API.put('/users/profile', data);

// Admin
export const getAdminDashboard = () => API.get('/admin/dashboard');
export const getAllUsers = () => API.get('/users');
export const getAllMenus = () => API.get('/menu');
export const createOrUpdateMenu = (data) => API.post('/menu', data);
export const deleteMenu = (id) => API.delete(`/menu/${id}`);
export const getAllSubscriptions = () => API.get('/subscriptions');
export const adminActivateSubscription = (userId, plan) => API.post('/subscriptions/admin-activate', { userId, plan });
export const adminUpdateSubscription = (id, data) => API.put(`/subscriptions/${id}`, data);
export const getAllOrders = () => API.get('/orders');
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}`, { status });
export const adminUpdateUser = (id, data) => API.put(`/users/${id}`, data);

export default API;
