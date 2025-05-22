const visaModel = require('../models/visa');
const userModel = require('../models/user');

const visaController = {
  // Yeni vize başvurusu oluştur
  createVisaApplication: async (req, res) => {
    try {
      const visaData = req.body;
      
      // Kullanıcı ID'sini istek içindeki token'dan al
      visaData.userId = req.user.id;
      
      const newApplication = await visaModel.create(visaData);
      
      res.status(201).json({
        success: true,
        message: 'Vize başvurusu başarıyla oluşturuldu',
        data: newApplication
      });
    } catch (error) {
      console.error('Vize başvurusu oluşturma hatası:', error);
      res.status(500).json({
        success: false,
        message: 'Vize başvurusu oluşturulurken bir hata oluştu',
        error: error.message
      });
    }
  },

  // Kullanıcının kendi vize başvurularını getir
  getUserVisaApplications: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const applications = await visaModel.getUserVisaApplications(userId);
      
      res.status(200).json({
        success: true,
        data: applications
      });
    } catch (error) {
      console.error('Kullanıcı vize başvuruları getirme hatası:', error);
      res.status(500).json({
        success: false,
        message: 'Vize başvuruları getirilirken bir hata oluştu',
        error: error.message
      });
    }
  },

  // Tüm vize başvurularını getir (sadece admin erişebilir)
  getAllVisaApplications: async (req, res) => {
    try {
      // Admin kontrolü burada yapılabilir
      // if (req.user.role !== 'admin') return res.status(403).json({message: 'Yetkisiz erişim'});
      
      const applications = await visaModel.getAllVisaApplications();
      
      res.status(200).json({
        success: true,
        data: applications
      });
    } catch (error) {
      console.error('Tüm vize başvuruları getirme hatası:', error);
      res.status(500).json({
        success: false,
        message: 'Vize başvuruları getirilirken bir hata oluştu',
        error: error.message
      });
    }
  },

  // Vize başvurusu detaylarını getir
  getVisaApplicationDetail: async (req, res) => {
    try {
      const { id } = req.params;
      
      const application = await visaModel.getVisaApplicationById(id);
      
      if (!application) {
        return res.status(404).json({
          success: false,
          message: 'Vize başvurusu bulunamadı'
        });
      }
      
      // Kullanıcı kendi başvurusunu veya admin tüm başvuruları görebilir
      if (application.user_id !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Bu vize başvurusunu görüntüleme yetkiniz yok'
        });
      }
      
      res.status(200).json({
        success: true,
        data: application
      });
    } catch (error) {
      console.error('Vize başvurusu detay getirme hatası:', error);
      res.status(500).json({
        success: false,
        message: 'Vize başvurusu detayları getirilirken bir hata oluştu',
        error: error.message
      });
    }
  },

  // Vize başvurusu durumunu güncelle (admin için)
  updateVisaStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      
      // Admin kontrolü
      // if (req.user.role !== 'admin') return res.status(403).json({message: 'Yetkisiz erişim'});
      
      const updatedApplication = await visaModel.updateStatus(id, status, notes);
      
      res.status(200).json({
        success: true,
        message: 'Vize başvurusu durumu güncellendi',
        data: updatedApplication
      });
    } catch (error) {
      console.error('Vize durumu güncelleme hatası:', error);
      res.status(500).json({
        success: false,
        message: 'Vize başvurusu durumu güncellenirken bir hata oluştu',
        error: error.message
      });
    }
  },

  // Ödeme durumunu güncelle
  updatePaymentStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { paymentStatus, transactionId } = req.body;
      
      // Admin kontrolü
      // if (req.user.role !== 'admin') return res.status(403).json({message: 'Yetkisiz erişim'});
      
      const updatedApplication = await visaModel.updatePaymentStatus(id, paymentStatus, transactionId);
      
      res.status(200).json({
        success: true,
        message: 'Ödeme durumu güncellendi',
        data: updatedApplication
      });
    } catch (error) {
      console.error('Ödeme durumu güncelleme hatası:', error);
      res.status(500).json({
        success: false,
        message: 'Ödeme durumu güncellenirken bir hata oluştu',
        error: error.message
      });
    }
  }
};

module.exports = visaController; 