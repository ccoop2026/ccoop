import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const isAuthenticated = localStorage.getItem('auth_token');
  const username = localStorage.getItem('username');
  const userCampuses = JSON.parse(localStorage.getItem('user_campuses') || '{}');
  const campuses = [userCampuses.primary, userCampuses.secondary].filter(Boolean);

  // ─── Unauthenticated: Landing Page ───────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: '600px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to ccoop.in</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Your campus marketplace for exclusive merchandise drops
          </p>

          <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <h3 style={{ marginBottom: '1rem', color: '#e0e6ed' }}>What We Offer:</h3>
            <ul style={{ color: '#9ca3af', lineHeight: '2', listStylePosition: 'inside' }}>
              <li>Demand-validated pre-order drops with MOQ</li>
              <li>Exclusive campus-specific merchandise</li>
              <li>Flexible payment options (50% advance or full)</li>
              <li>Easy campus pickup system</li>
              <li>Multi-campus browsing</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary" style={{ flex: 1 }}>
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{ flex: 1 }}>
              Sign In
            </Link>
          </div>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#252d3d', borderRadius: '10px', border: '1px solid rgba(14,165,233,0.2)' }}>
            <h4 style={{ marginBottom: '0.5rem', color: '#e0e6ed' }}>How It Works:</h4>
            <ol style={{ color: '#9ca3af', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
              <li>Select your campus during signup</li>
              <li>Browse active merchandise campaigns</li>
              <li>Pledge interest in your favourite items</li>
              <li>Pay when MOQ is reached</li>
              <li>Pick up at your campus</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // ─── Authenticated: Home with Channel Cards ───────────────────────────────
  return (
    <div className="container">
      <div className="page-header" style={{ marginTop: '2rem' }}>
        <h1>Welcome back{username ? `, ${username}` : ''}!</h1>
        {campuses.length > 0 ? (
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Your campuses:</span>
            {campuses.map((c, i) => (
              <span key={i} className="campus-badge">
                {i === 0 ? '🏫' : '🏛'} {c.name}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ color: '#9ca3af', marginTop: '0.5rem' }}>
            No campus linked yet —{' '}
            <Link to="/register" style={{ color: '#0ea5e9' }}>complete your profile</Link>
          </p>
        )}
      </div>

      <div className="channel-grid">
        <Link to="/campaigns" className="channel-card">
          <div className="channel-icon">🛍️</div>
          <div className="channel-info">
            <h2>Active Campaigns</h2>
            <p>Pre-order exclusive campus merchandise drops</p>
          </div>
          <span className="channel-arrow">→</span>
        </Link>

        <Link to="/store" className="channel-card">
          <div className="channel-icon">🏪</div>
          <div className="channel-info">
            <h2>Store</h2>
            <p>Browse available campus merchandise</p>
          </div>
          <span className="channel-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export default Home;
