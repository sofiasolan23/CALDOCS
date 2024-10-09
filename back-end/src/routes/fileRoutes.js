const express = require('express');
const fileController = require('../controllers/fileController');
const { authenticateToken, isAdmin, rateLimiter } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, rateLimiter, fileController.getFiles);
router.post('/upload', authenticateToken, isAdmin, rateLimiter, fileController.uploadFile);
router.get('/download/:id', authenticateToken, rateLimiter, fileController.downloadFile);

module.exports = router;