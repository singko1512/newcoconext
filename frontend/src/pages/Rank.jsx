import React, { useEffect, useState } from 'react';
import './Rank.css';
import api from '../services/api';

export default function Rank({ onSelectKecamatan }) {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
    return (
      (r.fullname && r.fullname.toLowerCase().includes(term)) ||
      (r.penanam && r.penanam.toLowerCase().includes(term)) ||
      (r.org && r.org.toLowerCase().includes(term))
    );
  });

  const top3 = ranks.slice(0, 3);

  return (
    <div className="rank-container">
      {/* Header Banner */}
      <div className="rank-header">
        <div className="rank-badge">🏆 LEADERBOARD PRAMUKA BOGOR</div>
        <h1 className="rank-title">Peringkat Penanam Terbanyak</h1>
        <p className="rank-subtitle">
          Apresiasi dedikasi Kwartir Ranting & Pangkalan dalam aksi penghijauan Coconext di seluruh penjuru Kabupaten Bogor.
        </p>
      </div>

      {/* Podium Top 3 */}
      {!loading && top3.length >= 3 && (
        <div className="podium-section">
          {/* Juara 2 */}
          <div className="podium-card podium-silver">
            <div className="podium-medal">🥈</div>
            <div className="podium-rank-number">#2</div>
            <h3 className="podium-name">{top3[1].fullname || top3[1].penanam}</h3>
            <p className="podium-org">{top3[1].org || 'Kwarran'}</p>
            <div className="podium-count">
              <span className="count-number">{top3[1].total_trees}</span>
              <span className="count-label">Pohon</span>
            </div>
            <div className="podium-detail">
              <span>🌱 {top3[1].total_species} Spesies</span>
              <span>📏 {top3[1].avg_height} cm</span>
            </div>
            {onSelectKecamatan && (
              <button
                className="podium-btn"
                onClick={() => onSelectKecamatan(top3[1].penanam)}
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
            <h3 className="podium-name">{top3[0].fullname || top3[0].penanam}</h3>
            <p className="podium-org">{top3[0].org || 'Kwarran'}</p>
            <div className="podium-count">
              <span className="count-number">{top3[0].total_trees}</span>
              <span className="count-label">Pohon Ditanam</span>
            </div>
            <div className="podium-detail">
              <span>🌱 {top3[0].total_species} Spesies</span>
              <span>📏 {top3[0].avg_height} cm</span>
            </div>
            {onSelectKecamatan && (
              <button
                className="podium-btn"
                onClick={() => onSelectKecamatan(top3[0].penanam)}
              >
                Lihat di Peta 🗺️
              </button>
            )}
          </div>

          {/* Juara 3 */}
          <div className="podium-card podium-bronze">
            <div className="podium-medal">🥉</div>
            <div className="podium-rank-number">#3</div>
            <h3 className="podium-name">{top3[2].fullname || top3[2].penanam}</h3>
            <p className="podium-org">{top3[2].org || 'Kwarran'}</p>
            <div className="podium-count">
              <span className="count-number">{top3[2].total_trees}</span>
              <span className="count-label">Pohon</span>
            </div>
            <div className="podium-detail">
              <span>🌱 {top3[2].total_species} Spesies</span>
              <span>📏 {top3[2].avg_height} cm</span>
            </div>
            {onSelectKecamatan && (
              <button
                className="podium-btn"
                onClick={() => onSelectKecamatan(top3[2].penanam)}
              >
                Lihat di Peta 🗺️
              </button>
            )}
          </div>
        </div>
      )}

      {/* Kontrol Pencarian & Statistik Singkat */}
      <div className="rank-table-header">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Cari nama Kwarran / Pangkalan / Kecamatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="total-kwarran-badge">
          Terdaftar: <strong>{ranks.length}</strong> Partisipan Kwarran
        </div>
      </div>

      {/* Tabel Lengkap Peringkat */}
      <div className="rank-table-wrapper">
        {loading ? (
          <div className="rank-loading">
            <div className="spinner"></div>
            <p>Memuat data leaderboard peringkat...</p>
          </div>
        ) : filteredRanks.length === 0 ? (
          <div className="rank-empty">
            <p>Tidak ditemukan data penanam yang sesuai kata kunci.</p>
          </div>
        ) : (
          <table className="rank-table">
            <thead>
              <tr>
                <th style={{ width: '80px', textAlign: 'center' }}>POSISI</th>
                <th>KWARRAN / PANGKALAN</th>
                <th style={{ textAlign: 'center' }}>TOTAL POHON</th>
                <th style={{ textAlign: 'center' }}>VARIASI SPESIES</th>
                <th style={{ textAlign: 'center' }}>TINGGI RATA-RATA</th>
                <th style={{ textAlign: 'center' }}>STATUS HIDUP</th>
                <th style={{ textAlign: 'center' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {filteredRanks.map((item, index) => {
                const rankNum = index + 1;
                return (
                  <tr key={item.penanam || index} className={rankNum <= 3 ? `top-row top-row-${rankNum}` : ''}>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`rank-badge-pill rank-${rankNum <= 3 ? rankNum : 'other'}`}>
                        {rankNum === 1 ? '🥇 1' : rankNum === 2 ? '🥈 2' : rankNum === 3 ? '🥉 3' : rankNum}
                      </span>
                    </td>
                    <td>
                      <div className="user-info-cell">
                        <div className="user-fullname">{item.fullname || item.penanam}</div>
                        <div className="user-sub">{item.org || item.penanam}</div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="tree-count-pill">{item.total_trees} pohon</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="species-count-text">{item.total_species} jenis</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="height-text">{item.avg_height} cm</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="alive-badge">
                        100% ({item.alive_count || item.total_trees})
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {onSelectKecamatan ? (
                        <button
                          className="table-action-btn"
                          onClick={() => onSelectKecamatan(item.penanam)}
                          title="Lihat sebaran titik di peta"
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
        )}
      </div>
    </div>
  );
}
