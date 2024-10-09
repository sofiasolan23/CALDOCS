const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Public/uploads'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    // Guardar el archivo con su nombre original
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Aceptar solo ciertos tipos de archivo
  const filetypes = /pdf|doc|docx|xls|xlsx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no soportado. Solo PDF, DOC, DOCX, XLS, XLSX.'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
