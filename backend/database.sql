-- Kullanıcı tablosu - Auth sisteminin users tablosuna referans veriyoruz
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'staff')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Her kullanıcı eklendiğinde otomatik olarak users tablosuna da ekle
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Yeni kullanıcı kaydı olunca trigger çalıştır
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Vize başvuruları tablosu
CREATE TABLE IF NOT EXISTS visa_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  full_name TEXT NOT NULL,
  identity_number TEXT,
  phone_number TEXT,
  email TEXT,
  application_type TEXT CHECK (application_type IN ('turist', 'business', 'student', '')),
  visa_type TEXT NOT NULL,
  express_application BOOLEAN DEFAULT FALSE,
  insurance BOOLEAN DEFAULT FALSE,
  usage_type TEXT CHECK (usage_type IN ('individual', 'family', 'group', '')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'approved', 'rejected')),
  passport_url TEXT,
  photo_url TEXT,
  flight_ticket_url TEXT,
  hotel_reservation_url TEXT,
  other_document_url TEXT,
  payment_type TEXT,
  payment_amount DECIMAL(10, 2),
  payment_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Dosya izleme tablosu
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  application_id UUID REFERENCES visa_applications(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('passport', 'photo', 'flight_ticket', 'hotel_reservation', 'other')),
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  size BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Muhasebe tablosu - Bakiye hareketleri
CREATE TABLE IF NOT EXISTS accounting (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  application_id UUID REFERENCES visa_applications(id) ON DELETE SET NULL,
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('deposit', 'withdrawal', 'visa_payment', 'refund')),
  amount DECIMAL(10, 2) NOT NULL,
  balance_after DECIMAL(10, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RLS Politikaları
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting ENABLE ROW LEVEL SECURITY;

-- Kullanıcının kendi bilgilerini görebilmesi için politika
CREATE POLICY "Users can view own data" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

-- Admin kullanıcıların tüm kullanıcı verilerini yönetmesi için politika
CREATE POLICY "Admins can do everything" 
  ON users 
  USING (
    (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
  );

-- Kullanıcının kendi başvurularını görebilmesi ve yönetebilmesi için politika
CREATE POLICY "Users can manage own applications" 
  ON visa_applications FOR ALL 
  USING (auth.uid() = user_id);

-- Admin ve personelin tüm başvuruları görebilmesi için politika
CREATE POLICY "Admins and staff can access all applications" 
  ON visa_applications FOR ALL 
  USING (
    (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'staff')
  ); 