import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/api';

const PLAN_LABELS = { '20meals': '20 Meals', '40meals': '40 Meals', 'monthly': 'Monthly' };

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', address: user?.address || '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateProfile(form);
      updateUser(res.data.user);
      setEditing(false);
      showToast('Profile updated!');
    } catch (e) {
      showToast('Failed to update profile');
    }
    setSaving(false);
  };

  const menuItems = [
    { icon: '📍', label: 'Delivery Address', value: user?.address || 'Not set' },
    { icon: '🔔', label: 'Notifications', value: 'Enabled' },
    { icon: '❓', label: 'Help & Support', value: null }
  ];

  return (
    <div className="animate-slide-up">
      {toast && (
        <div style={{
          position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 999,
          background: '#22c55e', color: 'white', padding: '12px 20px', borderRadius: 50,
          fontWeight: 700, fontSize: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>{toast}</div>
      )}

      {/* Profile Card */}
      <div style={{
        background: 'white', borderRadius: 20, padding: 24, textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 16
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, margin: '0 auto 12px', color: 'white', fontWeight: 900
        }}>
          {user?.name?.[0]?.toUpperCase() || '👤'}
        </div>

        {editing ? (
          <div>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, color: '#1f2937', border: '2px solid #f97316', borderRadius: 10, padding: '6px 12px', width: '100%', marginBottom: 8, fontFamily: 'Nunito' }} />
            <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
              placeholder="Delivery address" style={{ fontSize: 14, color: '#6b7280', border: '2px solid #f3f4f6', borderRadius: 10, padding: '6px 12px', width: '100%', fontFamily: 'Nunito' }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={() => setEditing(false)} style={{ flex: 1, padding: '10px', borderRadius: 12, border: '2px solid #f3f4f6', background: 'white', fontWeight: 700, color: '#6b7280' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 1, padding: '10px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #f97316, #ea580c)', color: 'white', fontWeight: 700 }}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 22, fontWeight: 900, color: '#1f2937' }}>{user?.name}</p>
            <p style={{ color: '#9ca3af', fontSize: 15, marginTop: 2 }}>{user?.phone}</p>
            <button onClick={() => setEditing(true)} style={{
              marginTop: 12, padding: '8px 20px', borderRadius: 12, border: '2px solid #fed7aa',
              background: '#fff7ed', color: '#f97316', fontWeight: 700, fontSize: 13
            }}>✏️ Edit Profile</button>
          </>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: 32, fontWeight: 900, color: '#f97316' }}>{user?.mealsLeft || 0}</p>
          <p style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginTop: 2 }}>Meals Left</p>
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: 22, fontWeight: 900, color: '#f97316' }}>
            {user?.subscription ? PLAN_LABELS[user.subscription] : 'None'}
          </p>
          <p style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginTop: 2 }}>Current Plan</p>
        </div>
      </div>

      {/* Menu Items */}
      <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        {menuItems.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: i < menuItems.length - 1 ? '1px solid #f9fafb' : 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <span style={{ fontWeight: 700, color: '#1f2937', fontSize: 15 }}>{item.label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {item.value && <span style={{ fontSize: 13, color: '#9ca3af' }}>{item.value}</span>}
              <span style={{ color: '#d1d5db', fontSize: 18 }}>›</span>
            </div>
          </div>
        ))}

        <div onClick={logout} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', cursor: 'pointer'
        }}>
          <span style={{ fontSize: 22 }}>🚪</span>
          <span style={{ fontWeight: 700, color: '#ef4444', fontSize: 15 }}>Logout</span>
        </div>
      </div>
    </div>
  );
}
