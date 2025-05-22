import axios from 'axios';

// API temel URL
const API_URL = 'http://localhost:5000/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,  // CORS için withCredentials false olarak ayarlandı
  timeout: 10000 // 10 saniye timeout ekle
});

// GEÇİCİ TEST TOKEN - SADECE GELİŞTİRME İÇİN
// Bu geçici token, geliştirme sürecinde API isteklerinin çalışmasını sağlamak için
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0LXVzZXItaWQiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTA4MDg2MzksImV4cCI6MzY5MDg5NTAzOX0.LrRUNTIVtziVUwY2B3KCH85imknw96rNm9YcBGJpsTY';

// Request interceptor - token eklemek için
api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');
    
    // Geliştirme için, eğer token yoksa test token kullan
    if (!token) {
      token = TEST_TOKEN;
      console.warn('Dikkat: Oturum açılmadı, geçici test token kullanılıyor!');
    }
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - 401 hataları için
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Oturum süresi dolmuşsa veya geçersiz oturum
    if (error.response && error.response.status === 401) {
      console.log('Oturum süresi dolmuş veya geçersiz, çıkış yapılıyor...');
      // Tüm yerel storage verisini temizle
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    
    return Promise.reject(error);
  }
);

// Vize başvuruları ile ilgili API fonksiyonları
export const visaApplicationApi = {
  // Kullanıcının başvurularını getir
  getUserApplications: async (userId) => {
    try {
      const response = await api.get(`/visa-applications/user/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Başvurular alma hatası:', error);
      // Network hatalarını kontrol et
      if (!error.response) {
        return { success: false, error: 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.' };
      }
      return { success: false, error: error.response?.data?.error || 'Bir hata oluştu' };
    }
  },

  // Başvuru detayını getir
  getApplicationDetail: async (id) => {
    try {
      const response = await api.get(`/visa-applications/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Başvuru detayı alma hatası:', error);
      // Network hatalarını kontrol et
      if (!error.response) {
        return { success: false, error: 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.' };
      }
      return { success: false, error: error.response?.data?.error || 'Bir hata oluştu' };
    }
  },

  // Yeni başvuru oluştur
  createApplication: async (formData) => {
    try {
      console.log('Vize başvurusu gönderiliyor:', formData);
      const response = await api.post('/visa-applications', formData);
      console.log('Başvuru yanıtı:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Başvuru oluşturma hatası:', error);
      // Network hatalarını kontrol et
      if (!error.response) {
        return { success: false, error: 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.' };
      }
      return { 
        success: false, 
        error: error.response?.data?.error || 'Bir hata oluştu',
        details: error 
      };
    }
  }
};

// Dosya yükleme API
export const fileUploadApi = {
  uploadFile: async (formData) => {
    try {
      console.log('Dosya yükleniyor:', formData.get('file').name);
      
      // Zaman aşımı süresini artır (büyük dosyalar için)
      const UPLOAD_TIMEOUT = 30000; // 30 sn
      
      // Daha ayrıntılı hata yönetimi
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT);
      
    try {
        const response = await axios.post(
          `${API_URL}/documents/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token') || TEST_TOKEN}`
            },
            signal: controller.signal,
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              console.log(`Yükleme ilerlemesi: %${percentCompleted}`);
            }
          }
        );
        
        clearTimeout(timeoutId);
        
        if (response.data && response.data.success) {
          console.log('Dosya yüklendi:', response.data);
          return {
            success: true,
            data: response.data.data || response.data
          };
        } else {
          throw new Error(response.data.error || 'Dosya yükleme başarısız');
        }
      } catch (axiosError) {
        clearTimeout(timeoutId);
        
        // Axios hatalarını daha açıklayıcı hale getir
        if (axiosError.name === 'AbortError' || axiosError.code === 'ECONNABORTED') {
          throw new Error('Dosya yükleme zaman aşımına uğradı. Lütfen daha küçük bir dosya deneyin veya internet bağlantınızı kontrol edin.');
        }
        
        if (axiosError.response) {
          // Sunucu yanıtı aldık (4xx, 5xx hatası)
          throw new Error(`Sunucu hatası: ${axiosError.response.status} - ${axiosError.response.data?.error || axiosError.response.statusText}`);
        } else if (axiosError.request) {
          // İstek yapıldı ama yanıt alınamadı
          throw new Error('Sunucudan yanıt alınamadı. İnternet bağlantınızı kontrol edin.');
        } else {
          // İstek yapılamadı
          throw new Error(`İstek hatası: ${axiosError.message}`);
        }
      }
    } catch (error) {
      console.error('Dosya yükleme API hatası:', error);
      // Network hatalarını kontrol et
      if (error.message && error.message.includes('Network Error')) {
        return { 
          success: false, 
          error: 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.'
        };
      }
      return {
        success: false,
        error: error.message || 'Bilinmeyen bir hata oluştu'
      };
    }
  },
  
  deleteFile: async (storagePath) => {
    try {
      const response = await axios.delete(`${API_URL}/documents/delete`, {
        data: { storagePath },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || TEST_TOKEN}`
        }
      });
      
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      console.error('Dosya silme hatası:', error);
      // Network hatalarını kontrol et
      if (!error.response) {
        return { success: false, error: 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.' };
      }
      return {
        success: false,
        error: error.response?.data?.error || error.message
      };
    }
  }
};

// Kullanıcı kimlik doğrulama ile ilgili API fonksiyonları
export const authApi = {
  // Giriş yap
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Giriş hatası:', error);
      // Network hatalarını kontrol et
      if (!error.response) {
        return { success: false, error: 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.' };
      }
      return { 
        success: false, 
        error: error.response?.data?.error || 'Giriş başarısız',
        details: error 
      };
    }
  },

  // Kayıt ol
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Kayıt hatası:', error);
      // Network hatalarını kontrol et
      if (!error.response) {
        return { success: false, error: 'Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.' };
      }
      return { 
        success: false, 
        error: error.response?.data?.error || 'Kayıt başarısız',
        details: error 
      };
    }
  },

  // Çıkış yap
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Kullanıcı bilgilerini getir
  getCurrentUser: () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user;
    } catch (e) {
      console.error('Kullanıcı bilgileri alınamadı:', e);
      return null;
    }
  }
};

export default api; 