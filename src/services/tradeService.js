import { supabase } from '../lib/supabase'

// שליפת כל המלאכות
export async function getTrades() {
  const { data, error } = await supabase
    .from('trades')
    .select('*')
    .order('order', { ascending: true })
  if (error) throw error
  return data
}

// שליפת מלאכה בודדת
export async function getTrade(id) {
  const { data, error } = await supabase
    .from('trades')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

// יצירת מלאכה חדשה
export async function createTrade({ name, name_en = '', icon = 'build', color = '#3B82F6', desc_text = '', desc_en = '' }) {
  // מציאת ה-order הבא
  const { data: existing } = await supabase
    .from('trades')
    .select('order')
    .order('order', { ascending: false })
    .limit(1)
  const nextOrder = existing && existing.length > 0 ? existing[0].order + 1 : 0

  const { data, error } = await supabase
    .from('trades')
    .insert({ name, name_en, icon, color, desc_text, desc_en, order: nextOrder })
    .select()
    .single()
  if (error) throw error
  return data
}

// עדכון מלאכה
export async function updateTrade(id, updates) {
  const { data, error } = await supabase
    .from('trades')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// מחיקת מלאכה
export async function deleteTrade(id) {
  const { error } = await supabase
    .from('trades')
    .delete()
    .eq('id', id)
  if (error) throw error
}
