const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const axios = require('axios');

// Kullanıcı kaydı
router.post('/register', authController.register);

// Kullanıcı girişi
router.post('/login', authController.login);

// Kullanıcı çıkışı
router.post('/logout', authController.logout);

// Kullanıcı bilgilerini getir (token gerekli)
router.get('/me', verifyToken, authController.getMe);

// Supabase için özel proxy endpoint - header'ları geçiren ve CORS atlatmaya yarayan
router.all('/supabase-proxy/*', async (req, res) => {
  try {
    const supabaseUrl = 'https://rqulqcxnbgptcnuhirqd.supabase.co';
    const path = req.params[0];
    const fullUrl = `${supabaseUrl}/${path}`;
    
    console.log('Supabase proxy çağrıldı:', fullUrl);
    console.log('Metot:', req.method);
    
    // Proxy'ye gelen headers'ları filtrele ve yeni bir header objesi oluştur
    const headers = { 
      ...req.headers,
      host: 'rqulqcxnbgptcnuhirqd.supabase.co',
    };
    
    // Gereksiz veya sorun çıkarabilecek headerları kaldır
    delete headers['origin'];  
    delete headers['referer'];
    delete headers['host']; // Host'u kaldır ve yeniden ekle
    
    // Header debug için
    console.log('Proxy headers:', JSON.stringify(headers));
    
    // Tüm HTTP metotlarını destekle
    const response = await axios({
      method: req.method,
      url: fullUrl,
      data: req.body,
      headers: headers,
      params: req.query,
      maxRedirects: 5,
      withCredentials: true
    });
    
    // Supabase'den gelen headerları da istemciye aktar
    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Supabase proxy hatası:', error);
    console.error('Hata detayı:', error.response?.data);
    
    // Hata durumunda orijinal hata kodunu ve mesajını aktar
    const statusCode = error.response?.status || 500;
    const errorData = error.response?.data || { error: 'Bir hata oluştu' };
    
    res.status(statusCode).json(errorData);
  }
});

module.exports = router; 