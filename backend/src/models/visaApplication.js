const supabase = require('../config/supabase');

const visaApplicationModel = {
  // Tüm vize başvurularını getir
  getAll: async () => {
    const { data, error } = await supabase
      .from('visa_applications')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  // Kullanıcıya ait vize başvurularını getir
  getByUserId: async (userId) => {
    const { data, error } = await supabase
      .from('visa_applications')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  },

  // ID'ye göre tek bir vize başvurusunu getir
  getById: async (id) => {
    const { data, error } = await supabase
      .from('visa_applications')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Yeni bir vize başvurusu oluştur
  create: async (applicationData) => {
    const { data, error } = await supabase
      .from('visa_applications')
      .insert([applicationData])
      .select();
    
    if (error) throw error;
    return data;
  },

  // Vize başvurusunu güncelle
  update: async (id, applicationData) => {
    const { data, error } = await supabase
      .from('visa_applications')
      .update(applicationData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data;
  },

  // Vize başvurusu durumunu güncelle
  updateStatus: async (id, status) => {
    const { data, error } = await supabase
      .from('visa_applications')
      .update({ status })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data;
  },

  // Vize başvurusunu sil
  delete: async (id) => {
    const { error } = await supabase
      .from('visa_applications')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  }
};

module.exports = visaApplicationModel; 