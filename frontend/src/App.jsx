import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Rank from './pages/Rank';
import Statistics from './pages/Statistics';
import Articles from './pages/Articles';
import MasterAdmin from './pages/MasterAdmin';
import logoImg from './assets/logo.jpg';
import './App.css';

function MainApp() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [filterKecamatan, setFilterKecamatan] = useState('ALL');

  // Cek apakah user adalah admin
  const isAdmin = useMemo(() => {
    if (!user) return false;
    return (
      user.role === 'admin' ||
      user.is_admin === 1 ||
      user.is_admin === true ||
      (user.username || '').toLowerCase().includes('kwarcab') ||
      (user.username || '').toLowerCase().includes('admin')
    );
  }, [user]);

  // Daftar Menu Navigasi (Admin mendapatkan akses Data Master)
  const navItems = useMemo(() => {
    const items = [
      { key: 'home', label: 'Peta' },
      { key: 'rank', label: 'Peringkat Penanam' },
      { key: 'statistics', label: 'Statistik Tanaman' },
      { key: 'articles', label: 'Artikel Berita' },
    ];

    if (isAdmin) {
      items.push({ key: 'master', label: 'Data Master' });
    }

    return items;
  }, [isAdmin]);

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
  }, [updateIndicator, navItems]);

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
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f1f5f9' }}>
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
          {navItems.map((item) => (
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
            <div className="navbar-user-badge">
              <span className="navbar-user-name">
                {user.name || user.fullname || user.username}
              </span>
              {isAdmin && <span className="admin-tag-pill">Admin Master</span>}
            </div>
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
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Keluar
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        {currentPage === 'articles' && (
          <Articles />
        )}
        {currentPage === 'master' && isAdmin && (
          <MasterAdmin onNavigateToHome={() => setCurrentPage('home')} />
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
