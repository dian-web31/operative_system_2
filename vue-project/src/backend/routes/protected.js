// src/backend/routes/protected.js
const express = require('express');
const authorize = require('../middleware/auth');
const router = express.Router();

router.get('/file-system', authorize('file-system'), (req, res) => {
  res.json({ message: 'Acceso al sistema de archivos permitido' });
});

router.get('/admin', authorize('all'), (req, res) => {
  res.json({ message: 'Acceso administrativo permitido' });
});

module.exports = router;
