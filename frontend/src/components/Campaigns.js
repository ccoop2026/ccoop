import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Campaigns() {
  const userCampuses = JSON.parse(localStorage.getItem('user_campuses') || '{}');
  const campuses = [userCampuses.primary, userCampuses.secondary].filter(Boolean);

  const [selectedCampus, setSelectedCampus] = useState(campuses[0] || null);
  const [drops, setDrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem('ccoop_cart') || 'null')
  );
  const [showCartPrompt, setShowCartPrompt] = useState(false);
  const [pendingSwitch, setPendingSwitch] = useState(null);

  useEffect(() => {
    if (!selectedCampus) return;
    setLoading(true);
    fetch(`/api/drops/?campus=${selectedCampus.slug}`)
      .then(r => r.json())
      .then(data => { setDrops(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [selectedCampus]);

  const addToCart = (drop, variant) => {
    const newCart = {
      dropId: drop.id,
      dropTitle: drop.title,
      variantId: variant.id,
      variantColor: variant.color,
      variantSize: variant.size,
      campusSlug: selectedCampus?.slug,
      fulfilled: false
    };
    setCart(newCart);
    localStorage.setItem('ccoop_cart', JSON.stringify(newCart));
  };

  const exitCart = () => {
    setCart(null);
    localStorage.removeItem('ccoop_cart');
    setShowCartPrompt(false);
    if (pendingSwitch) {
      setSelectedCampus(pendingSwitch);
      setPendingSwitch(null);
    }
  };

  const handleCampusSwitch = (campus) => {
    if (cart && !cart.fulfilled) {
      setPendingSwitch(campus);
      setShowCartPrompt(true);
    } else {
      setSelectedCampus(campus);
    }
  };

  if (!campuses.length) {
    return (
      <div className="container">
        <div className="empty-state">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏫</div>
          <h3>No Campus Linked</h3>
          <p>You need to link a campus to view campaigns.</p>
          <Link to="/register" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Complete Setup
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">

      {/* Cart exit prompt */}
      {showCartPrompt && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 style={{ color: '#e0e6ed', marginBottom: '0.75rem' }}>Unfulfilled Cart</h3>
            <p style={{ color: '#9ca3af' }}>
              You have an active cart for <strong style={{ color: '#e0e6ed' }}>{cart?.dropTitle}</strong>.
              Switching campus will exit your current cart. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button
                className="btn btn-secondary"
                onClick={() => { setShowCartPrompt(false); setPendingSwitch(null); }}
              >
                Stay in Cart
              </button>
              <button className="btn btn-primary" onClick={exitCart}>
                Exit Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Active Campaigns</span>
        </div>
        <h1>Active Campaigns</h1>
        <p>Pre-order exclusive campus merchandise</p>
      </div>

      {/* Campus switcher — only shown when user has multiple campuses */}
      {campuses.length > 1 && (
        <div className="campus-switcher">
          {campuses.map((campus, i) => (
            <button
              key={i}
              className={`campus-tab ${selectedCampus?.id === campus.id ? 'active' : ''}`}
              onClick={() => handleCampusSwitch(campus)}
            >
              {campus.name}
            </button>
          ))}
        </div>
      )}

      {/* Cart banner */}
      {cart && !cart.fulfilled && (
        <div className="cart-banner">
          <span>
            🛒 Cart active: <strong>{cart.dropTitle}</strong> — {cart.variantColor}
            {cart.variantSize && ` / ${cart.variantSize}`}
          </span>
          <button className="cart-banner-exit" onClick={() => {
            setShowCartPrompt(true);
            setPendingSwitch(null);
          }}>
            Exit Cart
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading campaigns</div>
      ) : drops.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
          <h3>No Active Campaigns</h3>
          <p>There are no active campaigns for {selectedCampus?.name} right now.</p>
          <p style={{ marginTop: '0.75rem', color: '#0ea5e9', fontWeight: '500' }}>
            We'll notify you when new campaigns go live!
          </p>
        </div>
      ) : (
        <div className="drop-grid">
          {drops.map(drop => {
            const inCart = cart?.dropId === drop.id;
            const cartBlocked = !!cart && !inCart;

            return (
              <div key={drop.id} className="drop-card">
                <div className="drop-card-image">🎽</div>
                <div className="drop-card-content">
                  <h3>{drop.title}</h3>
                  <p>{drop.description}</p>

                  {drop.variants?.length > 0 && (
                    <div className="variants-container">
                      <span className="variants-label">Available Options:</span>
                      <div className="variant-pills">
                        {[...new Set(drop.variants.map(v => v.color))].map((color, idx) => (
                          <span key={idx} className="variant-pill">{color}</span>
                        ))}
                      </div>
                      <div className="variant-pills" style={{ marginTop: '0.5rem' }}>
                        {[...new Set(drop.variants.map(v => v.size))].filter(Boolean).map((size, idx) => (
                          <span key={idx} className="variant-pill">Size: {size}</span>
                        ))}
                      </div>
                      {drop.variants[0]?.moq && (
                        <div className="moq-badge">MOQ: {drop.variants[0].moq} units</div>
                      )}
                    </div>
                  )}

                  {inCart ? (
                    <div className="cart-active-badge">
                      ✓ In Cart — {cart.variantColor}
                      {cart.variantSize && ` / ${cart.variantSize}`}
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary"
                      style={{ marginTop: '1rem', width: '100%' }}
                      disabled={cartBlocked}
                      title={cartBlocked ? 'Exit your current cart first' : ''}
                      onClick={() => drop.variants?.length > 0 && addToCart(drop, drop.variants[0])}
                    >
                      {cartBlocked ? 'Exit current cart first' : 'Pledge Interest'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Campaigns;
