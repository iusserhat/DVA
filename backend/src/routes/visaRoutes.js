const express = require('express');
const router = express.Router();
const visaController = require('../controllers/visaController');
const authMiddleware = require('../middleware/authMiddleware');

// Tüm vize rotaları için kimlik doğrulama gerekir
router.use(authMiddleware.verifyToken);

// Vize başvurusu oluşturma
router.post('/applications', visaController.createVisaApplication);

// Kullanıcının kendi vize başvurularını getirme
router.get('/applications/my', visaController.getUserVisaApplications);

// Tüm vize başvurularını getirme (admin için)
router.get('/applications/all', visaController.getAllVisaApplications);

// Vize başvurusu detaylarını getirme
router.get('/applications/:id', visaController.getVisaApplicationDetail);

// Vize başvurusu durumunu güncelleme (admin için)
router.patch('/applications/:id/status', visaController.updateVisaStatus);

// Ödeme durumunu güncelleme
router.patch('/applications/:id/payment', visaController.updatePaymentStatus);

module.exports = router; 