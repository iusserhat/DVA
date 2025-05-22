import axios from 'axios';

// API temel URL
const API_URL = 'http://localhost:5000/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor - token eklemek için
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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
      return { success: false, error: error.response?.data?.error || 'Bir hata oluştu' };
    }
  },

  // Başvuru detayını getir
  getApplicationDetail: async (id) => {
    try {
      const response = await api.get(`/visa-applications/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Bir hata oluştu' };
    }
  },

  // Yeni başvuru oluştur
  createApplication: async (formData) => {
    try {
      const response = await api.post('/visa-applications', formData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Bir hata oluştu' };
    }
  }
};

// Dosya yükleme ile ilgili API fonksiyonları
export const fileUploadApi = {
  // Dosya yükleme
  uploadFile: async (file, type) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      
      const response = await api.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Bir hata oluştu' };
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
      return { success: false, error: error.response?.data?.error || 'Giriş başarısız' };
    }
  },

  // Kayıt ol
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Kayıt başarısız' };
    }
  },

  // Çıkış yap
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Kullanıcı bilgilerini getir
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  }
};

export default api; 