import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kwarcab_coconext',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Helper untuk test koneksi
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Terhubung ke database MySQL:', process.env.DB_NAME || 'kwarcab_coconext');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Gagal terhubung ke MySQL:', error.message);
    return false;
  }
}

export default pool;
