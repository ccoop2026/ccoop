import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function DropHostDashboard() {
  const username = localStorage.getItem('username');
  const [activities] = useState([
    { id: 1, type: 'fulfilled', text: 'Order #3421 Fulfilled', time: '12 mins ago', detail: 'Picked up by Student ID 441' },
    { id: 2, type: 'arrival', text: 'Stock Delivery Arrived', time: '45 mins ago', detail: '12 boxes pending scan' },
    { id: 3, type: 'fulfilled', text: 'Order #3418 Fulfilled', time: '1 hour ago', detail: 'Picked up by Student ID 225' }
  ]);

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="page-header" style={{ background: '#ff6b35', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              📦
            </div>
            <div>
              <h1 style={{ color: 'white', marginBottom: '0.25rem' }}>{username}</h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: '#ff8c61', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  DROP HOST
                </span>
                IIT Bombay Campus Hub
              </p>
            </div>
          </div>
          <button onClick={() => alert('Notifications coming soon!')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', fontSize: '1.25rem' }}>
            🔔
          </button>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="page-header" style={{ marginTop: '2rem', marginBottom: '1rem', background: 'transparent', boxShadow: 'none', padding: 0 }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>📊</span> Daily Summary
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {/* Pickups Today */}
        <div className="campus-card" style={{ background: '#ffe8e0', border: '2px solid #ff6b35' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#ff6b35', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>PICKUPS TODAY</p>
              <h1 style={{ fontSize: '3rem', color: '#ff6b35', margin: '0.5rem 0' }}>24</h1>
              <p style={{ color: '#ff8c61', fontSize: '0.9rem', fontStyle: 'italic' }}>12 completed</p>
            </div>
            <div style={{ fontSize: '3rem' }}>📦</div>
          </div>
        </div>

        {/* Pending Stock */}
        <div className="campus-card" style={{ background: '#e3f2fd', border: '2px solid #2196f3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#1976d2', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>PENDING STOCK</p>
              <h1 style={{ fontSize: '3rem', color: '#2196f3', margin: '0.5rem 0' }}>08</h1>
              <p style={{ color: '#ff6b35', fontSize: '0.9rem', fontWeight: 'bold' }}>Requires scanning</p>
            </div>
            <div style={{ fontSize: '3rem' }}>📥</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="page-header" style={{ marginBottom: '1rem', background: 'transparent', boxShadow: 'none', padding: 0 }}>
        <h2>Quick Actions</h2>
      </div>

      {/* Primary Action */}
      <div
        className="campus-card"
        style={{
          background: '#ff6b35',
          color: 'white',
          cursor: 'pointer',
          marginBottom: '1rem',
          transition: 'transform 0.2s'
        }}
        onClick={() => alert('QR Scanner coming soon!')}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>📷</div>
          <div>
            <h3 style={{ color: 'white', marginBottom: '0.25rem' }}>Scan Incoming Stock</h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>Verify shipment arrivals with QR scanning</p>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: '1.5rem' }}>→</div>
        </div>
      </div>

      {/* Secondary Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div className="campus-card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => alert('Fulfillment dashboard coming soon!')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
          <h3>Fulfill Pickups</h3>
          <p>Process student pickup requests</p>
        </div>

        <div className="campus-card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => alert('Manifest viewer coming soon!')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
          <h3>View Manifest</h3>
          <p>Check expected stock deliveries</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="page-header" style={{ marginTop: '2rem', marginBottom: '1rem', background: 'transparent', boxShadow: 'none', padding: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Recent Activity</h2>
          <button className="btn btn-secondary" onClick={() => alert('Full activity log coming soon!')}>
            SEE ALL
          </button>
        </div>
      </div>

      <div className="drop-card">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            style={{
              padding: '1rem',
              borderBottom: index < activities.length - 1 ? '1px solid #e0e0e0' : 'none',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}
          >
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: activity.type === 'fulfilled' ? '#4caf50' : '#ff6b35',
              marginTop: '0.25rem'
            }}></div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, marginBottom: '0.25rem' }}>{activity.text}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#999' }}>
                {activity.time} • {activity.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation Hint */}
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f5f5f5', borderRadius: '10px', textAlign: 'center' }}>
        <p style={{ margin: 0, color: '#666' }}>
          💡 <strong>Tip:</strong> Use the Scanner tab at the bottom to quickly scan QR codes for incoming stock and student pickups
        </p>
      </div>
    </div>
  );
}

export default DropHostDashboard;
