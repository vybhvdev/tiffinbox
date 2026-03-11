import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getAdminDashboard, getAllUsers, getAllMenus, createOrUpdateMenu,
  getAllSubscriptions, getAllOrders, adminUpdateUser,
  adminActivateSubscription, adminUpdateSubscription, updateOrderStatus
} from '../services/api';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', emoji: '📊' },
  { id: 'users', label: 'Users', emoji: '👥' },
  { id: 'menu', label: 'Menu', emoji: '🍛' },
  { id: 'subscriptions', label: 'Subs', emoji: '📦' },
  { id: 'orders', label: 'Orders', emoji: '📋' }
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [tab, setTab] = useState('dashboard');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(''), 3000);
  };

  const fetchData = async (t = tab) => {
    setLoading(true);
    try {
      switch (t) {
        case 'dashboard': { const r = await getAdminDashboard(); setData(r.data.data); break; }
        case 'users': { const r = await getAllUsers(); setData({ users: r.data.users }); break; }
        case 'menu': { const r = await getAllMenus(); setData({ menus: r.data.menus }); break; }
        case 'subscriptions': { const r = await getAllSubscriptions(); setData({ subscriptions: r.data.subscriptions }); break; }
        case 'orders': { const r = await getAllOrders(); setData({ orders: r.data.orders }); break; }
        default: break;
      }
    } catch (e) {
      showToast('Failed to fetch data', 'error');
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(tab); }, [tab]);

  const renderContent = () => {
    if (loading) return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[1,2,3].map(i => <div key={i} className="shimmer" style={{ height: 70, borderRadius: 14 }} />)}
      </div>
    );
    switch (tab) {
      case 'dashboard': return <DashboardTab data={data} />;
      case 'users': return <UsersTab users={data.users || []} onRefresh={() => fetchData('users')} showToast={showToast} />;
      case 'menu': return <MenuTab menus={data.menus || []} onRefresh={() => fetchData('menu')} showToast={showToast} />;
      case 'subscriptions': return <SubsTab subs={data.subscriptions || []} onRefresh={() => fetchData('subscriptions')} showToast={showToast} />;
      case 'orders': return <OrdersTab orders={data.orders || []} onRefresh={() => fetchData('orders')} showToast={showToast} />;
      default: return null;
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 480, margin: '0 auto', background: 'white', boxShadow: '0 0 40px rgba(0,0,0,0.1)' }}>
      {toast && (
        <div style={{
          position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 999,
          background: toast.type === 'error' ? '#ef4444' : '#22c55e',
          color: 'white', padding: '12px 20px', borderRadius: 50, fontWeight: 700, fontSize: 14,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)', whiteSpace: 'nowrap'
        }}>{toast.msg}</div>
      )}

      {/* Header */}
      <header style={{ padding: '12px 16px', background: '#1e1b4b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 28 }}>🔐</div>
          <div>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>Admin Dashboard</p>
            <p style={{ color: '#a5b4fc', fontSize: 12 }}>TiffinBox</p>
          </div>
        </div>
        <button onClick={logout} style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid #f97316', color: '#f97316', background: 'transparent', fontWeight: 700, cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#f9fafb', borderBottom: '1px solid #f3f4f6', overflowX: 'auto', flexShrink: 0 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flexShrink: 0, padding: '10px 14px', border: 'none', cursor: 'pointer',
            background: tab === t.id ? 'white' : 'transparent',
            borderBottom: tab === t.id ? '2px solid #f97316' : '2px solid transparent',
            color: tab === t.id ? '#f97316' : '#9ca3af',
            fontWeight: 700, fontSize: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
          }}>
            <span style={{ fontSize: 16 }}>{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: 16, background: '#f9fafb', width: '100%', boxSizing: 'border-box' }}>
        {renderContent()}
      </main>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{ borderRadius: 16, padding: '16px', color: 'white', background: color, boxShadow: `0 4px 16px ${color}55` }}>
      <p style={{ fontSize: 13, opacity: 0.9, fontWeight: 600 }}>{label}</p>
      <p style={{ fontSize: 32, fontWeight: 900, marginTop: 4 }}>{value}</p>
    </div>
  );
}

