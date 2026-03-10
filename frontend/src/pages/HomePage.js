import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTodayMenu, pauseDate, getMySubscription } from '../services/api';

const PLAN_LABELS = { '20meals': '20 Meals Plan', '40meals': '40 Meals Plan', 'monthly': 'Monthly Plan' };

export default function HomePage() {
  const { user, updateUser } = useAuth();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pausing, setPausing] = useState(false);

  const today = new Date().toDateString();
  const todayFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  const isPaused = user?.pausedDates?.includes(today);

  useEffect(() => {
    getTodayMenu()
      .then(res => setMenu(res.data.menu))
      .catch(() => setMenu({
        mainDish: 'Paneer Butter Masala', sideDish: 'Dal Tadka',
        bread: 'Butter Roti (4 pcs)', extras: 'Jeera Rice, Green Salad, Pickle',
        deliveryTime: '12:00 PM - 2:00 PM'
      }))
      .finally(() => setLoading(false));
  }, []);

  const handlePause = async () => {
    setPausing(true);
    try {
      const res = await pauseDate(today);
      updateUser({ pausedDates: res.data.pausedDates });
    } catch (e) {}
    setPausing(false);
  };

  const menuItems = menu ? [
    { icon: '🍛', name: menu.mainDish, type: 'Main Course' },
    { icon: '🥣', name: menu.sideDish, type: 'Side Dish' },
    { icon: '🫓', name: menu.bread, type: 'Bread' },
    { icon: '🥗', name: menu.extras, type: 'Extras' }
  ] : [];

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Meals Remaining Card */}
      <div style={{
        borderRadius: 20, padding: '20px', color: 'white',
        background: 'linear-gradient(135deg, #f97316, #ea580c)',
        boxShadow: '0 8px 32px rgba(249,115,22,0.35)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 13, opacity: 0.9, fontWeight: 600 }}>Meals Remaining</p>
            <p style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1 }}>{user?.mealsLeft || 0}</p>
            <p style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
              {user?.subscription ? PLAN_LABELS[user.subscription] : 'No active plan'}
            </p>
          </div>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32
          }}>🍽️</div>
        </div>
      </div>

      {/* Today's Menu */}
      <div style={{ background: 'white', borderRadius: 20, padding: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontWeight: 800, fontSize: 18, color: '#1f2937' }}>Today's Menu</h3>
            <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>{todayFormatted}</p>
          </div>
          <span style={{
            padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
            background: isPaused ? '#fee2e2' : '#dcfce7',
            color: isPaused ? '#dc2626' : '#16a34a'
          }}>
            {isPaused ? '⏸️ Paused' : '✓ Active'}
          </span>
        </div>

        {loading ? (
          [1,2,3,4].map(i => (
            <div key={i} className="shimmer" style={{ height: 64, borderRadius: 12, marginBottom: 10 }} />
          ))
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {menuItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                borderRadius: 14, background: '#fef7ed'
              }}>
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, color: '#1f2937', fontSize: 15 }}>{item.name}</p>
                  <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 1 }}>{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delivery Status */}
      <div style={{ background: 'white', borderRadius: 20, padding: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontWeight: 800, fontSize: 18, color: '#1f2937', marginBottom: 16 }}>Delivery Status</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: isPaused ? '#fee2e2' : 'linear-gradient(135deg, #f97316, #ea580c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0
          }}>
            {isPaused ? '⏸️' : '🛵'}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, color: '#1f2937', fontSize: 15 }}>
              {isPaused ? 'Delivery Paused' : 'On Schedule'}
            </p>
            <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
              {isPaused ? 'Resume to get delivery' : menu?.deliveryTime || '12:00 PM - 2:00 PM'}
            </p>
          </div>
        </div>

        {user?.subscription && (
          <button onClick={handlePause} disabled={pausing} style={{
            marginTop: 16, width: '100%', padding: '12px',
            borderRadius: 14, fontWeight: 700, fontSize: 15, border: 'none',
            background: isPaused ? 'linear-gradient(135deg, #16a34a, #15803d)' : '#fff7ed',
            color: isPaused ? 'white' : '#f97316',
            border: isPaused ? 'none' : '2px solid #fed7aa',
            cursor: pausing ? 'wait' : 'pointer', transition: 'all 0.2s'
          }}>
            {pausing ? '⏳ Updating...' : isPaused ? '▶️ Resume Today&apos;s Delivery' : '⏸️ Pause Today&apos;s Delivery'}
          </button>
        )}
      </div>
    </div>
  );
}
