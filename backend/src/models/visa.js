const supabase = require('../config/supabase');
const supabaseAdmin = require('../config/supabase-admin');

const visaModel = {
  // Yeni vize başvurusu oluştur
  create: async (visaData) => {
    try {
      console.log('Vize başvurusu oluşturma başladı:', visaData);
      
      const { data, error } = await supabase
        .from('visa_applications')
        .insert([
          { 
            user_id: visaData.userId,
            visa_type: visaData.visaType,
            applicant_name: visaData.applicantName,
            passport_number: visaData.passportNumber,
            destination_country: visaData.destinationCountry,
            application_date: new Date().toISOString(),
            status: 'beklemede',
            payment_status: visaData.paymentStatus || 'ödenmedi',
            amount: visaData.amount,
            notes: visaData.notes
          }
        ])
        .select();

      if (error) {
        console.error('Vize başvurusu oluşturma hatası:', error);
        throw error;
      }
      
      console.log('Vize başvurusu oluşturuldu, ID:', data[0].id);
      return data[0];
    } catch (error) {
      console.error('Vize başvurusu oluşturma genel hatası:', error);
      throw error;
    }
  },

  // Kullanıcıya ait tüm vize başvurularını getir
  getUserVisaApplications: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('visa_applications')
        .select('*')
        .eq('user_id', userId)
        .order('application_date', { ascending: false });
      
      if (error) {
        console.error('Kullanıcı vize başvuruları alınamadı:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Kullanıcı vize başvuruları getirme hatası:', error);
      return [];
    }
  },

  // Tüm vize başvurularını getir (admin için)
  getAllVisaApplications: async () => {
    try {
      // Inner join yerine left join kullanarak users tablosuyla birleştirme
      const { data, error } = await supabase
        .from('visa_applications')
        .select(`
          *,
          users:user_id(*)
        `)
        .order('application_date', { ascending: false });
      
      if (error) {
        console.error('Vize başvuruları alınamadı:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Tüm vize başvuruları getirme hatası:', error);
      return [];
    }
  },

  // Vize başvurusu detaylarını getir
  getVisaApplicationById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('visa_applications')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Vize başvurusu bulunamadı:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Vize başvurusu getirme hatası:', error);
      return null;
    }
  },

  // Vize başvurusu durumunu güncelle
  updateStatus: async (id, status, notes) => {
    try {
      const { data, error } = await supabase
        .from('visa_applications')
        .update({ 
          status: status,
          notes: notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('Vize başvurusu güncelleme hatası:', error);
        throw error;
      }
      
      return data[0];
    } catch (error) {
      console.error('Vize durumu güncelleme hatası:', error);
      throw error;
    }
  },

  // Ödeme durumunu güncelle
  updatePaymentStatus: async (id, paymentStatus, transactionId = null) => {
    try {
      const { data, error } = await supabase
        .from('visa_applications')
        .update({ 
          payment_status: paymentStatus,
          transaction_id: transactionId,
          payment_date: paymentStatus === 'ödendi' ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('Ödeme durumu güncelleme hatası:', error);
        throw error;
      }
      
      return data[0];
    } catch (error) {
      console.error('Ödeme durumu güncelleme genel hatası:', error);
      throw error;
    }
  }
};

module.exports = visaModel; 