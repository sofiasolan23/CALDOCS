const express = require('express');
const authController = require('../controllers/authController');
const { rateLimiter } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', rateLimiter, authController.register);
router.post('/login', rateLimiter, authController.login);
router.post('/forgot-password', rateLimiter, authController.forgotPassword);
router.post('/reset-password/:userId', rateLimiter, authController.resetPassword);

module.exports = router;