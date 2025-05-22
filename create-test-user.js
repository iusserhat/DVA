// Test kullanıcısı oluşturma script
const { createClient } = require('@supabase/supabase-js');

// Supabase client
const supabaseUrl = 'https://rqulqcxnbgptcnuhirqd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdWxxY3huYmdwdGNudWhpcnFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjc0MDc3NywiZXhwIjoyMDU4MzE2Nzc3fQ.EuYqBLgVIBGGYLpLbTCwaxq9onO6OeHmshrHJvhhGpc';
const supabase = createClient(supabaseUrl, supabaseKey);

const createTestUser = async () => {
  try {
    // Test kullanıcısı bilgileri
    const testUser = {
      email: 'test@dubaivizeal.com',
      password: 'test123456',
      options: {
        data: {
          name: 'Test Kullanıcı'
        }
      }
    };

    console.log('Test kullanıcısı oluşturuluyor...');
    
    // Direkt auth API kullanarak kullanıcı oluştur
    const { data, error } = await supabase.auth.admin.createUser({
      email: testUser.email,
      password: testUser.password,
      user_metadata: testUser.options.data,
      email_confirm: true
    });
    
    if (error) {
      console.error('Hata:', error);
      return;
    }
    
    console.log('Kullanıcı oluşturuldu:', data.user);
    console.log('Email:', testUser.email);
    console.log('Şifre:', testUser.password);
    
  } catch (err) {
    console.error('Beklenmeyen hata:', err);
  }
};

createTestUser(); 