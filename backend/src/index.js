import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/db.js';
import authRoutes from './routes/auth.js';
import treeRoutes from './routes/trees.js';
import speciesRoutes from './routes/species.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend API Coconext berjalan dengan baik',
    time: new Date().toISOString(),
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trees', treeRoutes);
app.use('/api/species', speciesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Terjadi kesalahan pada internal server',
  });
});

// Start Server
app.listen(PORT, async () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  await testConnection();
});
