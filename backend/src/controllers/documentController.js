const supabase = require('../config/supabase');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Desteklenen dosya türleri
const SUPPORTED_FILE_TYPES = {
  'passport': ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  'photo': ['image/jpeg', 'image/png', 'image/jpg'],
  'flight_ticket': ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  'hotel_reservation': ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  'other': ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// Maksimum dosya boyutu: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Supabase bucket adı
const BUCKET_NAME = 'visa-documents';

const documentController = {
  // Dosya yükleme
  uploadDocument: async (req, res) => {
    try {
      // Dosya kontrolleri
      if (!req.file) {
        return res.status(400).json({ error: 'Dosya yüklenmedi' });
      }
      
      const { type } = req.body;
      
      if (!type || !SUPPORTED_FILE_TYPES[type]) {
        return res.status(400).json({ error: 'Geçersiz dosya türü' });
      }
      
      const file = req.file;
      
      // Dosya boyutu kontrolü
      if (file.size > MAX_FILE_SIZE) {
        return res.status(400).json({ error: 'Dosya boyutu çok büyük. Maksimum 5MB olmalıdır.' });
      }
      
      // Dosya türü kontrolü
      if (!SUPPORTED_FILE_TYPES[type].includes(file.mimetype)) {
        return res.status(400).json({ 
          error: `Geçersiz dosya formatı. Desteklenen formatlar: ${SUPPORTED_FILE_TYPES[type].join(', ')}`
        });
      }
      
      // Dosya adı oluştur
      const fileExt = path.extname(file.originalname);
      const fileName = `${uuidv4()}${fileExt}`;
      const filePath = file.path;
      
      // Dosyayı Supabase'e yükle
      const fileBuffer = fs.readFileSync(filePath);
      
      // Bucket kontrolü
      const { data: bucketExists } = await supabase.storage.getBucket(BUCKET_NAME);
      
      if (!bucketExists) {
        await supabase.storage.createBucket(BUCKET_NAME, {
          public: false,
          fileSizeLimit: MAX_FILE_SIZE
        });
      }
      
      // Dosyayı yükle
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(`${type}/${fileName}`, fileBuffer, {
          contentType: file.mimetype,
          upsert: false
        });
      
      if (error) throw error;
      
      // Dosyayı veritabanına kaydet
      const storagePath = data.path;
      
      // Dosya URL'ini al
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(storagePath);
      
      // Geçici dosyayı sil
      fs.unlinkSync(filePath);
      
      // Başarılı yanıt gönder
      res.status(201).json({
        message: 'Dosya başarıyla yüklendi',
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
        storagePath,
        url: urlData.publicUrl
      });
    } catch (error) {
      console.error('Dosya yükleme hatası:', error);
      res.status(500).json({ error: error.message || 'Dosya yüklenirken bir hata oluştu' });
    }
  },
  
  // Dosyayı silme
  deleteDocument: async (req, res) => {
    try {
      const { storagePath } = req.body;
      
      if (!storagePath) {
        return res.status(400).json({ error: 'Dosya yolu belirtilmedi' });
      }
      
      // Dosyayı sil
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([storagePath]);
      
      if (error) throw error;
      
      res.status(200).json({ message: 'Dosya başarıyla silindi' });
    } catch (error) {
      console.error('Dosya silme hatası:', error);
      res.status(500).json({ error: error.message || 'Dosya silinirken bir hata oluştu' });
    }
  }
};

module.exports = documentController; 