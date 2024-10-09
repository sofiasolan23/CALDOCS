// @ts-nocheck
const express = require('express');
const {
  getResponsables,
  getResponsableById,
  createResponsable,
  updateResponsable,
  deleteResponsable,
} = require('../controllers/responsableController.js');

const router = express.Router();
const { authenticateToken,rateLimiter} = require('../middleware/authMiddleware');


router
  .route("/")
  .get(authenticateToken,rateLimiter,getResponsables)
  .post(authenticateToken,rateLimiter,createResponsable);
router
  .route("/:Id_Responsable")
  .get(authenticateToken,rateLimiter,getResponsableById)
  .put(authenticateToken,rateLimiter,updateResponsable)
  .delete(authenticateToken,rateLimiter,deleteResponsable);

module.exports = router;
