const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-production';
// Token geçerlilik süresi
const TOKEN_EXPIRY = '24h';

const authController = {
  // Kullanıcı kaydı
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      
      // Gerekli alanları kontrol et
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Ad, email ve şifre alanları zorunludur' });
      }
      
      // Email formatını kontrol et
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Geçersiz email formatı' });
      }
      
      // Şifre uzunluğunu kontrol et
      if (password.length < 6) {
        return res.status(400).json({ error: 'Şifre en az 6 karakter olmalıdır' });
      }
      
      // Email ile kullanıcı var mı kontrol et
      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Bu email adresi zaten kullanılmaktadır' });
      }
      
      // Kullanıcıyı oluştur
      const user = await userModel.create({
        name,
        email,
        password
      });
      
      res.status(201).json({ 
        message: 'Kullanıcı başarıyla oluşturuldu',
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      console.error('Kayıt hatası:', error);
      res.status(500).json({ error: error.message || 'Kayıt işlemi sırasında bir hata oluştu' });
    }
  },
  
  // Kullanıcı girişi
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      console.log('Login isteği:', { email, passwordLength: password ? password.length : 0 });
      
      // Gerekli alanları kontrol et
      if (!email || !password) {
        return res.status(400).json({ error: 'Email ve şifre alanları zorunludur' });
      }

      // Email formatını kontrol et
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Geçersiz email formatı' });
      }

      try {
        // Giriş işlemini yap
        const authData = await userModel.login(email, password);
        
        if (!authData || !authData.user) {
          console.error('Auth verisi yok:', authData);
          return res.status(401).json({ error: 'Geçersiz email veya şifre' });
        }

        console.log('Auth başarılı:', authData.user.id);
        
        // JWT token oluştur
        const token = jwt.sign(
          { 
            userId: authData.user.id,
            email: authData.user.email,
            role: 'user'
          }, 
          JWT_SECRET, 
          { expiresIn: TOKEN_EXPIRY }
        );
        
        console.log('Token oluşturuldu');
        
        // Kullanıcı bilgilerini hazırla
        const user = {
          id: authData.user.id,
          email: authData.user.email,
          name: authData.user.user_metadata?.name || email.split('@')[0],
          role: 'user'
        };
        
        res.status(200).json({
          message: 'Giriş başarılı',
          token,
          user
        });
      } catch (loginError) {
        console.error('Login hatası:', loginError);
        return res.status(401).json({ error: loginError.message || 'Geçersiz email veya şifre' });
      }
    } catch (error) {
      console.error('Genel login hatası:', error);
      res.status(500).json({ error: error.message || 'Giriş sırasında bir hata oluştu' });
    }
  },
  
  // Kullanıcı oturumunu kontrol et
  getMe: async (req, res) => {
    try {
      // Token bilgisi middleware'den geliyor
      const userId = req.user.userId;
      
      // Kullanıcı bilgilerini al
      const user = await userModel.findById(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      }
      
      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Kullanıcı bilgileri hatası:', error);
      res.status(500).json({ error: 'Kullanıcı bilgileri alınırken bir hata oluştu' });
    }
  },
  
  // Kullanıcı çıkışı
  logout: async (req, res) => {
    try {
      await userModel.logout();
      res.status(200).json({ message: 'Çıkış başarılı' });
    } catch (error) {
      console.error('Çıkış hatası:', error);
      res.status(500).json({ error: 'Çıkış yapılırken bir hata oluştu' });
    }
  }
};

module.exports = authController; 