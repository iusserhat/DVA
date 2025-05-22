// Supabase Admin Client Configuration
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Debug modu
const DEBUG = process.env.SUPABASE_DEBUG === '1' || true;

// Supabase bağlantı bilgileri
const supabaseUrl = process.env.SUPABASE_URL || 'https://rqulqcxnbgptcnuhirqd.supabase.co';
// SERVICE_ROLE key - Tam yetki için
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdWxxY3huYmdwdGNudWhpcnFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjc0MDc3NywiZXhwIjoyMDU4MzE2Nzc3fQ.C1q5FkG5z0aAo-fdv0sOQhz9b8pUQJPXfR3y7pfFQXk';

if (DEBUG) {
  console.log('Supabase Admin URL:', supabaseUrl);
  console.log('Supabase Admin Key (ilk 10 karakter):', supabaseServiceKey ? supabaseServiceKey.substring(0, 10) + '...' : 'bulunamadı');
}

// Admin erişimi için Supabase client
const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: false
  }
};

// Supabase istemcisini oluştur
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, options);

console.log('Supabase Admin Client başlatıldı');

module.exports = supabaseAdmin; 