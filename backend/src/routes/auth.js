import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'coconext_jwt_secret_key_2026';

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
 * POST /api/auth/login
 * Login dengan username/fullname dan password
 */
router.post('/login', async (req, res) => {
  const { username, identity, password } = req.body;
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

    // Buat JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        org: user.org,
        is_admin: user.is_admin === 1,
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

export default router;
