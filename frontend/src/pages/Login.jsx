import React, { useState, useEffect } from 'react';
import './Login.css';
import bgImage from '../assets/login_bg.jpg';
import logoImg from '../assets/logo.jpg';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Login({ onNavigateToHome }) {
  const { login } = useAuth();

  // State untuk form login
  const [identitySelect, setIdentitySelect] = useState('');
  const [password, setPassword] = useState('');

  // Feedback states
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);

  // Fungsi muat daftar akun kwarran & kwarcab dari database MySQL (semua akun, tidak dikunci)
  const loadUsers = () => {
    api.get('/auth/users')
      .then((res) => {
        if (res && res.success && Array.isArray(res.data)) {
          setUserList(res.data);
        }
      })
      .catch((err) => {
        console.warn('Backend API belum terhubung atau offline:', err);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Submit Login dengan Pangkalan (Pilihan identitas bebas / tidak dikunci)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!identitySelect) {
      setErrorMessage('Silakan pilih identitas / pangkalan Anda.');
      return;
    }

    if (!password) {
      setErrorMessage('Kata sandi tidak boleh kosong.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/auth/login', {
        identity: identitySelect,
        password,
      });

      if (res && res.success) {
        setLoading(false);
        login(res.user, res.token);
        setSuccessMessage('Berhasil masuk! Mengalihkan ke dashboard...');
        if (onNavigateToHome) {
          setTimeout(() => onNavigateToHome(), 600);
        }
        return;
      }
    } catch (err) {
      console.warn('API login error:', err.message);
      if (err.status === 401 || err.status === 400 || err.status === 403) {
        setLoading(false);
        setErrorMessage(err.message || 'Identitas atau kata sandi tidak cocok.');
        return;
      }

      // Fallback offline simulasi
      setTimeout(() => {
        setLoading(false);
        login(
          {
            name: identitySelect,
            username: identitySelect,
            role: identitySelect.toLowerCase().includes('kwarcab') ? 'admin' : 'pangkalan',
          },
          'dummy-auth-token-coconext-2024'
        );
        setSuccessMessage('Berhasil masuk! Mengalihkan...');
        if (onNavigateToHome) {
          setTimeout(() => onNavigateToHome(), 600);
        }
      }, 700);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Kolom Kiri: Visual Banner & Informasi Pramuka */}
      <div
        className="login-hero-panel"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-center-content">
            <h1 className="hero-title">
              Satu Tunas Untuk <br />
              <span className="hero-title-highlight">Masa Depan Bumi</span>
            </h1>
            <div className="hero-line font"></div>
            <p className="hero-tagline">
              Program Penanaman Pohon Gerakan Pramuka Kwartir Cabang Kabupaten Bogor.
              Mendata setiap pohon kelapa dan tanaman terdata di 40 Kwartir Ranting untuk menjaga kelestarian lingkungan dan keanekaragaman hayati.
            </p>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Form Card Login */}
      <div className="login-form-panel">
        <div className="login-card">
          {/* Tombol Kembali ke Dashboard (Hanya Ikon Arrow) */}
          <div className="login-top-nav">
            <button
              type="button"
              className="btn-back-icon"
              onClick={() => onNavigateToHome && onNavigateToHome()}
              title="Kembali ke Dashboard"
              aria-label="Kembali ke Dashboard"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
          </div>

          {/* Logo Tunas Kelapa Scout */}
          <div className="logo-container">
            <div className="logo-badge">
              <img
                src={logoImg}
                alt="Logo Kwarcab Bogor"
                className="logo-img"
              />
            </div>
          </div>

          {/* Judul Branding */}
          <div className="card-header-text">
            <h2 className="brand-title">Coconext</h2>
            <p className="brand-subtext">Masuk ke Sistem Informasi Penanaman Pohon</p>
          </div>

          {/* Alert Error / Success */}
          {errorMessage && (
            <div className="alert-box alert-error">
              <span>⚠️</span> {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="alert-box alert-success">
              <span>✅</span> {successMessage}
            </div>
          )}

          {/* FORM MASUK / LOGIN */}
          <form className="login-form" onSubmit={handleLoginSubmit}>
            {/* PILIH IDENTITAS - SEMUA AKUN TERSEDIA (TIDAK DIKUNCI) */}
            <div className="form-group">
              <label htmlFor="identity-select" className="form-label">
                PILIH IDENTITAS / PANGKALAN
              </label>
              <div className="select-container">
                <select
                  id="identity-select"
                  className="form-select"
                  value={identitySelect}
                  onChange={(e) => setIdentitySelect(e.target.value)}
                >
                  <option value="">-- PILIH IDENTITAS AKUN --</option>
                  {userList.length > 0 ? (
                    <>
                      <optgroup label="Kwartir Cabang (Kwarcab Bogor)">
                        {userList
                          .filter((u) => (u.username || '').toLowerCase().includes('kwarcab') || u.is_admin === 1)
                          .map((u) => (
                            <option key={u.id} value={u.username}>
                              {u.fullname} ({u.username})
                            </option>
                          ))}
                      </optgroup>
                      <optgroup label="Kwartir Ranting (40 Kwarran se-Kab. Bogor)">
                        {userList
                          .filter((u) => !(u.username || '').toLowerCase().includes('kwarcab') && u.is_admin !== 1)
                          .map((u) => (
                            <option key={u.id} value={u.username}>
                              {u.fullname} ({u.username})
                            </option>
                          ))}
                      </optgroup>
                    </>
                  ) : (
                    <option value="kwarcab_bogorkab">Kwarcab Kabupaten Bogor (kwarcab_bogorkab)</option>
                  )}
                </select>
                <div className="select-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Input Kata Sandi - Tanpa Tombol Lihat (Mata Dihapus) */}
            <div className="form-group">
              <label htmlFor="password-input" className="form-label">
                KATA SANDI
              </label>
              <div className="input-with-icon">
                <input
                  id="password-input"
                  type="password"
                  className="form-input"
                  placeholder="Masukkan kata sandi..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Tombol Submit Masuk */}
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? <span>Memproses...</span> : <span>MASUK</span>}
            </button>
          </form>

          {/* Bawah Card Footer */}
          <div className="card-footer-info">
            <p className="copyright-text">
              Aplikasi Penanaman Pohon • Kwartir Cabang Pramuka Kabupaten Bogor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

