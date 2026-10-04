import React, { useState, useEffect } from 'react';
import './Login.css';
import bgImage from '../assets/login_bg.jpg';
import logoImg from '../assets/logo.jpg';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const KECAMATAN_BOGOR = [
  'BABAKAN MADANG', 'BOJONGGEDE', 'CARINGIN', 'CARIU', 'CIAMPEA', 'CIAWI',
  'CIBINONG', 'CIBUNGBULANG', 'CIGOMBONG', 'CIGUDEG', 'CIJERUK', 'CILEUNGSI',
  'CIOMAS', 'CISARUA', 'CISEENG', 'CITEUREUP', 'DRAMAGA', 'GUNUNG PUTRI',
  'GUNUNG SINDUR', 'JASINGA', 'JONGGOL', 'KEMANG', 'KLAPANUNGGAL', 'LEUWILIANG',
  'LEUWISADENG', 'MEGAMENDUNG', 'NANGGUNG', 'PAMIJAHAN', 'PARUNG', 'PARUNG PANJANG',
  'RANCABUNGUR', 'RUMPIN', 'SUKAJAYA', 'SUKAMAKMUR', 'SUKARAJA', 'TAJURHALANG',
  'TAMANSARI', 'TANJUNGSARI', 'TENJO', 'TENJOLAYA'
];

