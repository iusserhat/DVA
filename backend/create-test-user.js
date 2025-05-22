// Test kullanıcısı oluşturma script
const supabaseAdmin = require('./src/config/supabase-admin');

async function createTestUser() {
  try {
    console.log('Test kullanıcısı oluşturma başladı...');
    
    const testUser = {
      email: 'test@dubaivizeal.com',
      password: 'test123456',
      user_metadata: {
        name: 'Test Kullanıcı'
      },
      email_confirm: true
    };
    
    // Önce varsa mevcut kullanıcıyı sil
    try {
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = existingUsers?.users?.find(u => u.email === testUser.email);
      
      if (existingUser) {
        console.log('Mevcut test kullanıcısı siliniyor, ID:', existingUser.id);
        await supabaseAdmin.auth.admin.deleteUser(existingUser.id);
        console.log('Mevcut test kullanıcısı silindi');
      }
    } catch (error) {
      console.log('Mevcut kullanıcı sorgulama veya silme hatası:', error.message);
      // Devam et, hataya rağmen yeni kullanıcı oluşturmayı deneyelim
    }
    
    // Yeni test kullanıcısı oluştur
    const { data, error } = await supabaseAdmin.auth.admin.createUser(testUser);
    
    if (error) {
      console.error('Test kullanıcısı oluşturma hatası:', error);
      return;
    }
    
    console.log('Test kullanıcısı başarıyla oluşturuldu:');
    console.log('Email:', testUser.email);
    console.log('Şifre:', testUser.password);
    console.log('ID:', data.user.id);
    
  } catch (err) {
    console.error('Beklenmeyen hata:', err);
  }
}

createTestUser(); 