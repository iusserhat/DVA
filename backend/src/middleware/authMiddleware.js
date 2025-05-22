const jwt = require('jsonwebtoken');

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-production';

/**
 * Token doğrulama middleware'i
 */
const verifyToken = (req, res, next) => {
  try {
    // Authorization header al
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Token bulunamadı:', authHeader);
      return res.status(401).json({ error: 'Yetkilendirme token\'ı bulunamadı' });
    }
    
    // Bearer token'dan JWT token kısmını al
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      console.log('Token formatı hatalı');
      return res.status(401).json({ error: 'Geçersiz token formatı' });
    }
    
    try {
      // Token doğrulama
      const decoded = jwt.verify(token, JWT_SECRET);
      
      if (!decoded || !decoded.userId) {
        console.log('Token içeriği geçersiz:', decoded);
        return res.status(401).json({ error: 'Geçersiz token içeriği' });
      }
      
      console.log('Token doğrulandı:', decoded.userId);
      
      // User bilgisini request'e ekle
      req.user = decoded;
      
      // Bir sonraki middleware'e geç
      next();
    } catch (verifyError) {
      console.error('Token doğrulama hatası:', verifyError);
      
      if (verifyError.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token süresi dolmuş' });
      } else if (verifyError.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Geçersiz token formatı' });
      }
      
      res.status(401).json({ error: 'Geçersiz token' });
    }
  } catch (error) {
    console.error('Genel token hatası:', error);
    res.status(401).json({ error: 'Yetkilendirme hatası' });
  }
};

/**
 * Admin yetkisi için middleware
 */
const isAdmin = (req, res, next) => {
  // verifyToken middleware'i önceden çalışmış olmalı
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Bu işlem için admin yetkisi gereklidir' });
  }
};

/**
 * Staff veya admin yetkisi için middleware
 */
const isStaffOrAdmin = (req, res, next) => {
  // verifyToken middleware'i önceden çalışmış olmalı
  if (req.user && (req.user.role === 'admin' || req.user.role === 'staff')) {
    next();
  } else {
    res.status(403).json({ error: 'Bu işlem için personel yetkisi gereklidir' });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isStaffOrAdmin
}; 