export default function Login({ onNavigateToHome }) {
  const { login } = useAuth();

  // Tab: 'login' (Masuk Pangkalan) atau 'register' (Daftar Akun Penanam)
  const [authTab, setAuthTab] = useState('login');

  // State untuk form login (hanya memilih pangkalan)
  const [identitySelect, setIdentitySelect] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // State untuk form registrasi penanam baru
  const [regFullname, setRegFullname] = useState('');
  const [regKecamatan, setRegKecamatan] = useState('CIAMPEA');
  const [regPangkalanLain, setRegPangkalanLain] = useState('');
  const [regWhatsapp, setRegWhatsapp] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Feedback states
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);

  // Fungsi muat daftar akun kwarran & kwarcab dari database MySQL
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

  const handleTabSwitch = (tab) => {
    setAuthTab(tab);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Submit Login dengan Pangkalan
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
      if (err.status === 401 || err.status === 400) {
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

  // Submit Register Akun Penanam Baru
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regFullname.trim()) {
      setErrorMessage('Nama penanam / pangkalan wajib diisi.');
      return;
    }

    if (!regPassword || regPassword.length < 4) {
      setErrorMessage('Kata sandi minimal 4 karakter.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    // Buat username sistem unik otomatis dari nama penanam
    const cleanUsername = regFullname
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 30) + '_' + Math.floor(100 + Math.random() * 900);

    const finalOrg = regKecamatan === 'LAINNYA'
      ? (regPangkalanLain.trim() || 'Penanam Mandiri / Komunitas')
      : `Kwarran Kecamatan ${regKecamatan}`;

    setLoading(true);

    try {
      const res = await api.post('/auth/register', {
        username: cleanUsername,
        fullname: regFullname.trim(),
        password: regPassword,
        org: finalOrg,
        whatsapp: regWhatsapp.trim() || '-',
      });

      if (res && res.success) {
        setLoading(false);
        setSuccessMessage('Pendaftaran pangkalan berhasil! Mengalihkan ke dashboard...');
        loadUsers();
        login(res.user, res.token);
        if (onNavigateToHome) {
          setTimeout(() => onNavigateToHome(), 700);
        }
        return;
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || 'Gagal mendaftarkan akun penanam.');
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

      {/* Kolom Kanan: Form Card Login / Daftar */}
      <div className="login-form-panel">
        <div className="login-card">
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
            {authTab === 'register' && (
              <p className="reg-info-hint">
                Pendaftaran Akun Baru untuk Relawan / Penanam Pohon
              </p>
            )}
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

          {/* FORM A: MASUK / LOGIN (HANYA MENGGUNAKAN PANGKALAN) */}
          {authTab === 'login' ? (
            <form className="login-form" onSubmit={handleLoginSubmit}>
              {/* PILIH IDENTITAS / PANGKALAN */}
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
                    <option value="">-- PILIH IDENTITAS / PANGKALAN --</option>
                    {userList.length > 0 ? (
                      <optgroup label="Daftar Akun Kwarcab & Kwarran">
                        {userList.map((u) => (
                          <option key={u.id} value={u.username}>
                            {u.fullname} ({u.username})
                          </option>
                        ))}
                      </optgroup>
                    ) : (
                      <>
                        <optgroup label="Pengurus Kwartir">
                          <option value="Admin Kwarcab Kabupaten Bogor">Admin Kwarcab Kabupaten Bogor</option>
                          <option value="Pimpinan Saka Wanabakti Bogor">Pimpinan Saka Wanabakti Kab. Bogor</option>
                          <option value="Pimpinan Saka Tarunabumi Bogor">Pimpinan Saka Tarunabumi Kab. Bogor</option>
                        </optgroup>
                        <optgroup label="Kwartir Ranting / Gugus Depan">
                          <option value="Kwarran Cibinong - Gudep 01.001">Kwarran Cibinong - Gudep 01.001</option>
                          <option value="Kwarran Ciawi - Gudep 03.015">Kwarran Ciawi - Gudep 03.015</option>
                          <option value="Kwarran Babakan Madang - Gudep 05.022">Kwarran Babakan Madang - Gudep 05.022</option>
                          <option value="Kwarran Sukaraja - Gudep 02.008">Kwarran Sukaraja - Gudep 02.008</option>
                          <option value="Kwarran Cileungsi - Gudep 09.041">Kwarran Cileungsi - Gudep 09.041</option>
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
                    autoComplete="current-password"
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

              {/* Tombol Submit Masuk */}
              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? <span>Memproses...</span> : <span>MASUK DASHBOARD</span>}
              </button>

              <div className="auth-switch-prompt">
                Belum punya akun pangkalan / penanam?
                <button
                  type="button"
                  className="auth-switch-btn"
                  onClick={() => handleTabSwitch('register')}
                >
                  Daftar di sini
                </button>
              </div>
            </form>
          ) : (
            /* FORM B: DAFTAR AKUN PENANAM BARU */
            <form className="login-form" onSubmit={handleRegisterSubmit}>
              {/* Nama Penanam / Pangkalan */}
              <div className="form-group">
                <label htmlFor="reg-fullname" className="form-label">
                  NAMA PENANAM / PANGKALAN / GUGUS DEPAN
                </label>
                <input
                  id="reg-fullname"
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Budi Santoso / Gudep 04.012..."
                  value={regFullname}
                  onChange={(e) => setRegFullname(e.target.value)}
                  required
                />
              </div>

              {/* Pilihan Kwarran / Wilayah Kecamatan */}
              <div className="form-group">
                <label htmlFor="reg-kecamatan" className="form-label">
                  ASAL KECAMATAN / WILAYAH KWARRAN
                </label>
                <div className="select-container">
                  <select
                    id="reg-kecamatan"
                    className="form-select"
                    value={regKecamatan}
                    onChange={(e) => setRegKecamatan(e.target.value)}
                  >
                    {KECAMATAN_BOGOR.map((k) => (
                      <option key={k} value={k}>
                        Kecamatan {k}
                      </option>
                    ))}
                    <option value="LAINNYA">Lainnya / Luar Daerah</option>
                  </select>
                  <div className="select-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              {regKecamatan === 'LAINNYA' && (
                <div className="form-group">
                  <label htmlFor="reg-pangkalan-lain" className="form-label">
                    NAMA INSTANSI / KOMUNITAS
                  </label>
                  <input
                    id="reg-pangkalan-lain"
                    type="text"
                    className="form-input"
                    placeholder="Masukkan nama instansi / pangkalan Anda..."
                    value={regPangkalanLain}
                    onChange={(e) => setRegPangkalanLain(e.target.value)}
                  />
                </div>
              )}

              {/* Nomor WhatsApp */}
              <div className="form-group">
                <label htmlFor="reg-whatsapp" className="form-label">
                  NOMOR WHATSAPP (KONTAK)
                </label>
                <input
                  id="reg-whatsapp"
                  type="text"
                  className="form-input"
                  placeholder="Contoh: 081234567890"
                  value={regWhatsapp}
                  onChange={(e) => setRegWhatsapp(e.target.value)}
                />
              </div>

              {/* Kata Sandi */}
              <div className="form-group">
                <label htmlFor="reg-password" className="form-label">
                  KATA SANDI
                </label>
                <div className="input-with-icon">
                  <input
                    id="reg-password"
                    type={showRegPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Minimal 4 karakter..."
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="icon-toggle-btn"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    aria-label="Tampilkan / Sembunyikan sandi"
                  >
                    {showRegPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Konfirmasi Kata Sandi */}
              <div className="form-group">
                <label htmlFor="reg-confirm-password" className="form-label">
                  KONFIRMASI KATA SANDI
                </label>
                <input
                  id="reg-confirm-password"
                  type="password"
                  className="form-input"
                  placeholder="Ulangi kata sandi..."
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Tombol Submit Daftar */}
              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? <span>Mendaftarkan...</span> : <span>DAFTAR AKUN PENANAM</span>}
              </button>

              <div className="auth-switch-prompt">
                Sudah punya akun?
                <button
                  type="button"
                  className="auth-switch-btn"
                  onClick={() => handleTabSwitch('login')}
                >
                  Masuk di sini
                </button>
              </div>
            </form>
          )}

          {/* Bawah Card Footer */}
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
