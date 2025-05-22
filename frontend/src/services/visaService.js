import api from './api';

// Yeni vize başvurusu oluştur
export const createVisaApplication = async (visaData) => {
  try {
    const response = await api.post('/visa-applications', visaData);
    return response.data;
  } catch (error) {
    console.error('Vize başvurusu oluşturma hatası:', error);
    throw error;
  }
};

// Kullanıcıya ait vize başvurularını getir
export const getUserVisaApplications = async (userId) => {
  try {
    // userId kontrol
    if (!userId) {
      console.warn('getUserVisaApplications: userId belirtilmedi, tüm başvuruları getiriyoruz');
      return await getAllVisaApplications();
    }
    
    const response = await api.get(`/visa-applications/user/${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Vize başvurularını getirme hatası:', error);
    // Network hatalarını kontrol et
    if (!error.response) {
      return { 
        success: false, 
        error: 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.' 
      };
    }
    return { 
      success: false, 
      error: error.response?.data?.error || 'Vize başvuruları alınamadı'
    };
  }
};

// Tüm vize başvurularını getir (sadece admin için)
export const getAllVisaApplications = async () => {
  try {
    // Admin rotasını kullan
    const response = await api.get('/visa-applications/admin/all');
    console.log('Tüm başvurular:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Tüm başvuruları getirme hatası:', error);
    // Network hatalarını kontrol et
    if (!error.response) {
      return { 
        success: false, 
        error: 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.' 
      };
    }
    return { 
      success: false, 
      error: error.response?.data?.error || 'Tüm vize başvuruları alınamadı'
    };
  }
};

// Vize başvurusu detayını getir
export const getApplicationDetail = async (id) => {
  try {
    const response = await api.get(`/visa-applications/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Başvuru detayı getirme hatası:', error);
    if (!error.response) {
      return { 
        success: false, 
        error: 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.' 
      };
    }
    return { 
      success: false, 
      error: error.response?.data?.error || 'Başvuru detayı alınamadı'
    };
  }
};

// Vize başvurusu durumunu güncelle
export const updateVisaStatus = async (id, status) => {
  try {
    const response = await api.patch(`/visa-applications/${id}/status`, { status });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Başvuru durumu güncelleme hatası:', error);
    if (!error.response) {
      return { 
        success: false, 
        error: 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.' 
      };
    }
    return { 
      success: false, 
      error: error.response?.data?.error || 'Başvuru durumu güncellenemedi'
    };
  }
};

// Ödeme durumunu güncelle
export const updatePaymentStatus = async (id, data) => {
  try {
    const response = await api.patch(`/visa-applications/${id}/payment`, data);
    return response.data;
  } catch (error) {
    console.error('Ödeme durumu güncelleme hatası:', error);
    throw error;
  }
}; 