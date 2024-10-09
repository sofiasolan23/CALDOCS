// @ts-nocheck
const express = require('express');
const {
  getProcesos,
  getProcesoById,
  createProceso,
  updateProceso,
  deleteProceso,
} = require('../controllers/procesoController.js');
const router = express.Router();
const { authenticateToken,rateLimiter} = require('../middleware/authMiddleware');
router
  .route("/")
  .get(authenticateToken,rateLimiter,getProcesos)
  .post(authenticateToken,rateLimiter,createProceso);
router
  .route("/:Id_Proceso")
  .get(authenticateToken,rateLimiter,getProcesoById)
  .put(authenticateToken,rateLimiter,updateProceso)
  .delete(authenticateToken,rateLimiter,deleteProceso);


module.exports = router;
