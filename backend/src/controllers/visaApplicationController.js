const visaApplicationModel = require('../models/visaApplication');

const visaApplicationController = {
  // Tüm başvuruları getir
  getAllApplications: async (req, res) => {
    try {
      const applications = await visaApplicationModel.getAll();
      res.status(200).json(applications);
    } catch (error) {
      console.error('Tüm başvuruları getirme hatası:', error);
      res.status(500).json({ error: error.message || 'Başvurular getirilirken bir hata oluştu' });
    }
  },

  // Kullanıcıya ait başvuruları getir
  getUserApplications: async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Eğer token'dan gelen ID ile istek yapılan ID uyuşmuyorsa ve admin değilse erişim engelle
      if (req.user && req.user.userId !== userId && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Bu kullanıcının başvurularına erişim yetkiniz yok' });
      }
      
      const applications = await visaApplicationModel.getByUserId(userId);
      res.status(200).json(applications);
    } catch (error) {
      console.error('Kullanıcı başvurularını getirme hatası:', error);
      res.status(500).json({ error: error.message || 'Başvurular getirilirken bir hata oluştu' });
    }
  },

  // Belirli bir başvuruyu ID'ye göre getir
  getApplication: async (req, res) => {
    try {
      const { id } = req.params;
      const application = await visaApplicationModel.getById(id);
      
      if (!application) {
        return res.status(404).json({ error: 'Başvuru bulunamadı' });
      }
      
      // Kullanıcı kendi başvurusuna veya admin tüm başvurulara erişebilir
      if (req.user && req.user.userId !== application.user_id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Bu başvuruya erişim yetkiniz yok' });
      }

      res.status(200).json(application);
    } catch (error) {
      console.error('Başvuru detayı getirme hatası:', error);
      res.status(500).json({ error: error.message || 'Başvuru detayı getirilirken bir hata oluştu' });
    }
  },

  // Yeni başvuru oluştur
  createApplication: async (req, res) => {
    try {
      let applicationData = req.body;
      
      console.log('------ VİZE BAŞVURUSU OLUŞTURMA BAŞLADI ------');
      console.log('Gelen istek verileri:', JSON.stringify(applicationData, null, 2));
      
      // Gerekli alanların kontrolü
      if (!applicationData.fullName) {
        console.error('Ad Soyad alanı eksik');
        return res.status(400).json({ error: 'Ad Soyad alanı zorunludur' });
      }
      
      if (!applicationData.visaType) {
        console.error('Vize Tipi alanı eksik');
        return res.status(400).json({ error: 'Vize Tipi alanı zorunludur' });
      }
      
      if (!applicationData.passportUrl) {
        console.error('Pasaport belgesi eksik');
        return res.status(400).json({ error: 'Pasaport belgesi zorunludur' });
      }
      
      if (!applicationData.photoUrl) {
        console.error('Fotoğraf belgesi eksik');
        return res.status(400).json({ error: 'Fotoğraf belgesi zorunludur' });
      }
      
      // JWT token'dan kullanıcı ID'sini ekle
      if (req.user && req.user.userId) {
        console.log('Kullanıcı kimliği:', req.user.userId);
        applicationData = {
          ...applicationData,
          user_id: req.user.userId
        };
      } else {
        // Kimlik doğrulama olmadan başvuru yapılamaz
        console.error('Kullanıcı kimliği bulunamadı');
        return res.status(401).json({ error: 'Başvuru yapmak için giriş yapmalısınız' });
      }

      console.log('İşlenmiş başvuru verileri:', JSON.stringify(applicationData, null, 2));

      try {
      // Başvuruyu oluştur
        console.log('Model çağrılıyor: visaApplicationModel.create()');
      const newApplication = await visaApplicationModel.create(applicationData);
      
      if (!newApplication || newApplication.length === 0) {
          console.error('Model boş yanıt döndü');
        return res.status(400).json({ error: 'Başvuru oluşturulamadı' });
      }
        
        console.log('Başvuru başarılı:', JSON.stringify(newApplication, null, 2));
        console.log('------ VİZE BAŞVURUSU OLUŞTURMA TAMAMLANDI ------');
      
      res.status(201).json(newApplication);
      } catch (modelError) {
        console.error('Model hatası:', modelError);
        res.status(500).json({ 
          error: modelError.message || 'Veri tabanına kayıt sırasında bir hata oluştu',
          detail: modelError.toString() 
        });
      }
    } catch (error) {
      console.error('Başvuru oluşturma genel hatası:', error);
      res.status(500).json({ 
        error: error.message || 'Başvuru oluşturulurken bir hata oluştu',
        detail: error.toString()
      });
    }
  },

  // Başvuruyu güncelle
  updateApplication: async (req, res) => {
    try {
      const { id } = req.params;
      const applicationData = req.body;
      
      // Başvuruyu önce kontrol et
      const existingApplication = await visaApplicationModel.getById(id);
      
      if (!existingApplication) {
        return res.status(404).json({ error: 'Başvuru bulunamadı' });
      }
      
      // Kullanıcı kendi başvurusunu veya admin tüm başvuruları güncelleyebilir
      if (req.user && req.user.userId !== existingApplication.user_id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Bu başvuruyu güncelleme yetkiniz yok' });
      }
      
      const updatedApplication = await visaApplicationModel.update(id, applicationData);
      
      if (!updatedApplication || updatedApplication.length === 0) {
        return res.status(400).json({ error: 'Başvuru güncellenemedi' });
      }
      
      res.status(200).json(updatedApplication);
    } catch (error) {
      console.error('Başvuru güncelleme hatası:', error);
      res.status(500).json({ error: error.message || 'Başvuru güncellenirken bir hata oluştu' });
    }
  },

  // Başvuru durumunu güncelle
  updateApplicationStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ error: 'Durum bilgisi zorunludur' });
      }
      
      // Başvuruyu önce kontrol et
      const existingApplication = await visaApplicationModel.getById(id);
      
      if (!existingApplication) {
        return res.status(404).json({ error: 'Başvuru bulunamadı' });
      }
      
      // Durum güncellemesini sadece admin veya personel yapabilir
      if (req.user && !['admin', 'staff'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Durum güncelleme yetkiniz yok' });
      }

      const updatedApplication = await visaApplicationModel.updateStatus(id, status);
      
      if (!updatedApplication || updatedApplication.length === 0) {
        return res.status(400).json({ error: 'Başvuru durumu güncellenemedi' });
      }
      
      res.status(200).json(updatedApplication);
    } catch (error) {
      console.error('Durum güncelleme hatası:', error);
      res.status(500).json({ error: error.message || 'Durum güncellenirken bir hata oluştu' });
    }
  },

  // Ödeme durumunu güncelle
  updatePaymentStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { payment_status, payment_amount, notes } = req.body;
      
      if (!payment_status) {
        return res.status(400).json({ error: 'Ödeme durumu bilgisi zorunludur' });
      }
      
      // Başvuruyu önce kontrol et
      const existingApplication = await visaApplicationModel.getById(id);
      
      if (!existingApplication) {
        return res.status(404).json({ error: 'Başvuru bulunamadı' });
      }
      
      // Ödeme güncellemesini sadece admin veya personel yapabilir
      if (req.user && !['admin', 'staff'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Ödeme durumu güncelleme yetkiniz yok' });
      }

      // Ödeme verilerini hazırla
      const paymentData = {
        payment_status,
        payment_amount: payment_amount || existingApplication.payment_amount,
        payment_notes: notes
      };

      const updatedApplication = await visaApplicationModel.updatePayment(id, paymentData);
      
      if (!updatedApplication || updatedApplication.length === 0) {
        return res.status(400).json({ error: 'Ödeme durumu güncellenemedi' });
      }
      
      res.status(200).json(updatedApplication);
    } catch (error) {
      console.error('Ödeme durumu güncelleme hatası:', error);
      res.status(500).json({ error: error.message || 'Ödeme durumu güncellenirken bir hata oluştu' });
    }
  },

  // Başvuruyu sil
  deleteApplication: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Başvuruyu önce kontrol et
      const existingApplication = await visaApplicationModel.getById(id);
      
      if (!existingApplication) {
        return res.status(404).json({ error: 'Başvuru bulunamadı' });
      }
      
      // Kullanıcı kendi başvurusunu veya admin tüm başvuruları silebilir
      if (req.user && req.user.userId !== existingApplication.user_id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Bu başvuruyu silme yetkiniz yok' });
      }
      
      await visaApplicationModel.delete(id);
      res.status(200).json({ message: 'Başvuru başarıyla silindi' });
    } catch (error) {
      console.error('Başvuru silme hatası:', error);
      res.status(500).json({ error: error.message || 'Başvuru silinirken bir hata oluştu' });
    }
  }
};

module.exports = visaApplicationController; 