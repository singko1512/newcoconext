import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';

function MainApp() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('login');

  // Jika halaman aktif adalah login dan user belum login (atau sengaja kembali ke halaman login)
  if (currentPage === 'login' && !user) {
    return <Login onNavigateToHome={() => setCurrentPage('home')} />;
  }

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          padding: '0.9rem 2rem',
          background: 'linear-gradient(90deg, #2b1d16 0%, #3a281e 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🌱</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.3px' }}>
              Coconext Dashboard
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#fef3c7', fontWeight: 500 }}>
            {user ? `👤 ${user.name}` : 'Mode Tamu'}
          </span>
          <button
            type="button"
            onClick={() => {
              if (user) logout();
              setCurrentPage('login');
            }}
            style={{
              background: '#f59e0b',
              color: '#2b1d16',
              border: 'none',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            {user ? 'Keluar / Logout' : '← Halaman Login'}
          </button>
        </div>
      </header>

      <Home />
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
