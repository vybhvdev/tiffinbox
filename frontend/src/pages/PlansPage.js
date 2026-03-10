import React from 'react';
import { useAuth } from '../context/AuthContext';

const PLANS = [
  { id: '20meals', name: '20 Meals', meals: 20, price: 1999, perMeal: 100, popular: false },
  { id: '40meals', name: '40 Meals', meals: 40, price: 3499, perMeal: 87, popular: true },
  { id: 'monthly', name: 'Monthly', meals: 60, price: 4999, perMeal: 83, popular: false }
];

const FEATURES = ['Free delivery', 'Skip anytime', 'Pause option'];

export default function PlansPage() {
  const { user } = useAuth();
  const currentPlan = user?.subscription;

  return (
    <div className="animate-slide-up">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: '#1f2937' }}>Choose Your Plan</h2>
        <p style={{ color: '#9ca3af', marginTop: 4, fontWeight: 600 }}>Fresh homemade meals delivered daily</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {PLANS.map(plan => {
          const isActive = currentPlan === plan.id;
          return (
            <div key={plan.id} style={{
              background: 'white', borderRadius: 20, padding: 20, position: 'relative',
              border: isActive ? '2.5px solid #16a34a' : plan.popular ? '2.5px solid #f97316' : '2px solid #f3f4f6',
              boxShadow: plan.popular ? '0 8px 32px rgba(249,115,22,0.15)' : '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              {isActive && (
                <div style={{
                  position: 'absolute', top: -1, right: 16,
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: 'white', fontSize: 10, fontWeight: 900,
                  padding: '4px 12px', borderRadius: '0 0 10px 10px', letterSpacing: 1
                }}>✓ ACTIVE</div>
              )}
              {plan.popular && !isActive && (
                <div style={{
                  position: 'absolute', top: -1, right: 16,
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: 'white', fontSize: 10, fontWeight: 900,
                  padding: '4px 12px', borderRadius: '0 0 10px 10px', letterSpacing: 1
                }}>POPULAR</div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: 20, color: '#1f2937' }}>{plan.name}</h3>
                  <p style={{ color: '#9ca3af', fontSize: 14, marginTop: 2 }}>{plan.meals} meals</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 26, fontWeight: 900, color: '#f97316' }}>₹{plan.price.toLocaleString()}</p>
                  <p style={{ fontSize: 13, color: '#9ca3af' }}>₹{plan.perMeal}/meal</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                {FEATURES.map(f => (
                  <span key={f} style={{ fontSize: 13, color: '#6b7280', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#f97316' }}>✓</span> {f}
                  </span>
                ))}
              </div>

              <div style={{
                padding: '12px 16px', borderRadius: 12,
                background: isActive ? '#dcfce7' : '#fff7ed',
                border: isActive ? '1px solid #bbf7d0' : '1px solid #fed7aa'
              }}>
                <p style={{
                  fontSize: 13, fontWeight: 700, textAlign: 'center',
                  color: isActive ? '#16a34a' : '#92400e'
                }}>
                  {isActive
                    ? `✓ Currently active — ${user?.mealsLeft} meals remaining`
                    : '📞 Contact us or ask admin to activate this plan'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 20, padding: '16px', borderRadius: 16,
        background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'center'
      }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#1f2937', marginBottom: 4 }}>
          📲 How to Subscribe
        </p>
        <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.6 }}>
          Contact us on WhatsApp or call us to place your order. Once payment is received, admin will activate your plan within minutes.
        </p>
      </div>
    </div>
  );
}
