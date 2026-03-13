import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('auth_token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        ccoop.in
      </Link>

      <ul className="navbar-nav">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                My Dashboard
              </Link>
            </li>
            <li>
              <Link to="/campuses" className={`nav-link ${isActive('/campuses')}`}>
                Browse Drops
              </Link>
            </li>
            {username && username.includes('host') && (
              <li>
                <Link to="/host-dashboard" className={`nav-link ${isActive('/host-dashboard')}`}>
                  Host Dashboard
                </Link>
              </li>
            )}
            <li>
              <span className="nav-link" style={{ cursor: 'default' }}>
                Hello, {username}
              </span>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={`nav-link ${isActive('/login')}`}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
