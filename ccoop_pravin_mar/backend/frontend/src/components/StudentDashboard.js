import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  const [pledges, setPledges] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('username');

  useEffect(() => {
    // TODO: Fetch actual pledges from API
    // For now, using mock data
    setTimeout(() => {
      setPledges([
        {
          id: 1,
          drop: 'IIT Bombay Official Hoodies - Winter 2026',
          variant: 'Navy Blue, Size M',
          quantity: 2,
          status: 'Pledged',
          moqProgress: 65,
          campus: 'IIT Bombay'
        },
        {
          id: 2,
          drop: 'IIT Bombay Tech Fest T-Shirts',
          variant: 'White, Size L',
          quantity: 1,
          status: 'MOQ Reached - Payment Pending',
          moqProgress: 100,
          campus: 'IIT Bombay'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="loading">Loading your dashboard</div>;
  }

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            👤
          </div>
          <div>
            <h1 style={{ color: 'white', marginBottom: '0.25rem' }}>{username}</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>Student</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
        <div className="campus-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
          <h3>Wallet Balance</h3>
          <p style={{ fontSize: '1.5rem', color: '#667eea', fontWeight: 'bold' }}>₹0.00</p>
        </div>
        <div className="campus-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
          <h3>Active Pledges</h3>
          <p style={{ fontSize: '1.5rem', color: '#667eea', fontWeight: 'bold' }}>{pledges.length}</p>
        </div>
        <div className="campus-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
          <h3>Completed Orders</h3>
          <p style={{ fontSize: '1.5rem', color: '#667eea', fontWeight: 'bold' }}>0</p>
        </div>
      </div>

      {/* Active Pledges */}
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>My Active Pledges</h2>
          <Link to="/campuses" className="btn btn-primary">
            Browse More Drops
          </Link>
        </div>
      </div>

      {pledges.length === 0 ? (
        <div className="empty-state">
          <h3>No Active Pledges</h3>
          <p>Start exploring campus drops and pledge your interest!</p>
          <Link to="/campuses" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Explore Campuses
          </Link>
        </div>
      ) : (
        <div className="drop-grid">
          {pledges.map((pledge) => (
            <div key={pledge.id} className="drop-card">
              <div className="drop-card-image" style={{ height: '150px' }}>
                👕
              </div>
              <div className="drop-card-content">
                <h3>{pledge.drop}</h3>
                <p><strong>Variant:</strong> {pledge.variant}</p>
                <p><strong>Quantity:</strong> {pledge.quantity}</p>

                {/* Status Badge */}
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  background: pledge.status.includes('Payment') ? '#ffd700' : '#e0e0e0',
                  color: pledge.status.includes('Payment') ? '#000' : '#666',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  marginTop: '0.5rem'
                }}>
                  {pledge.status}
                </div>

                {/* MOQ Progress */}
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                    <span>MOQ Progress</span>
                    <span>{pledge.moqProgress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pledge.moqProgress}%`, height: '100%', background: pledge.moqProgress === 100 ? '#4caf50' : '#667eea', transition: 'width 0.3s' }}></div>
                  </div>
                </div>

                {/* Action Button */}
                {pledge.status.includes('Payment') ? (
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: '1rem', width: '100%' }}
                    onClick={() => alert('Payment gateway integration coming soon!')}
                  >
                    Pay Now
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    style={{ marginTop: '1rem', width: '100%' }}
                    onClick={() => alert('Share with friends to reach MOQ faster!')}
                  >
                    Share with Friends
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="page-header" style={{ marginTop: '2rem' }}>
        <h2>Quick Actions</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <Link to="/campuses" className="campus-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
          <h3>Browse Campuses</h3>
          <p>Discover drops from different campuses</p>
        </Link>
        <div className="campus-card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => alert('Order history coming soon!')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📜</div>
          <h3>Order History</h3>
          <p>View all your past orders</p>
        </div>
        <div className="campus-card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => alert('Profile settings coming soon!')}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚙️</div>
          <h3>Settings</h3>
          <p>Manage your profile and preferences</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
