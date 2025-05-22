const supabase = require('../config/supabase');
const supabaseAdmin = require('../config/supabase-admin');

const userModel = {
  // Kullanıcıyı email ile bul
  findByEmail: async (email) => {
    try {
      // Direkt auth sistemini sorgulayalım
      const { data, error } = await supabaseAdmin.auth.admin.listUsers();
      
      if (error) {
        console.error('Auth kullanıcıları listelerken hata:', error);
        return null;
      }
      
      // Email'e göre kullanıcıyı filtreleyelim
      const user = data?.users?.find(u => u.email === email);
      
      if (!user) {
        console.log('Email ile kullanıcı bulunamadı:', email);
        return null;
      }
      
      console.log('Bulunan kullanıcı:', user.email);
      
      return {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || email.split('@')[0],
        role: 'user'
      };
    } catch (err) {
      console.error('findByEmail error:', err);
      return null; // Hata durumunda null dön
    }
  },

  // Kullanıcıyı ID ile bul
  findById: async (id) => {
    try {
      // Kullanıcıyı direkt Auth sisteminden alalım
      const { data, error } = await supabaseAdmin.auth.admin.getUserById(id);
      
      if (error) {
        console.error('Auth kullanıcı bulunamadı:', error);
        return null;
      }
      
      const user = data.user;
      
      return {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email.split('@')[0],
        role: 'user'
      };
    } catch (error) {
      console.error('findById error:', error);
      return null;
    }
  },

  // Tüm kullanıcıları getir
  getAll: async () => {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers();
      
      if (error) {
        console.error('Kullanıcı listesi alınamadı:', error);
        throw error;
      }
      
      return data.users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email.split('@')[0],
        role: 'user'
      }));
    } catch (error) {
      console.error('getAll error:', error);
      return [];
    }
  },

  // Yeni kullanıcı oluştur
  create: async (userData) => {
    try {
      console.log('Kullanıcı oluşturma başladı:', userData.email);
      
      // Supabase auth ile kullanıcı oluştur
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        user_metadata: {
          name: userData.name
        },
        email_confirm: true
      });

      if (authError) {
        console.error('Auth kullanıcı oluşturma hatası:', authError);
        throw authError;
      }
      
      console.log('Auth kullanıcı oluşturuldu, ID:', authData.user.id);
      return authData.user;
    } catch (error) {
      console.error('Genel kullanıcı oluşturma hatası:', error);
      throw error;
    }
  },

  // Kullanıcı girişi
  login: async (email, password) => {
    try {
      console.log('Login attempt for:', email);
      
      // Kullanıcı giriş işlemi - doğrudan Auth API kullanılıyor
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        throw new Error('Geçersiz email veya şifre');
      }
      
      if (!data || !data.user) {
        console.error('Giriş başarılı ancak kullanıcı verisi yok');
        throw new Error('Kullanıcı kimlik doğrulama hatası');
      }
      
      console.log('Login success:', data.user.email);
      return data;
    } catch (err) {
      console.error('Login exception:', err);
      throw err; 
    }
  },

  // Kullanıcı çıkışı
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  },

  // Oturum durumunu kontrol et
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data;
  },

  // Kullanıcıyı güncelle
  update: async (id, userData) => {
    try {
      // Kullanıcı adını güncelle
      if (userData.name) {
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
          id,
          { user_metadata: { name: userData.name } }
        );
        
        if (updateError) throw updateError;
      }

      // Email değişikliği varsa auth bilgilerini güncelle
      if (userData.email) {
        const { error: emailError } = await supabaseAdmin.auth.admin.updateUserById(
          id,
          { email: userData.email }
        );
        
        if (emailError) throw emailError;
      }

      // Şifre değişikliği varsa güncelle
      if (userData.password) {
        const { error: passwordError } = await supabaseAdmin.auth.admin.updateUserById(
          id,
          { password: userData.password }
        );
        
        if (passwordError) throw passwordError;
      }

      return { success: true };
    } catch (error) {
      console.error('update error:', error);
      throw error;
    }
  }
};

module.exports = userModel; 