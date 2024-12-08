const express = require('express');
const router = express.Router();
const users = require('../models/users'); // Simulamos una base de datos de usuarios

// Simulación de usuarios registrados (esto sería reemplazado por base de datos real)
const usersDB = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'usuario' },
];

// Ruta para login
router.post('/login', (req, res) => {
  const { username, password, role } = req.body;

  const user = usersDB.find(u => u.username === username && u.password === password && u.role === role);

  if (!user) {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }

  // Simula la autenticación exitosa
  res.status(200).json({ message: 'Inicio de sesión exitoso', role: user.role });
});

module.exports = router;
