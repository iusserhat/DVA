const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('../middleware/uploadMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');

// Dosya yükleme rotası - önce token doğrulaması, sonra dosya yükleme middleware'i
router.post('/upload', verifyToken, upload.single('file'), documentController.uploadDocument);

// Dosya silme rotası - token doğrulaması gerekli
router.delete('/delete', verifyToken, documentController.deleteDocument);

module.exports = router; 