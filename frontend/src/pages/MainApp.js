import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import HomePage from './HomePage';
import PlansPage from './PlansPage';
import OrdersPage from './OrdersPage';
import ProfilePage from './ProfilePage';
import AdminDashboard from './AdminDashboard';

const NAV = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'plans', label: 'Plans', emoji: '📦' },
  { id: 'orders', label: 'Orders', emoji: '📋' },
  { id: 'profile', label: 'Profile', emoji: '👤' }
];

export default function MainApp() {
  const { user, isAdmin, logout } = useAuth();
  const [tab, setTab] = useState('home');

  if (isAdmin) return <AdminDashboard />;

  const renderPage = () => {
    switch (tab) {
      case 'home': return <HomePage />;
      case 'plans': return <PlansPage />;
      case 'orders': return <OrdersPage />;
      case 'profile': return <ProfilePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 480, margin: '0 auto', background: 'white', boxShadow: '0 0 40px rgba(0,0,0,0.1)', position: 'relative' }}>
      {/* Header */}
      <header style={{
        padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'white', borderBottom: '1px solid #f3f4f6', flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
          }}>🍱</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#1f2937' }}>TiffinBox</div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>Hi, {user?.name}!</div>
          </div>
        </div>
        <button onClick={logout} style={{
          background: 'none', border: 'none', padding: 8, borderRadius: '50%',
          color: '#9ca3af', fontSize: 20, display: 'flex', alignItems: 'center'
        }} title="Logout">
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
        </button>
      </header>

      {/* Content */}
      <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '16px', background: 'linear-gradient(135deg, #fef7f0, #fef3c7)', width: '100%', boxSizing: 'border-box' }}>
        {renderPage()}
      </main>

      {/* Bottom Nav */}
      <nav style={{
        display: 'flex', background: 'white', borderTop: '1px solid #f3f4f6',
        padding: '8px 4px', flexShrink: 0
      }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '8px 4px', borderRadius: 14, border: 'none',
            background: tab === n.id ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'transparent',
            color: tab === n.id ? 'white' : '#9ca3af',
            transition: 'all 0.2s', cursor: 'pointer'
          }}>
            <span style={{ fontSize: 20 }}>{n.emoji}</span>
            <span style={{ fontSize: 11, fontWeight: 700, marginTop: 2 }}>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
