import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || '  _jwt_secret_key_2026';

/**
 * GET /api/auth/users
 * Mendapatkan daftar user / pangkalan untuk opsi dropdown login
 */
router.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, fullname, org, is_admin FROM users ORDER BY fullname ASC'
    );
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil daftar pengguna',
      error: error.message,
    });
  }
});

/**
 * GET /api/auth/current-location
 * Mendeteksi titik koordinat dan nama kecamatan dari koneksi pengguna
 */
router.get('/current-location', async (req, res) => {
  try {
    const ipRes = await fetch('http://ip-api.com/json', { signal: AbortSignal.timeout(3000) });
    const ipData = await ipRes.json();
    if (ipData && ipData.status === 'success') {
      return res.json({
        success: true,
        lat: ipData.lat,
        lng: ipData.lon,
        city: ipData.city,
        isp: ipData.isp,
      });
    }
  } catch (err) {
    // ignore error fallback
  }

  // Fallback ke koordinat Cibinong (Pusat Kabupaten Bogor)
  res.json({
    success: true,
    lat: -6.48167,
    lng: 106.854,
    city: 'Cibinong',
  });
});

/**
 * POST /api/auth/login
 * Login dengan username/fullname dan password
 */
router.post('/login', async (req, res) => {
  const { username, identity, password, locationKecamatan } = req.body;
  const userIdentifier = username || identity;

  if (!userIdentifier || !password) {
    return res.status(400).json({
      success: false,
      message: 'Identitas / Username dan password harus diisi',
    });
  }

  try {
    const [users] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR fullname = ? OR org = ? LIMIT 1',
      [userIdentifier, userIdentifier, userIdentifier]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Pengguna tidak ditemukan',
      });
    }

    const user = users[0];

    // Normalisasi format bcrypt PHP ($2y$ -> $2a$) jika perlu
    let storedHash = user.password_hash;
    if (storedHash && storedHash.startsWith('$2y$')) {
      storedHash = '$2a$' + storedHash.slice(4);
    }

    const isMatch = await bcrypt.compare(password, storedHash);

    // Jika password default/belum terenkripsi atau match
    const isValid = isMatch || password === user.password_hash;

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Kata sandi salah',
      });
    }

    // Geofencing tidak mengunci akses (pilih identitas bebas untuk semua akun)

    // Buat JWT Token
    const isKwarcabAdmin =
      user.is_admin === 1 ||
      (user.username || '').toLowerCase().includes('kwarcab') ||
      (user.username || '').toLowerCase().includes('admin');

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        org: user.org,
        is_admin: isKwarcabAdmin,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.fullname,
        fullname: user.fullname,
        org: user.org,
        is_admin: user.is_admin === 1,
        role: user.is_admin === 1 || user.username.includes('kwarcab') ? 'admin' : 'pangkalan',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server saat login',
      error: error.message,
    });
  }
});

/**
 * POST /api/auth/register
 * Pendaftaran akun baru untuk penanam pohon / kwarran
 */
router.post('/register', async (req, res) => {
  const { username, fullname, password, org, whatsapp, birthdate } = req.body;

  if (!username || !password || !fullname) {
    return res.status(400).json({
      success: false,
      message: 'Nama lengkap, username, dan kata sandi wajib diisi',
    });
  }

  // Format username (lowercase, tanpa spasi)
  const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, '_');

  if (cleanUsername.length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Username minimal harus 3 karakter',
    });
  }

  if (password.length < 4) {
    return res.status(400).json({
      success: false,
      message: 'Kata sandi minimal harus 4 karakter',
    });
  }

  try {
    // Periksa apakah username sudah terdaftar
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE username = ? LIMIT 1',
      [cleanUsername]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Username sudah digunakan, silakan pilih username lain',
      });
    }

    // Hash password menggunakan bcrypt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const defaultBirthdate = birthdate || '2005-01-01';
    const defaultWhatsapp = whatsapp ? String(whatsapp).trim() : '-';
    const defaultOrg = org ? String(org).trim() : 'Penanam Mandiri / Komunitas';

    const [result] = await pool.query(
      `INSERT INTO users (username, password_hash, fullname, org, birthdate, whatsapp, is_admin)
       VALUES (?, ?, ?, ?, ?, ?, 0)`,
      [cleanUsername, passwordHash, fullname.trim(), defaultOrg, defaultBirthdate, defaultWhatsapp]
    );

    // Buat JWT Token agar bisa langsung otomatis login
    const token = jwt.sign(
      {
        id: result.insertId,
        username: cleanUsername,
        fullname: fullname.trim(),
        org: defaultOrg,
        is_admin: false,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Pendaftaran akun penanam berhasil!',
      token,
      user: {
        id: result.insertId,
        username: cleanUsername,
        name: fullname.trim(),
        fullname: fullname.trim(),
        org: defaultOrg,
        is_admin: false,
        role: 'pangkalan',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mendaftarkan akun baru',
      error: error.message,
    });
  }
});

/**
 * GET /api/auth/all-users
 * Mendapatkan detail lengkap seluruh pengguna untuk Admin Data Master
 */
router.get('/all-users', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, fullname, org, birthdate, whatsapp, is_admin, created_at FROM users ORDER BY is_admin DESC, fullname ASC'
    );
    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data master pengguna',
      error: error.message,
    });
  }
});

export default router;
