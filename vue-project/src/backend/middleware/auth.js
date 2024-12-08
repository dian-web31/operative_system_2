// src/backend/middleware/auth.js
const roles = require('../models/roles');

function authorize(permission) {
  return (req, res, next) => {
    const userRole = req.headers['user-role']; // El rol del usuario se pasa en los headers de la solicitud
    if (!userRole || !roles[userRole]) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    if (roles[userRole].includes('all') || roles[userRole].includes(permission)) {
      next();
    } else {
      res.status(403).json({ error: 'Permiso insuficiente' });
    }
  };
}

module.exports = authorize;
