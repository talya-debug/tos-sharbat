-- הוספת עמודות שפה לטבלאות
-- להריץ ב-Supabase Dashboard > SQL Editor

-- טבלת trades
ALTER TABLE trades ADD COLUMN IF NOT EXISTS name_ru TEXT;
ALTER TABLE trades ADD COLUMN IF NOT EXISTS name_ar TEXT;

-- טבלת sections
ALTER TABLE sections ADD COLUMN IF NOT EXISTS title_ru TEXT;
ALTER TABLE sections ADD COLUMN IF NOT EXISTS title_ar TEXT;

-- טבלת items
ALTER TABLE items ADD COLUMN IF NOT EXISTS text_ru TEXT;
ALTER TABLE items ADD COLUMN IF NOT EXISTS text_ar TEXT;
