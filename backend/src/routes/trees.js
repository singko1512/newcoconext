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
        SUM(CASE WHEN status = '' THEN 1 ELSE 0 END) AS total_
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
 * GET /api/trees/stats/species
 * Data distribusi semua varietas / spesies tanaman untuk bar chart horizontal
 */
router.get('/stats/species', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        nama_lokal,
        nama_latin,
        COUNT(*) AS total,
        SUM(CASE WHEN status = '' THEN 1 ELSE 0 END) AS _count,
        ROUND(AVG(NULLIF(tinggi_cm, 0))) AS avg_height,
        COUNT(DISTINCT penanam) AS total_planters
      FROM trees
      WHERE nama_lokal IS NOT NULL AND TRIM(nama_lokal) != ''
      GROUP BY nama_lokal, nama_latin
      ORDER BY total DESC, nama_lokal ASC
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal memuat statistik varietas tanaman',
      error: error.message,
    });
  }
});

/**
 * GET /api/trees/rank
 * Peringkat 40 Kwarran se-Kabupaten Bogor:
 * Kolom: Nomor, Nama Kwarran, Total Tanaman, Tanggal Terakhir, Jumlah pertahun 2025-2030
 */
router.get('/rank', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        u.username,
        u.fullname,
        u.org,
        COALESCE(t.total_trees, 0) AS total_trees,
        t.last_planting_date,
        COALESCE(t.count_last_date, 0) AS count_last_date,
        COALESCE(t.y2025, 0) AS y2025,
        COALESCE(t.y2026, 0) AS y2026,
        COALESCE(t.y2027, 0) AS y2027,
        COALESCE(t.y2028, 0) AS y2028,
        COALESCE(t.y2029, 0) AS y2029,
        COALESCE(t.y2030, 0) AS y2030,
        COALESCE(t.total_species, 0) AS total_species,
        COALESCE(t.avg_height, 0) AS avg_height
      FROM users u
      LEFT JOIN (
        SELECT 
          penanam,
          COUNT(*) AS total_trees,
          MAX(tanggal_tanam) AS last_planting_date,
          SUM(CASE WHEN tanggal_tanam = (SELECT MAX(t2.tanggal_tanam) FROM trees t2 WHERE t2.penanam = trees.penanam) THEN 1 ELSE 0 END) AS count_last_date,
          SUM(CASE WHEN YEAR(tanggal_tanam) = 2025 THEN 1 ELSE 0 END) AS y2025,
          SUM(CASE WHEN YEAR(tanggal_tanam) = 2026 THEN 1 ELSE 0 END) AS y2026,
          SUM(CASE WHEN YEAR(tanggal_tanam) = 2027 THEN 1 ELSE 0 END) AS y2027,
          SUM(CASE WHEN YEAR(tanggal_tanam) = 2028 THEN 1 ELSE 0 END) AS y2028,
          SUM(CASE WHEN YEAR(tanggal_tanam) = 2029 THEN 1 ELSE 0 END) AS y2029,
          SUM(CASE WHEN YEAR(tanggal_tanam) = 2030 THEN 1 ELSE 0 END) AS y2030,
          COUNT(DISTINCT nama_lokal) AS total_species,
          ROUND(AVG(NULLIF(tinggi_cm, 0))) AS avg_height
        FROM trees
        GROUP BY penanam
      ) t ON u.username = t.penanam
      WHERE u.username LIKE 'kwarran.%'
      ORDER BY total_trees DESC, last_planting_date DESC, u.fullname ASC
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal memuat peringkat kwarran',
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
    const { penanam, species, limit = 1000 } = req.query;
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

/**
 * POST /api/trees
 * Tambah titik penanaman pohon baru
 */
router.post('/', async (req, res) => {
  const {
    lat,
    lng,
    nama_lokal,
    nama_latin,
    tinggi_cm,
    tanggal_tanam,
    asal_bibit,
    penanam,
    cerita,
    foto_sebelum,
    foto_sesudah,
    status = 'alive',
  } = req.body;

  if (!lat || !lng || !nama_lokal) {
    return res.status(400).json({
      success: false,
      message: 'Koordinat (lat, lng) dan nama tanaman wajib diisi.',
    });
  }

  try {
    const dateStr = tanggal_tanam ? tanggal_tanam.replace(/[^0-9]/g, '').slice(0, 8) : new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const serial_no = `KH-${dateStr}-${randomSuffix}`;

    const [result] = await pool.query(
      `INSERT INTO trees 
        (lat, lng, nama_lokal, nama_latin, tinggi_cm, tanggal_tanam, jam_tanam, asal_bibit, penanam, cerita, foto_sebelum, foto_sesudah, serial_no, status)
       VALUES (?, ?, ?, ?, ?, ?, '08:00:00', ?, ?, ?, ?, ?, ?, ?)`,
      [
        parseFloat(lat),
        parseFloat(lng),
        nama_lokal,
        nama_latin || '-',
        Number(tinggi_cm) || 50,
        tanggal_tanam || new Date().toISOString().slice(0, 10),
        asal_bibit || 'Swadaya / Beli Sendiri',
        penanam || 'Kwarcab Bogor',
        cerita || '',
        foto_sebelum || null,
        foto_sesudah || null,
        serial_no,
        status || 'alive',
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Berhasil menambahkan data penanaman pohon',
      data: {
        id: result.insertId,
        serial_no,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan pohon ke database',
      error: error.message,
    });
  }
});

/**
 * DELETE /api/trees/:id
 * Hapus data penanaman pohon (Khusus Admin / Master)
 */
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM trees WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data pohon tidak ditemukan',
      });
    }
    res.json({
      success: true,
      message: 'Data pohon berhasil dihapus',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus data pohon',
      error: error.message,
    });
  }
});

export default router;
