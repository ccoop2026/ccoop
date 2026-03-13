import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CuratorDashboard() {
  const username = localStorage.getItem('username');
  const campus = username?.includes('iitb') ? 'IIT Bombay' : username?.includes('iitd') ? 'IIT Delhi' : 'Campus';

  const [activeDrops] = useState([
    {
      id: 1,
      title: 'Official Hoodies - Winter 2026',
      description: 'Premium quality hoodies with campus branding',
      moqProgress: 65,
      pledgeCount: 52,
      targetMoq: 80,
      paymentCollection: 45,
      status: 'Active - Pledging'
    },
    {
      id: 2,
      title: 'Tech Fest T-Shirts',
      description: 'Limited edition fest merchandise',
      moqProgress: 100,
      pledgeCount: 120,
      targetMoq: 120,
      paymentCollection: 95,
      status: 'MOQ Reached - Payment Phase'
    }
  ]);

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="page-header" style={{ background: '#0ea5e9', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              🎯
            </div>
            <div>
              <h1 style={{ color: 'white', marginBottom: '0.25rem' }}>{username}</h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  CAMPUS CURATOR
                </span>
                {campus}
              </p>
            </div>
          </div>
          <button onClick={() => alert('Notifications coming soon!')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', fontSize: '1.25rem' }}>
            🔔
          </button>
        </div>
      </div>

      {/* Create New Drop CTA */}
      <div
        className="campus-card"
        style={{
          background: '#0ea5e9',
          color: 'white',
          cursor: 'pointer',
          marginBottom: '2rem',
          border: 'none',
          transition: 'transform 0.2s'
        }}
        onClick={() => alert('Drop creation form coming soon!')}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>➕</div>
          <div>
            <h2 style={{ color: 'white', marginBottom: '0.25rem' }}>Create New Drop</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>Launch a new campaign for your campus</p>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: '1.5rem' }}>→</div>
        </div>
      </div>

      {/* Drop Performance Analytics */}
      <div className="page-header" style={{ marginBottom: '1rem', background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>📊</span> Drop Performance
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="campus-card" style={{ textAlign: 'center', background: '#1e2433', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
          <h3>Total Pledges</h3>
          <p style={{ fontSize: '2rem', color: '#0ea5e9', fontWeight: 'bold' }}>172</p>
        </div>
        <div className="campus-card" style={{ textAlign: 'center', background: '#1e2433', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
          <h3>Revenue Collected</h3>
          <p style={{ fontSize: '2rem', color: '#0ea5e9', fontWeight: 'bold' }}>₹45,800</p>
        </div>
        <div className="campus-card" style={{ textAlign: 'center', background: '#1e2433', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
          <h3>Items Dispatched</h3>
          <p style={{ fontSize: '2rem', color: '#0ea5e9', fontWeight: 'bold' }}>34</p>
        </div>
        <div className="campus-card" style={{ textAlign: 'center', background: '#1e2433', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
          <h3>Conversion Rate</h3>
          <p style={{ fontSize: '2rem', color: '#0ea5e9', fontWeight: 'bold' }}>78%</p>
        </div>
      </div>

      {/* My Active Drops */}
      <div className="page-header" style={{ marginBottom: '1rem', background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>My Active Drops</h2>
          <button className="btn btn-secondary" onClick={() => alert('Drop archive coming soon!')}>
            VIEW ARCHIVE
          </button>
        </div>
      </div>

      <div className="drop-grid">
        {activeDrops.map((drop) => (
          <div key={drop.id} className="drop-card">
            <div className="drop-card-image" style={{ height: '150px', fontSize: '3rem' }}>
              👕
            </div>
            <div className="drop-card-content">
              <h3>{drop.title}</h3>
              <p>{drop.description}</p>

              {/* Status Badge */}
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                background: drop.moqProgress === 100 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(14, 165, 233, 0.2)',
                color: drop.moqProgress === 100 ? '#10b981' : '#0ea5e9',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                {drop.status}
              </div>

              {/* Stats */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span>Pledges: {drop.pledgeCount}/{drop.targetMoq}</span>
                  <span>MOQ: {drop.moqProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#252d3d', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${drop.moqProgress}%`, height: '100%', background: drop.moqProgress === 100 ? '#10b981' : '#0ea5e9', transition: 'width 0.3s' }}></div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span>Payment Collection</span>
                  <span>{drop.paymentCollection}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#252d3d', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${drop.paymentCollection}%`, height: '100%', background: '#ff6b35', transition: 'width 0.3s' }}></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-primary"
                  style={{ width: '50%' }}
                  onClick={() => alert('Drop editor coming soon!')}
                >
                  Edit
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ width: '50%' }}
                  onClick={() => alert('Analytics view coming soon!')}
                >
                  Analytics
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Actions */}
      <div className="page-header" style={{ marginTop: '2rem', marginBottom: '1rem', background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span> Pending Actions
        </h2>
      </div>

      <div className="drop-card">
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(14, 165, 233, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, marginBottom: '0.25rem', color: '#ff6b35' }}>Payment Window Expiring</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#9ca3af' }}>Tech Fest T-Shirts - 24 hours remaining</p>
            </div>
            <button className="btn btn-secondary" onClick={() => alert('Extend window coming soon!')}>EXTEND</button>
          </div>
        </div>
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(14, 165, 233, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, marginBottom: '0.25rem', color: '#ef4444' }}>Variant Failed MOQ</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#9ca3af' }}>Official Hoodies - Black XL (18/25 pledges)</p>
            </div>
            <button className="btn btn-secondary" onClick={() => alert('Override MOQ coming soon!')}>REVIEW</button>
          </div>
        </div>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, marginBottom: '0.25rem', color: '#0ea5e9' }}>Production Approval Needed</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#9ca3af' }}>Tech Fest T-Shirts - Approve vendor quote</p>
            </div>
            <button className="btn btn-primary" onClick={() => alert('Production approval coming soon!')}>APPROVE</button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="page-header" style={{ marginTop: '2rem', marginBottom: '1rem', background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}>
        <h2>Quick Actions</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div className="campus-card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => alert('Drop creator coming soon!')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>➕</div>
          <h3>Create Drop</h3>
          <p>Launch a new campaign</p>
        </div>
        <div className="campus-card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => alert('Analytics dashboard coming soon!')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
          <h3>View Analytics</h3>
          <p>Deep dive into performance</p>
        </div>
        <div className="campus-card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => alert('Variant manager coming soon!')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚙️</div>
          <h3>Manage Variants</h3>
          <p>Edit variants and pricing</p>
        </div>
      </div>
    </div>
  );
}

export default CuratorDashboard;
