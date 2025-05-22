// Supabase Client Configuration
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Debug modu
const DEBUG = process.env.SUPABASE_DEBUG === '1' || true;

// Supabase bağlantı bilgileri
const supabaseUrl = process.env.SUPABASE_URL || 'https://rqulqcxnbgptcnuhirqd.supabase.co';
// ANON key - API'ye erişim için yeterli
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdWxxY3huYmdwdGNudWhpcnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NDA3NzcsImV4cCI6MjA1ODMxNjc3N30.l_OOkAx7XmQii5g2L6LtxtX9BqWKbKbkPVtkTiqKOMI';

if (DEBUG) {
console.log('Supabase URL:', supabaseUrl);
  console.log('Supabase Key (ilk 10 karakter):', supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'bulunamadı');
}

// Supabase istemcisini oluştur
const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: { 
      'X-Client-Info': 'supabase-js/2.29.0',
    },
  }
};

// Detaylı loglama için özel fetch fonksiyonu
if (DEBUG) {
  options.global.fetch = async (url, options = {}) => {
    // İstek detaylarını logla
    console.log(`Supabase isteği: ${options.method || 'GET'} ${url}`);
    console.log(`Headers:`, JSON.stringify(options.headers || {}).substring(0, 200) + '...');
    
    if (options.body) {
      console.log(`Body:`, options.body.toString().substring(0, 100) + '...');
    }
    
    try {
      // Gerçek isteği yap
      const response = await fetch(url, options);
      
      // Clone response to be able to read it multiple times
      const clonedResponse = response.clone();
      
      try {
        // Yanıt detaylarını logla
        const responseData = await clonedResponse.text();
        console.log(`Yanıt (${response.status}):`, responseData.substring(0, 200) + (responseData.length > 200 ? '...' : ''));
      } catch (e) {
        console.log(`Yanıt body okunamadı:`, e.message);
      }
      
      return response;
    } catch (error) {
      console.error(`Supabase istek hatası:`, error);
      throw error;
    }
  };
}

// Supabase istemcisini oluştur
const supabase = createClient(supabaseUrl, supabaseKey, options);

module.exports = supabase; 