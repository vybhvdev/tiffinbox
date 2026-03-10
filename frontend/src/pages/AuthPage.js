import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // login | signup | admin
  const [form, setForm] = useState({ name: '', phone: '', password: '' });
  const [adminPass, setAdminPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register, adminLoginFn } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.phone, form.password);
        navigate('/');
      } else if (mode === 'signup') {
        await register(form.name, form.phone, form.password);
        setMode('login');
        setForm({ name: '', phone: '', password: '' });
        showSuccess('Account created! Please log in.');
      } else {
        await adminLoginFn(adminPass);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  const [success, setSuccess] = useState('');
  const showSuccess = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      background: 'linear-gradient(135deg, #fef7f0 0%, #fef3c7 50%, #fff7ed 100%)'
    }}>
      <div style={{ width: '100%', maxWidth: 400 }} className="animate-slide-up">
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40, margin: '0 auto 16px', boxShadow: '0 8px 32px rgba(249,115,22,0.3)'
          }}>🍱</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1f2937', letterSpacing: -1 }}>TiffinBox</h1>
          <p style={{ color: '#9ca3af', marginTop: 4, fontWeight: 600 }}>Homestyle meals delivered fresh</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'white', borderRadius: 24, padding: '28px 24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}>
          {success && (
            <div style={{ background: '#dcfce7', color: '#16a34a', padding: '10px 16px', borderRadius: 12, marginBottom: 16, fontWeight: 600, fontSize: 14 }}>
              ✓ {success}
            </div>
          )}
          {error && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 16px', borderRadius: 12, marginBottom: 16, fontWeight: 600, fontSize: 14 }}>
              ✕ {error}
            </div>
          )}

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1f2937', marginBottom: 24 }}>
            {mode === 'login' ? 'Welcome Back!' : mode === 'signup' ? 'Create Account' : 'Admin Access'}
          </h2>

          <form onSubmit={handleSubmit}>
            {mode === 'admin' ? (
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Admin Password</label>
                <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)}
                  placeholder="Enter admin password" required style={inputStyle} />
              </div>
            ) : (
              <>
                {mode === 'signup' && (
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="Enter your name" required style={inputStyle} />
                  </div>
                )}
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    placeholder="Enter 10 digit number" pattern="[0-9]{10}" required style={inputStyle} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Password</label>
                  <input type="password" name="password" value={form.password} onChange={handleChange}
                    placeholder="Enter password" minLength="4" required style={inputStyle} />
                </div>
              </>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '14px', borderRadius: 14,
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: 'white', fontWeight: 800, fontSize: 16, border: 'none',
              boxShadow: '0 4px 16px rgba(249,115,22,0.4)',
              opacity: loading ? 0.7 : 1, transition: 'all 0.2s'
            }}>
              {loading ? '⏳ Please wait...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Login as Admin'}
            </button>
          </form>

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            {mode !== 'admin' && (
              <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
                style={{ color: '#f97316', fontWeight: 700, background: 'none', border: 'none', fontSize: 14 }}>
                {mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </button>
            )}
          </div>

          {mode === 'login' && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f3f4f6' }}>
              <button onClick={() => { setMode('admin'); setError(''); }} style={{
                width: '100%', padding: '12px', borderRadius: 14, background: 'white',
                border: '2px solid #f97316', color: '#f97316', fontWeight: 700, fontSize: 15
              }}>
                🔐 Admin Login
              </button>
            </div>
          )}

          {mode === 'admin' && (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <button onClick={() => { setMode('login'); setError(''); }}
                style={{ color: '#6b7280', fontWeight: 600, background: 'none', border: 'none', fontSize: 14 }}>
                ← Back to User Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 700, color: '#6b7280', marginBottom: 6
};
const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: 12,
  border: '2px solid #f3f4f6', outline: 'none', fontSize: 15,
  fontFamily: 'Nunito, sans-serif', transition: 'border-color 0.2s',
  background: '#f9fafb'
};
