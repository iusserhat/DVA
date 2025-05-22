// Supabase Admin Client - Service Role ile tam yetkili bağlantı
const { createClient } = require('@supabase/supabase-js');

// Supabase service role bağlantı bilgileri
const supabaseUrl = 'https://rqulqcxnbgptcnuhirqd.supabase.co';
// Doğrudan servis anahtarı kullanıyoruz
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdWxxY3huYmdwdGNudWhpcnFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjc0MDc3NywiZXhwIjoyMDU4MzE2Nzc3fQ.EuYqBLgVIBGGYLpLbTCwaxq9onO6OeHmshrHJvhhGpc';

// Admin yetkili Supabase istemcisi oluştur
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

console.log('Supabase Admin Client başlatıldı');

module.exports = supabaseAdmin; 