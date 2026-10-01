import React, { useEffect, useState } from 'react';
import './Statistics.css';
import api from '../services/api';

export default function Statistics({ onSelectSpecies }) {
  const [stats, setStats] = useState(null);
  const [speciesList, setSpeciesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatsData();
  }, []);

  const fetchStatsData = async () => {
    setLoading(true);
    try {
      const [overviewRes, speciesRes] = await Promise.all([
        api.get('/trees/stats'),
        api.get('/trees/stats/species'),
      ]);

      if (overviewRes && overviewRes.success) {
        setStats(overviewRes.data);
      }

      if (speciesRes && speciesRes.success && Array.isArray(speciesRes.data)) {
        setSpeciesList(speciesRes.data);
      }
    } catch (err) {
      console.warn('Gagal memuat data statistik:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalTrees = stats ? stats.total_trees : 211;
  const topSpecies = speciesList.slice(0, 8);

  return (
    <div className="stats-container">
      {/* Header Banner */}
      <div className="stats-header">
        <div className="stats-badge">📊 STATISTIK FLORA & TANAMAN</div>
        <h1 className="stats-title">Statistik Penanaman Coconext</h1>
        <p className="stats-subtitle">
          Data real-time komparasi jenis varietas kelapa dan tanaman produktif yang ditanam oleh Kwartir Cabang Kabupaten Bogor.
        </p>
      </div>

      {/* Grid Kartu Ringkasan Utama */}
      <div className="metrics-grid">
        <div className="metric-card metric-primary">
          <div className="metric-icon">🌴</div>
          <div className="metric-info">
            <span className="metric-number">{stats?.total_trees || 211}</span>
            <span className="metric-label">Total Pohon Ditanam</span>
          </div>
          <div className="metric-progress-bg">
            <div className="metric-progress-fill" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="metric-card metric-amber">
          <div className="metric-icon">🌱</div>
          <div className="metric-info">
            <span className="metric-number">{speciesList.length || 28}</span>
            <span className="metric-label">Varietas & Spesies</span>
          </div>
          <div className="metric-progress-bg">
            <div className="metric-progress-fill" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="metric-card metric-emerald">
          <div className="metric-icon">💚</div>
          <div className="metric-info">
            <span className="metric-number">100%</span>
            <span className="metric-label">Tingkat Hidup (Alive)</span>
          </div>
          <div className="metric-progress-bg">
            <div className="metric-progress-fill" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="metric-card metric-blue">
          <div className="metric-icon">🏢</div>
          <div className="metric-info">
            <span className="metric-number">{stats?.total_planters || 13}</span>
            <span className="metric-label">Kwarran Aktif Menanam</span>
          </div>
          <div className="metric-progress-bg">
            <div className="metric-progress-fill" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>

      {/* Sebaran Spesies Terpopuler */}
      <div className="stats-section-row">
        {/* Kolom Kiri: Visualisasi Distribusi Bar Chart */}
        <div className="stats-card species-bars-card">
          <div className="card-top">
            <h3 className="card-title">Distribusi Spesies Terbanyak</h3>
            <span className="card-badge">Top 8 Varietas</span>
          </div>
          <p className="card-desc">
            Persentase dan jumlah pohon terbanyak yang ditanam di kawasan Kabupaten Bogor.
          </p>

          <div className="species-bar-list">
            {loading ? (
              <div className="stats-loading">Memuat grafik spesies...</div>
            ) : (
              topSpecies.map((item, idx) => {
                const percent = Math.round((item.count / totalTrees) * 100);
                const colors = [
                  '#10b981', // Hijau
                  '#f59e0b', // Emas
                  '#3b82f6', // Biru
                  '#ec4899', // Pink
                  '#8b5cf6', // Ungu
                  '#14b8a6', // Teal
                  '#f97316', // Orange
                  '#64748b', // Slate
                ];
                const barColor = colors[idx % colors.length];

                return (
                  <div key={item.nama_lokal} className="species-bar-item">
                    <div className="bar-labels">
                      <span className="bar-name">
                        <strong style={{ color: barColor }}>● </strong>
                        {item.nama_lokal}
                      </span>
                      <span className="bar-val">
                        <strong>{item.count}</strong> pohon ({percent}%)
                      </span>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${Math.max(percent, 4)}%`,
                          background: barColor,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Kolom Kanan: Highlight Kelapa Khusus */}
        <div className="stats-card highlight-card">
          <div className="card-top">
            <h3 className="card-title">Varietas Kelapa Unggulan</h3>
            <span className="card-badge-amber">Kelapa Sawit & Tunas</span>
          </div>
          <div className="highlight-list">
            <div className="highlight-item">
              <div className="highlight-emoji">🥥</div>
              <div className="highlight-detail">
                <h4>Kelapa Hijau (Cocos nucifera viridis)</h4>
                <p>Varietas terbanyak dengan 70 pohon (33.2%). Dikenal memiliki khasiat air kelapa murni yang menyehatkan.</p>
                <div className="highlight-stat">Rata-rata tinggi: <strong>53.4 cm</strong></div>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-emoji">🌴</div>
              <div className="highlight-detail">
                <h4>Kelapa Gading (Cocos nucifera eburnia)</h4>
                <p>Simbol resmi tunas kelapa Gerakan Pramuka. 41 pohon ditanam di berbagai titik pangkalan kwarran.</p>
                <div className="highlight-stat">Rata-rata tinggi: <strong>43.9 cm</strong></div>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-emoji">🔴</div>
              <div className="highlight-detail">
                <h4>Kelapa Merah & Varietas Langka</h4>
                <p>Spesies eksotis yang dirawat untuk keanekaragaman hayati dan penelitian lingkungan pramuka.</p>
                <div className="highlight-stat">Rata-rata tinggi: <strong>40.3 cm</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Rincian Semua Spesies */}
      <div className="stats-card table-section-card">
        <div className="card-top">
          <h3 className="card-title">Daftar Lengkap Spesies Tanaman</h3>
          <span className="card-badge">Total {speciesList.length} Spesies</span>
        </div>

        <div className="species-table-wrapper">
          <table className="species-table">
            <thead>
              <tr>
                <th>NO</th>
                <th>NAMA TANAMAN / SPESIES</th>
                <th style={{ textAlign: 'center' }}>JUMLAH POHON</th>
                <th style={{ textAlign: 'center' }}>PERSENTASE</th>
                <th style={{ textAlign: 'center' }}>RATA-RATA TINGGI</th>
                <th style={{ textAlign: 'center' }}>STATUS KONDISI</th>
              </tr>
            </thead>
            <tbody>
              {speciesList.map((sp, index) => {
                const percent = ((sp.count / totalTrees) * 100).toFixed(1);
                return (
                  <tr key={sp.nama_lokal || index}>
                    <td style={{ color: '#9ca3af', fontWeight: 600 }}>{index + 1}</td>
                    <td>
                      <div className="sp-name-cell">
                        <span className="sp-icon">🌱</span>
                        <strong className="sp-title">{sp.nama_lokal}</strong>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="sp-count-badge">{sp.count} pohon</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="sp-percent-text">{percent}%</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="sp-height-text">{sp.avg_height || '-'} cm</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="sp-alive-badge">● 100% Hidup</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
