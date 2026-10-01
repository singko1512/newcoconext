import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

/**
 * GET /api/trees/stats
 * Statistik ringkas penanaman pohon
 */
router.get('/stats', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        COUNT(*) AS total_trees,
        COUNT(DISTINCT nama_lokal) AS total_species,
        COUNT(DISTINCT penanam) AS total_planters,
        SUM(CASE WHEN status = 'alive' THEN 1 ELSE 0 END) AS total_alive
      FROM trees
    `);

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal memuat statistik pohon',
      error: error.message,
    });
  }
});

/**
 * GET /api/trees
 * Daftar pohon untuk peta & tabel
 */
router.get('/', async (req, res) => {
  try {
    const { penanam, species, limit = 500 } = req.query;
    let query = 'SELECT * FROM trees WHERE 1=1';
    const params = [];

    if (penanam) {
      query += ' AND penanam = ?';
      params.push(penanam);
    }

    if (species) {
      query += ' AND (nama_lokal = ? OR nama_latin = ?)';
      params.push(species, species);
    }

    query += ' ORDER BY id DESC LIMIT ?';
    params.push(Number(limit));

    const [rows] = await pool.query(query, params);

    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data pohon',
      error: error.message,
    });
  }
});

/**
 * GET /api/trees/:id
 * Detail data satu pohon
 */
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM trees WHERE id = ? LIMIT 1', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data pohon tidak ditemukan',
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail pohon',
      error: error.message,
    });
  }
});

export default router;
