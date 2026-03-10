import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../services/api';

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#f59e0b', bg: '#fef3c7' },
  preparing: { label: 'Preparing', color: '#3b82f6', bg: '#dbeafe' },
  out_for_delivery: { label: 'Out for Delivery', color: '#8b5cf6', bg: '#ede9fe' },
  delivered: { label: 'Delivered', color: '#16a34a', bg: '#dcfce7' },
  skipped: { label: 'Skipped', color: '#6b7280', bg: '#f3f4f6' },
  paused: { label: 'Paused', color: '#dc2626', bg: '#fee2e2' }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(res => setOrders(res.data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[1,2,3].map(i => <div key={i} className="shimmer" style={{ height: 90, borderRadius: 16 }} />)}
    </div>
  );

  return (
    <div className="animate-slide-up">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1f2937' }}>Order History</h2>
        <p style={{ color: '#9ca3af', fontSize: 14, marginTop: 2 }}>Your past deliveries</p>
      </div>

      {orders.length === 0 ? (
        <div style={{
          background: 'white', borderRadius: 20, padding: '48px 24px',
          textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>📋</div>
          <p style={{ fontWeight: 700, color: '#6b7280', fontSize: 16 }}>No orders yet</p>
          <p style={{ color: '#9ca3af', fontSize: 14, marginTop: 4 }}>Subscribe to a plan to start receiving meals</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {orders.map(order => {
            const s = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
            return (
              <div key={order._id} style={{
                background: 'white', borderRadius: 18, padding: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 700, color: '#1f2937', fontSize: 15 }}>
                      {new Date(order.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    {order.menuSnapshot?.mainDish && (
                      <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{order.menuSnapshot.mainDish}</p>
                    )}
                    {order.deliveryTime && (
                      <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>🕐 {order.deliveryTime}</p>
                    )}
                  </div>
                  <span style={{
                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                    background: s.bg, color: s.color
                  }}>{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
