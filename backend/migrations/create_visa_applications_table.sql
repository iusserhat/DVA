-- Vize başvuruları tablosunu oluştur
CREATE TABLE IF NOT EXISTS visa_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  visa_type TEXT NOT NULL,
  applicant_name TEXT NOT NULL,
  passport_number TEXT NOT NULL,
  destination_country TEXT NOT NULL,
  application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'beklemede',
  payment_status TEXT NOT NULL DEFAULT 'ödenmedi',
  amount DECIMAL(10, 2),
  transaction_id TEXT,
  payment_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) politikaları ekle
ALTER TABLE visa_applications ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar kendi başvurularını görebilir
CREATE POLICY "Kullanıcılar kendi başvurularını görebilir"
  ON visa_applications FOR SELECT
  USING (auth.uid() = user_id);

-- Kullanıcılar kendi başvurularını oluşturabilir
CREATE POLICY "Kullanıcılar kendi başvurularını oluşturabilir"
  ON visa_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admin rolüne sahip kullanıcılar tüm başvuruları görebilir ve düzenleyebilir
CREATE POLICY "Admin tüm başvuruları görebilir"
  ON visa_applications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- İndeks ekle
CREATE INDEX IF NOT EXISTS idx_visa_applications_user_id ON visa_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_visa_applications_status ON visa_applications(status);
CREATE INDEX IF NOT EXISTS idx_visa_applications_payment_status ON visa_applications(payment_status); 