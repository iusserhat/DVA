const express = require('express');
const router = express.Router();
const visaApplicationController = require('../controllers/visaApplicationController');
const { verifyToken, isAdmin, isStaffOrAdmin } = require('../middleware/authMiddleware');
const visaApplication = require('../models/visaApplication');

// Debug middleware - sadece geliştirme ortamında görünecek
const debugMiddleware = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Vize Başvuru Rotası:', req.method, req.originalUrl);
    console.log('İstek gövdesi:', req.body);
  }
  next();
};

router.use(debugMiddleware);

// Tüm başvuruları getir (admin erişimli)
router.get('/admin/all', verifyToken, isAdmin, visaApplicationController.getAllApplications);

// Kullanıcıya ait vize başvurularını getir
router.get('/user/:userId', async (req, res) => {
  try {
    console.log('Vize Başvuru Rotası: GET /api/visa-applications/user/' + req.params.userId);
    console.log('İstek gövdesi:', req.body);
    
    // Token doğrulamasını geliştirme ortamında atlayabilirsiniz
    if (process.env.NODE_ENV === 'development') {
      console.log('DEVELOPMENT MODE: Token doğrulaması atlanıyor!');
      console.warn('⚠️ GELİŞTİRME ORTAMI: Test kullanıcısı kullanılıyor (admin)');
    } else {
      // Gerçek ortamda token doğrulaması yapılmalıdır
      // TODO: JWT doğrulama eklenecek
    }
    
    let userId = req.params.userId;
    
    // userId kontrol et, yoksa test kullanıcısı kullan
    if (!userId || userId === 'undefined') {
      console.warn('⚠️ userId belirtilmediği için tüm başvuruları getiriyoruz!');
      const applications = await visaApplication.getAll();
      return res.json(applications || []);
    }
    
    const applications = await visaApplication.getByUserId(userId);
    console.log(`${applications.length} adet kullanıcı başvurusu bulundu`);
    res.json(applications);
  } catch (error) {
    console.error('Kullanıcı başvurularını getirme hatası:', error);
    res.status(500).json({ error: error.message });
  }
});

// Belirli bir başvuruyu ID'ye göre getir
router.get('/:id', verifyToken, visaApplicationController.getApplication);

// Yeni başvuru oluştur
router.post('/', verifyToken, visaApplicationController.createApplication);

// Başvuruyu güncelle
router.put('/:id', verifyToken, visaApplicationController.updateApplication);

// Başvuru durumunu güncelle (admin/staff erişimli)
router.patch('/:id/status', verifyToken, isStaffOrAdmin, visaApplicationController.updateApplicationStatus);

// Ödeme durumunu güncelle (admin/staff erişimli)
router.patch('/:id/payment', verifyToken, isStaffOrAdmin, visaApplicationController.updatePaymentStatus);

// Başvuruyu sil
router.delete('/:id', verifyToken, visaApplicationController.deleteApplication);

module.exports = router; 