import React, { useEffect, useRef, useState, useMemo } from 'react';
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
  const kecBoundaryLayerRef = useRef(null);
  const kecPointsGroupRef = useRef(null);
  const treeLayerGroupRef = useRef(null);
  const kecGeojsonRef = useRef(null);
  const treeMarkersMapRef = useRef({});

  // Data states
  const [allTrees, setAllTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kecamatanDataList, setKecamatanDataList] = useState([]);

  // Active Selected Kecamatan (null = overview 40 kecamatan, string = nama kecamatan e.g. "CIAMPEA")
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);

  // Filter & Search states
  const [overviewFilter, setOverviewFilter] = useState('ALL'); // 'ALL' | 'HAS_TREES'
  const [searchKecamatanTerm, setSearchKecamatanTerm] = useState('');
  const [searchTreeTerm, setSearchTreeTerm] = useState('');
  const [selectedSpeciesFilter, setSelectedSpeciesFilter] = useState('ALL');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Detail popup / modal
  const [activeTreeDetail, setActiveTreeDetail] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Resize Leaflet map saat panel sidebar dibuka/tutup
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current.invalidateSize();
      }, 350);
    }
  }, [isSidebarOpen]);

  // Helper untuk mencocokkan pohon ke salah satu dari 40 kecamatan
  const matchTreeToKecamatan = (tree, kecNames) => {
    const penanamStr = (tree.penanam || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const k of kecNames) {
      const cleanK = k.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (penanamStr.includes(cleanK) || cleanK.includes(penanamStr)) {
        return k.toUpperCase();
      }
    }
    // Default fallback untuk kwarcab bogor kab / kwr775514
    if (penanamStr.includes('kwarcab') || penanamStr.includes('kwr775514') || penanamStr.includes('cibinong')) {
      return 'CIBINONG';
    }
    return 'CIBINONG';
  };

  // Inisialisasi Peta Leaflet
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-6.55, 106.82],
      zoom: 10,
      minZoom: 8,
      maxZoom: 18,
      zoomControl: false,
    });
    mapInstanceRef.current = map;

    // Kontrol tombol (+ dan -) Leaflet diposisikan di sebelah kanan atas
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Base Tile OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors | Kwarcab Bogor Coconext',
      maxZoom: 19,
    }).addTo(map);

    // Layer Group untuk titik 40 kecamatan dan titik pohon
    kecPointsGroupRef.current = L.layerGroup().addTo(map);
    treeLayerGroupRef.current = L.layerGroup().addTo(map);

    // 1. Muat batas Kabupaten Bogor (garis luar)
    fetch('/kabupaten_bogor.geojson')
      .then((res) => res.json())
      .then((geojson) => {
        const kabLayer = L.geoJSON(geojson, {
          style: {
            color: '#78350f',
            weight: 3.5,
            dashArray: '5, 5',
            opacity: 1,
            fillColor: '#92400e',
            fillOpacity: 0.03,
          },
        }).addTo(map);
        kabBoundaryRef.current = kabLayer;
        map.fitBounds(kabLayer.getBounds(), { padding: [20, 20] });
      })
      .catch((err) => console.warn('Batas kab bogor error:', err));

    // Muat data pohon dari backend terlebih dahulu, lalu muat geojson 40 kecamatan
    loadInitialData();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Muat Pohon dari Database dan Geojson Kecamatan
  const loadInitialData = async () => {
    setLoading(true);
    try {
      // 1. Fetch 211 pohon dari API
      const treesRes = await api.get('/trees?limit=1000');
      const loadedTrees = treesRes?.success && Array.isArray(treesRes.data) ? treesRes.data : [];
      setAllTrees(loadedTrees);

      // 2. Fetch Geojson 40 Kecamatan
      const geoRes = await fetch('/admin_kec.json');
      const geojson = await geoRes.json();
      kecGeojsonRef.current = geojson;

      // Kumpulkan nama-nama kecamatan
      const kecNames = geojson.features.map((f) => f.properties?.NKEC?.toUpperCase() || '');

      // Hitung agregasi pohon per kecamatan
      const list = geojson.features.map((f) => {
        const name = f.properties?.NKEC?.toUpperCase() || 'KECAMATAN';
        // Poligon layer sementara untuk hitung bounds dan center
        const tempLayer = L.geoJSON(f);
        const bounds = tempLayer.getBounds();
        const center = bounds.getCenter();

        // Cari pohon yang termasuk kecamatan ini
        const kecTrees = loadedTrees.filter((t) => matchTreeToKecamatan(t, kecNames) === name);

        return {
          name,
          bounds,
          center,
          trees: kecTrees,
          treeCount: kecTrees.length,
          feature: f,
        };
      });

      // Urutkan list: yang memiliki pohon terbanyak di atas
      list.sort((a, b) => b.treeCount - a.treeCount || a.name.localeCompare(b.name));
      setKecamatanDataList(list);

      // Render layer batas 40 kecamatan
      renderKecamatanBoundaries(geojson, list);

      // Render 40 titik kecamatan awal di peta
      renderKecamatanPoints(list);
    } catch (err) {
      console.warn('Gagal memuat data awal:', err);
    } finally {
      setLoading(false);
    }
  };

  // Render Poligon Batas 40 Kecamatan
  const renderKecamatanBoundaries = (geojson, kecList) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (kecBoundaryLayerRef.current) {
      map.removeLayer(kecBoundaryLayerRef.current);
    }

    const kecLayer = L.geoJSON(geojson, {
      style: (feature) => {
        const name = feature.properties?.NKEC?.toUpperCase();
        const item = kecList.find((k) => k.name === name);
        const hasTrees = item && item.treeCount > 0;

        return {
          color: '#92400e',
          weight: hasTrees ? 2.5 : 1.5,
          opacity: 1,
          fillColor: hasTrees ? '#92400e' : '#78350f',
          fillOpacity: hasTrees ? 0.08 : 0.02,
        };
      },
      onEachFeature: (feature, layer) => {
        const name = feature.properties?.NKEC?.toUpperCase() || 'Kecamatan';
        const item = kecList.find((k) => k.name === name);
        const count = item ? item.treeCount : 0;

        layer.bindTooltip(`📍 Kec. ${name} (${count} pohon)`, {
          sticky: true,
          className: 'kec-leaflet-tooltip',
        });

        layer.on('mouseover', () => {
          layer.setStyle({
            weight: 3.5,
            color: '#78350f',
            fillOpacity: 0.25,
            fillColor: '#92400e',
          });
        });

        layer.on('mouseout', () => {
          kecLayer.resetStyle(layer);
        });

        layer.on('click', () => {
          if (item) {
            handleSelectKecamatan(item);
          }
        });
      },
    }).addTo(map);

    kecBoundaryLayerRef.current = kecLayer;
  };

  // Render 40 Titik Kecamatan di Peta (1 Titik per Kecamatan)
  const renderKecamatanPoints = (kecList) => {
    if (!kecPointsGroupRef.current) return;
    const group = kecPointsGroupRef.current;
    group.clearLayers();

    kecList.forEach((kec) => {
      const { center, name, treeCount } = kec;
      const hasTrees = treeCount > 0;

      // Custom divIcon: Badge elegan untuk kecamatan ada pohon, titik mini bulat untuk kecamatan 0 pohon
      let kecPinIcon;
      if (hasTrees) {
        kecPinIcon = L.divIcon({
          className: 'custom-kec-marker',
          html: `
            <div class="kec-pin-pill has-trees" title="Kec. ${name} • ${treeCount} Pohon">
              <span class="kec-pin-icon">🌴</span>
              <span class="kec-pin-name">${name}</span>
              <span class="kec-pin-count">${treeCount}</span>
            </div>
          `,
          iconSize: [110, 26],
          iconAnchor: [55, 13],
        });
      } else {
        kecPinIcon = L.divIcon({
          className: 'custom-kec-marker-zero',
          html: `
            <div class="kec-pin-dot-zero" title="Kec. ${name} (0 Pohon)">
              <span class="kec-dot-icon">🏛️</span>
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });
      }

      const marker = L.marker([center.lat, center.lng], {
        icon: kecPinIcon,
        zIndexOffset: hasTrees ? 1000 : 100,
      });

      marker.bindTooltip(
        hasTrees ? `🌴 Kec. ${name} • ${treeCount} Pohon` : `🏛️ Kec. ${name} (0 Pohon)`,
        { direction: 'top', offset: [0, hasTrees ? -13 : -11], opacity: 0.95 }
      );

      // Popup interaktif pada marker 1 titik kecamatan
      marker.bindPopup(`
        <div class="kec-map-popup">
          <div class="kec-popup-badge">${hasTrees ? '🌱 Wilayah Aktif Coconext' : '🏛️ Wilayah Kabupaten Bogor'}</div>
          <h4 class="kec-popup-title">Kecamatan ${name}</h4>
          <p class="kec-popup-sub">Jumlah Pohon Terdata: <strong>${treeCount} Tanaman</strong></p>
          <button class="kec-popup-action-btn" id="btn-zoom-kec-${name}">
            Buka Persebaran Pohon & List
          </button>
        </div>
      `);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-zoom-kec-${name}`);
        if (btn) {
          btn.onclick = () => {
            handleSelectKecamatan(kec);
          };
        }
      });

      marker.on('click', () => {
        handleSelectKecamatan(kec);
      });

      group.addLayer(marker);
    });
  };

  // Render Titik-Titik Persebaran Pohon Individual di Kecamatan Terpilih
  const renderTreesInKecamatan = (trees) => {
    if (!treeLayerGroupRef.current) return;
    const treeGroup = treeLayerGroupRef.current;
    treeGroup.clearLayers();
    treeMarkersMapRef.current = {};

    const treeIconCoconut = L.divIcon({
      className: 'custom-tree-pin',
      html: `<div class="tree-pin-inner tree-coconut">🌴</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 32],
      popupAnchor: [0, -28],
    });

    const treeIconFruit = L.divIcon({
      className: 'custom-tree-pin',
      html: `<div class="tree-pin-inner tree-sprout">🌱</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 28],
      popupAnchor: [0, -26],
    });

    trees.forEach((tree) => {
      const lat = parseFloat(tree.lat);
      const lng = parseFloat(tree.lng);
      if (isNaN(lat) || isNaN(lng)) return;

      const isCoconut = (tree.nama_lokal || '').toLowerCase().includes('kelapa');
      const marker = L.marker([lat, lng], {
        icon: isCoconut ? treeIconCoconut : treeIconFruit,
      });

      marker.bindPopup(`
        <div class="map-popup-card">
          <div class="popup-badge">Kwarcab Kabupaten Bogor</div>
          <h4 class="popup-title">${tree.nama_lokal || 'Pohon Kelapa'}</h4>
          <p class="popup-latin"><em>${tree.nama_latin || '-'}</em></p>
          <div class="popup-details">
            <div>Tinggi: <strong>${tree.tinggi_cm || '-'} cm</strong></div>
            <div>Penanam: <strong>${tree.penanam || '-'}</strong></div>
            <div>Serial: <code>${tree.serial_no || '-'}</code></div>
            <div>Tanggal: <strong>${tree.tanggal_tanam ? new Date(tree.tanggal_tanam).toLocaleDateString('id-ID') : '-'}</strong></div>
          </div>
          <button class="popup-view-btn" id="btn-tree-pop-${tree.id}">
            Lihat Informasi Lengkap
          </button>
        </div>
      `);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-tree-pop-${tree.id}`);
        if (btn) {
          btn.onclick = () => setActiveTreeDetail(tree);
        }
      });

      marker.on('click', () => {
        setActiveTreeDetail(tree);
      });

      treeGroup.addLayer(marker);
      treeMarkersMapRef.current[tree.id] = marker;
    });
  };

  // Saat Pengguna Mengklik Salah Satu Kecamatan
  const handleSelectKecamatan = (kecItem) => {
    setSelectedKecamatan(kecItem);
    setIsSidebarOpen(true);
    setSearchTreeTerm('');
    setSelectedSpeciesFilter('ALL');

    const map = mapInstanceRef.current;
    if (!map) return;

    // 1. Zoom otomatis ke kecamatan tersebut
    map.flyToBounds(kecItem.bounds, {
      padding: [45, 45],
      duration: 1.2,
      maxZoom: 15,
    });

    // 2. Sembunyikan 40 titik kecamatan umum, dan render persebaran pohon di kecamatan ini
    if (kecPointsGroupRef.current) {
      kecPointsGroupRef.current.clearLayers();
    }
    renderTreesInKecamatan(kecItem.trees);

    // 3. Highlight poligon batas kecamatan terpilih
    if (kecBoundaryLayerRef.current) {
      kecBoundaryLayerRef.current.eachLayer((layer) => {
        const name = layer.feature?.properties?.NKEC?.toUpperCase();
        if (name === kecItem.name) {
          layer.setStyle({
            weight: 4,
            color: '#78350f',
            fillColor: '#92400e',
            fillOpacity: 0.2,
          });
        } else {
          layer.setStyle({
            weight: 1.2,
            color: '#d97706',
            opacity: 0.45,
            fillOpacity: 0.02,
          });
        }
      });
    }
  };

  // Kembali ke Tinjauan 40 Titik Kecamatan
  const handleBackToOverview = () => {
    setSelectedKecamatan(null);
    setActiveTreeDetail(null);
    setSearchTreeTerm('');
    setSelectedSpeciesFilter('ALL');

    const map = mapInstanceRef.current;
    if (!map) return;

    // 1. Bersihkan marker pohon individual
    if (treeLayerGroupRef.current) {
      treeLayerGroupRef.current.clearLayers();
    }

    // 2. Kembalikan 40 titik kecamatan
    renderKecamatanPoints(kecamatanDataList);

    // 3. Kembalikan style poligon kecamatan
    if (kecBoundaryLayerRef.current) {
      kecBoundaryLayerRef.current.eachLayer((layer) => {
        const name = layer.feature?.properties?.NKEC?.toUpperCase();
        const item = kecamatanDataList.find((k) => k.name === name);
        const hasTrees = item && item.treeCount > 0;
        layer.setStyle({
          color: '#92400e',
          weight: hasTrees ? 2.5 : 1.5,
          opacity: 1,
          fillColor: hasTrees ? '#92400e' : '#78350f',
          fillOpacity: hasTrees ? 0.08 : 0.02,
        });
      });
    }

    // 4. Zoom out kembali ke Kabupaten Bogor
    if (kabBoundaryRef.current) {
      map.flyToBounds(kabBoundaryRef.current.getBounds(), {
        padding: [25, 25],
        duration: 1.2,
      });
    }
  };

  // Fokus ke Pohon Tertentu di Peta
  const handleFocusTreeOnMap = (tree) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const lat = parseFloat(tree.lat);
    const lng = parseFloat(tree.lng);
    if (isNaN(lat) || isNaN(lng)) return;

    map.flyTo([lat, lng], 17, { duration: 1 });
    const marker = treeMarkersMapRef.current[tree.id];
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 1000);
    }
  };

  // Trigger otomatis jika masuk dengan kecamatan terpilih dari Rank
  useEffect(() => {
    if (selectedKecamatanFromRank && kecamatanDataList.length > 0) {
      const cleanTarget = selectedKecamatanFromRank.toLowerCase().replace(/[^a-z0-9]/g, '');
      const match = kecamatanDataList.find((k) => {
        const cleanK = k.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleanTarget.includes(cleanK) || cleanK.includes(cleanTarget);
      });
      if (match) {
        handleSelectKecamatan(match);
      }
    }
  }, [selectedKecamatanFromRank, kecamatanDataList]);

  // Filter daftar 40 kecamatan di sidebar overview
  const filteredKecamatanList = useMemo(() => {
    const term = searchKecamatanTerm.toLowerCase();
    return kecamatanDataList.filter((k) => {
      const matchName = k.name.toLowerCase().includes(term);
      if (overviewFilter === 'HAS_TREES') {
        return matchName && k.treeCount > 0;
      }
      return matchName;
    });
  }, [kecamatanDataList, searchKecamatanTerm, overviewFilter]);

  // Update titik peta saat filter overview (Semua vs Ada Pohon) berubah
  useEffect(() => {
    if (!selectedKecamatan && kecamatanDataList.length > 0) {
      const listToRender = overviewFilter === 'HAS_TREES'
        ? kecamatanDataList.filter((k) => k.treeCount > 0)
        : kecamatanDataList;
      renderKecamatanPoints(listToRender);
    }
  }, [overviewFilter, kecamatanDataList, selectedKecamatan]);

  // Filter daftar pohon di kecamatan terpilih
  const filteredKecamatanTrees = useMemo(() => {
    if (!selectedKecamatan) return [];
    let list = selectedKecamatan.trees || [];

    if (searchTreeTerm) {
      const t = searchTreeTerm.toLowerCase();
      list = list.filter(
        (tree) =>
          (tree.nama_lokal || '').toLowerCase().includes(t) ||
          (tree.nama_latin || '').toLowerCase().includes(t) ||
          (tree.serial_no || '').toLowerCase().includes(t) ||
          (tree.penanam || '').toLowerCase().includes(t)
      );
    }

    if (selectedSpeciesFilter !== 'ALL') {
      list = list.filter((tree) =>
        (tree.nama_lokal || '').toLowerCase().includes(selectedSpeciesFilter.toLowerCase())
      );
    }

    return list;
  }, [selectedKecamatan, searchTreeTerm, selectedSpeciesFilter]);

  // Opsi varietas unik untuk filter pohon di kecamatan terpilih
  const availableSpeciesInKec = useMemo(() => {
    if (!selectedKecamatan) return [];
    const set = new Set();
    selectedKecamatan.trees.forEach((t) => {
      if (t.nama_lokal) set.add(t.nama_lokal);
    });
    return Array.from(set);
  }, [selectedKecamatan]);

  return (
    <div className="home-map-wrapper">
      {/* SIDEBAR DRAWER KIRI (40 KECAMATAN / LIST POHON) */}
      <aside className={`map-sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        {isSidebarOpen && (
          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={() => setIsSidebarOpen(false)}
            title="Tutup Panel Menu"
            aria-label="Tutup Menu Sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* MODE A: OVERVIEW 40 KECAMATAN */}
        {!selectedKecamatan ? (
          <div className="sidebar-content">
            <div className="sidebar-header-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="sidebar-title" style={{ margin: 0 }}>40 Kecamatan Kab. Bogor</h2>
              </div>
            </div>

            {/* Input Pencarian Kecamatan */}
            <div className="sidebar-search-box">
              <input
                type="text"
                placeholder="Cari nama kecamatan..."
                value={searchKecamatanTerm}
                onChange={(e) => setSearchKecamatanTerm(e.target.value)}
                className="sidebar-search-input"
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            {/* List 40 Kecamatan */}
            <div className="sidebar-scroll-list">
              {filteredKecamatanList.length === 0 ? (
                <div className="sidebar-empty">Kecamatan tidak ditemukan.</div>
              ) : (
                filteredKecamatanList.map((kec, idx) => {
                  const hasTrees = kec.treeCount > 0;
                  return (
                    <div
                      key={kec.name}
                      className={`kec-item-card ${hasTrees ? 'card-has-trees' : ''}`}
                      onClick={() => handleSelectKecamatan(kec)}
                    >
                      <div className="kec-card-left">
                        <span className="kec-idx">{idx + 1}</span>
                        <div className="kec-card-info">
                          <strong className="kec-card-name">Kec. {kec.name}</strong>
                        </div>
                      </div>
                      <div className="kec-card-right">
                        <span className={`kec-tree-badge ${hasTrees ? 'badge-trees' : 'badge-zero'}`}>
                          {kec.treeCount} Pohon
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          /* MODE B: DETAIL & LIST SELURUH POHON DI KECAMATAN TERPILIH */
          <div className="sidebar-content">
            <div className="sidebar-header-box selected-kec-header">
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                <button
                  type="button"
                  className="back-to-overview-btn"
                  onClick={handleBackToOverview}
                  style={{ marginBottom: 0, flex: 1 }}
                >
                  40 Kecamatan
                </button>
              </div>
              <div className="selected-kec-title-row">
                <span className="selected-kec-icon">🌴</span>
                <div>
                  <h2 className="sidebar-title">Kec. {selectedKecamatan.name}</h2>
                  <span className="selected-tree-total">
                    {selectedKecamatan.treeCount} Tanaman Ditanam
                  </span>
                </div>
              </div>
            </div>

            {/* Kontrol Filter & Pencarian Pohon */}
            <div className="sidebar-filter-section">
              <div className="sidebar-search-box">
                <input
                  type="text"
                  placeholder="Cari jenis pohon / penanam..."
                  value={searchTreeTerm}
                  onChange={(e) => setSearchTreeTerm(e.target.value)}
                  className="sidebar-search-input"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              {availableSpeciesInKec.length > 1 && (
                <div className="species-filter-dropdown-row">
                  <label className="dropdown-lbl">Varietas:</label>
                  <select
                    value={selectedSpeciesFilter}
                    onChange={(e) => setSelectedSpeciesFilter(e.target.value)}
                    className="species-dropdown"
                  >
                    <option value="ALL">Semua Varietas{/*  */}</option>
                    {availableSpeciesInKec.map((sp) => (
                      <option key={sp} value={sp}>
                        {sp}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* List Seluruh Pohon di Kecamatan Ini */}
            <div className="sidebar-scroll-list tree-cards-list">
              {filteredKecamatanTrees.length === 0 ? (
                <div className="sidebar-empty">
                  {selectedKecamatan.treeCount === 0
                    ? 'Belum ada data penanaman pohon di kecamatan ini.'
                    : 'Tidak ada pohon yang cocok dengan filter.'}
                </div>
              ) : (
                filteredKecamatanTrees.map((tree, idx) => (
                  <div key={tree.id || idx} className="tree-list-item-card">
                    <div className="tree-item-top">
                      <div className="tree-item-title-group">
                        <span className="tree-emoji-icon">🌴</span>
                        <div>
                          <h4 className="tree-item-name">{tree.nama_lokal || 'Pohon Kelapa'}</h4>
                          <span className="tree-item-latin">
                            <em>{tree.nama_latin || '-'}</em>
                          </span>
                        </div>
                      </div>
                      <span className="tree-item-status"> Hidup</span>
                    </div>

                    <div className="tree-item-meta-grid">
                      <div>
                        <span className="meta-lbl">Penanam:</span>
                        <strong className="meta-val">{tree.penanam || '-'}</strong>
                      </div>
                      <div>
                        <span className="meta-lbl">Tinggi:</span>
                        <strong className="meta-val">{tree.tinggi_cm || '-'} cm</strong>
                      </div>
                      <div>
                        <span className="meta-lbl">Tanggal:</span>
                        <span className="meta-val">
                          {tree.tanggal_tanam
                            ? new Date(tree.tanggal_tanam).toLocaleDateString('id-ID')
                            : '-'}
                        </span>
                      </div>
                      <div>
                        <span className="meta-lbl">No. Seri:</span>
                        <code className="meta-serial">{tree.serial_no || '-'}</code>
                      </div>
                    </div>

                    <div className="tree-item-actions">
                      <button
                        type="button"
                        className="btn-locate-tree"
                        onClick={() => handleFocusTreeOnMap(tree)}
                      >
                        Fokus di Peta
                      </button>
                      <button
                        type="button"
                        className="btn-detail-tree"
                        onClick={() => setActiveTreeDetail(tree)}
                      >
                        Detail Lengkap
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </aside>

      {/* AREA MAP UTAMA */}
      <div className="map-view-container">
        <div ref={mapContainerRef} className="leaflet-main-map" />

        {/* Loading Indicator */}
        {loading && (
          <div className="map-loading-indicator">
            <div className="spinner-mini"></div>
            <span>Memuat 40 Titik Kecamatan & 211 Data Tanaman...</span>
          </div>
        )}

        {/* Floating Controls di Atas Peta */}
        <div className="floating-map-top-bar">
          {!isSidebarOpen && (
            <button
              type="button"
              className="floating-burger-btn"
              onClick={() => setIsSidebarOpen(true)}
              title="Buka Menu Wilayah Kecamatan"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          )}

          {selectedKecamatan && (
            <div className="floating-active-kec-pill">
              📍 Kec. {selectedKecamatan.name} • {selectedKecamatan.treeCount} Pohon
            </div>
          )}

          {user && (
            <button
              type="button"
              className="floating-add-tree-btn"
              onClick={() => setIsAddModalOpen(true)}
              title="Tambah Titik Penanaman Pohon Baru"
            >
              <span>Tambah Pohon</span>
            </button>
          )}
        </div>

        {/* Detail Drawer / Modal Pohon yang Diklik */}
        {activeTreeDetail && (
          <div className="tree-detail-drawer">
            <div className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🌴</span>
                <div>
                  <h3 className="drawer-title">{activeTreeDetail.nama_lokal || 'Pohon Kelapa'}</h3>
                  <div className="drawer-latin">
                    <em>{activeTreeDetail.nama_latin || '-'}</em>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setActiveTreeDetail(null)}
                title="Tutup Detail"
              >
                ✕
              </button>
            </div>

            <div className="drawer-body">
              <div className="detail-badge-row">
                <span className="badge-serial">
                  🏷️ {activeTreeDetail.serial_no || 'KH-PRAMUKA'}
                </span>
              </div>

              {/* Foto Dokumentasi Pohon */}
              {(activeTreeDetail.foto_sebelum || activeTreeDetail.foto_sesudah) && (
                <div style={{ marginBottom: '1rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                  <img
                    src={activeTreeDetail.foto_sebelum || activeTreeDetail.foto_sesudah}
                    alt={activeTreeDetail.nama_lokal}
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ padding: '0.4rem 0.75rem', fontSize: '0.72rem', color: '#64748b', textAlign: 'center' }}>
                    📸 Foto Dokumentasi Penanaman
                  </div>
                </div>
              )}

              <div className="detail-grid">
                <div className="detail-row">
                  <span className="detail-lbl">Kwarran / Penanam:</span>
                  <span className="detail-val">
                    <strong>{activeTreeDetail.penanam || '-'}</strong>
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-lbl">Tinggi Tanaman:</span>
                  <span className="detail-val">{activeTreeDetail.tinggi_cm || '-'} cm</span>
                </div>
                <div className="detail-row">
                  <span className="detail-lbl">Tanggal Ditanam:</span>
                  <span className="detail-val">
                    {activeTreeDetail.tanggal_tanam
                      ? new Date(activeTreeDetail.tanggal_tanam).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                      : '-'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-lbl">Asal Bibit:</span>
                  <span className="detail-val">{activeTreeDetail.asal_bibit || 'Swadaya'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-lbl">Titik Koordinat:</span>
                  <span className="detail-val">
                    {Number(activeTreeDetail.lat).toFixed(5)}, {Number(activeTreeDetail.lng).toFixed(5)}
                  </span>
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
        onTreeAdded={loadInitialData}
        defaultPlanter={user?.username || 'kwarran.cibinong'}
        mapCenter={mapInstanceRef.current ? mapInstanceRef.current.getCenter() : null}
      />
    </div>
  );
}
