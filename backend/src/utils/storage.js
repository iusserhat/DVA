const supabase = require('../config/supabase');
const fs = require('fs');
const path = require('path');

/**
 * Dosya yükleme işlemleri
 */
const storageUtils = {
  /**
   * Dosyayı Supabase Storage'a yükler
   * @param {string} bucketName - Bucket adı
   * @param {string} filePath - Yüklenecek dosyanın yolu
   * @param {string} fileName - Dosyaya verilecek isim
   * @returns {Promise<object>} - Yükleme bilgisi
   */
  uploadFile: async (bucketName, filePath, fileName) => {
    try {
      // Dosyayı oku
      const fileBuffer = fs.readFileSync(filePath);
      const fileExt = path.extname(filePath);
      const fullFileName = `${fileName}${fileExt}`;

      // Bucket'ı kontrol et, yoksa oluştur
      const { data: bucketExists } = await supabase.storage.getBucket(bucketName);
      if (!bucketExists) {
        await supabase.storage.createBucket(bucketName, {
          public: false,
          fileSizeLimit: 5242880 // 5MB
        });
      }

      // Dosyayı yükle
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(`uploads/${fullFileName}`, fileBuffer, {
          contentType: getContentType(fileExt),
          upsert: false
        });

      if (error) throw error;

      // Yüklenen dosyanın URL'ini al
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(`uploads/${fullFileName}`);

      return {
        success: true,
        path: data.path,
        url: urlData.publicUrl
      };
    } catch (error) {
      console.error('Dosya yükleme hatası:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Base64 formatındaki veriyi dosya olarak Supabase Storage'a yükler
   * @param {string} bucketName - Bucket adı
   * @param {string} base64Data - Base64 formatında dosya verisi
   * @param {string} fileName - Dosyaya verilecek isim
   * @param {string} fileExt - Dosya uzantısı (.jpg, .pdf vb)
   * @returns {Promise<object>} - Yükleme bilgisi
   */
  uploadBase64: async (bucketName, base64Data, fileName, fileExt) => {
    try {
      // Base64 formatını temizle ve buffer'a dönüştür
      const base64Content = base64Data.split(';base64,').pop();
      const buffer = Buffer.from(base64Content, 'base64');
      const fullFileName = `${fileName}${fileExt}`;

      // Bucket'ı kontrol et, yoksa oluştur
      const { data: bucketExists } = await supabase.storage.getBucket(bucketName);
      if (!bucketExists) {
        await supabase.storage.createBucket(bucketName, {
          public: false,
          fileSizeLimit: 5242880 // 5MB
        });
      }

      // Dosyayı yükle
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(`uploads/${fullFileName}`, buffer, {
          contentType: getContentType(fileExt),
          upsert: false
        });

      if (error) throw error;

      // Yüklenen dosyanın URL'ini al
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(`uploads/${fullFileName}`);

      return {
        success: true,
        path: data.path,
        url: urlData.publicUrl
      };
    } catch (error) {
      console.error('Base64 yükleme hatası:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Supabase Storage'dan dosya siler
   * @param {string} bucketName - Bucket adı
   * @param {string} filePath - Silinecek dosyanın yolu
   * @returns {Promise<object>} - Silme işlemi bilgisi
   */
  deleteFile: async (bucketName, filePath) => {
    try {
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) throw error;

      return {
        success: true
      };
    } catch (error) {
      console.error('Dosya silme hatası:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

/**
 * Dosya uzantısına göre content type döndürür
 * @param {string} fileExt - Dosya uzantısı
 * @returns {string} - Content type
 */
function getContentType(fileExt) {
  const types = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  };

  return types[fileExt.toLowerCase()] || 'application/octet-stream';
}

module.exports = storageUtils; 