import React, { useState } from 'react';

function AdminDashboard() {
  const username = localStorage.getItem('username');

  const [campuses] = useState([
    { id: 1, name: 'IIT Bombay', activeDrops: 2, pendingIssues: 1, totalOrders: 145 },
    { id: 2, name: 'IIT Delhi', activeDrops: 1, pendingIssues: 0, totalOrders: 89 },
    { id: 3, name: 'BITS Pilani', activeDrops: 1, pendingIssues: 0, totalOrders: 56 }
  ]);

  const [allActiveDrops] = useState([
    { id: 1, name: 'Official Hoodies - Winter 2026', campus: 'IIT Bombay', moqStatus: 65, paymentCollection: 45, issues: 1 },
    { id: 2, name: 'Tech Fest T-Shirts', campus: 'IIT Bombay', moqStatus: 100, paymentCollection: 95, issues: 0 },
    { id: 3, name: 'Alumni Reunion Collection', campus: 'IIT Delhi', moqStatus: 82, paymentCollection: 70, issues: 0 },
    { id: 4, name: 'Fest Merchandise', campus: 'BITS Pilani', moqStatus: 45, paymentCollection: 30, issues: 0 }
  ]);

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="page-header" style={{ background: '#ff6b35', color: 'white', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              👑
            </div>
            <div>
              <h1 style={{ color: 'white', marginBottom: '0.25rem' }}>{username}</h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  GLOBAL ADMIN
                </span>
                Platform Operations
              </p>
            </div>
          </div>
          <button onClick={() => alert('Notifications coming soon!')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', fontSize: '1.25rem' }}>
            🔔
          </button>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="page-header" style={{ marginTop: '2rem', marginBottom: '1rem', background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🌍</span> Platform Overview
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="campus-card" style={{ textAlign: 'center', background: '#1e2433', border: '1px solid rgba(255, 107, 53, 0.3)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎓</div>
          <h3>Total Campuses</h3>
          <p style={{ fontSize: '2rem', color: '#ff6b35', fontWeight: 'bold' }}>3</p>
        </div>
        <div className="campus-card" style={{ textAlign: 'center', background: '#1e2433', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
          <h3>Active Drops</h3>
          <p style={{ fontSize: '2rem', color: '#0ea5e9', fontWeight: 'bold' }}>4</p>
        </div>
        <div className="campus-card" style={{ textAlign: 'center', background: '#1e2433', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
          <h3>Total Orders</h3>
          <p style={{ fontSize: '2rem', color: '#10b981', fontWeight: 'bold' }}>290</p>
        </div>
        <div className="campus-card" style={{ textAlign: 'center', background: '#1e2433', border: '1px solid rgba(234, 179, 8, 0.3)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
          <h3>Platform Revenue</h3>
          <p style={{ fontSize: '2rem', color: '#eab308', fontWeight: 'bold' }}>₹1.2L</p>
        </div>
      </div>

      {/* All Campuses */}
      <div className="page-header" style={{ marginBottom: '1rem', background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>All Campuses</h2>
          <button className="btn btn-secondary" onClick={() => alert('Add campus coming soon!')}>
            ADD CAMPUS
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {campuses.map((campus) => (
          <div key={campus.id} className="campus-card" style={{ cursor: 'pointer' }} onClick={() => alert(`Viewing ${campus.name} details...`)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>{campus.name}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(14, 165, 233, 0.2)', color: '#0ea5e9', padding: '0.25rem 0.5rem', borderRadius: '8px', fontSize: '0.8rem' }}>
                    {campus.activeDrops} Active Drops
                  </span>
                  {campus.pendingIssues > 0 && (
                    <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '0.25rem 0.5rem', borderRadius: '8px', fontSize: '0.8rem' }}>
                      {campus.pendingIssues} Issues
                    </span>
                  )}
                </div>
              </div>
              <div style={{ fontSize: '2rem' }}>🎓</div>
            </div>
            <p style={{ margin: 0, color: '#9ca3af' }}>{campus.totalOrders} total orders</p>
          </div>
        ))}
      </div>

      {/* All Active Drops */}
      <div className="page-header" style={{ marginBottom: '1rem', background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}>
        <h2>All Active Drops (Cross-Campus)</h2>
      </div>

      <div className="drop-card">
        {allActiveDrops.map((drop, index) => (
          <div
            key={drop.id}
            style={{
              padding: '1rem',
              borderBottom: index < allActiveDrops.length - 1 ? '1px solid rgba(14, 165, 233, 0.2)' : 'none',
              cursor: 'pointer'
            }}
            onClick={() => alert(`Viewing ${drop.name} details...`)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, marginBottom: '0.25rem' }}>{drop.name}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.75rem' }}>
                  {drop.campus}
                  {drop.issues > 0 && (
                    <span style={{ marginLeft: '0.5rem', color: '#ef4444' }}>• {drop.issues} issue(s)</span>
                  )}
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span>MOQ Status</span>
                      <span>{drop.moqStatus}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: '#252d3d', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${drop.moqStatus}%`, height: '100%', background: drop.moqStatus === 100 ? '#10b981' : '#0ea5e9', transition: 'width 0.3s' }}></div>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span>Payment</span>
                      <span>{drop.paymentCollection}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: '#252d3d', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${drop.paymentCollection}%`, height: '100%', background: '#ff6b35', transition: 'width 0.3s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  alert('Manage drop coming soon!');
                }}
              >
                MANAGE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Actions */}
      <div className="page-header" style={{ marginTop: '2rem', marginBottom: '1rem', background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🚨</span> Pending Actions
        </h2>
      </div>

      <div className="drop-card">
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(14, 165, 233, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, marginBottom: '0.25rem', color: '#ff6b35' }}>MOQ Override Request</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#9ca3af' }}>IIT Bombay - Official Hoodies (Black XL: 18/25 pledges)</p>
            </div>
            <button className="btn btn-primary" onClick={() => alert('Override approval coming soon!')}>REVIEW</button>
          </div>
        </div>
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(14, 165, 233, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, marginBottom: '0.25rem', color: '#ef4444' }}>Refund Request</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#9ca3af' }}>Student ID: 225 - Tech Fest T-Shirt (₹599)</p>
            </div>
            <button className="btn btn-secondary" onClick={() => alert('Refund processing coming soon!')}>PROCESS</button>
          </div>
        </div>
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(14, 165, 233, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, marginBottom: '0.25rem', color: '#eab308' }}>Support Ticket</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#9ca3af' }}>IIT Delhi - Payment gateway issue (#1234)</p>
            </div>
            <button className="btn btn-secondary" onClick={() => alert('Support dashboard coming soon!')}>VIEW</button>
          </div>
        </div>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, marginBottom: '0.25rem', color: '#0ea5e9' }}>Manual Intervention</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#9ca3af' }}>BITS Pilani - Stock delivery delayed (Expected: 2 days)</p>
            </div>
            <button className="btn btn-secondary" onClick={() => alert('Intervention dashboard coming soon!')}>HANDLE</button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="page-header" style={{ marginTop: '2rem', marginBottom: '1rem', background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}>
        <h2>Quick Actions</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="campus-card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => alert('Campus management coming soon!')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
          <h3>All Campuses</h3>
          <p>Manage campus settings</p>
        </div>
        <div className="campus-card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => alert('Drops overview coming soon!')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚀</div>
          <h3>All Drops</h3>
          <p>View all active campaigns</p>
        </div>
        <div className="campus-card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => alert('User management coming soon!')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
          <h3>User Management</h3>
          <p>Manage users and roles</p>
        </div>
        <div className="campus-card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => alert('MOQ override panel coming soon!')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚙️</div>
          <h3>MOQ Override</h3>
          <p>Handle exception requests</p>
        </div>
        <div className="campus-card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => alert('Refund dashboard coming soon!')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💸</div>
          <h3>Refunds</h3>
          <p>Process refund requests</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
