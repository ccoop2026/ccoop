import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const isAuthenticated = localStorage.getItem('auth_token');

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Welcome to ccoop.in
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Your campus marketplace for exclusive merchandise drops
        </p>

        <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>What We Offer:</h3>
          <ul style={{ color: '#666', lineHeight: '2', listStylePosition: 'inside' }}>
            <li>Demand-validated pre-order drops with MOQ</li>
            <li>Exclusive campus-specific merchandise</li>
            <li>Flexible payment options (50% advance or full)</li>
            <li>Easy campus pickup system</li>
            <li>Multi-campus browsing</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {isAuthenticated ? (
            <Link to="/campuses" className="btn btn-primary" style={{ flex: 1 }}>
              Browse Campuses
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary" style={{ flex: 1 }}>
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary" style={{ flex: 1 }}>
                Sign In
              </Link>
            </>
          )}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f5f5f5', borderRadius: '10px' }}>
          <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>How It Works:</h4>
          <ol style={{ color: '#666', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
            <li>Select your campus</li>
            <li>Browse active merchandise drops</li>
            <li>Pledge interest in your favorite items</li>
            <li>Pay when MOQ is reached</li>
            <li>Pick up at your campus</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Home;
