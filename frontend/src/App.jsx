import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Rank from './pages/Rank';
import Statistics from './pages/Statistics';
import logoImg from './assets/logo.jpg';

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
          padding: '0.65rem 1.75rem',
          background: '#ffffff',
          color: '#1f2937',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid #e5e7eb',
          zIndex: 1010,
          position: 'sticky',
          top: 0,
        }}
      >
        {/* Brand & Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          onClick={() => setCurrentPage('home')}
        >
          <img
            src={logoImg}
            alt="Logo Kwarcab Bogor"
            style={{ width: '38px', height: '38px', objectFit: 'contain' }}
          />
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', letterSpacing: '0.5px', color: '#1f2937' }}>
              COCONEXT
            </div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 700, letterSpacing: '0.3px' }}>
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
            Peta
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage('rank')}
            style={{
              ...navBtnStyle,
              ...(currentPage === 'rank' ? activeNavBtnStyle : {}),
            }}
          >
            Peringkat Penanam
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage('statistics')}
            style={{
              ...navBtnStyle,
              ...(currentPage === 'statistics' ? activeNavBtnStyle : {}),
            }}
          >
            Statistik Tanaman
          </button>
        </nav>

        {/* User Info & Login / Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.25 }}>
            <span style={{ fontSize: '0.85rem', color: '#1f2937', fontWeight: 700 }}>
              {user ? user.name || user.username : ''}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (user) logout();
              setCurrentPage('login');
            }}
            style={{
              background: user ? '#ef4444' : '#CC6F00',
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: user ? '0 2px 6px rgba(239, 68, 68, 0.25)' : '0 2px 6px rgba(204, 111, 0, 0.25)',
              transition: 'all 0.15s ease',
            }}
          >
            {user ? 'Keluar' : 'Masuk'}
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
  color: '#374151',
  border: 'none',
  padding: '0.45rem 0.95rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '0.85rem',
  fontWeight: 600,
  transition: 'all 0.15s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
};

const activeNavBtnStyle = {
  background: '#CC6F00',
  color: '#ffffff',
  fontWeight: 700,
  boxShadow: '0 2px 6px rgba(204, 111, 0, 0.25)',
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
