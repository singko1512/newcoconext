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

export default router;
