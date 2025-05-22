import { createClient } from '@supabase/supabase-js';

// Supabase bağlantı bilgileri
const supabaseUrl = 'https://rqulqcxnbgptcnuhirqd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdWxxY3huYmdwdGNudWhpcnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NDA3NzcsImV4cCI6MjA1ODMxNjc3N30.l_OOkAx7XmQii5g2L6LtxtX9BqWKbKbkPVtkTiqKOMI';

// Proxy kullanımını devre dışı bırakıyoruz ve direkt Supabase'e bağlanıyoruz
// Giriş hatalarının çoğu proxy kaynaklı olduğu için
const useBackendProxy = false;

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
};

// Eğer proxy kullanmak istersek (şu an devre dışı)
if (useBackendProxy) {
  options.global = {
    fetch: async (url, fetchOptions) => {
      try {
        // URL'den path kısmını çıkar
        const path = url.replace(supabaseUrl, '');
        const proxyUrl = `http://localhost:5000/api/auth/supabase-proxy${path}`;
        
        console.log('Supabase isteği proxy üzerinden yapılıyor:', proxyUrl);
        
        // CORS olmadan proxy üzerinden istek yap
        return await fetch(proxyUrl, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
          },
        });
      } catch (error) {
        console.error('Proxy fetch hatası:', error);
        throw error;
      }
    }
  };
}

// Supabase istemcisini oluştur
const supabase = createClient(supabaseUrl, supabaseAnonKey, options);

export default supabase; 