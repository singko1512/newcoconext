/**
 * Geolocation & Boundary Helper untuk 40 Kecamatan Kabupaten Bogor
 */

// Ray-casting algorithm untuk mengecek apakah titik [lng, lat] berada di dalam poligon
export function pointInPolygon([x, y], ring) {
  if (!ring || ring.length === 0) return false;
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// Menghitung titik tengah (centroid) sederhana dari koordinat poligon
export function getPolygonCenter(coords) {
  if (!coords || coords.length === 0) return [106.843, -6.485];
  let sumX = 0;
  let sumY = 0;
  for (const pt of coords) {
    sumX += pt[0];
    sumY += pt[1];
  }
  return [sumX / coords.length, sumY / coords.length];
}

// Menghitung jarak Euclidean kuadrat antara 2 koordinat
function getDistSq([x1, y1], [x2, y2]) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return dx * dx + dy * dy;
}

/**
 * Mencari nama kecamatan (NKEC) dari koordinat GPS (lat, lng)
 * menggunakan batas poligon dari admin_kec.json
 */
export function findKecamatanFromCoords(lat, lng, features = []) {
  if (!lat || !lng || !Array.isArray(features) || features.length === 0) {
    return null;
  }

  const point = [Number(lng), Number(lat)];

  // 1. Cek tepat di dalam poligon
  for (const f of features) {
    const ring = f.geometry?.coordinates?.[0];
    if (ring && pointInPolygon(point, ring)) {
      return (f.properties?.NKEC || '').toUpperCase().trim();
    }
  }

  // 2. Fallback: Cari kecamatan terdekat jika titik berada sedikit di pinggir batas
  let closestKec = null;
  let minDist = Infinity;

  for (const f of features) {
    const ring = f.geometry?.coordinates?.[0];
    if (ring) {
      const center = getPolygonCenter(ring);
      const dist = getDistSq(point, center);
      if (dist < minDist) {
        minDist = dist;
        closestKec = (f.properties?.NKEC || '').toUpperCase().trim();
      }
    }
  }

  // Jika jarak dalam toleransi (~35km dari pusat Kabupaten Bogor), kembalikan terdekat
  if (minDist < 0.25) {
    return closestKec;
  }

  return null;
}

/**
 * Mengidentifikasi nama kecamatan dari data profil pengguna (username / org / fullname)
 */
export function getUserKecamatan(user) {
  if (!user) return null;

  const username = (user.username || '').toLowerCase();
  const org = (user.org || '').toUpperCase();
  const fullname = (user.fullname || user.name || '').toUpperCase();

  // Akun pengurus/admin tingkat kabupaten
  if (
    username === 'kwarcab_bogorkab' ||
    username === 'admin_coconext' ||
    username.includes('kwarcab') ||
    user.is_admin === 1 ||
    user.role === 'admin' ||
    org.includes('KWARTIR CABANG') ||
    fullname.includes('KWARCAB')
  ) {
    return 'KWARCAB';
  }

  // Akun Kwarran: kwarran.cibinong -> CIBINONG
  if (username.startsWith('kwarran.')) {
    return username.replace('kwarran.', '').toUpperCase().replace(/[^A-Z]/g, '');
  }

  // Akun Penanam: org berisi "Kwarran Kecamatan [Nama]"
  const matchOrg = org.match(/KECAMATAN\s+([A-Z\s]+)/i);
  if (matchOrg) {
    return matchOrg[1].toUpperCase().replace(/[^A-Z]/g, '');
  }

  // Cek jika fullname mengandung nama kecamatan
  const cleanFull = fullname.replace(/[^A-Z]/g, '');
  return cleanFull || null;
}

/**
 * Validasi apakah pengguna boleh login sesuai wilayah titik lokasi saat ini
 */
export function canUserAccessKecamatan(user, currentKecamatan) {
  if (!user || !currentKecamatan) return false;

  const userKec = getUserKecamatan(user);
  if (!userKec) return false;

  // Kwarcab / Admin Kabupaten dapat mengakses di seluruh wilayah
  if (userKec === 'KWARCAB') return true;

  const cleanCurrent = currentKecamatan.toUpperCase().replace(/[^A-Z]/g, '');
  const cleanUser = userKec.toUpperCase().replace(/[^A-Z]/g, '');

  return cleanCurrent === cleanUser || cleanCurrent.includes(cleanUser) || cleanUser.includes(cleanCurrent);
}
