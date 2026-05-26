-- TOS App - הקמת טבלאות
-- יש להריץ ב-SQL Editor של Supabase Dashboard

-- מלאכות
CREATE TABLE IF NOT EXISTS trades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT DEFAULT '',
  desc_text TEXT DEFAULT '',
  desc_en TEXT DEFAULT '',
  icon TEXT DEFAULT 'build',
  color TEXT DEFAULT '#3B82F6',
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- פרקים
CREATE TABLE IF NOT EXISTS sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trade_id UUID REFERENCES trades(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_en TEXT DEFAULT '',
  icon TEXT DEFAULT 'info',
  "order" INTEGER DEFAULT 0,
  qc_relevant BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- שורות/פריטים
CREATE TABLE IF NOT EXISTS items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  text_en TEXT DEFAULT '',
  "order" INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS policies - פתוח ל-MVP (בלי אותנטיקציה)
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on trades" ON trades FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on sections" ON sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on items" ON items FOR ALL USING (true) WITH CHECK (true);

-- Storage bucket להעלאת תמונות
-- יש ליצור bucket בשם trade-images דרך ה-Dashboard:
-- Storage > New Bucket > Name: trade-images > Public: ON
