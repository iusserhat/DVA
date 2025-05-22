const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Kullanıcı kaydı
router.post('/register', authController.register);

// Kullanıcı girişi
router.post('/login', authController.login);

// Kullanıcı çıkışı
router.post('/logout', authController.logout);

// Kullanıcı bilgilerini getir (token gerekli)
router.get('/me', verifyToken, authController.getMe);

module.exports = router; 