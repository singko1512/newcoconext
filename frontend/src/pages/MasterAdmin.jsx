import React, { useState, useEffect } from 'react';
import './MasterAdmin.css';
import api from '../services/api';

export default function MasterAdmin({ onNavigateToHome }) {
  const [activeTab, setActiveTab] = useState('trees'); // 'trees' | 'species' | 'kwarran' | 'users'
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Data states
  const [trees, setTrees] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [users, setUsers] = useState([]);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');

  // Form Tambah Spesies Baru
  const [showAddSpeciesModal, setShowAddSpeciesModal] = useState(false);
  const [newNamaLokal, setNewNamaLokal] = useState('');
  const [newNamaLatin, setNewNamaLatin] = useState('');

  // Muat data sesuai tab yang aktif
  useEffect(() => {
    loadMasterData();
  }, []);

  const loadMasterData = async () => {
    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      // 1. Fetch Trees
      const treeRes = await api.get('/trees?limit=1000');
      if (treeRes?.success && Array.isArray(treeRes.data)) {
        setTrees(treeRes.data);
      }

      // 2. Fetch Species
      const spRes = await api.get('/species');
      if (spRes?.success && Array.isArray(spRes.data)) {
        setSpeciesList(spRes.data);
      }

      // 3. Fetch Kwarran Rank
      const rankRes = await api.get('/trees/rank');
      if (rankRes?.success && Array.isArray(rankRes.data)) {
        setRanks(rankRes.data);
      }

      // 4. Fetch Users
      const userRes = await api.get('/auth/all-users');
      if (userRes?.success && Array.isArray(userRes.data)) {
        setUsers(userRes.data);
      } else {
        const simpleUserRes = await api.get('/auth/users');
        if (simpleUserRes?.success && Array.isArray(simpleUserRes.data)) {
          setUsers(simpleUserRes.data);
        }
      }
    } catch (err) {
      console.warn('Gagal memuat master data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Submit Tambah Spesies Baru
  const handleAddSpecies = async (e) => {
    e.preventDefault();
    if (!newNamaLokal.trim()) {
      setFeedback({ type: 'error', message: 'Nama lokal tanaman wajib diisi.' });
      return;
    }

    try {
      const res = await api.post('/species', {
        nama_lokal: newNamaLokal.trim(),
        nama_latin: newNamaLatin.trim() || '-',
      });

      if (res?.success) {
        setFeedback({ type: 'success', message: 'Varietas tanaman baru berhasil ditambahkan ke master!' });
        setNewNamaLokal('');
        setNewNamaLatin('');
        setShowAddSpeciesModal(false);
        // Refresh species
        const spRes = await api.get('/species');
        if (spRes?.success && Array.isArray(spRes.data)) setSpeciesList(spRes.data);
      } else {
        setFeedback({ type: 'error', message: res?.message || 'Gagal menambahkan varietas.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Terjadi kesalahan saat menyimpan varietas.' });
    }
  };

  // Hapus Data Pohon
  const handleDeleteTree = async (id, serialNo) => {
    if (!window.confirm(`Yakin ingin menghapus data pohon dengan nomor seri ${serialNo || id}? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      const res = await api.delete(`/trees/${id}`);
      if (res?.success) {
        setFeedback({ type: 'success', message: `Data pohon #${id} (${serialNo || ''}) berhasil dihapus.` });
        setTrees((prev) => prev.filter((t) => t.id !== id));
      } else {
        setFeedback({ type: 'error', message: res?.message || 'Gagal menghapus data pohon.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Gagal menghapus data pohon.' });
    }
  };

  return (
    <div className="master-admin-container">
      {/* Top Header */}
      <div className="master-header">
        <div className="master-header-left">
          <span className="master-badge">🛡️ KWARCAB SUPER ADMIN</span>
          <h1 className="master-title">Manajemen Data Master</h1>
          <p className="master-subtitle">
            Pusat kendali dan administrasi data master Coconext: kelola varietas tanaman, data pohon se-Kabupaten Bogor, status 40 Kwarran, dan akun pengguna.
          </p>
        </div>

        <div className="master-header-stats">
          <div className="mini-stat-card">
            <span className="mini-stat-val">{trees.length}</span>
            <span className="mini-stat-lbl">Master Pohon</span>
          </div>
          <div className="mini-stat-card">
            <span className="mini-stat-val">{speciesList.length}</span>
            <span className="mini-stat-lbl">Varietas</span>
          </div>
          <div className="mini-stat-card">
            <span className="mini-stat-val">{ranks.length || 40}</span>
            <span className="mini-stat-lbl">Kwarran</span>
          </div>
          <div className="mini-stat-card">
            <span className="mini-stat-val">{users.length}</span>
            <span className="mini-stat-lbl">Akun User</span>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {feedback.message && (
        <div className={`master-alert ${feedback.type === 'error' ? 'master-alert-error' : 'master-alert-success'}`}>
          <span>{feedback.type === 'error' ? '⚠️' : '✅'}</span>
          <span>{feedback.message}</span>
          <button type="button" className="close-alert-btn" onClick={() => setFeedback({ type: '', message: '' })}>✕</button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="master-tabs-bar">
        <div className="master-tabs-group">
          <button
            type="button"
            className={`master-tab-btn ${activeTab === 'trees' ? 'active' : ''}`}
            onClick={() => { setActiveTab('trees'); setSearchTerm(''); }}
          >
            🌴 Master Pohon ({trees.length})
          </button>
          <button
            type="button"
            className={`master-tab-btn ${activeTab === 'species' ? 'active' : ''}`}
            onClick={() => { setActiveTab('species'); setSearchTerm(''); }}
          >
            🌱 Master Varietas ({speciesList.length})
          </button>
          <button
            type="button"
            className={`master-tab-btn ${activeTab === 'kwarran' ? 'active' : ''}`}
            onClick={() => { setActiveTab('kwarran'); setSearchTerm(''); }}
          >
            🏛️ Master Kwarran ({ranks.length})
          </button>
          <button
            type="button"
            className={`master-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => { setActiveTab('users'); setSearchTerm(''); }}
          >
            👥 Master Akun ({users.length})
          </button>
        </div>

        {activeTab === 'species' && (
          <button
            type="button"
            className="btn-add-master"
            onClick={() => setShowAddSpeciesModal(true)}
          >
            + Tambah Varietas Baru
          </button>
        )}
      </div>

      {/* Search Input Bar */}
      <div className="master-search-row">
        <div className="master-search-input-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder={
              activeTab === 'trees' ? 'Cari nomor seri, nama pohon, atau penanam...' :
              activeTab === 'species' ? 'Cari nama lokal atau nama latin...' :
              activeTab === 'kwarran' ? 'Cari nama kwarran atau kecamatan...' :
              'Cari username atau nama lengkap akun...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="master-loading-box">
          <div className="master-spinner"></div>
          <p>Memuat data master...</p>
        </div>
      ) : (
        <div className="master-content-panel">
          {/* TAB 1: MASTER POHON */}
          {activeTab === 'trees' && (
            <div className="master-table-responsive">
              <table className="master-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                    <th>No. Seri Pohon</th>
                    <th>Jenis Tanaman</th>
                    <th>Nama Latin</th>
                    <th>Kwarran / Penanam</th>
                    <th style={{ textAlign: 'center' }}>Tinggi</th>
                    <th style={{ textAlign: 'center' }}>Tgl Tanam</th>
                    <th style={{ textAlign: 'center' }}>Status</th>
                    <th style={{ textAlign: 'center', width: '100px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {trees
                    .filter((t) => {
                      const term = searchTerm.toLowerCase();
                      return (
                        (t.serial_no && t.serial_no.toLowerCase().includes(term)) ||
                        (t.nama_lokal && t.nama_lokal.toLowerCase().includes(term)) ||
                        (t.penanam && t.penanam.toLowerCase().includes(term))
                      );
                    })
                    .map((t, idx) => (
                      <tr key={t.id}>
                        <td style={{ textAlign: 'center', color: '#64748b' }}>{idx + 1}</td>
                        <td>
                          <span className="serial-badge">{t.serial_no || `ID-${t.id}`}</span>
                        </td>
                        <td style={{ fontWeight: 500, color: '#0f172a' }}>{t.nama_lokal}</td>
                        <td style={{ fontStyle: 'italic', color: '#64748b' }}>{t.nama_latin || '-'}</td>
                        <td>{t.penanam}</td>
                        <td style={{ textAlign: 'center' }}>{t.tinggi_cm ? `${t.tinggi_cm} cm` : '-'}</td>
                        <td style={{ textAlign: 'center' }}>{t.tanggal_tanam || '-'}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="status-pill-alive">{t.status || 'alive'}</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn-delete-row"
                            title="Hapus data pohon"
                            onClick={() => handleDeleteTree(t.id, t.serial_no)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: MASTER SPESIES */}
          {activeTab === 'species' && (
            <div className="master-table-responsive">
              <table className="master-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px', textAlign: 'center' }}>ID</th>
                    <th>Nama Lokal Tanaman</th>
                    <th>Nama Latin / Ilmiah</th>
                    <th>Waktu Ditambahkan</th>
                  </tr>
                </thead>
                <tbody>
                  {speciesList
                    .filter((s) => {
                      const term = searchTerm.toLowerCase();
                      return (
                        (s.nama_lokal && s.nama_lokal.toLowerCase().includes(term)) ||
                        (s.nama_latin && s.nama_latin.toLowerCase().includes(term))
                      );
                    })
                    .map((s) => (
                      <tr key={s.id}>
                        <td style={{ textAlign: 'center', color: '#64748b' }}>{s.id}</td>
                        <td style={{ fontWeight: 500, color: '#0f172a' }}>🌴 {s.nama_lokal}</td>
                        <td style={{ fontStyle: 'italic', color: '#475569' }}>{s.nama_latin || '-'}</td>
                        <td style={{ color: '#64748b' }}>
                          {s.created_at ? new Date(s.created_at).toLocaleDateString('id-ID') : '-'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: MASTER KWARRAN */}
          {activeTab === 'kwarran' && (
            <div className="master-table-responsive">
              <table className="master-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                    <th>Username Kwarran</th>
                    <th>Nama Lembaga / Kwartir</th>
                    <th>Wilayah / Organisasi</th>
                    <th style={{ textAlign: 'center' }}>Total Pohon</th>
                    <th style={{ textAlign: 'center' }}>Penanaman Terakhir</th>
                  </tr>
                </thead>
                <tbody>
                  {ranks
                    .filter((r) => {
                      const term = searchTerm.toLowerCase();
                      return (
                        (r.fullname && r.fullname.toLowerCase().includes(term)) ||
                        (r.username && r.username.toLowerCase().includes(term)) ||
                        (r.org && r.org.toLowerCase().includes(term))
                      );
                    })
                    .map((r, idx) => (
                      <tr key={r.username || idx}>
                        <td style={{ textAlign: 'center', color: '#64748b' }}>{idx + 1}</td>
                        <td><code>{r.username}</code></td>
                        <td style={{ fontWeight: 500, color: '#0f172a' }}>{r.fullname}</td>
                        <td style={{ color: '#475569' }}>{r.org}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`count-badge ${Number(r.total_trees) > 0 ? 'has-data' : ''}`}>
                            {r.total_trees || 0} pohon
                          </span>
                        </td>
                        <td style={{ textAlign: 'center', color: '#64748b' }}>
                          {r.last_planting_date || '-'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: MASTER AKUN PENGGUNA */}
          {activeTab === 'users' && (
            <div className="master-table-responsive">
              <table className="master-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                    <th>Username</th>
                    <th>Nama Lengkap</th>
                    <th>Organisasi / Asal</th>
                    <th>Kontak WhatsApp</th>
                    <th style={{ textAlign: 'center' }}>Peran / Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((u) => {
                      const term = searchTerm.toLowerCase();
                      return (
                        (u.username && u.username.toLowerCase().includes(term)) ||
                        (u.fullname && u.fullname.toLowerCase().includes(term)) ||
                        (u.org && u.org.toLowerCase().includes(term))
                      );
                    })
                    .map((u, idx) => {
                      const isAdmin =
                        u.is_admin === 1 ||
                        (u.username || '').toLowerCase().includes('kwarcab') ||
                        (u.username || '').toLowerCase().includes('admin');

                      return (
                        <tr key={u.id || idx}>
                          <td style={{ textAlign: 'center', color: '#64748b' }}>{idx + 1}</td>
                          <td><code>{u.username}</code></td>
                          <td style={{ fontWeight: 500, color: '#0f172a' }}>{u.fullname}</td>
                          <td style={{ color: '#475569' }}>{u.org || '-'}</td>
                          <td>{u.whatsapp || '-'}</td>
                          <td style={{ textAlign: 'center' }}>
                            <span className={isAdmin ? 'role-badge-admin' : 'role-badge-pangkalan'}>
                              {isAdmin ? 'Super Admin' : 'Pangkalan Kwarran'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal Tambah Spesies Baru */}
      {showAddSpeciesModal && (
        <div className="master-modal-backdrop" onClick={() => setShowAddSpeciesModal(false)}>
          <div className="master-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="master-modal-header">
              <h3 className="master-modal-title">Tambah Varietas / Spesies Baru</h3>
              <button
                type="button"
                className="master-modal-close"
                onClick={() => setShowAddSpeciesModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSpecies}>
              <div className="master-form-group">
                <label>Nama Lokal Tanaman *</label>
                <input
                  type="text"
                  placeholder="Contoh: Kelapa Kopyor / Kelapa Wulung..."
                  value={newNamaLokal}
                  onChange={(e) => setNewNamaLokal(e.target.value)}
                  required
                />
              </div>

              <div className="master-form-group">
                <label>Nama Latin / Ilmiah</label>
                <input
                  type="text"
                  placeholder="Contoh: Cocos nucifera var..."
                  value={newNamaLatin}
                  onChange={(e) => setNewNamaLatin(e.target.value)}
                />
              </div>

              <div className="master-modal-actions">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setShowAddSpeciesModal(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-modal-submit">
                  Simpan ke Data Master
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
