import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

/**
 * GET /api/species
 * Daftar spesies pohon
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM species ORDER BY nama_lokal ASC');
    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal memuat data spesies',
      error: error.message,
    });
  }
});

/**
 * POST /api/species
 * Tambah varietas / spesies baru (Khusus Admin Master)
 */
router.post('/', async (req, res) => {
  const { nama_lokal, nama_latin, logo_path } = req.body;
  if (!nama_lokal) {
    return res.status(400).json({
      success: false,
      message: 'Nama lokal tanaman wajib diisi.',
    });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO species (nama_lokal, nama_latin, logo_path) VALUES (?, ?, ?)',
      [nama_lokal.trim(), nama_latin ? nama_latin.trim() : '-', logo_path || null]
    );
    res.status(201).json({
      success: true,
      message: 'Varietas berhasil ditambahkan ke master',
      data: {
        id: result.insertId,
        nama_lokal,
        nama_latin,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan spesies (mungkin nama sudah ada)',
      error: error.message,
    });
  }
});

export default router;
