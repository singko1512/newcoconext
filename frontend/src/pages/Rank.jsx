import React, { useEffect, useState } from 'react';
import './Rank.css';
import api from '../services/api';

export default function Rank({ onSelectKecamatan }) {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActiveOnly, setFilterActiveOnly] = useState(false);

  useEffect(() => {
    fetchRanks();
  }, []);

  const fetchRanks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/trees/rank');
      if (res && res.success && Array.isArray(res.data)) {
        setRanks(res.data);
      }
    } catch (err) {
      console.warn('Gagal memuat ranking:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRanks = ranks.filter((r) => {
    const term = searchTerm.toLowerCase();
    const matchName =
      (r.fullname && r.fullname.toLowerCase().includes(term)) ||
      (r.username && r.username.toLowerCase().includes(term)) ||
      (r.org && r.org.toLowerCase().includes(term));

    if (filterActiveOnly) {
      return matchName && Number(r.total_trees) > 0;
    }
    return matchName;
  });

  const top3 = ranks.filter((r) => Number(r.total_trees) > 0).slice(0, 3);
  const totalAllTrees = ranks.reduce((acc, curr) => acc + Number(curr.total_trees || 0), 0);
  const activeKwarranCount = ranks.filter((r) => Number(r.total_trees) > 0).length;

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="rank-container">
      {/* Header Banner */}
      <div className="rank-header">
        <div className="rank-badge">🏆 LEADERBOARD PRAMUKA KABUPATEN BOGOR</div>
        <h1 className="rank-title">Peringkat Penanaman Pohon</h1>
        <p className="rank-subtitle">
          Data capaian penanaman pohon oleh seluruh Kwartir Ranting se-Kabupaten Bogor dengan rekapitulasi pertahun 2025–2030 serta catatan penanaman tanggal terakhir.
        </p>
      </div>

      {/* Podium Top 3 */}
      {!loading && top3.length >= 3 && (
        <div className="podium-section">
          {/* Juara 2 */}
          <div className="podium-card podium-silver">
            <div className="podium-medal">🥈</div>
            <div className="podium-rank-number">#2</div>
            <h3 className="podium-name">{top3[1].fullname || top3[1].username}</h3>
            <p className="podium-org">{top3[1].org || 'Kwarran'}</p>
            <div className="podium-count">
              <span className="count-number">{top3[1].total_trees}</span>
              <span className="count-label">Pohon</span>
            </div>
            <div className="podium-detail">
              <span>📅 Terakhir: {formatDate(top3[1].last_planting_date)}</span>
            </div>
            {onSelectKecamatan && (
              <button
                type="button"
                className="podium-btn"
                onClick={() => onSelectKecamatan(top3[1].username)}
              >
                Lihat di Peta 🗺️
              </button>
            )}
          </div>

          {/* Juara 1 */}
          <div className="podium-card podium-gold">
            <div className="crown-badge">👑 JUARA 1</div>
            <div className="podium-medal">🥇</div>
            <div className="podium-rank-number">#1</div>
            <h3 className="podium-name">{top3[0].fullname || top3[0].username}</h3>
            <p className="podium-org">{top3[0].org || 'Kwarran'}</p>
            <div className="podium-count">
              <span className="count-number">{top3[0].total_trees}</span>
              <span className="count-label">Pohon Ditanam</span>
            </div>
            <div className="podium-detail">
              <span>📅 Terakhir: {formatDate(top3[0].last_planting_date)}</span>
            </div>
            {onSelectKecamatan && (
              <button
                type="button"
                className="podium-btn"
                onClick={() => onSelectKecamatan(top3[0].username)}
              >
                Lihat di Peta 🗺️
              </button>
            )}
          </div>

          {/* Juara 3 */}
          <div className="podium-card podium-bronze">
            <div className="podium-medal">🥉</div>
            <div className="podium-rank-number">#3</div>
            <h3 className="podium-name">{top3[2].fullname || top3[2].username}</h3>
            <p className="podium-org">{top3[2].org || 'Kwarran'}</p>
            <div className="podium-count">
              <span className="count-number">{top3[2].total_trees}</span>
              <span className="count-label">Pohon</span>
            </div>
            <div className="podium-detail">
              <span>📅 Terakhir: {formatDate(top3[2].last_planting_date)}</span>
            </div>
            {onSelectKecamatan && (
              <button
                type="button"
                className="podium-btn"
                onClick={() => onSelectKecamatan(top3[2].username)}
              >
                Lihat di Peta 🗺️
              </button>
            )}
          </div>
        </div>
      )}

      {/* Kontrol Pencarian, Filter & Statistik Singkat */}
      <div className="rank-table-header">
        <div className="rank-search-row">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder=" Kwarran / Kecamatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-chips">
            <button
              type="button"
              className={`filter-chip ${!filterActiveOnly ? 'active' : ''}`}
              onClick={() => setFilterActiveOnly(false)}
            >
              Semua Kwarran ({ranks.length})
            </button>
            <button
              type="button"
              className={`filter-chip ${filterActiveOnly ? 'active' : ''}`}
              onClick={() => setFilterActiveOnly(true)}
            >
              Hanya yang Ada Tanaman ({activeKwarranCount})
            </button>
          </div>
        </div>

        <div className="total-kwarran-badge">
          Total: <strong>{totalAllTrees}</strong> Pohon • <strong>{ranks.length}</strong> Kwarran
        </div>
      </div>

      {/* Tabel Lengkap Peringkat */}
      <div className="rank-table-wrapper">
        {loading ? (
          <div className="rank-loading">
            <div className="spinner"></div>
            <p>Memuat data peringkat kwarran...</p>
          </div>
        ) : filteredRanks.length === 0 ? (
          <div className="rank-empty">
            <p>Tidak ditemukan data kwarran yang sesuai kata kunci pencarian.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="rank-table">
              <thead>
                <tr>
                  <th style={{ width: '60px', textAlign: 'center' }}>NOMOR</th>
                  <th style={{ minWidth: '180px' }}>NAMA KWARAN</th>
                  <th style={{ textAlign: 'center', minWidth: '110px' }}>JUMLAH TOTAL TANAMAN</th>
                  <th style={{ textAlign: 'center', minWidth: '170px' }}>TANGGAL TERAKHIR & JUMLAH</th>
                  <th style={{ textAlign: 'center', width: '70px' }}>2025</th>
                  <th style={{ textAlign: 'center', width: '70px' }}>2026</th>
                  <th style={{ textAlign: 'center', width: '70px' }}>2027</th>
                  <th style={{ textAlign: 'center', width: '70px' }}>2028</th>
                  <th style={{ textAlign: 'center', width: '70px' }}>2029</th>
                  <th style={{ textAlign: 'center', width: '70px' }}>2030</th>
                  <th style={{ textAlign: 'center', width: '100px' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {filteredRanks.map((item, index) => {
                  const rankNum = index + 1;
                  const total = Number(item.total_trees || 0);
                  const isTop3 = rankNum <= 3 && total > 0;

                  return (
                    <tr key={item.username || index} className={isTop3 ? `top-row top-row-${rankNum}` : ''}>
                      {/* 1. NOMOR */}
                      <td style={{ textAlign: 'center' }}>
                        <span className={`rank-badge-pill rank-${isTop3 ? rankNum : 'other'}`}>
                          {isTop3 ? (rankNum === 1 ? '🥇 1' : rankNum === 2 ? '🥈 2' : '🥉 3') : rankNum}
                        </span>
                      </td>

                      {/* 2. NAMA KWARAN */}
                      <td>
                        <div className="user-info-cell">
                          <div className="user-fullname">{item.fullname || item.username}</div>
                          <div className="user-sub">{item.org || 'Kwarran'}</div>
                        </div>
                      </td>

                      {/* 3. JUMLAH TOTAL TANAMAN */}
                      <td style={{ textAlign: 'center' }}>
                        <span className={`tree-count-pill ${total > 0 ? 'has-trees' : 'zero-trees'}`}>
                          {total > 0 ? `${total} pohon` : '0'}
                        </span>
                      </td>

                      {/* 4. TANGGAL TERAKHIR & JUMLAH TANAMAN TANGGAL TERAKHIR */}
                      <td style={{ textAlign: 'center' }}>
                        {item.last_planting_date ? (
                          <div className="last-date-cell">
                            <span className="last-date-text">📅 {formatDate(item.last_planting_date)}</span>
                            {item.count_last_date > 0 && (
                              <span className="last-date-count">
                                (+{item.count_last_date} pohon)
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>

                      {/* 5-10. JUMLAH TANAMAN PERTAHUN 2025-2030 */}
                      <td style={{ textAlign: 'center' }} className={Number(item.y2025) > 0 ? 'cell-has-year' : 'cell-zero'}>
                        {Number(item.y2025) || '-'}
                      </td>
                      <td style={{ textAlign: 'center' }} className={Number(item.y2026) > 0 ? 'cell-has-year active-year' : 'cell-zero'}>
                        {Number(item.y2026) || '-'}
                      </td>
                      <td style={{ textAlign: 'center' }} className={Number(item.y2027) > 0 ? 'cell-has-year' : 'cell-zero'}>
                        {Number(item.y2027) || '-'}
                      </td>
                      <td style={{ textAlign: 'center' }} className={Number(item.y2028) > 0 ? 'cell-has-year' : 'cell-zero'}>
                        {Number(item.y2028) || '-'}
                      </td>
                      <td style={{ textAlign: 'center' }} className={Number(item.y2029) > 0 ? 'cell-has-year' : 'cell-zero'}>
                        {Number(item.y2029) || '-'}
                      </td>
                      <td style={{ textAlign: 'center' }} className={Number(item.y2030) > 0 ? 'cell-has-year' : 'cell-zero'}>
                        {Number(item.y2030) || '-'}
                      </td>

                      {/* 11. AKSI */}
                      <td style={{ textAlign: 'center' }}>
                        {onSelectKecamatan ? (
                          <button
                            type="button"
                            className="table-action-btn"
                            onClick={() => onSelectKecamatan(item.username)}
                            title={`Lihat sebaran ${item.fullname} di peta`}
                          >
                            Peta 🗺️
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
        )}
      </div>
    </div>
  );
}
