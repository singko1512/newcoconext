import React, { useState } from 'react';
import api from '../services/api';

export default function AddTreeModal({ isOpen, onClose, onTreeAdded, defaultPlanter, mapCenter }) {
  const [lat, setLat] = useState(mapCenter?.lat ? mapCenter.lat.toFixed(6) : '-6.485595');
  const [lng, setLng] = useState(mapCenter?.lng ? mapCenter.lng.toFixed(6) : '106.838203');
  const [namaLokal, setNamaLokal] = useState('Kelapa Gading');
  const [namaLatin, setNamaLatin] = useState('Cocos nucifera eburnia');
  const [tinggiCm, setTinggiCm] = useState(50);
  const [tanggalTanam, setTanggalTanam] = useState(new Date().toISOString().slice(0, 10));
  const [asalBibit, setAsalBibit] = useState('Swadaya / Beli Sendiri');
  const [penanam, setPenanam] = useState(defaultPlanter || 'kwarran.cibinong');
  const [cerita, setCerita] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSpeciesChange = (e) => {
    const val = e.target.value;
    setNamaLokal(val);
    if (val === 'Kelapa Hijau') setNamaLatin('Cocos nucifera viridis');
    else if (val === 'Kelapa Gading') setNamaLatin('Cocos nucifera eburnia');
    else if (val === 'Kelapa Merah') setNamaLatin('Cocos nucifera rubescens');
    else if (val === 'Kelapa Manis') setNamaLatin('Cocos nucifera sakarina');
    else if (val === 'Durian') setNamaLatin('Durio zibethinus');
    else if (val === 'Alpukat') setNamaLatin('Persea americana');
    else setNamaLatin('-');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!lat || !lng) {
      setErrorMsg('Koordinat Latitude & Longitude wajib diisi.');
      return;
    }

    if (!namaLokal) {
      setErrorMsg('Nama tanaman wajib dipilih.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        nama_lokal: namaLokal,
        nama_latin: namaLatin,
        tinggi_cm: Number(tinggiCm),
        tanggal_tanam: tanggalTanam,
        asal_bibit: asalBibit,
        penanam: penanam || defaultPlanter || 'Kwarcab Bogor',
        cerita,
        status: '',
      };

      const res = await api.post('/trees', payload);

      if (res && res.success) {
        setSuccessMsg(`Berhasil! Nomor Seri: ${res.data?.serial_no}`);
        setTimeout(() => {
          if (onTreeAdded) onTreeAdded();
          onClose();
        }, 1200);
      } else {
        setErrorMsg(res?.message || 'Gagal menambahkan pohon.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat menyimpan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header Modal */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🌴</span>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#2b1d16', fontWeight: 800 }}>
              Tambah Penanaman Pohon Baru
            </h3>
          </div>
          <button onClick={onClose} style={closeBtnStyle} type="button">
            ✕
          </button>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            ⚠️ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div style={{ padding: '0.75rem', background: '#dcfce7', color: '#166534', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            ✅ {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Koordinat */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Latitude (Lintang)</label>
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                style={inputStyle}
                placeholder="-6.485595"
              />
            </div>
            <div>
              <label style={labelStyle}>Longitude (Bujur)</label>
              <input
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
                style={inputStyle}
                placeholder="106.838203"
              />
            </div>
          </div>

          {/* Jenis Pohon & Latin */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Jenis Tanaman / Varietas</label>
              <select value={namaLokal} onChange={handleSpeciesChange} style={inputStyle}>
                <option value="Kelapa Gading">Kelapa Gading (Tunas Pramuka)</option>
                <option value="Kelapa Hijau">Kelapa Hijau (Viridis)</option>
                <option value="Kelapa Merah">Kelapa Merah (Rubescens)</option>
                <option value="Kelapa Manis">Kelapa Manis (Sakarina)</option>
                <option value="Durian">Pohon Durian</option>
                <option value="Alpukat">Pohon Alpukat</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Nama Latin</label>
              <input
                type="text"
                value={namaLatin}
                onChange={(e) => setNamaLatin(e.target.value)}
                style={inputStyle}
                placeholder="Cocos nucifera"
              />
            </div>
          </div>

          {/* Tinggi & Tanggal */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Tinggi Bibit (cm)</label>
              <input
                type="number"
                value={tinggiCm}
                onChange={(e) => setTinggiCm(e.target.value)}
                required
                style={inputStyle}
                min="1"
              />
            </div>
            <div>
              <label style={labelStyle}>Tanggal Penanaman</label>
              <input
                type="date"
                value={tanggalTanam}
                onChange={(e) => setTanggalTanam(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
          </div>

          {/* Penanam & Asal Bibit */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Akun Penanam (Kwarran)</label>
              <input
                type="text"
                value={penanam}
                onChange={(e) => setPenanam(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Asal Bibit</label>
              <select value={asalBibit} onChange={(e) => setAsalBibit(e.target.value)} style={inputStyle}>
                <option value="Swadaya / Beli Sendiri">Swadaya / Beli Sendiri</option>
                <option value="Hasil Pembibitan Sendiri">Hasil Pembibitan Sendiri</option>
                <option value="Bantuan Pemerintah">Bantuan Pemerintah</option>
                <option value="CSR Perusahaan">CSR Perusahaan</option>
                <option value="Gugus Depan">Gugus Depan</option>
              </select>
            </div>
          </div>

          {/* Cerita */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>Catatan / Narasi Penanaman</label>
            <textarea
              rows="3"
              value={cerita}
              onChange={(e) => setCerita(e.target.value)}
              placeholder="Ceritakan momen penanaman pohon kelapa ini bersama adik-adik pramuka..."
              style={{ ...inputStyle, resize: 'vertical' }}
            ></textarea>
          </div>

          {/* Tombol Aksi */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.65rem 1.25rem',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '8px',
                color: '#4b5563',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.65rem 1.5rem',
                background: '#92400e',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontWeight: 800,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 6px rgba(146, 64, 14, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? 'Menyimpan...' : '🌱 Simpan ke Database'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(4px)',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
};

const modalStyle = {
  background: '#ffffff',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '560px',
  padding: '1.75rem',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
  maxHeight: '90vh',
  overflowY: 'auto',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.25rem',
  borderBottom: '1px solid #f3f4f6',
  paddingBottom: '0.75rem',
};

const closeBtnStyle = {
  background: 'none',
  border: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
  color: '#9ca3af',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: '#374151',
  marginBottom: '0.35rem',
};

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.55rem 0.8rem',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  fontSize: '0.88rem',
  outline: 'none',
  fontFamily: 'inherit',
};
