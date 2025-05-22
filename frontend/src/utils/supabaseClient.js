import { createClient } from '@supabase/supabase-js';

// Supabase bağlantı bilgileri
const supabaseUrl = 'https://rqulqcxnbgptcnuhirqd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdWxxY3huYmdwdGNudWhpcnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NDA3NzcsImV4cCI6MjA1ODMxNjc3N30.l_OOkAx7XmQii5g2L6LtxtX9BqWKbKbkPVtkTiqKOMI';

// Tek bir supabase istemcisi oluştur
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase; 