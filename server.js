const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authMiddleware = require('./middleware/auth');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const translateRouter = require('./routes/translate');
const analyzeRouter = require('./routes/analyze');
const paymentsRouter = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Tumikia frontend (React/Vite build)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// API Routes - zisizo na auth
app.use('/api/translate', translateRouter);
app.use('/api/analyze-food', analyzeRouter);

// API Routes - zinazohitaji auth
app.use('/api/posts', authMiddleware, postsRouter);
app.use('/api/comments', authMiddleware, commentsRouter);

// API Routes - malipo (auth inashughulikiwa ndani)
app.use('/api/payments', paymentsRouter);

// Frontend fallback - kwa Single Page Application (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

// Anzisha server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Feed the World API running on port ${PORT}`);
  console.log(`Serving frontend from: ${distPath}`);
});
