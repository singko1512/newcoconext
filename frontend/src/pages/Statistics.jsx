import React, { useEffect, useState } from 'react';
import './Statistics.css';
import api from '../services/api';

export default function Statistics({ onSelectSpecies }) {
  const [stats, setStats] = useState(null);
  const [speciesList, setSpeciesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL'); // ALL | KELAPA | OTHERS
  const [displayCount, setDisplayCount] = useState(15); // 10 | 15 | ALL

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

  const totalTrees = stats?.total_trees || 211;

  // Filter varietas berdasarkan pencarian dan kategori
  const filteredSpecies = speciesList.filter((sp) => {
    const name = (sp.nama_lokal || '').toLowerCase();
    const latin = (sp.nama_latin || '').toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchSearch = name.includes(term) || latin.includes(term);

    if (!matchSearch) return false;

    if (categoryFilter === 'KELAPA') {
      return name.includes('kelapa');
    }
    if (categoryFilter === 'OTHERS') {
      return !name.includes('kelapa');
    }
    return true;
  });

  const displayedInChart =
    displayCount === 'ALL'
      ? filteredSpecies
      : filteredSpecies.slice(0, Number(displayCount));

  const maxCount =
    speciesList.length > 0
      ? Math.max(...speciesList.map((s) => Number(s.total || s.count || 0)))
      : 70;

  return (
    <div className="stats-container">
      {/* Header */}
      <div className="stats-header">
        <div className="stats-badge">PRAMUKA PENGABDIAN</div>
        <h1 className="stats-title">Statistik Varietas Tanaman</h1>
        <p className="stats-subtitle">
          Distribusi seluruh varietas kelapa dan tanaman produktif yang ditanam dalam aksi penghijauan Coconext di 40 Kecamatan Kabupaten Bogor.
        </p>
      </div>

      {/* Metrics */}
      <div className="metrics-grid">
        <div className="metric-card metric-primary">
          <div className="metric-dot"></div>
          <div className="metric-info">
            <span className="metric-number">{stats?.total_trees || 211}</span>
            <span className="metric-label">Total Pohon Ditanam</span>
          </div>
        </div>

        <div className="metric-card metric-amber">
          <div className="metric-dot"></div>
          <div className="metric-info">
            <span className="metric-number">{speciesList.length || 35}</span>
            <span className="metric-label">Ragam Varietas</span>
          </div>
        </div>

        <div className="metric-card metric-emerald">
          <div className="metric-dot"></div>
          <div className="metric-info">
            <span className="metric-number">100%</span>
            <span className="metric-label">Tingkat Hidup</span>
          </div>
        </div>

        <div className="metric-card metric-blue">
          <div className="metric-dot"></div>
          <div className="metric-info">
            <span className="metric-number">{stats?.total_planters || 13}</span>
            <span className="metric-label">Kwarran Aktif</span>
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="stats-section">
        <div className="section-header">
          <div className="section-header-left">
            <h2>Distribusi Varietas</h2>
            <p>Perbandingan kuantitas per varietas berdasarkan jumlah penanaman.</p>
          </div>

          <div className="display-limit-picker">
            <span className="picker-label">Tampilkan:</span>
            {[10, 15, 'ALL'].map((val) => (
              <button
                key={val}
                type="button"
                className={`limit-btn ${displayCount === val ? 'active' : ''}`}
                onClick={() => setDisplayCount(val)}
              >
                {val === 'ALL' ? 'Semua' : `Top ${val}`}
              </button>
            ))}
          </div>
        </div>

        {/* Filter controls */}
        <div className="chart-controls">
          <div className="chart-search-box">
            <span className="search-icon">&#9906;</span>
            <input
              type="text"
              placeholder="Cari varietas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filter-buttons">
            <button
              type="button"
              className={`cat-btn ${categoryFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('ALL')}
            >
              Semua ({speciesList.length})
            </button>
            <button
              type="button"
              className={`cat-btn ${categoryFilter === 'KELAPA' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('KELAPA')}
            >
              Kelapa ({speciesList.filter((s) => (s.nama_lokal || '').toLowerCase().includes('kelapa')).length})
            </button>
            <button
              type="button"
              className={`cat-btn ${categoryFilter === 'OTHERS' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('OTHERS')}
            >
              Lainnya ({speciesList.filter((s) => !(s.nama_lokal || '').toLowerCase().includes('kelapa')).length})
            </button>
          </div>
        </div>

        {/* Horizontal bar chart */}
        <div className="horizontal-barchart-container">
          {loading ? (
            <div className="chart-loading">
              <div className="spinner-mini"></div>
              <span>Memuat data varietas...</span>
            </div>
          ) : displayedInChart.length === 0 ? (
            <div className="chart-empty">
              <p>Tidak ada varietas yang cocok dengan pencarian.</p>
            </div>
          ) : (
            <div className="horizontal-bars-list">
              {displayedInChart.map((item, index) => {
                const count = Number(item.total || item.count || 0);
                const percent = ((count / totalTrees) * 100).toFixed(1);
                const barWidth = Math.max(Math.round((count / maxCount) * 100), 4);
                const isCoconut = (item.nama_lokal || '').toLowerCase().includes('kelapa');

                return (
                  <div key={item.nama_lokal || index} className="horizontal-bar-row">
                    <div className="bar-species-info">
                      <span className="species-row-rank">{index + 1}</span>
                      <div className="species-row-names">
                        <strong className="species-row-local">{item.nama_lokal}</strong>
                        {item.nama_latin && (
                          <span className="species-row-latin">{item.nama_latin}</span>
                        )}
                      </div>
                    </div>

                    <div className="bar-track-wrapper">
                      <div className="bar-track">
                        <div
                          className={`bar-fill ${isCoconut ? 'bar-coconut' : 'bar-fruit'}`}
                          style={{ width: `${barWidth}%` }}
                        >
                          <span className="bar-inner-label">{count}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bar-values-box">
                      <span className="bar-count-badge">
                        <strong>{count}</strong> pohon
                      </span>
                      <span className="bar-percent-badge">{percent}%</span>
                    </div>

                    {onSelectSpecies && (
                      <button
                        type="button"
                        className="bar-action-btn"
                        onClick={() => onSelectSpecies(item.nama_lokal)}
                        title={`Filter ${item.nama_lokal} di peta`}
                      >
                        Peta
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="stats-section">
        <div className="table-section-header">
          <div>
            <h3>Daftar Varietas Tanaman</h3>
            <p>Rincian lengkap varietas beserta estimasi tinggi rata-rata.</p>
          </div>
          <span className="table-count-label">{filteredSpecies.length} varietas</span>
        </div>

        <div className="species-table-wrapper">
          <table className="species-table">
            <thead>
              <tr>
                <th style={{ width: '50px', textAlign: 'center' }}>#</th>
                <th style={{ minWidth: '180px' }}>Varietas</th>
                <th style={{ minWidth: '160px' }}>Nama Latin</th>
                <th style={{ textAlign: 'center', width: '100px' }}>Jumlah</th>
                <th style={{ textAlign: 'center', width: '90px' }}>%</th>
                <th style={{ textAlign: 'center', width: '110px' }}>Tinggi Rata²</th>
                <th style={{ textAlign: 'center', width: '100px' }}>Kondisi</th>
                <th style={{ textAlign: 'center', width: '70px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredSpecies.map((sp, index) => {
                const count = Number(sp.total || sp.count || 0);
                const percent = ((count / totalTrees) * 100).toFixed(1);

                return (
                  <tr key={sp.nama_lokal || index}>
                    <td style={{ textAlign: 'center', color: '#9ca3af', fontWeight: 600 }}>
                      {index + 1}
                    </td>
                    <td>
                      <div className="sp-name-cell">
                        <strong className="sp-title">{sp.nama_lokal}</strong>
                      </div>
                    </td>
                    <td>
                      <span className="sp-latin-text">
                        <em>{sp.nama_latin || '-'}</em>
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="sp-count-badge">{count}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="sp-percent-text">{percent}%</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="sp-height-text">
                        {sp.avg_height ? `${sp.avg_height} cm` : '-'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="sp--badge">Hidup</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {onSelectSpecies ? (
                        <button
                          type="button"
                          className="table-action-btn"
                          onClick={() => onSelectSpecies(sp.nama_lokal)}
                          title={`Lihat persebaran ${sp.nama_lokal} di peta`}
                        >
                          Peta
                        </button>
                      ) : (
                        '-'
                      )}
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
