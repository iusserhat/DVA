const supabase = require('../config/supabase');
const supabaseAdmin = require('../config/supabase-admin'); // Admin client ekliyoruz
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

// Public uploads klasörü
const UPLOADS_DIR = path.join(__dirname, '../../public/uploads');

// Klasörleri oluştur
const ensureDirectoriesExist = () => {
  // Ana uploads dizini
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    console.log('Public uploads dizini oluşturuldu:', UPLOADS_DIR);
  }
  
  // Alt dizinler
  const subdirs = ['passport', 'photo', 'flight_ticket', 'hotel_reservation', 'other'];
  subdirs.forEach(dir => {
    const subdir = path.join(UPLOADS_DIR, dir);
    if (!fs.existsSync(subdir)) {
      fs.mkdirSync(subdir, { recursive: true });
      console.log(`${dir} dizini oluşturuldu:`, subdir);
    }
  });
};

// Başlangıçta klasörleri kontrol et
ensureDirectoriesExist();

// Dosya yükleme işleyicisi
const uploadFile = async (req, res) => {
    try {
    console.log('Dosya yükleme isteği alındı');
    
      // Dosya kontrolleri
      if (!req.file) {
      console.error('Dosya yükleme hatası: Dosya bulunamadı');
      return res.status(400).json({
        success: false,
        error: 'Dosya bulunamadı veya yüklenemedi'
      });
      }
      
      const { type } = req.body;
      if (!type || !SUPPORTED_FILE_TYPES[type]) {
      console.error('Dosya yükleme hatası: Geçersiz dosya türü', type);
      return res.status(400).json({
        success: false,
        error: `Geçersiz dosya türü: ${type || 'belirtilmemiş'}`
      });
      }
      
    console.log('Yüklenen dosya bilgileri:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      type
    });
      
      // Dosya boyutu kontrolü
    if (req.file.size > MAX_FILE_SIZE) {
      console.error('Dosya boyutu çok büyük:', req.file.size);
      return res.status(400).json({
        success: false,
        error: `Dosya boyutu çok büyük (${Math.round(req.file.size / 1024)}KB). Maksimum boyut: 5MB`
      });
      }
      
      // Dosya türü kontrolü
    if (!SUPPORTED_FILE_TYPES[type].includes(req.file.mimetype)) {
      console.error('Desteklenmeyen dosya türü:', req.file.mimetype);
        return res.status(400).json({ 
        success: false,
        error: `Desteklenmeyen dosya formatı: ${req.file.mimetype}. Desteklenen formatlar: ${SUPPORTED_FILE_TYPES[type].join(', ')}`
        });
      }
      
    // Yeni dosya adı oluştur
    const fileExt = path.extname(req.file.originalname);
      const fileName = `${uuidv4()}${fileExt}`;
    
    try {
      // Local depolama için klasör ve dosya yolları
      const targetDir = path.join(UPLOADS_DIR, type);
      const targetPath = path.join(targetDir, fileName);
      
      // Klasör yoksa oluştur
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // Dosyayı yerel depoya kopyala
      fs.copyFileSync(req.file.path, targetPath);
      console.log('Dosya yerel depoya kopyalandı:', targetPath);
      
      // Supabase'e yüklemeyi dene (opsiyonel - başarısız olursa yerel URL döndür)
      let supabaseUrl = null;
      
      try {
        const storagePath = `${type}/${fileName}`;
        const fileBuffer = fs.readFileSync(req.file.path);
        
        // Admin client ile dene
        const { data, error } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
          .upload(storagePath, fileBuffer, {
            contentType: req.file.mimetype,
            upsert: true
        });
      
        if (!error) {
          const { data: urlData } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .getPublicUrl(storagePath);
      
          if (urlData && urlData.publicUrl) {
            supabaseUrl = urlData.publicUrl;
            console.log('Dosya Supabase\'e yüklendi:', supabaseUrl);
          }
        } else {
          console.error('Supabase\'e yükleme başarısız:', error);
        }
      } catch (supabaseError) {
        console.error('Supabase yükleme hatası:', supabaseError);
        // Supabase hatası görmezden gelinecek, yerel URL kullanılacak
      }
      
      // Geçici dosyayı temizle
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
        console.log('Geçici dosya temizlendi:', req.file.path);
      }
      
      // Dosya URL'i (Supabase veya yerel)
      const fileUrl = supabaseUrl || `/uploads/${type}/${fileName}`;
      
      // Başarılı yanıt
      return res.status(200).json({
        success: true,
        data: {
          fileName: req.file.originalname,
          fileType: req.file.mimetype,
          fileSize: req.file.size,
          url: fileUrl,
          storage: supabaseUrl ? 'supabase' : 'local'
        }
      });
    } catch (err) {
      console.error('Dosya işleme hatası:', err);
      return res.status(500).json({
        success: false,
        error: `Dosya işlenirken bir hata oluştu: ${err.message}`
      });
    }
  } catch (error) {
    console.error('Dosya yükleme genel hatası:', error);
    return res.status(500).json({
      success: false,
      error: `Dosya yükleme hatası: ${error.message}`
    });
    }
};
  
