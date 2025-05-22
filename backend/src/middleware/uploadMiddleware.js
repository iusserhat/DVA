const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Geçici dosyalar için upload klasörü
const uploadDir = path.join(__dirname, '../../uploads');

// Klasör yoksa oluştur
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer konfigürasyonu
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Orjinal dosya adını ile timestamp kullanarak benzersiz bir ad oluştur
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

// Dosya yükleme filter fonksiyonu - tüm dosya türlerine izin ver
const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

module.exports = upload; 