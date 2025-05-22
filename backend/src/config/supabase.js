// Supabase Client Configuration
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Supabase bağlantı bilgileri
const supabaseUrl = 'https://rqulqcxnbgptcnuhirqd.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdWxxY3huYmdwdGNudWhpcnFkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjc0MDc3NywiZXhwIjoyMDU4MzE2Nzc3fQ.EuYqBLgVIBGGYLpLbTCwaxq9onO6OeHmshrHJvhhGpc';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key (ilk 10 karakter):', supabaseServiceKey ? supabaseServiceKey.substring(0, 10) + '...' : 'bulunamadı');

// Service role anahtarıyla supabase istemcisi oluştur
const supabase = createClient(supabaseUrl, supabaseServiceKey);

module.exports = supabase; 