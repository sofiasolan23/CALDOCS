// @ts-nocheck
const express = require('express');
const {
  getUnidades,
  getUnidadById,
  createUnidad,
  updateUnidad,
  deleteUnidad,
} = require('../controllers/unidadController.js');
const { authenticateToken,rateLimiter} = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route("/")
  .get(authenticateToken,rateLimiter,getUnidades)
  .post(authenticateToken,rateLimiter,createUnidad);
router
  .route("/:Id_Unidad")
  .get(authenticateToken,rateLimiter,getUnidadById)
  .put(authenticateToken,rateLimiter,updateUnidad)
  .delete(authenticateToken,rateLimiter,deleteUnidad);


module.exports = router;
