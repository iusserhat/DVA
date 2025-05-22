const express = require('express');
const router = express.Router();
const visaApplicationController = require('../controllers/visaApplicationController');
const { verifyToken, isAdmin, isStaffOrAdmin } = require('../middleware/authMiddleware');

// Tüm başvuruları getir (sadece admin ve personel)
router.get('/', verifyToken, isStaffOrAdmin, visaApplicationController.getAllApplications);

// Kullanıcıya ait başvuruları getir (kullanıcı kendi başvurularını görebilir)
router.get('/user/:userId', verifyToken, visaApplicationController.getUserApplications);

// ID'ye göre başvuru detayını getir (kullanıcı kendi başvurusunu görebilir)
router.get('/:id', verifyToken, visaApplicationController.getApplication);

// Yeni başvuru oluştur (giriş yapmış kullanıcılar)
router.post('/', verifyToken, visaApplicationController.createApplication);

// Başvuruyu güncelle (kullanıcı kendi başvurusunu güncelleyebilir)
router.put('/:id', verifyToken, visaApplicationController.updateApplication);

// Başvuru durumunu güncelle (sadece admin ve personel)
router.patch('/:id/status', verifyToken, isStaffOrAdmin, visaApplicationController.updateApplicationStatus);

// Başvuruyu sil (kullanıcı kendi başvurusunu silebilir)
router.delete('/:id', verifyToken, visaApplicationController.deleteApplication);

module.exports = router; 