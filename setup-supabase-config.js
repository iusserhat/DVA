// Supabase Auth ayarlarını yapılandırma scripti
const { createClient } = require('@supabase/supabase-js');

// Supabase bağlantı bilgileri
const supabaseUrl = 'https://rqulqcxnbgptcnuhirqd.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdWxxY3huYmdwdGNudWhpcnFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjc0MDc3NywiZXhwIjoyMDU4MzE2Nzc3fQ.EuYqBLgVIBGGYLpLbTCwaxq9onO6OeHmshrHJvhhGpc';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Supabase Auth ayarlarını yapılandır
async function setupSupabaseConfig() {
  try {
    console.log('Supabase Auth ayarları yapılandırılıyor...');
    
    // Not: Supabase Auth ayarları artık doğrudan API üzerinden değiştirilemiyor
    // Bu ayarları Supabase Dashboard üzerinden yapmanız gerekiyor
    console.log('Lütfen Supabase Dashboard üzerinden email_confirmation_required ayarını kapatın');
    console.log('https://supabase.com/dashboard/project/rqulqcxnbgptcnuhirqd/auth/providers');
    
    // Test kullanıcısı oluştur
    const testUser = {
      email: 'test@dubaivizeal.com',
      password: 'test123456'
    };
    
    console.log('Test kullanıcısı oluşturuluyor...');
    
    // Kullanıcı oluştur
    const { data, error } = await supabase.auth.admin.createUser({
      email: testUser.email,
      password: testUser.password,
      email_confirm: true,
      user_metadata: { name: 'Test Kullanıcı' }
    });
    
    if (error) {
      // Eğer kullanıcı zaten varsa, hata vermek yerine bilgi ver
      if (error.message.includes('already exists')) {
        console.log('Test kullanıcısı zaten mevcut');
      } else {
        console.error('Kullanıcı oluşturma hatası:', error);
      }
      return;
    }
    
    console.log('Test kullanıcısı başarıyla oluşturuldu:', data.user);
    console.log('Email:', testUser.email);
    console.log('Şifre:', testUser.password);
    
  } catch (err) {
    console.error('Beklenmeyen hata:', err);
  }
}

setupSupabaseConfig(); 