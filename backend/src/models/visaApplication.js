const supabase = require('../config/supabase');
const supabaseAdmin = require('../config/supabase-admin');
const fs = require('fs');
const path = require('path');

// Tablo adı
const TABLE_NAME = 'visa_applications';

// Yedekleme için yerel veritabanı dosya yolu (sadece hata durumda kullanılacak)
const LOCAL_DB_PATH = path.join(__dirname, '../../local_db');
const APPLICATIONS_FILE = path.join(LOCAL_DB_PATH, 'visa_applications.json');

// Yerel DB dizini kontrolü
if (!fs.existsSync(LOCAL_DB_PATH)) {
  fs.mkdirSync(LOCAL_DB_PATH, { recursive: true });
}

// Yerel başvuruları yedekle - sadece Supabase başarısız olduğunda
const backupLocalApplications = (applications) => {
  try {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2));
    return true;
  } catch (error) {
    console.error('Yerel yedekleme hatası:', error);
    return false;
  }
};

const visaApplicationModel = {
  // Tüm vize başvurularını getir - Sadece Supabase'den
  getAll: async () => {
    try {
      // Önce admin client ile dene
      let data, error;
      
      try {
        const response = await supabaseAdmin
          .from(TABLE_NAME)
          .select('*');
        
        data = response.data;
        error = response.error;
        
        if (!error) {
          console.log(`${data.length} adet başvuru Supabase admin ile alındı`);
          return data || [];
        }
      } catch (adminError) {
        console.error('Admin client hatası:', adminError);
      }
      
      // Admin başarısız olduysa normal client ile dene
      const response = await supabase
        .from(TABLE_NAME)
      .select('*');
    
      data = response.data;
      error = response.error;
      
      if (error) {
        console.error('Supabase veri getirme hatası:', error);
        throw error;
      }
      
      console.log(`${data.length} adet başvuru Supabase ile alındı`);
      return data || [];
    } catch (error) {
      console.error('Genel veri getirme hatası:', error);
      throw error; // Hatayı yukarı ilet
    }
  },

  // Kullanıcıya ait vize başvurularını getir
  getByUserId: async (userId) => {
    try {
      // Önce admin client ile dene
      let data, error;
      
      try {
        const response = await supabaseAdmin
          .from(TABLE_NAME)
          .select('*')
          .eq('userId', userId);
        
        data = response.data;
        error = response.error;
        
        if (!error) {
          console.log(`${data.length} adet kullanıcı başvurusu Supabase admin ile alındı`);
          return data || [];
        }
      } catch (adminError) {
        console.error('Admin client kullanıcı başvuru hatası:', adminError);
      }
      
      // Admin başarısız olduysa normal client ile dene
      const response = await supabase
        .from(TABLE_NAME)
      .select('*')
        .eq('userId', userId);
    
      data = response.data;
      error = response.error;
      
      if (error) {
        console.error('Supabase kullanıcı başvuru hatası:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Genel kullanıcı başvuru hatası:', error);
      throw error;
    }
  },

  // ID'ye göre tek bir vize başvurusunu getir
  getById: async (id) => {
    try {
      // Önce admin client ile dene
      let data, error;
      
      try {
        const response = await supabaseAdmin
          .from(TABLE_NAME)
          .select('*')
          .eq('id', id)
          .single();
        
        data = response.data;
        error = response.error;
        
        if (!error) {
          console.log(`Başvuru detayı Supabase admin ile alındı: ${id}`);
          return data;
        }
      } catch (adminError) {
        console.error('Admin client başvuru detayı hatası:', adminError);
      }
      
      // Admin başarısız olduysa normal client ile dene
      const response = await supabase
        .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();
    
      data = response.data;
      error = response.error;
      
      if (error) {
        console.error('Supabase başvuru detayı hatası:', error);
        throw error;
      }
      
    return data;
    } catch (error) {
      console.error('Genel başvuru detayı hatası:', error);
      throw error;
    }
  },

  // Yeni bir vize başvurusu oluştur
  create: async (applicationData) => {
    console.log('Vize başvuru oluşturma başladı:', applicationData.fullName);
    console.log('Supabase ile başvuru kaydediliyor...');
    
    try {
      // Veri formatını Supabase için hazırla
      const formattedData = {
        userId: applicationData.user_id,
        fullName: applicationData.fullName,
        identityNumber: applicationData.identityNumber,
        phoneNumber: applicationData.phoneNumber,
        email: applicationData.email,
        applicationType: applicationData.applicationType,
        visaType: applicationData.visaType,
        expressApplication: applicationData.expressApplication || false,
        insurance: applicationData.insurance || false,
        usageType: applicationData.usageType || 'individual',
        passportUrl: applicationData.passportUrl,
        photoUrl: applicationData.photoUrl,
        flightTicketUrl: applicationData.flightTicketUrl,
        hotelReservationUrl: applicationData.hotelReservationUrl,
        otherUrl: applicationData.otherUrl,
        paymentType: applicationData.paymentType,
        paymentAmount: applicationData.paymentAmount || 0,
        paymentBy: applicationData.paymentBy,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      console.log('Formatlanan başvuru verisi:', formattedData);
      
      // Önce admin client ile dene
      let data, error;
      
      try {
        const response = await supabaseAdmin
          .from(TABLE_NAME)
          .insert([formattedData])
          .select();
        
        data = response.data;
        error = response.error;
        
        if (!error) {
          console.log('Başvuru admin client ile başarıyla oluşturuldu:', data[0].id);
          return data;
        } else {
          console.error('Admin client ile başvuru oluşturma hatası:', error);
        }
      } catch (adminError) {
        console.error('Admin client ile başvuru oluşturma istisnası:', adminError);
      }
      
      // Admin client başarısız olursa normal client ile dene
      const response = await supabase
        .from(TABLE_NAME)
        .insert([formattedData])
      .select();
    
      data = response.data;
      error = response.error;
      
      if (error) {
        console.error('Başvuru oluşturma hatası:', error);
        // Sadece yedek olarak yerel kayıt tut
        const newApplication = {
          ...formattedData,
          id: `supabase-error-${Date.now()}`,
          error: error.message
        };
        backupLocalApplications([newApplication]);
        throw error;
      }
      
      console.log('Başvuru başarıyla oluşturuldu:', data[0].id);
    return data;
    } catch (error) {
      console.error('Genel başvuru oluşturma hatası:', error);
      throw error;
    }
  },

  // Vize başvurusunu güncelle
  update: async (id, applicationData) => {
    try {
      // Önce admin client ile dene
      let data, error;
      
      try {
        const response = await supabaseAdmin
          .from(TABLE_NAME)
          .update(applicationData)
          .eq('id', id)
          .select();
        
        data = response.data;
        error = response.error;
        
        if (!error) {
          console.log('Başvuru admin client ile başarıyla güncellendi:', id);
          return data;
        } else {
          console.error('Admin client ile başvuru güncelleme hatası:', error);
        }
      } catch (adminError) {
        console.error('Admin client ile başvuru güncelleme istisnası:', adminError);
      }
      
      // Admin client başarısız olursa normal client ile dene
      const response = await supabase
        .from(TABLE_NAME)
      .update(applicationData)
      .eq('id', id)
      .select();
    
      data = response.data;
      error = response.error;
      
      if (error) {
        console.error('Başvuru güncelleme hatası:', error);
        throw error;
      }
      
      console.log('Başvuru başarıyla güncellendi:', id);
    return data;
    } catch (error) {
      console.error('Genel başvuru güncelleme hatası:', error);
      throw error;
    }
  },

  // Vize başvurusunu güncelle
  updateStatus: async (id, status) => {
    try {
      // Durum güncellemesi
      const updateData = {
        status,
        updated_at: new Date().toISOString()
      };
      
      return await visaApplicationModel.update(id, updateData);
    } catch (error) {
      console.error('Durum güncelleme hatası:', error);
        throw error;
      }
  },
  
  // Ödeme bilgilerini güncelle
  updatePayment: async (id, paymentData) => {
    try {
      // Ödeme güncellemesi
      const updateData = {
        payment_status: paymentData.payment_status,
        payment_amount: paymentData.payment_amount,
        payment_notes: paymentData.payment_notes,
        updated_at: new Date().toISOString()
      };
      
      return await visaApplicationModel.update(id, updateData);
    } catch (error) {
      console.error('Ödeme bilgisi güncelleme hatası:', error);
      throw error;
    }
  },

  // Vize başvurusunu sil
  delete: async (id) => {
    try {
      // Önce admin client ile dene
      let error;
      
      try {
        const response = await supabaseAdmin
          .from(TABLE_NAME)
          .delete()
          .eq('id', id);
        
        error = response.error;
        
        if (!error) {
          console.log(`Başvuru admin client ile silindi: ${id}`);
          return true;
        }
      } catch (adminError) {
        console.error('Admin client başvuru silme hatası:', adminError);
      }
      
      // Admin başarısız olduysa normal client ile dene
      const response = await supabase
        .from(TABLE_NAME)
      .delete()
      .eq('id', id);
    
      error = response.error;
      
      if (error) {
        console.error('Supabase başvuru silme hatası:', error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Genel başvuru silme hatası:', error);
      throw error;
    }
  }
};

module.exports = visaApplicationModel; 