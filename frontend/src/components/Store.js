import React from 'react';
import { Link } from 'react-router-dom';

function Store() {
  return (
    <div className="container">
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Store</span>
        </div>
        <h1>Store</h1>
        <p>Campus merchandise available for direct purchase</p>
      </div>

      <div className="empty-state">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏪</div>
        <h3>Store Not Yet Active</h3>
        <p>The store for your campus isn't live yet.</p>
        <p style={{ marginTop: '0.75rem', color: '#0ea5e9', fontWeight: '500' }}>
          We'll notify you when it opens!
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Store;
