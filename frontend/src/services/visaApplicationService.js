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