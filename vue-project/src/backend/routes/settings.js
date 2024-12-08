// src/backend/routes/settings.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const settingsPath = path.join(__dirname, '../../data/settings.json');

// Obtener ajustes
router.get('/', (req, res) => {
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  res.json(settings);
});

// Actualizar ajustes
router.post('/', (req, res) => {
  const newSettings = req.body;
  fs.writeFileSync(settingsPath, JSON.stringify(newSettings), 'utf8');
  res.json({ message: 'Configuración actualizada' });
});

module.exports = router;
