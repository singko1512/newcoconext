import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Home.css';
import api from '../services/api';
import AddTreeModal from '../components/AddTreeModal';

// Fix default marker icon Leaflet di Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Home({ selectedKecamatanFromRank, user }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  
  // Layer references
  const kabBoundaryRef = useRef(null);
  const kecBoundaryRef = useRef(null);
  const treeLayerGroupRef = useRef(null);
  const govLayerGroupRef = useRef(null);
  const kecGeojsonRef = useRef(null);

  // Data states
  const [allTrees, setAllTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state (seperti portal data bencana)
  const [selectedKecamatan, setSelectedKecamatan] = useState(selectedKecamatanFromRank || 'ALL');
  const [selectedSpecies, setSelectedSpecies] = useState('ALL');
  const [showTrees, setShowTrees] = useState(true);
  const [showGovPoints, setShowGovPoints] = useState(false);
  const [showKecBoundary, setShowKecBoundary] = useState(true);

  // Detail popup / modal
  const [activeTreeDetail, setActiveTreeDetail] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Daftar kecamatan populer dengan pohon terbanyak
  const popularKecamatan = [
    { key: 'ALL', label: 'Semua Wilayah' },
    { key: 'ciampea', label: 'Ciampea (90)' },
    { key: 'jonggol', label: 'Jonggol (27)' },
    { key: 'rumpin', label: 'Rumpin (23)' },
    { key: 'leuwiliang', label: 'Leuwiliang (20)' },
    { key: 'cisarua', label: 'Cisarua (15)' },
    { key: 'nanggung', label: 'Nanggung (11)' },
    { key: 'ciseeng', label: 'Ciseeng (9)' },
    { key: 'cileungsi', label: 'Cileungsi (5)' },
    { key: 'cibinong', label: 'Cibinong' },
    { key: 'pamijahan', label: 'Pamijahan' },
    { key: 'babakanmadang', label: 'Babakan Madang' },
  ];

  // Daftar varietas tanaman filter
  const speciesFilters = [
    { key: 'ALL', label: 'Semua Varietas' },
    { key: 'Kelapa Hijau', label: 'Kelapa Hijau' },
    { key: 'Kelapa Gading', label: 'Kelapa Gading' },
    { key: 'Kelapa Merah', label: 'Kelapa Merah' },
    { key: 'durian', label: 'Durian' },
    { key: 'Alpukat', label: 'Alpukat' },
  ];

  // Inisialisasi Peta Leaflet
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-6.55, 106.82],
      zoom: 10,
      minZoom: 8,
      maxZoom: 18,
    });
    mapInstanceRef.current = map;

    // Base Tile OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors | Kwarcab Bogor Coconext',
      maxZoom: 19,
    }).addTo(map);

    // Layer Group untuk marker pohon & kantor
    treeLayerGroupRef.current = L.layerGroup().addTo(map);
    govLayerGroupRef.current = L.layerGroup();

    // 1. Muat batas Kabupaten Bogor
    fetch('/kabupaten_bogor.geojson')
      .then((res) => res.json())
      .then((geojson) => {
        const kabLayer = L.geoJSON(geojson, {
          style: {
            color: '#b45309',
            weight: 3,
            dashArray: '5, 5',
            opacity: 0.9,
            fillColor: '#f59e0b',
            fillOpacity: 0.04,
          },
        }).addTo(map);
        kabBoundaryRef.current = kabLayer;
        const bounds = kabLayer.getBounds();
        map.fitBounds(bounds, { padding: [20, 20] });
      })
      .catch((err) => console.warn('Batas kab bogor error:', err));

    // 2. Muat batas 40 Kecamatan (admin_kec.json)
    fetch('/admin_kec.json')
      .then((res) => res.json())
      .then((geojson) => {
        kecGeojsonRef.current = geojson;
        const kecLayer = L.geoJSON(geojson, {
          style: {
            color: '#475569',
            weight: 1.2,
            opacity: 0.7,
            fillColor: '#3b82f6',
            fillOpacity: 0.03,
          },
          onEachFeature: (feature, layer) => {
            const name = feature.properties?.NKEC || 'Kecamatan';
            layer.bindTooltip(`📍 Kec. ${name}`, {
              sticky: true,
              className: 'kec-leaflet-tooltip',
            });
            layer.on('mouseover', () => {
              layer.setStyle({
                weight: 2.5,
                color: '#f59e0b',
                fillOpacity: 0.15,
                fillColor: '#f59e0b',
              });
            });
            layer.on('mouseout', () => {
              kecLayer.resetStyle(layer);
            });
            layer.on('click', () => {
              setSelectedKecamatan(name.toLowerCase());
              map.fitBounds(layer.getBounds(), { padding: [30, 30] });
            });
          },
        }).addTo(map);
        kecBoundaryRef.current = kecLayer;
      })
      .catch((err) => console.warn('Batas kec error:', err));

    // 3. Muat Titik Kantor Kwarran dari CSV (Sebagai layer pendukung)
    fetch('/app_md_mapgovpoint.csv')
      .then((res) => res.text())
      .then((csvText) => {
        const lines = csvText.trim().split('\n');
        const govPinIcon = L.divIcon({
          className: 'custom-gov-pin',
          html: `<div class="gov-pin-inner">🏛️</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 28],
        });

        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(';');
          if (row.length >= 4) {
            const name = row[0].replace(/"/g, '').trim();
            const addr = row[1].replace(/"/g, '').trim();
            const lat = parseFloat(row[2].replace(/"/g, '').trim());
            const lng = parseFloat(row[3].replace(/"/g, '').trim());
            if (!isNaN(lat) && !isNaN(lng)) {
              const m = L.marker([lat, lng], { icon: govPinIcon });
              m.bindPopup(`
                <div class="map-popup-card">
                  <div class="popup-badge" style="background:#e0e7ff; color:#3730a3;">🏛️ Kantor Kwarran / Kecamatan</div>
                  <h4 class="popup-title">${name}</h4>
                  <p class="popup-addr">${addr}</p>
                </div>
              `);
              govLayerGroupRef.current.addLayer(m);
            }
          }
        }
      })
      .catch(() => {});

    // 4. Muat 211 Pohon Riil dari Backend Database
    loadTreesData();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Fetch data pohon dari API
  const loadTreesData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/trees?limit=1000');
      if (res && res.success && Array.isArray(res.data)) {
        setAllTrees(res.data);
      }
    } catch (err) {
      console.warn('Gagal memuat pohon dari database:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter Pohon berdasarkan Kecamatan & Spesies
  const filteredTrees = allTrees.filter((tree) => {
    // Filter Kecamatan
    if (selectedKecamatan !== 'ALL') {
      const penanamStr = (tree.penanam || '').toLowerCase();
      const kecStr = selectedKecamatan.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanPenanam = penanamStr.replace(/[^a-z0-9]/g, '');
      if (!cleanPenanam.includes(kecStr)) {
        return false;
      }
    }

    // Filter Spesies
    if (selectedSpecies !== 'ALL') {
      const lokal = (tree.nama_lokal || '').toLowerCase();
      if (!lokal.includes(selectedSpecies.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  // Render Marker Pohon ke Leaflet saat filter berubah
  useEffect(() => {
    if (!treeLayerGroupRef.current) return;
    const treeGroup = treeLayerGroupRef.current;
    treeGroup.clearLayers();

    if (!showTrees) return;

    const treeIconCoconut = L.divIcon({
      className: 'custom-tree-pin',
      html: `<div class="tree-pin-inner tree-coconut">🌴</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 30],
      popupAnchor: [0, -28],
    });

    const treeIconSprout = L.divIcon({
      className: 'custom-tree-pin',
      html: `<div class="tree-pin-inner tree-sprout">🌱</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 28],
      popupAnchor: [0, -26],
    });

    filteredTrees.forEach((tree) => {
      const lat = parseFloat(tree.lat);
      const lng = parseFloat(tree.lng);
      if (isNaN(lat) || isNaN(lng)) return;

      const isCoconut = (tree.nama_lokal || '').toLowerCase().includes('kelapa');
      const marker = L.marker([lat, lng], {
        icon: isCoconut ? treeIconCoconut : treeIconSprout,
      });

      // Konten Popup Leaflet
      marker.bindPopup(`
        <div class="map-popup-card">
          <div class="popup-badge">Kwarcab Kabupaten Bogor</div>
          <h4 class="popup-title">${tree.nama_lokal || 'Pohon Kelapa'}</h4>
          <p class="popup-latin"><em>${tree.nama_latin || '-'}</em></p>
          <div class="popup-details">
            <div>📏 Tinggi: <strong>${tree.tinggi_cm || '-'} cm</strong></div>
            <div>🏢 Penanam: <strong>${tree.penanam || '-'}</strong></div>
            <div>🏷️ Serial: <code>${tree.serial_no || '-'}</code></div>
          </div>
          <button class="popup-view-btn" id="btn-tree-${tree.id}">
            Lihat Informasi Lengkap ➔
          </button>
        </div>
      `);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-tree-${tree.id}`);
        if (btn) {
          btn.onclick = () => setActiveTreeDetail(tree);
        }
      });

      marker.on('click', () => {
        setActiveTreeDetail(tree);
      });

      treeGroup.addLayer(marker);
    });
  }, [filteredTrees, showTrees]);

  // Handler Zoom saat memilih kecamatan
  const handleSelectKecamatan = (kecKey) => {
    setSelectedKecamatan(kecKey);
    const map = mapInstanceRef.current;
    const geojson = kecGeojsonRef.current;
    if (!map) return;

    if (kecKey === 'ALL') {
      if (kabBoundaryRef.current) {
        map.fitBounds(kabBoundaryRef.current.getBounds(), { padding: [25, 25] });
      }
      return;
    }

    if (geojson && geojson.features) {
      const targetClean = kecKey.toLowerCase().replace(/[^a-z0-9]/g, '');
      const matchFeature = geojson.features.find((f) => {
        const nkec = (f.properties?.NKEC || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        return nkec.includes(targetClean) || targetClean.includes(nkec);
      });

      if (matchFeature) {
        const tempLayer = L.geoJSON(matchFeature);
        map.fitBounds(tempLayer.getBounds(), { padding: [35, 35] });
      }
    }
  };

  // Toggle Layer Controllers
  const toggleGovPoints = () => {
    const map = mapInstanceRef.current;
    const govGroup = govLayerGroupRef.current;
    if (!map || !govGroup) return;

    if (showGovPoints) {
      map.removeLayer(govGroup);
      setShowGovPoints(false);
    } else {
      map.addLayer(govGroup);
      setShowGovPoints(true);
    }
  };

  const toggleKecBoundary = () => {
    const map = mapInstanceRef.current;
    const kecLayer = kecBoundaryRef.current;
    if (!map || !kecLayer) return;

    if (showKecBoundary) {
      map.removeLayer(kecLayer);
      setShowKecBoundary(false);
    } else {
      map.addLayer(kecLayer);
      setShowKecBoundary(true);
    }
  };

  return (
    <div className="home-map-wrapper">
      {/* Area Map Utama (Full Viewport) */}

      {/* 2. Area Map Utama */}
      <div className="map-view-container">
        <div ref={mapContainerRef} className="leaflet-main-map" />

        {/* Loading Overlay */}
        {loading && (
          <div className="map-loading-indicator">
            <div className="spinner-mini"></div>
            <span>Memuat 211 Titik Tanaman dari Database...</span>
          </div>
        )}

        {/* Floating Quick Summary Badge */}
        <div className="floating-stat-badge">
          <div className="stat-pill">
            <span className="stat-pill-label">Pohon Terpilih:</span>
            <span className="stat-pill-value">{filteredTrees.length} Titik</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-label">Kondisi:</span>
            <span className="stat-pill-value" style={{ color: '#16a34a' }}>100% Hidup</span>
          </div>
        </div>

        {/* 3. Detail Drawer / Kartu Pohon yang Diklik */}
        {activeTreeDetail && (
          <div className="tree-detail-drawer">
            <div className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem' }}>🌴</span>
                <div>
                  <h3 className="drawer-title">{activeTreeDetail.nama_lokal || 'Pohon Kelapa'}</h3>
                  <div className="drawer-latin"><em>{activeTreeDetail.nama_latin || '-'}</em></div>
                </div>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setActiveTreeDetail(null)}
              >
                ✕
              </button>
            </div>

            <div className="drawer-body">
              <div className="detail-badge-row">
                <span className="badge-serial">🏷️ {activeTreeDetail.serial_no || 'KH-PRAMUKA'}</span>
                <span className="badge-alive">● {activeTreeDetail.status || 'alive'}</span>
              </div>

              <div className="detail-grid">
                <div className="detail-row">
                  <span className="detail-lbl">Kwarran / Penanam:</span>
                  <span className="detail-val"><strong>{activeTreeDetail.penanam || '-'}</strong></span>
                </div>
                <div className="detail-row">
                  <span className="detail-lbl">Tinggi Tanaman:</span>
                  <span className="detail-val">{activeTreeDetail.tinggi_cm || '-'} cm</span>
                </div>
                <div className="detail-row">
                  <span className="detail-lbl">Tanggal Ditanam:</span>
                  <span className="detail-val">{activeTreeDetail.tanggal_tanam ? new Date(activeTreeDetail.tanggal_tanam).toLocaleDateString('id-ID') : '-'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-lbl">Asal Bibit:</span>
                  <span className="detail-val">{activeTreeDetail.asal_bibit || 'Swadaya'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-lbl">Titik Koordinat:</span>
                  <span className="detail-val">{Number(activeTreeDetail.lat).toFixed(5)}, {Number(activeTreeDetail.lng).toFixed(5)}</span>
                </div>
              </div>

              {activeTreeDetail.cerita && (
                <div className="detail-story-box">
                  <div className="story-title">📖 Catatan Penanaman:</div>
                  <p className="story-text">"{activeTreeDetail.cerita}"</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal Tambah Pohon */}
      <AddTreeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onTreeAdded={loadTreesData}
        defaultPlanter={user?.username || 'kwarran.cibinong'}
        mapCenter={mapInstanceRef.current ? mapInstanceRef.current.getCenter() : null}
      />
    </div>
  );
}
