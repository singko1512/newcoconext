import React, { useState, useEffect } from 'react';
import './Login.css';
import bgImage from '../assets/login_bg.jpg';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Login({ onNavigateToHome }) {
  const { login } = useAuth();

  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);

  // Muat daftar akun kwarran & kwarcab langsung dari database MySQL
  useEffect(() => {
    api.get('/auth/users')
      .then((res) => {
        if (res && res.success && Array.isArray(res.data)) {
          setUserList(res.data);
        }
      })
      .catch((err) => {
        console.warn('Backend API belum terhubung atau offline:', err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!identity) {
      setErrorMessage('Silakan pilih identitas / pangkalan Anda.');
      return;
    }

    if (!password) {
      setErrorMessage('Kata sandi tidak boleh kosong.');
      return;
    }

    setLoading(true);

    try {
      // 1. Coba login ke Backend Express API
      const res = await api.post('/auth/login', {
        identity,
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
      console.warn('API login error, mencoba fallback / pesan:', err.message);
      
      // Jika backend merespon kata sandi salah / user tidak ditemukan
      if (err.status === 401 || err.status === 400) {
        setLoading(false);
        setErrorMessage(err.message || 'Identitas atau kata sandi tidak cocok.');
        return;
      }

      // Fallback simulasi jika backend sedang tidak aktif
      setTimeout(() => {
        setLoading(false);
        login(
          {
            name: identity,
            role: identity.toLowerCase().includes('kwarcab') ? 'admin' : 'pangkalan',
          },
          'dummy-auth-token-coconext-2024'
        );
        setSuccessMessage('Berhasil masuk (Mode Offline)! Mengalihkan...');
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
          {/* Bagian Utama Tengah Panel Kiri */}
          <div className="hero-center-content">
            <h1 className="hero-title">
              Satu Tunas Untuk <br />
              <span className="hero-title-highlight">Masa Depan Bumi</span>
            </h1>
            <div className="hero-line font"></div>
            <p className="hero-tagline">Salah satu poin yang wajib ada adalah deskripsi ekstrakurikuler pramuka di rapor. Narasi ini bukan sekadar formalitas, melainkan cerminan dari kedisiplinan, jiwa kepemimpinan, serta penguasaan keterampilan kepramukaan peserta didik selama satu semester.</p>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Form Card Login */}
      <div className="login-form-panel">
        <div className="login-card">
          {/* Logo Tunas Kelapa Scout */}
          <div className="logo-container">
            <div className="logo-badge">
              <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
                {/* Tunas Kelapa Silhouette */}
                <ellipse cx="50" cy="80" rx="14" ry="9" fill="#f59e0b" />
                <path
                  d="M50 75 C48 55, 48 35, 50 18 C52 35, 52 55, 50 75 Z"
                  fill="#f59e0b"
                />
                <path
                  d="M48 50 C40 45, 26 40, 24 24 C34 26, 44 38, 48 50 Z"
                  fill="#fbbf24"
                />
                <path
                  d="M52 50 C60 45, 74 40, 76 24 C66 26, 56 38, 52 50 Z"
                  fill="#fbbf24"
                />
                <circle cx="50" cy="85" r="4" fill="#ffffff" opacity="0.9" />
              </svg>
            </div>
          </div>

          {/* Judul & Branding */}
          <div className="card-header-text">
            <h2 className="brand-title">Coconext Dashboard</h2>
            <div className="badge-subtitle">
              Aplikasi Penanaman Pohon Kwarcab Bogor
            </div>
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

          {/* Form Login */}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Input Identitas */}
            <div className="form-group">
              <label htmlFor="identity-select" className="form-label">
                PILIH IDENTITAS / PANGKALAN
              </label>
              <div className="select-container">
                <select
                  id="identity-select"
                  className="form-select"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                >
                  <option value="">-- PILIH IDENTITAS / PANGKALAN --</option>
                  {userList.length > 0 ? (
                    <>
                      <optgroup label="Akun Database Kwarcab & Kwarran">
                        {userList.map((u) => (
                          <option key={u.id} value={u.username}>
                            {u.fullname} ({u.username})
                          </option>
                        ))}
                      </optgroup>
                    </>
                  ) : (
                    <>
                      <optgroup label="Pengurus Kwartir">
                        <option value="Admin Kwarcab Kabupaten Bogor">
                          Admin Kwarcab Kabupaten Bogor
                        </option>
                        <option value="Pimpinan Saka Wanabakti Bogor">
                          Pimpinan Saka Wanabakti Kab. Bogor
                        </option>
                        <option value="Pimpinan Saka Tarunabumi Bogor">
                          Pimpinan Saka Tarunabumi Kab. Bogor
                        </option>
                      </optgroup>
                      <optgroup label="Kwartir Ranting / Gugus Depan">
                        <option value="Kwarran Cibinong - Gudep 01.001">
                          Kwarran Cibinong - Gudep 01.001
                        </option>
                        <option value="Kwarran Ciawi - Gudep 03.015">
                          Kwarran Ciawi - Gudep 03.015
                        </option>
                        <option value="Kwarran Babakan Madang - Gudep 05.022">
                          Kwarran Babakan Madang - Gudep 05.022
                        </option>
                        <option value="Kwarran Sukaraja - Gudep 02.008">
                          Kwarran Sukaraja - Gudep 02.008
                        </option>
                        <option value="Kwarran Cileungsi - Gudep 09.041">
                          Kwarran Cileungsi - Gudep 09.041
                        </option>
                      </optgroup>
                    </>
                  )}
                </select>
                <div className="select-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Input Kata Sandi */}
            <div className="form-group">
              <div className="label-with-link">
                <label htmlFor="password-input" className="form-label">
                  KATA SANDI
                </label>
                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => alert('Silakan hubungi administrator Kwarcab untuk reset kata sandi.')}
                >
                  Lupa sandi?
                </button>
              </div>

              <div className="input-with-icon">
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Masukkan kata sandi..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="icon-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Tampilkan / Sembunyikan sandi"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <span>Memproses...</span>
              ) : (
                <>
                  <span>MASUK KE DASHBOARD</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>

            {/* Tombol Lihat Peta Publik */}
            <button
              type="button"
              className="btn-public-map"
              onClick={() => {
                if (onNavigateToHome) onNavigateToHome();
                else alert('Membuka Peta Publik Penanaman Pohon Kwarcab Bogor...');
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" y1="3" x2="9" y2="18" />
                <line x1="15" y1="6" x2="15" y2="21" />
              </svg>
              <span>LIHAT PETA PUBLIK & STATISTIK</span>
            </button>
          </form>

          {/* Bawah Card */}
          <div className="card-footer-info">

            <p className="copyright-text">
              Aplikasi Penanaman Pohon • Kwartir Cabang Pramuka Kabupaten Bogor © 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
