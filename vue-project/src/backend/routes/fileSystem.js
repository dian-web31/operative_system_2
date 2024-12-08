// src/backend/routes/fileSystem.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta de almacenamiento
const baseDir = path.join(__dirname, '../../data/files');

// Middleware para verificar usuario
router.use((req, res, next) => {
  if (!req.headers['user-id']) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }
  req.userDir = path.join(baseDir, req.headers['user-id']);
  if (!fs.existsSync(req.userDir)) {
    fs.mkdirSync(req.userDir, { recursive: true });
  }
  next();
});

// Crear archivo
router.post('/create', (req, res) => {
  const { name, content } = req.body;
  const filePath = path.join(req.userDir, name);
  fs.writeFileSync(filePath, content, 'utf8');
  res.json({ message: 'Archivo creado' });
});

// Listar archivos
router.get('/list', (req, res) => {
  const files = fs.readdirSync(req.userDir);
  res.json({ files });
});

// Leer archivo
router.get('/read/:name', (req, res) => {
  const filePath = path.join(req.userDir, req.params.name);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Archivo no encontrado' });
  }
  const content = fs.readFileSync(filePath, 'utf8');
  res.json({ content });
});

module.exports = router;
