const fs = require('fs');
const path = require('path');
const supabase = require('./src/config/supabase');
const sqlFile = path.resolve(__dirname, 'database_setup.sql');

async function runDatabaseSetup() {
  try {
    console.log('SQL dosyası okunuyor...');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    console.log('SQL sorgusu:', sql.substring(0, 100) + '...');
    
    // Veritabanına özel bir fonksiyon oluşturalım
    console.log('Özel exec_sql fonksiyonu oluşturuluyor...');
    
    const createFunctionSQL = `
    CREATE OR REPLACE FUNCTION exec_sql(query text) RETURNS void AS $$
    BEGIN
      EXECUTE query;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;`;
    
    try {
      // Önce özel fonksiyonu oluştur
      const { error: funcError } = await supabase.rpc('exec_sql', { query: createFunctionSQL });
      
      if (funcError) {
        console.log('Fonksiyon zaten var, doğrudan SQL sorgumuzu çalıştırıyoruz...');
      }
      
      // Daha sonra ana SQL kodunu çalıştır
      const { error } = await supabase.rpc('exec_sql', { query: sql });
      
      if (error) {
        console.error('SQL çalıştırma hatası:', error);
      } else {
        console.log('Veritabanı tabloları başarıyla oluşturuldu!');
      }
    } catch (rpcError) {
      console.error('RPC çağrısı hatası:', rpcError);
      
      // Alternatif yöntem: Görevleri tek tek yapmayı deneyelim
      console.log('Alternatif yöntem deneniyor...');
      
      // users tablosu oluştur
      const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email TEXT UNIQUE,
        name TEXT,
        role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'staff')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );`;
      
      const { error: tableError } = await supabase
        .from('_sql')
        .select()
        .execute(createTableSQL);
      
      if (tableError) {
        console.error('Tablo oluşturma hatası:', tableError);
      } else {
        console.log('users tablosu oluşturuldu!');
      }
    }
  } catch (e) {
    console.error('Genel hata:', e);
  }
}

runDatabaseSetup(); 