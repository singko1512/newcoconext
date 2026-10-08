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

  // Foto state & validasi max 2 MB
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoBase64, setPhotoBase64] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');
  const [photoFileSize, setPhotoFileSize] = useState('');

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

  // Handler Upload Foto dengan Validasi Maksimal 2 MB
  const handlePhotoChange = (e) => {
    setErrorMsg('');
    const file = e.target.files?.[0];
    if (!file) return;

    // Batas 2 MB (2 * 1024 * 1024 bytes)
    const MAX_SIZE_BYTES = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setErrorMsg(`⚠️ Ukuran foto melebihi batas maksimal 2 MB (${sizeMB} MB). Silakan pilih foto lain yang ukurannya di bawah 2 MB.`);
      e.target.value = '';
      return;
    }

    // Format info ukuran
    const formattedSize = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${(file.size / 1024).toFixed(0)} KB`;

    setPhotoFileName(file.name);
    setPhotoFileSize(formattedSize);

    // Convert to Base64 untuk preview dan disimpan
    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoPreview(event.target.result);
      setPhotoBase64(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setPhotoBase64('');
    setPhotoFileName('');
    setPhotoFileSize('');
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
        foto_sebelum: photoBase64 || null,
        foto_sesudah: photoBase64 || null,
        status: 'alive',
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
            <span style={{ fontSize: '1.3rem' }}>🌴</span>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#1e293b', fontWeight: 600 }}>
              Tambah Penanaman Pohon Baru
            </h3>
          </div>
          <button onClick={onClose} style={closeBtnStyle} type="button" aria-label="Tutup modal">
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

          {/* Tambah Foto (Maksimal 2 MB) */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label style={labelStyle}>Tambah Foto Pohon</label>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Maksimal 2 MB</span>
            </div>

            {!photoPreview ? (
              <label style={uploadAreaStyle}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span style={{ fontSize: '0.82rem', color: '#475569', marginTop: '0.35rem' }}>
                  Pilih foto dari perangkat (JPG, PNG - Max 2MB)
                </span>
              </label>
            ) : (
              <div style={photoPreviewCardStyle}>
                <img
                  src={photoPreview}
                  alt="Preview Tanaman"
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {photoFileName || 'Foto Dokumentasi'}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                    Ukuran: <strong style={{ color: '#166534', fontWeight: 500 }}>{photoFileSize}</strong> / 2 MB maks
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    style={{
                      marginTop: '6px',
                      padding: '3px 8px',
                      background: '#fee2e2',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#991b1b',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                    }}
                  >
                    Hapus Foto
                  </button>
                </div>
              </div>
            )}
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
              style={btnCancelStyle}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              style={btnSubmitStyle}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#5c2709'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#92400e'; }}
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
  background: 'rgba(0, 0, 0, 0.65)',
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
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
  maxHeight: '90vh',
  overflowY: 'auto',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.25rem',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '0.75rem',
};

const closeBtnStyle = {
  background: 'none',
  border: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
  color: '#64748b',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 500,
  color: '#334155',
  marginBottom: '0.35rem',
};

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.55rem 0.8rem',
  borderRadius: '8px',
  border: '1.5px solid #cbd5e1',
  fontSize: '0.88rem',
  outline: 'none',
  fontFamily: 'inherit',
  fontWeight: 400,
  color: '#1e293b',
};

const uploadAreaStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.1rem',
  border: '1.5px dashed #cbd5e1',
  borderRadius: '10px',
  background: '#f8fafc',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const photoPreviewCardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.85rem',
  padding: '0.65rem',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  background: '#f8fafc',
};

const btnCancelStyle = {
  padding: '0.6rem 1.2rem',
  background: '#f1f5f9',
  border: 'none',
  borderRadius: '8px',
  color: '#475569',
  fontWeight: 500,
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
};

const btnSubmitStyle = {
  padding: '0.6rem 1.4rem',
  background: '#92400e',
  border: 'none',
  borderRadius: '8px',
  color: '#ffffff',
  fontWeight: 500,
  fontSize: '0.85rem',
  cursor: 'pointer',
  boxShadow: '0 2px 6px rgba(146, 64, 14, 0.35)',
  transition: 'background 0.2s ease',
};

