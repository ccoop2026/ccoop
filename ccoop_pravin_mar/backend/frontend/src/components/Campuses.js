import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Campuses() {
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/campuses/')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load campuses');
        return r.json();
      })
      .then((data) => {
        setCampuses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading campuses</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Explore Campuses</h1>
        <p>Select your campus to discover exclusive merchandise drops</p>
      </div>

      {campuses.length === 0 ? (
        <div className="empty-state">
          <h3>No Campuses Available</h3>
          <p>Check back soon for new campus additions!</p>
        </div>
      ) : (
        <div className="campus-grid">
          {campuses.map((campus) => (
            <Link
              to={`/campuses/${campus.slug}`}
              key={campus.id}
              className="campus-card"
            >
              <h3>{campus.name}</h3>
              <p>{campus.description || 'Explore exclusive campus merchandise'}</p>
              <span className="campus-badge">View Drops</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Campuses;
