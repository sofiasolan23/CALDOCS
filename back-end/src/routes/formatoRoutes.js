const express = require('express');
const {
  getFormatos,
  getFormatoById,
  createFormato,
  updateFormato,
  deleteFormato,
  getFormatosForAprendiz
} = require('../controllers/formatoController.js');

const upload = require('../config/multer.js'); // Importar multer para la carga


const router = express.Router();

const { authenticateToken,rateLimiter} = require('../middleware/authMiddleware');
router
  .route("/")
  .get(authenticateToken,rateLimiter,getFormatos)
  .post(authenticateToken,rateLimiter,upload.single('archivo'),createFormato);

router.get('/consulta/', getFormatosForAprendiz);
router
  .route("/:Id_Formato")
  .get(authenticateToken,rateLimiter,getFormatoById)
  .put(authenticateToken,rateLimiter,updateFormato)
  .delete(authenticateToken,rateLimiter,deleteFormato);




module.exports = router;