function DashboardTab({ data }) {
  const { stats = {}, recentOrders = [], users = [] } = data;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <StatCard label="Total Users" value={stats.totalUsers || 0} color="#7c3aed" />
        <StatCard label="Active Subscribers" value={stats.activeSubscribers || 0} color="#059669" />
        <StatCard label="Total Orders" value={stats.totalOrders || 0} color="#f97316" />
        <StatCard label="Active Plans" value={stats.activeSubscribers || 0} color="#d97706" />
      </div>

      <div style={{ background: 'white', borderRadius: 16, padding: 16 }}>
        <h3 style={{ fontWeight: 800, marginBottom: 12, color: '#1f2937' }}>Recent Orders</h3>
        {recentOrders.length === 0
          ? <p style={{ color: '#9ca3af', textAlign: 'center', padding: '20px 0' }}>No orders yet</p>
          : recentOrders.map(o => (
            <div key={o._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f9fafb' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14 }}>{o.user?.name}</p>
                <p style={{ fontSize: 12, color: '#9ca3af' }}>{o.date}</p>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: '#dcfce7', color: '#16a34a' }}>{o.status}</span>
            </div>
          ))
        }
      </div>

      <div style={{ background: 'white', borderRadius: 16, padding: 16 }}>
        <h3 style={{ fontWeight: 800, marginBottom: 12, color: '#1f2937' }}>All Users</h3>
        {users.map(u => (
          <div key={u._id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #f9fafb' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
              {u.name?.[0]?.toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: '#1f2937' }}>{u.name}</p>
              <p style={{ fontSize: 12, color: '#9ca3af' }}>{u.phone}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: u.mealsLeft > 0 ? '#16a34a' : '#9ca3af' }}>{u.mealsLeft} meals</p>
              <p style={{ fontSize: 12, color: '#9ca3af' }}>{u.subscription || 'No plan'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UsersTab({ users, onRefresh, showToast }) {
  const [editUser, setEditUser] = useState(null);
  const [activateFor, setActivateFor] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('40meals');
  const [activating, setActivating] = useState(false);

  const handleUpdate = async () => {
    try {
      await adminUpdateUser(editUser._id, { mealsLeft: editUser.mealsLeft });
      showToast('User updated!');
      setEditUser(null);
      onRefresh();
    } catch (e) { showToast('Update failed', 'error'); }
  };

  const handleActivate = async () => {
    setActivating(true);
    try {
      await adminActivateSubscription(activateFor._id, selectedPlan);
      showToast(`${selectedPlan} plan activated for ${activateFor.name}!`);
      setActivateFor(null);
      onRefresh();
    } catch (e) { showToast('Activation failed', 'error'); }
    setActivating(false);
  };

  const PLAN_OPTIONS = [
    { id: '20meals', label: '20 Meals — ₹1,999' },
    { id: '40meals', label: '40 Meals — ₹3,499' },
    { id: 'monthly', label: 'Monthly (60) — ₹4,999' }
  ];

  return (
    <div>
      {/* Edit Meals Modal */}
      {editUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: 'white', borderRadius: 20, padding: 24, width: '100%', maxWidth: 360 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 4 }}>Edit {editUser.name}</h3>
            <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>Manually adjust meal count</p>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: 6 }}>Meals Remaining</label>
            <input type="number" value={editUser.mealsLeft}
              onChange={e => setEditUser({ ...editUser, mealsLeft: +e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '2px solid #f3f4f6', marginBottom: 16, fontSize: 15, fontFamily: 'Nunito' }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setEditUser(null)} style={{ flex: 1, padding: '11px', borderRadius: 12, border: '2px solid #f3f4f6', fontWeight: 700, background: 'white', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleUpdate} style={{ flex: 1, padding: '11px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #f97316, #ea580c)', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Activate Plan Modal */}
      {activateFor && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: 'white', borderRadius: 20, padding: 24, width: '100%', maxWidth: 360 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 4 }}>Activate Plan</h3>
            <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>for <strong>{activateFor.name}</strong></p>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: 8 }}>Select Plan</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {PLAN_OPTIONS.map(p => (
                <button key={p.id} onClick={() => setSelectedPlan(p.id)} style={{
                  padding: '12px 16px', borderRadius: 12, border: selectedPlan === p.id ? '2px solid #f97316' : '2px solid #f3f4f6',
                  background: selectedPlan === p.id ? '#fff7ed' : 'white',
                  color: selectedPlan === p.id ? '#f97316' : '#1f2937',
                  fontWeight: 700, fontSize: 14, textAlign: 'left', cursor: 'pointer'
                }}>
                  {selectedPlan === p.id ? '● ' : '○ '}{p.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setActivateFor(null)} style={{ flex: 1, padding: '11px', borderRadius: 12, border: '2px solid #f3f4f6', fontWeight: 700, background: 'white', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleActivate} disabled={activating} style={{ flex: 1, padding: '11px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #16a34a, #15803d)', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                {activating ? 'Activating...' : '✓ Activate'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {users.map(u => (
          <div key={u._id} style={{ background: 'white', borderRadius: 16, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, flexShrink: 0 }}>
                {u.name?.[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, color: '#1f2937' }}>{u.name}</p>
                <p style={{ fontSize: 13, color: '#9ca3af' }}>{u.phone}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 700, color: u.mealsLeft > 0 ? '#16a34a' : '#9ca3af', fontSize: 14 }}>{u.mealsLeft} meals</p>
                <p style={{ fontSize: 11, color: '#9ca3af' }}>{u.subscription || 'No plan'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={() => setEditUser(u)} style={{ flex: 1, padding: '8px', borderRadius: 10, border: '2px solid #f3f4f6', background: 'white', fontWeight: 700, fontSize: 12, color: '#6b7280', cursor: 'pointer' }}>
                ✏️ Edit Meals
              </button>
              <button onClick={() => { setActivateFor(u); setSelectedPlan('40meals'); }} style={{ flex: 1, padding: '8px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #f97316, #ea580c)', color: 'white', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                ✓ Activate Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuTab({ menus, onRefresh, showToast }) {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    date: today,
    mainDish: 'Paneer Butter Masala',
    sideDish: 'Dal Tadka',
    bread: 'Butter Roti (4 pcs)',
    extras: 'Jeera Rice, Green Salad, Pickle',
    deliveryTime: '12:00 PM - 2:00 PM'
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await createOrUpdateMenu(form);
      showToast('Menu saved!');
      onRefresh();
    } catch (e) { showToast('Failed to save menu', 'error'); }
    setSaving(false);
  };

  const fields = [
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'mainDish', label: '🍛 Main Dish' },
    { key: 'sideDish', label: '🥣 Side Dish' },
    { key: 'bread', label: '🫓 Bread' },
    { key: 'extras', label: '🥗 Extras' },
    { key: 'deliveryTime', label: '🕐 Delivery Time' }
  ];

  return (
    <div>
      <div style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <h3 style={{ fontWeight: 800, marginBottom: 14, color: '#1f2937' }}>Set Menu for a Day</h3>
        {fields.map(f => (
          <div key={f.key} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', display: 'block', marginBottom: 4 }}>{f.label}</label>
            <input type={f.type || 'text'} value={form[f.key]}
              onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '2px solid #f3f4f6', fontSize: 14, fontFamily: 'Nunito' }} />
          </div>
        ))}
        <button onClick={handleSave} disabled={saving} style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #f97316, #ea580c)', color: 'white', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
          {saving ? 'Saving...' : '💾 Save Menu'}
        </button>
      </div>

      <h3 style={{ fontWeight: 800, marginBottom: 10, color: '#1f2937' }}>Past Menus</h3>
      {menus.length === 0
        ? <p style={{ textAlign: 'center', color: '#9ca3af', padding: 20 }}>No menus set yet</p>
        : menus.map(m => (
          <div key={m._id} onClick={() => setForm({ date: m.date, mainDish: m.mainDish, sideDish: m.sideDish, bread: m.bread, extras: m.extras, deliveryTime: m.deliveryTime })}
            style={{ background: 'white', borderRadius: 14, padding: '12px 16px', marginBottom: 8, cursor: 'pointer', border: '1px solid #f3f4f6' }}>
            <p style={{ fontWeight: 700, color: '#1f2937' }}>{m.date}</p>
            <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>{m.mainDish} · {m.sideDish}</p>
          </div>
        ))
      }
    </div>
  );
}

function SubsTab({ subs, onRefresh, showToast }) {
  const STATUS_COLORS = { active: '#16a34a', paused: '#d97706', completed: '#6b7280', cancelled: '#dc2626' };

  const togglePause = async (sub) => {
    const newStatus = sub.status === 'active' ? 'paused' : 'active';
    try {
      await adminUpdateSubscription(sub._id, { mealsLeft: sub.mealsLeft, status: newStatus });
      showToast(`Subscription ${newStatus}!`);
      onRefresh();
    } catch (e) { showToast('Update failed', 'error'); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {subs.length === 0
        ? <p style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>No subscriptions yet</p>
        : subs.map(s => (
          <div key={s._id} style={{ background: 'white', borderRadius: 16, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <p style={{ fontWeight: 700, color: '#1f2937' }}>{s.user?.name}</p>
                <p style={{ fontSize: 13, color: '#9ca3af' }}>{s.user?.phone}</p>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: `${STATUS_COLORS[s.status]}22`, color: STATUS_COLORS[s.status] }}>
                {s.status}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: 13, color: '#6b7280' }}>{s.planName} · {s.mealsLeft}/{s.totalMeals} meals left</p>
              <button onClick={() => togglePause(s)} style={{
                fontSize: 12, fontWeight: 700, padding: '6px 12px', borderRadius: 10, border: 'none',
                background: s.status === 'active' ? '#fee2e2' : '#dcfce7',
                color: s.status === 'active' ? '#dc2626' : '#16a34a', cursor: 'pointer'
              }}>
                {s.status === 'active' ? '⏸ Pause' : '▶ Activate'}
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

function OrdersTab({ orders, onRefresh, showToast }) {
  const STATUSES = ['pending', 'preparing', 'out_for_delivery', 'delivered', 'skipped'];
  const STATUS_COLORS = {
    pending: '#f59e0b', preparing: '#3b82f6', out_for_delivery: '#8b5cf6',
    delivered: '#16a34a', skipped: '#6b7280'
  };

  const updateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      showToast('Order updated!');
      onRefresh();
    } catch (e) { showToast('Update failed', 'error'); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {orders.length === 0
        ? <p style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>No orders yet</p>
        : orders.map(o => (
          <div key={o._id} style={{ background: 'white', borderRadius: 16, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 700, color: '#1f2937' }}>{o.user?.name}</p>
                <p style={{ fontSize: 13, color: '#9ca3af' }}>{o.date} · {o.user?.phone}</p>
              </div>
              <select value={o.status} onChange={e => updateStatus(o._id, e.target.value)}
                style={{
                  fontSize: 12, fontWeight: 700, padding: '6px 10px', borderRadius: 10,
                  border: `2px solid ${STATUS_COLORS[o.status] || '#f3f4f6'}`,
                  color: STATUS_COLORS[o.status] || '#1f2937', fontFamily: 'Nunito', cursor: 'pointer'
                }}>
                {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
          </div>
        ))
      }
    </div>
  );
}
