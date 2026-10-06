import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Rank from './pages/Rank';
import Statistics from './pages/Statistics';
import logoImg from './assets/logo.jpg';
import './App.css';

const NAV_ITEMS = [
  { key: 'home', label: 'Peta' },
  { key: 'rank', label: 'Peringkat Penanam' },
  { key: 'statistics', label: 'Statistik Tanaman' },
];

function MainApp() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [filterKecamatan, setFilterKecamatan] = useState('ALL');

  // Refs for sliding indicator
  const navRef = useRef(null);
  const btnRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Measure active button and update indicator
  const updateIndicator = useCallback(() => {
    const activeBtn = btnRefs.current[currentPage];
    const navEl = navRef.current;
    if (activeBtn && navEl) {
      const navRect = navEl.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setIndicator({
        left: btnRect.left - navRect.left,
        width: btnRect.width,
      });
    }
  }, [currentPage]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  // Navigasi dari halaman Rank ke Peta dengan memfilter kecamatan yang dipilih
  const handleSelectKecamatanFromRank = (kecKey) => {
    setFilterKecamatan(kecKey);
    setCurrentPage('home');
  };

  // Jika halaman aktif adalah login dan user belum login (atau sengaja kembali ke halaman login)
  if (currentPage === 'login' && !user) {
    return <Login onNavigateToHome={() => setCurrentPage('home')} />;
  }

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      {/* Top Header Navbar */}
      <header className="navbar">
        {/* Brand & Logo */}
        <div
          className="navbar-brand"
          onClick={() => setCurrentPage('home')}
        >
          <div className="navbar-logo-wrap">
            <img
              src={logoImg}
              alt="Logo Kwarcab Bogor"
              className="navbar-logo"
            />
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-brand-name">COCONEXT</span>
            <span className="navbar-brand-sub">KWARCAB BOGOR</span>
          </div>
        </div>

        {/* Menu Navigasi Utama dengan sliding indicator */}
        <nav className="navbar-nav" ref={navRef}>
          {/* Sliding pill indicator */}
          <div
            className="navbar-indicator"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
            }}
          />
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              ref={(el) => { btnRefs.current[item.key] = el; }}
              className={`navbar-nav-btn${currentPage === item.key ? ' active' : ''}`}
              onClick={() => setCurrentPage(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Info & Login / Logout */}
        <div className="navbar-actions">
          {user && (
            <span className="navbar-user-name">
              {user.name || user.username}
            </span>
          )}
          <button
            type="button"
            className={`navbar-auth-btn ${user ? 'logout' : 'login'}`}
            onClick={() => {
              if (user) logout();
              setCurrentPage('login');
            }}
          >
            {user ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Keluar
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Masuk
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentPage === 'home' && (
          <Home selectedKecamatanFromRank={filterKecamatan} user={user} />
        )}
        {currentPage === 'rank' && (
          <Rank onSelectKecamatan={handleSelectKecamatanFromRank} />
        )}
        {currentPage === 'statistics' && (
          <Statistics onSelectSpecies={(sp) => {
            setCurrentPage('home');
          }} />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
