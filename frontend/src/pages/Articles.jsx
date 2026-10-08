import React, { useState, useEffect } from 'react';
import './Articles.css';

// Kategori Berita
const CATEGORIES = [
  'Semua',
  'Pramuka & Gerakan Hijau',
  'Penanaman Pohon',
  'Konservasi & Alam',
  'Kabupaten Bogor',
];

// Fallback data artikel berkualitas tinggi seputar Pramuka & Penanaman Pohon
const FALLBACK_ARTICLES = [
  {
    id: 1,
    title: 'Kwarcab Bogor Gelar Aksi Tanam Pohon Kelapa Serentak di 40 Kwarran',
    category: 'Pramuka & Gerakan Hijau',
    source: 'Kwarcab Kab. Bogor Info',
    date: '2026-10-02',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    summary: 'Gerakan Pramuka Kwartir Cabang Kabupaten Bogor menggiatkan program Satu Tunas untuk Masa Depan Bumi dengan mendata setiap bibit kelapa yang ditanam secara presisi.',
    content: `CIBINONG — Kwartir Cabang (Kwarcab) Gerakan Pramuka Kabupaten Bogor menggelar gerakan penanaman pohon kelapa dan aneka tanaman buah serentak di seluruh 40 Kwartir Ranting (Kwarran).

Ketua Kwarcab menyatakan bahwa program Coconext dirancang sebagai bentuk nyata bakti anggota pramuka terhadap pelestarian bumi dan keanekaragaman hayati. Seluruh titik tanam tercatat secara digital dengan koordinat geografis untuk pemantauan jangka panjang.

"Pohon kelapa melambangkan jiwa pramuka yang tangguh, bermanfaat dari akar hingga pucuk daun bagi masyarakat. Melalui Coconext, kami mengawal kelangsungan hidup tunas ini hingga berbuah lebat di masa mendatang," ujarnya.`,
  },
  {
    id: 2,
    title: 'Manfaat Konservasi Pohon Kelapa dalam Menjaga Struktur Tanah & Air Bersih',
    category: 'Penanaman Pohon',
    source: 'Jurnal Lingkungan Hidup',
    date: '2026-09-28',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    summary: 'Akar serabut pohon kelapa terbukti ampuh mencegah erosi tanah di bantaran sungai dan lereng bukit di wilayah Bogor Barat dan Selatan.',
    content: `BOGOR — Tanaman kelapa (Cocos nucifera) memiliki struktur perakaran serabut yang sangat rapat dan kuat. Karakteristik ini menjadikannya salah satu pohon terbaik untuk mitigasi bencana longsor skala mikro dan penahan laju pengikisan tanah.

Penelitian menunjukkan bahwa penanaman kelapa gading dan kelapa hijau di daerah perbukitan seperti Pamijahan, Leuwiliang, dan Rumpin membantu menahan air hujan agar meresap ke dalam tanah, sehingga cadangan air tanah warga tetap terjaga saat kemarau tiba.`,
  },
  {
    id: 3,
    title: 'Kwarda Jawa Barat Apresiasi Inovasi Digital Pendataan Pohon Kwarcab Bogor',
    category: 'Pramuka & Gerakan Hijau',
    source: 'Pramuka Jabar Update',
    date: '2026-09-22',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80',
    summary: 'Inovasi pelacakan titik pohon per wilayah kecamatan menjadi inspirasi tata kelola aksi lingkungan hidup di tingkat regional.',
    content: `BANDUNG — Kwartir Daerah Gerakan Pramuka Jawa Barat memberikan apresiasi tinggi terhadap terobosan Kwarcab Bogor dalam memanfaatkan pemetaan digital interaktif untuk mencatat penanaman pohon.

Setiap pohon kelapa yang ditanam diberi nomor seri khusus, dicatat nama penanamnya, ketinggian, serta koordinat titik tanam. Hal ini mengubah paradigma penghijauan konvensional menjadi gerakan berbasis akuntabilitas dan data nyata.`,
  },
  {
    id: 4,
    title: 'Revitalisasi Hutan Kota dan Ruang Terbuka Hijau di Kabupaten Bogor',
    category: 'Kabupaten Bogor',
    source: 'Diskominfo Kab. Bogor',
    date: '2026-09-15',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    summary: 'Pemerintah Kabupaten Bogor bersama komunitas pramuka memperluas koridor hijau untuk menekan jejak emisi karbon dan polusi udara.',
    content: `CIBINONG — Pemerintah Kabupaten Bogor terus menggalakkan penambahan ruang terbuka hijau (RTH) di jalur perkotaan Cibinong Raya hingga pelosok pedesaan.

Kolaborasi lintas sektor bersama Kwartir Ranting Pramuka menjadi motor penggerak partisipasi generasi muda dalam menanam pohon pelindung dan tanaman produktif bernilai ekonomis tinggi.`,
  },
  {
    id: 5,
    title: 'Mengenal Ragam Varietas Kelapa: Dari Kelapa Gading hingga Kelapa Hijau',
    category: 'Konservasi & Alam',
    source: 'Info Botani Tropis',
    date: '2026-09-08',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&auto=format&fit=crop&q=80',
    summary: 'Ketahui keunikan jenis kelapa gading, kelapa kopyor, puyuh, hingga viridis yang banyak dibudidayakan di Jawa Barat.',
    content: `Kelapa bukan sekadar tanaman tropis biasa. Berbagai varietas memiliki khasiat dan keunggulan masing-masing:

1. Kelapa Gading (Cocos nucifera eburnia): Berwarna kuning keemasan, sering dijadikan simbol kepramukaan karena keanggunan dan keuletannya.
2. Kelapa Hijau (Cocos nucifera viridis): Kaya akan elektrolit alami dan antioksidan, sangat digemari untuk kesehatan.
3. Kelapa Merah (Cocos nucifera rubescens): Memiliki semburat kemerahan pada tangkai buah dengan rasa air yang khas.`,
  },
  {
    id: 6,
    title: 'Semangat Gerakan Pramuka: Menanam Hari Ini, Memanen Masa Depan',
    category: 'Pramuka & Gerakan Hijau',
    source: 'Warta Pramuka',
    date: '2026-08-30',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=80',
    summary: 'Pramuka penggalang dan penegak se-Kabupaten Bogor membuktikan komitmen cinta alam dengan turun langsung menanam bibit kelapa.',
    content: `JASINGA — Puluhan pramuka penggalang dari pangkalan gugus depan bahu-membahu membawa cangkul dan bibit tanaman. Senyum riang terpancar saat tanah berhasil ditimbun dan air pertama disiramkan ke akar tunas.

"Ini bukan tugas seremonial, ini adalah warisan kami untuk bumi 10 atau 20 tahun yang akan datang," ungkap salah seorang peserta kegiatan bakti tanam.`,
  },
];

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticleModal, setActiveArticleModal] = useState(null);
  const [apiSourceStatus, setApiSourceStatus] = useState('Memuat berita...');

  // Fetch API Berita Aktual
  useEffect(() => {
    fetchNewsFromApi();
  }, []);

  const fetchNewsFromApi = async () => {
    setLoading(true);
    try {
      // Coba fetch dari API Berita Indonesia publik (Antara Humaniora / Lingkungan)
      const res = await fetch('https://api-berita-indonesia.vercel.app/antara/humaniora', {
        signal: AbortSignal.timeout(4000),
      });

      if (res.ok) {
        const json = await res.json();
        if (json?.data?.posts && Array.isArray(json.data.posts) && json.data.posts.length > 0) {
          const livePosts = json.data.posts.slice(0, 8).map((p, idx) => ({
            id: `api-${idx}`,
            title: p.title,
            category: p.title.toLowerCase().includes('pohon') || p.title.toLowerCase().includes('alam')
              ? 'Konservasi & Alam'
              : 'Pramuka & Gerakan Hijau',
            source: 'Antara News (Live API)',
            date: p.pubDate ? p.pubDate.slice(0, 10) : '2026-10-06',
            image: p.thumbnail || FALLBACK_ARTICLES[idx % FALLBACK_ARTICLES.length].image,
            summary: p.description || 'Liputan berita terkini terkait kegiatan kemanusiaan, lingkungan, dan gerakan kemasyarakatan.',
            content: `${p.description}\n\nSelengkapnya dapat dibaca pada portal resmi penyedia berita.`,
            link: p.link,
          }));

          // Gabungkan berita API hidup dengan artikel kurasi Coconext
          setArticles([...livePosts, ...FALLBACK_ARTICLES]);
          setApiSourceStatus('API Berita Nasional Terhubung');
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('News API fetch fallback ke artikel internal:', err.message);
    }

    // Fallback kurasi internal yang andal
    setArticles(FALLBACK_ARTICLES);
    setApiSourceStatus('Arsip Berita & Edukasi Coconext');
    setLoading(false);
  };

  // Filter artikel berdasarkan kategori dan pencarian
  const filteredArticles = articles.filter((item) => {
    const matchCategory =
      selectedCategory === 'Semua' || item.category === selectedCategory;
    const term = searchQuery.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(term) ||
      item.summary.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term);

    return matchCategory && matchSearch;
  });

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
    <div className="articles-page-container">
      {/* Header */}
      <div className="articles-header">
        <div className="articles-badge-row">
          <span className="articles-badge">KABAR & EDUKASI</span>
          <span className="api-status-badge">📡 {apiSourceStatus}</span>
        </div>
        <h1 className="articles-title">Artikel & Kabar Penanaman</h1>
        <p className="articles-subtitle">
          Informasi terkini seputar kegiatan kepramukaan, konservasi alam, dan aksi penghijauan pohon kelapa di Kabupaten Bogor.
        </p>
      </div>

      {/* Kontrol & Filter */}
      <div className="articles-controls-bar">
        {/* Pencarian */}
        <div className="articles-search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Cari topik artikel, pohon, atau berita..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Kategori Chips */}
        <div className="category-chips-list">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Kartu Berita */}
      {loading ? (
        <div className="articles-loading-box">
          <div className="articles-spinner"></div>
          <p>Memuat artikel dan berita terbaru...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="articles-empty-box">
          <p>Tidak ada artikel yang cocok dengan pencarian "{searchQuery}".</p>
          <button
            type="button"
            className="btn-reset-filter"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="articles-grid">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="article-card"
              onClick={() => setActiveArticleModal(art)}
            >
              <div className="article-image-wrap">
                <img
                  src={art.image}
                  alt={art.title}
                  loading="lazy"
                  className="article-img"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <span className="article-category-tag">{art.category}</span>
              </div>

              <div className="article-card-body">
                <div className="article-meta-row">
                  <span className="article-source">📰 {art.source}</span>
                  <span className="article-date">{formatDate(art.date)}</span>
                </div>

                <h3 className="article-card-title">{art.title}</h3>

                <p className="article-card-summary">{art.summary}</p>

                <div className="article-card-footer">
                  <span className="read-more-text">
                    Baca Selengkapnya →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal Baca Artikel Lengkap */}
      {activeArticleModal && (
        <div
          className="article-modal-backdrop"
          onClick={() => setActiveArticleModal(null)}
        >
          <div
            className="article-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="article-modal-header">
              <div className="modal-header-meta">
                <span className="modal-category-badge">{activeArticleModal.category}</span>
                <span className="modal-date-text">
                  {formatDate(activeArticleModal.date)} • {activeArticleModal.source}
                </span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveArticleModal(null)}
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            <div className="article-modal-body">
              <h2 className="modal-article-title">{activeArticleModal.title}</h2>

              {activeArticleModal.image && (
                <div className="modal-image-wrap">
                  <img
                    src={activeArticleModal.image}
                    alt={activeArticleModal.title}
                    className="modal-img"
                  />
                </div>
              )}

              <div className="modal-article-text">
                {activeArticleModal.content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {activeArticleModal.link && (
                <div className="modal-link-wrap">
                  <a
                    href={activeArticleModal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-open-source"
                  >
                    Buka Berita di Portal Asli ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
