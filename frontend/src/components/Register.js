import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CampusDropdown({ label, campusList, excludeId, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showNotify, setShowNotify] = useState(false);
  const [notifyContact, setNotifyContact] = useState('');
  const [notifyType, setNotifyType] = useState('email');
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setShowNotify(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = campusList.filter(c =>
    (!excludeId || c.id !== excludeId) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (campus) => {
    onChange(campus);
    setOpen(false);
    setSearch('');
    setShowNotify(false);
  };

  const handleNotifySubmit = (e) => {
    e.stopPropagation();
    if (!notifyContact.trim()) return;
    // TODO: send to backend
    setNotifySubmitted(true);
  };

  return (
    <div className="form-group" ref={ref} style={{ position: 'relative' }}>
      <label>{label}</label>
      <button
        type="button"
        className="campus-select-trigger"
        onClick={() => { setOpen(o => !o); setShowNotify(false); }}
      >
        <span className={value ? 'trigger-value' : 'trigger-placeholder'}>
          {value ? `🏫 ${value.name}` : 'Select campus...'}
        </span>
        <span className={`trigger-chevron ${open ? 'open' : ''}`}>▾</span>
      </button>

      {open && (
        <div className={`campus-select-menu ${showNotify ? 'campus-select-menu--notfound' : ''}`}>
          {!showNotify ? (
            <>
              <div className="campus-select-search">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search campus..."
                  autoFocus
                  onClick={e => e.stopPropagation()}
                />
              </div>

              <div className="campus-select-list">
                {filtered.length > 0 ? (
                  filtered.map(c => (
                    <div
                      key={c.id}
                      className={`campus-select-option ${value?.id === c.id ? 'selected' : ''}`}
                      onClick={() => handleSelect(c)}
                    >
                      <span className="option-name">{c.name}</span>
                      {c.description && <span className="option-desc">{c.description}</span>}
                    </div>
                  ))
                ) : (
                  <div className="campus-select-empty">No results for "{search}"</div>
                )}
              </div>

              {/* Always-visible footer */}
              <div
                className="campus-notlisted-footer"
                onClick={e => { e.stopPropagation(); setShowNotify(true); setNotifySubmitted(false); }}
              >
                🔍 My campus is not listed
              </div>
            </>
          ) : (
            /* ── Not listed panel ─────────────────────────────────── */
            <div className="campus-notfound-panel" onClick={e => e.stopPropagation()}>
              <button
                type="button"
                className="notfound-back"
                onClick={() => setShowNotify(false)}
              >
                ← Back to list
              </button>

              <p className="notfound-title">Campus not listed?</p>

              <div className="notfound-contact-row">
                <p className="notfound-label">Reach out to admin to get your campus added:</p>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  <a href="mailto:admin@ccoop.in" className="contact-link contact-mail">
                    ✉ admin@ccoop.in
                  </a>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link contact-whatsapp"
                  >
                    💬 WhatsApp Admin
                  </a>
                </div>
              </div>

              <div className="notfound-divider" />

              {notifySubmitted ? (
                <div className="notfound-success">
                  ✓ We'll notify you at <strong>{notifyContact}</strong> when your campus goes live.
                </div>
              ) : (
                <>
                  <p className="notfound-label">Get notified when your campus is added:</p>
                  <div className="notify-type-toggle">
                    <button
                      type="button"
                      className={`notify-type-btn ${notifyType === 'email' ? 'active' : ''}`}
                      onClick={() => setNotifyType('email')}
                    >
                      ✉ Email
                    </button>
                    <button
                      type="button"
                      className={`notify-type-btn ${notifyType === 'whatsapp' ? 'active' : ''}`}
                      onClick={() => setNotifyType('whatsapp')}
                    >
                      💬 WhatsApp
                    </button>
                  </div>
                  <div className="notify-input-row">
                    <input
                      type={notifyType === 'email' ? 'email' : 'tel'}
                      value={notifyContact}
                      onChange={e => setNotifyContact(e.target.value)}
                      placeholder={notifyType === 'email' ? 'your@email.com' : '+91 XXXXXXXXXX'}
                      onClick={e => e.stopPropagation()}
                    />
                    <button
                      type="button"
                      className="notify-submit-btn"
                      onClick={handleNotifySubmit}
                      disabled={!notifyContact.trim()}
                    >
                      Notify Me
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const STEPS = ['Campus', 'Profile', '2nd Campus', 'Address', 'Account'];

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [campusList, setCampusList] = useState([]);
  const [error, setError] = useState('');

  const [primaryCampus, setPrimaryCampus] = useState(null);

  const CURRENT_YEAR = new Date().getFullYear();
  const ALUMNI_YEARS = Array.from({ length: CURRENT_YEAR - 1973 }, (_, i) => CURRENT_YEAR - i);
  const STUDENT_YEARS = Array.from({ length: 8 }, (_, i) => CURRENT_YEAR + i);

  const [profileData, setProfileData] = useState({
    userType: 'current',       // 'current' | 'alumni' | 'staff'
    staffType: 'teaching',     // 'teaching' | 'non-teaching'
    passoutYear: '',
    department: ''
  });

  const [secondaryCampus, setSecondaryCampus] = useState(null);

  const [addressData, setAddressData] = useState({
    campusAddress: '',
    nonCampusAddress: ''
  });

  const [accountData, setAccountData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [phoneStatus, setPhoneStatus] = useState(null); // null | 'checking' | 'available' | 'taken'
  const phoneDebounceRef = useRef(null);

  useEffect(() => {
    fetch('/api/campuses/')
      .then(r => r.json())
      .then(data => setCampusList(data))
      .catch(() => {});
  }, []);

  const goNext = () => { setError(''); setStep(s => s + 1); };
  const goBack = () => { setError(''); setStep(s => s - 1); };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setAccountData(prev => ({ ...prev, phone: val }));
    setPhoneStatus(null);
    clearTimeout(phoneDebounceRef.current);
    if (!val.trim()) return;
    setPhoneStatus('checking');
    phoneDebounceRef.current = setTimeout(() => {
      fetch(`/api/check-phone/?phone=${encodeURIComponent(val.trim())}`)
        .then(r => r.json())
        .then(data => setPhoneStatus(data.available ? 'available' : 'taken'))
        .catch(() => setPhoneStatus(null));
    }, 600);
  };

  const handleFinalSubmit = () => {
    if (!accountData.phone.trim()) {
      setError('Phone number is required');
      return;
    }
    if (phoneStatus === 'taken') {
      setError('This phone number is already registered. Please use a different number.');
      return;
    }
    if (phoneStatus === 'checking') {
      setError('Please wait while we verify your phone number.');
      return;
    }
    if (accountData.password !== accountData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (accountData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!accountData.email || !accountData.username || !accountData.password) {
      setError('Please fill in all required fields');
      return;
    }

    localStorage.setItem('auth_token', 'placeholder_token');
    localStorage.setItem('username', accountData.username);
    localStorage.setItem('user_campuses', JSON.stringify({
      primary: primaryCampus,
      secondary: secondaryCampus
    }));
    navigate('/');
  };

  // ─── Step 1: Primary Campus ───────────────────────────────────────────────
  const renderStep1 = () => (
    <>
      <h2 className="step-title">Select Your Campus</h2>
      <p className="step-subtitle">Choose your primary campus from the list below</p>

      <CampusDropdown
        label="Primary Campus"
        campusList={campusList}
        excludeId={null}
        value={primaryCampus}
        onChange={setPrimaryCampus}
      />

      <div className="step-actions">
        <button className="btn btn-primary" onClick={goNext} disabled={!primaryCampus}>
          Next →
        </button>
      </div>
    </>
  );

  // ─── Step 2: Profile ─────────────────────────────────────────────────────
  const renderStep2 = () => {
    const isStudent = profileData.userType === 'current';
    const isAlumni  = profileData.userType === 'alumni';
    const isStaff   = profileData.userType === 'staff';
    const yearOptions = isAlumni ? ALUMNI_YEARS : STUDENT_YEARS;

    return (
      <>
        <h2 className="step-title">Your Profile</h2>
        <p className="step-subtitle">Tell us about your role at {primaryCampus?.name}</p>

        {/* User type selector */}
        <div className="form-group">
          <label>I am a</label>
          <div className="toggle-group">
            {[
              { value: 'current', label: 'Student' },
              { value: 'alumni',  label: 'Alumni'  },
              { value: 'staff',   label: 'Staff'   },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`toggle-btn ${profileData.userType === opt.value ? 'active' : ''}`}
                onClick={() => setProfileData({ ...profileData, userType: opt.value, passoutYear: '', staffType: 'teaching' })}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Staff sub-type */}
        {isStaff && (
          <div className="form-group">
            <label>Staff Type</label>
            <div className="toggle-group">
              {[
                { value: 'teaching',     label: 'Teaching Staff'     },
                { value: 'non-teaching', label: 'Non-Teaching Staff' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`toggle-btn ${profileData.staffType === opt.value ? 'active' : ''}`}
                  onClick={() => setProfileData({ ...profileData, staffType: opt.value })}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Passout year — only for students and alumni */}
        {(isStudent || isAlumni) && (
          <div className="form-group">
            <label>{isAlumni ? 'Year of Passout' : 'Expected Year of Passout'}</label>
            <select
              className="form-select"
              value={profileData.passoutYear}
              onChange={e => setProfileData({ ...profileData, passoutYear: e.target.value })}
            >
              <option value="">Select year...</option>
              {yearOptions.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        )}

        {/* Department */}
        <div className="form-group">
          <label>Department / Branch</label>
          <input
            type="text"
            value={profileData.department}
            onChange={e => setProfileData({ ...profileData, department: e.target.value.slice(0, 50) })}
            placeholder="e.g. Computer Science"
            maxLength={50}
          />
          <span className="char-count">{profileData.department.length}/50</span>
        </div>

        <div className="step-actions">
          <button className="btn btn-secondary" onClick={goBack}>← Back</button>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (!profileData.department) { setError('Please enter your department'); return; }
              if ((isStudent || isAlumni) && !profileData.passoutYear) { setError('Please select your passout year'); return; }
              goNext();
            }}
          >
            Next →
          </button>
        </div>
      </>
    );
  };

  // ─── Step 3: Secondary Campus ─────────────────────────────────────────────
  const renderStep3 = () => (
    <>
      <h2 className="step-title">Add Another Campus?</h2>
      <p className="step-subtitle">
        Optionally link a second campus. You can add more later from your profile.
      </p>

      <CampusDropdown
        label="Secondary Campus (Optional)"
        campusList={campusList}
        excludeId={primaryCampus?.id}
        value={secondaryCampus}
        onChange={setSecondaryCampus}
      />

      <div className="step-actions">
        <button className="btn btn-secondary" onClick={goBack}>← Back</button>
        <button className="btn btn-primary" onClick={goNext}>
          {secondaryCampus ? 'Next →' : 'Skip →'}
        </button>
      </div>
    </>
  );

  // ─── Step 4: Addresses ────────────────────────────────────────────────────
  const renderStep4 = () => (
    <>
      <h2 className="step-title">Your Addresses</h2>
      <p className="step-subtitle">Used for order pickup and delivery coordination</p>

      <div className="form-group">
        <label>Campus Address</label>
        <input
          type="text"
          value={addressData.campusAddress}
          onChange={e => setAddressData({ ...addressData, campusAddress: e.target.value })}
          placeholder="Hostel / Room / Block at campus"
        />
      </div>

      <div className="form-group">
        <label>Non-Campus / Home Address</label>
        <input
          type="text"
          value={addressData.nonCampusAddress}
          onChange={e => setAddressData({ ...addressData, nonCampusAddress: e.target.value })}
          placeholder="Home or permanent address"
        />
      </div>

      <div className="step-actions">
        <button className="btn btn-secondary" onClick={goBack}>← Back</button>
        <button className="btn btn-primary" onClick={goNext}>Next →</button>
      </div>
    </>
  );

  // ─── Step 5: Account Credentials ─────────────────────────────────────────
  const renderStep5 = () => (
    <>
      <h2 className="step-title">Create Your Account</h2>
      <p className="step-subtitle">Set up your login credentials</p>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          value={accountData.fullName}
          onChange={e => setAccountData({ ...accountData, fullName: e.target.value })}
          placeholder="Your full name"
        />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          value={accountData.email}
          onChange={e => setAccountData({ ...accountData, email: e.target.value })}
          placeholder="your.email@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <div className="input-status-wrap">
          <input
            type="tel"
            value={accountData.phone}
            onChange={handlePhoneChange}
            placeholder="+91 XXXXXXXXXX"
            className={
              phoneStatus === 'taken' ? 'input-error' :
              phoneStatus === 'available' ? 'input-success' : ''
            }
            required
          />
          {phoneStatus === 'checking' && <span className="field-status checking">⏳ Checking...</span>}
          {phoneStatus === 'available' && <span className="field-status available">✓ Available</span>}
          {phoneStatus === 'taken' && <span className="field-status taken">✕ Already registered — use a different number</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Username *</label>
        <input
          type="text"
          value={accountData.username}
          onChange={e => setAccountData({ ...accountData, username: e.target.value })}
          placeholder="Choose a username"
          required
        />
      </div>

      <div className="form-group">
        <label>Password *</label>
        <input
          type="password"
          value={accountData.password}
          onChange={e => setAccountData({ ...accountData, password: e.target.value })}
          placeholder="At least 8 characters"
          required
        />
      </div>

      <div className="form-group">
        <label>Confirm Password *</label>
        <input
          type="password"
          value={accountData.confirmPassword}
          onChange={e => setAccountData({ ...accountData, confirmPassword: e.target.value })}
          placeholder="Re-enter your password"
          required
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="step-actions">
        <button className="btn btn-secondary" onClick={goBack}>← Back</button>
        <button
          className="btn btn-primary"
          onClick={handleFinalSubmit}
        >
          Create Account
        </button>
      </div>

      <div className="divider"><span>OR</span></div>
      <div className="oauth-buttons">
        <button
          className="btn-oauth"
          onClick={() => setError('Google OAuth coming soon!')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </button>
      </div>
    </>
  );

  const stepContent = [null, renderStep1, renderStep2, renderStep3, renderStep4, renderStep5];

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '520px' }}>
        <h1>Join ccoop.in</h1>

        {/* Step progress bar */}
        <div className="step-progress">
          {STEPS.map((label, idx) => (
            <React.Fragment key={idx}>
              <div className="step-dot-wrapper">
                <div className={`step-dot ${step > idx + 1 ? 'completed' : step === idx + 1 ? 'active' : ''}`}>
                  {step > idx + 1 ? '✓' : idx + 1}
                </div>
                <span className="step-label">{label}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`step-line ${step > idx + 1 ? 'completed' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {error && step !== 5 && <div className="error-message">{error}</div>}

        <div style={{ marginTop: '1.5rem' }}>
          {stepContent[step]?.()}
        </div>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
