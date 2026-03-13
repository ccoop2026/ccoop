import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CampusDrops() {
  const { slug } = useParams();
  const [drops, setDrops] = useState([]);
  const [campus, setCampus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/campuses/').then(r => r.json()),
      fetch(`/api/drops/?campus=${slug}`).then(r => r.json())
    ])
      .then(([campusData, dropsData]) => {
        const foundCampus = campusData.find(c => c.slug === slug);
        setCampus(foundCampus);
        setDrops(dropsData);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load drops');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="loading">Loading drops</div>;
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
        <div className="breadcrumb">
          <Link to="/campuses">Campuses</Link>
          <span>/</span>
          <span>{campus?.name}</span>
        </div>
        <h1>{campus?.name} Drops</h1>
        <p>Exclusive merchandise available for {campus?.name} students</p>
      </div>

      {drops.length === 0 ? (
        <div className="empty-state">
          <h3>No Active Drops</h3>
          <p>There are no active drops for this campus right now. Check back soon!</p>
          <Link to="/campuses" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Browse Other Campuses
          </Link>
        </div>
      ) : (
        <div className="drop-grid">
          {drops.map((drop) => (
            <div key={drop.id} className="drop-card">
              <div className="drop-card-image">
                👕
              </div>
              <div className="drop-card-content">
                <h3>{drop.title}</h3>
                <p>{drop.description}</p>

                {drop.variants && drop.variants.length > 0 && (
                  <div className="variants-container">
                    <span className="variants-label">Available Options:</span>
                    <div className="variant-pills">
                      {[...new Set(drop.variants.map(v => v.color))].map((color, idx) => (
                        <span key={idx} className="variant-pill">
                          {color}
                        </span>
                      ))}
                    </div>
                    <div className="variant-pills" style={{ marginTop: '0.5rem' }}>
                      {[...new Set(drop.variants.map(v => v.size))].filter(s => s).map((size, idx) => (
                        <span key={idx} className="variant-pill">
                          Size: {size}
                        </span>
                      ))}
                    </div>
                    {drop.variants[0]?.moq && (
                      <div className="moq-badge">
                        MOQ: {drop.variants[0].moq} units
                      </div>
                    )}
                  </div>
                )}

                <button
                  className="btn btn-primary"
                  style={{ marginTop: '1rem', width: '100%' }}
                  onClick={() => alert('Pledge functionality coming soon!')}
                >
                  Pledge Interest
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CampusDrops;
