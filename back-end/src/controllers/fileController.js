const pool = require('../config/database');

exports.getFiles = async (req, res) => {
  try {
    const [files] = await pool.query('SELECT * FROM files');
    res.json(files);
  } catch (error) {
    console.error('Error al obtener archivos:', error);
    res.status(500).json({ message: 'Error al obtener archivos' });
  }
};

exports.uploadFile = async (req, res) => {
  // Aquí iría la lógica para subir archivos
  // Por ahora, solo devolveremos un mensaje
  res.json({ message: 'Funcionalidad de subida de archivos aún no implementada' });
};

exports.downloadFile = async (req, res) => {
  // Aquí iría la lógica para descargar archivos
  // Por ahora, solo devolveremos un mensaje
  res.json({ message: 'Funcionalidad de descarga de archivos aún no implementada' });
};