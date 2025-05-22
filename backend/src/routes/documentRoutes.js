const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const documentController = require('../controllers/documentController');
const { verifyToken } = require('../middleware/authMiddleware');

// Uploads dizinini kontrol et ve oluştur
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads dizini oluşturuldu:', uploadDir);
}

// Multer disk depolama konfigürasyonu
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Düzeltilmiş yükleme dizini
  },
  filename: function (req, file, cb) {
    const uniquePrefix = `file-${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniquePrefix}${path.extname(file.originalname)}`);
  }
});

// Multer hata yönetimi
const fileFilter = (req, file, cb) => {
  // Sadece izin verilen MIME tipleri
  if (file.mimetype.startsWith('image/') || 
      file.mimetype === 'application/pdf' || 
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    cb(null, true);
  } else {
    cb(new Error('Desteklenmeyen dosya formatı! Sadece resim, PDF ve Word dosyaları yüklenebilir.'), false);
  }
};

// Multer yükleme yapılandırması
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// İşleme ve hata yakalama için özel middleware
const processUpload = (req, res, next) => {
  upload.single('file')(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // Multer hatası (örn. boyut limit aşımı)
      console.error('Multer hatası:', err);
      return res.status(400).json({ 
        success: false, 
        error: err.message || 'Dosya yüklenirken bir hata oluştu.'
      });
    } else if (err) {
      // Diğer hatalar
      console.error('Yükleme hatası:', err);
      return res.status(400).json({ 
        success: false, 
        error: err.message || 'Dosya yüklenirken bir hata oluştu.'
      });
    }
    // Herşey yolunda
    next();
  });
};

// Dosya yükleme rotası - geliştirilmiş hata yönetimi ile
router.post('/upload', verifyToken, processUpload, documentController.uploadFile);

// Dosya silme rotası
router.delete('/delete', verifyToken, documentController.deleteFile);

module.exports = router; 