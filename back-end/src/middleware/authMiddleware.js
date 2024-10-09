const jwt = require('jsonwebtoken');
const pool = require('../config/database.js')


exports.authenticateToken = (req, res, next) => {
  // Obtén el token del encabezado Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Separa 'Bearer' del token

  // Si no hay token, devuelve un error 401 (No autorizado)
  if (token == null) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verifica el token con la clave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    // Si el token es válido, se añade el usuario a la request
    req.user = user;
    next(); // Procede a la siguiente función del middleware
  });
};
exports.isAdmin = async (req, res, next) => {
  try {
    const [users] = await pool.query('SELECT role FROM users WHERE id = ?', [req.user.id]);
    if (users.length > 0 && users[0].role === 'administrador') {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar el rol de usuario' });
  }
};

exports.rateLimiter = (req, res, next) => {
  // Implementación básica de rate limiting
  // En una aplicación real, usarías una solución más robusta como express-rate-limit
  if (!req.ip) {
    return next();
  }

  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutos
  const maxRequests = 1000; // máximo número de solicitudes por ventana

  if (!global.rateLimit) {
    global.rateLimit = {};
  }

  if (!global.rateLimit[req.ip]) {
    global.rateLimit[req.ip] = {
      requests: 1,
      nextWindow: now + windowMs
    };
  } else if (now > global.rateLimit[req.ip].nextWindow) {
    global.rateLimit[req.ip] = {
      requests: 1,
      nextWindow: now + windowMs
    };
  } else {
    global.rateLimit[req.ip].requests++;
    if (global.rateLimit[req.ip].requests > maxRequests) {
      return res.status(429).json({ message: 'Demasiadas solicitudes, por favor intente más tarde.' });
    }
  }

  next();
};