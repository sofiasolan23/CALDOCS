// @ts-nocheck
const  express = require('express');

const {
  getAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
} = require('../controllers/areaController');
const router = express.Router();

const { authenticateToken,rateLimiter} = require('../middleware/authMiddleware');
router
  .route("/")
  .get(authenticateToken,rateLimiter,getAreas)
  .post(authenticateToken,rateLimiter,createArea);
router
  .route("/:Id_Area")
  .get(authenticateToken,rateLimiter,getAreaById)
  .put(authenticateToken,rateLimiter,updateArea)
  .delete(authenticateToken,rateLimiter,deleteArea);

module.exports = router
