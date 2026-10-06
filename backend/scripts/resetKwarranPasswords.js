import pool from '../src/config/db.js';
import bcrypt from 'bcryptjs';

async function updatePasswords() {
  try {
    const [rows] = await pool.query('SELECT id, username, fullname FROM users WHERE username LIKE "kwarran.%" ORDER BY id ASC');
    console.log(`Found ${rows.length} Kwarran accounts to update.`);

    const credentialsList = [];

    for (const user of rows) {
      // Ambil nama kecamatan dari username, contoh: kwarran.cibinong -> cibinong
      const kec = user.username.replace('kwarran.', '').toLowerCase().trim();
      const plainPassword = `${kec}123`;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(plainPassword, salt);

      await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, user.id]);

      credentialsList.push({
        id: user.id,
        nama: user.fullname,
        username: user.username,
        password: plainPassword,
        password_alternatif: 'kwarran123',
      });
    }

    console.log('Successfully updated passwords for all 40 Kwarrans:');
    console.table(credentialsList);
  } catch (err) {
    console.error('Error updating passwords:', err);
  } finally {
    process.exit(0);
  }
}

updatePasswords();
