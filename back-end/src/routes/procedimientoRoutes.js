// @ts-nocheck
const express = require('express');
const {
  getProcedimientos,
  getProcedimientoById,
  createProcedimiento,
  updateProcedimiento,
  deleteProcedimiento,
} = require('../controllers/procedimientoController.js');
const router = express.Router();


const { authenticateToken,rateLimiter} = require('../middleware/authMiddleware');
router
  .route("/")
  .get(authenticateToken,rateLimiter,getProcedimientos)
  .post(authenticateToken,rateLimiter,createProcedimiento);
router
  .route("/:Id_Procedimiento")
  .get(authenticateToken,rateLimiter,getProcedimientoById)
  .put(authenticateToken,rateLimiter,updateProcedimiento)
  .delete(authenticateToken,rateLimiter,deleteProcedimiento);



module.exports = router;
