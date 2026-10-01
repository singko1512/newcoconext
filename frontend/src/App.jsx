import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Rank from './pages/Rank';
import Statistics from './pages/Statistics';

function MainApp() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [filterKecamatan, setFilterKecamatan] = useState('ALL');

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
      <header
        style={{
          padding: '0.75rem 1.75rem',
          background: 'linear-gradient(90deg, #2b1d16 0%, #3a281e 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
          zIndex: 1010,
        }}
      >
        {/* Brand & Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          onClick={() => setCurrentPage('home')}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              background: '#f59e0b',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
            }}
          >
            🌱
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.4px', color: '#ffffff' }}>
              COCONEXT
            </div>
            <div style={{ fontSize: '0.72rem', color: '#fde68a', fontWeight: 600 }}>
              KWARCAB BOGOR
            </div>
          </div>
        </div>

        {/* Menu Navigasi Utama: Peta, Rank, Statistik */}
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setCurrentPage('home')}
            style={{
              ...navBtnStyle,
              ...(currentPage === 'home' ? activeNavBtnStyle : {}),
            }}
          >
            🗺️ Peta Sebaran
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage('rank')}
            style={{
              ...navBtnStyle,
              ...(currentPage === 'rank' ? activeNavBtnStyle : {}),
            }}
          >
            🏆 Peringkat Penanam
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage('statistics')}
            style={{
              ...navBtnStyle,
              ...(currentPage === 'statistics' ? activeNavBtnStyle : {}),
            }}
          >
            📊 Statistik Tanaman
          </button>
        </nav>

        {/* User Info & Login / Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 700 }}>
              {user ? user.name || user.username : 'Mode Tamu'}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#fde68a' }}>
              {user ? (user.role === 'admin' ? '🛡️ Administrator' : '🏢 Kwarran/Pangkalan') : '👀 Peninjau'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (user) logout();
              setCurrentPage('login');
            }}
            style={{
              background: user ? '#ef4444' : '#f59e0b',
              color: user ? '#ffffff' : '#2b1d16',
              border: 'none',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            {user ? 'Keluar' : 'Masuk / Login'}
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

const navBtnStyle = {
  background: 'transparent',
  color: '#e5e7eb',
  border: 'none',
  padding: '0.5rem 0.95rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '0.88rem',
  fontWeight: 700,
  transition: 'all 0.15s ease',
};

const activeNavBtnStyle = {
  background: '#f59e0b',
  color: '#2b1d16',
  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.35)',
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