// Dosya silme fonksiyonu
const deleteFile = async (req, res) => {
    try {
      const { storagePath } = req.body;
      
      if (!storagePath) {
      return res.status(400).json({ 
        success: false, 
        error: 'Dosya yolu belirtilmedi' 
      });
      }
      
    // Eğer bu bir Supabase URL ise
    if (storagePath.includes('supabase.co')) {
      // URL'den storage path'i çıkart
      const pathMatch = storagePath.match(/\/storage\/v1\/object\/public\/([^\/]+)\/(.+)$/);
      
      if (!pathMatch) {
        return res.status(400).json({ 
          success: false, 
          error: 'Geçersiz Supabase URL formatı' 
        });
      }
      
      const [, bucket, filePath] = pathMatch;
      console.log('Silinecek dosya (Supabase):', { bucket, filePath });
      
      try {
        // Önce admin client ile dene
        const { error: adminError } = await supabaseAdmin.storage
          .from(bucket)
          .remove([filePath]);
        
        if (adminError) {
          console.log('Admin client ile dosya silme hatası:', adminError);
          // Normal client ile dene
          const { error } = await supabase.storage
            .from(bucket)
            .remove([filePath]);
      
          if (error) {
            throw error;
          }
        }
        
        console.log('Supabase dosyası başarıyla silindi');
      } catch (error) {
        console.error('Supabase dosya silme hatası:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Supabase dosyası silinirken bir hata oluştu' 
        });
      }
    } 
    // Eğer yerel bir dosya ise
    else if (storagePath.startsWith('/uploads/')) {
      const localPath = path.join(__dirname, '../../public', storagePath);
      console.log('Silinecek dosya (yerel):', localPath);
      
      if (fs.existsSync(localPath)) {
        try {
          fs.unlinkSync(localPath);
          console.log('Yerel dosya başarıyla silindi');
        } catch (err) {
          console.error('Yerel dosya silme hatası:', err);
          return res.status(500).json({ 
            success: false, 
            error: 'Yerel dosya silinirken bir hata oluştu' 
          });
        }
      } else {
        console.log('Silinecek dosya bulunamadı:', localPath);
        // Dosya zaten silinmiş olabilir, hata döndürmeyelim
      }
    } else {
      return res.status(400).json({
        success: false,
        error: 'Geçersiz dosya yolu formatı'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Dosya başarıyla silindi'
    });
  } catch (error) {
    console.error('Dosya silme genel hatası:', error);
    return res.status(500).json({
      success: false,
      error: 'Dosya silinirken bir hata oluştu'
    });
  }
};

module.exports = {
  uploadFile,
  deleteFile
}; 