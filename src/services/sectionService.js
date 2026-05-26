import { supabase } from '../lib/supabase'

// שליפת פרקים למלאכה
export async function getSections(tradeId) {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('trade_id', tradeId)
    .order('order', { ascending: true })
  if (error) throw error
  return data
}

// יצירת פרק חדש
export async function createSection(tradeId, { title, title_en = '', icon = 'info' }) {
  const { data: existing } = await supabase
    .from('sections')
    .select('order')
    .eq('trade_id', tradeId)
    .order('order', { ascending: false })
    .limit(1)
  const nextOrder = existing && existing.length > 0 ? existing[0].order + 1 : 0

  const { data, error } = await supabase
    .from('sections')
    .insert({ trade_id: tradeId, title, title_en, icon, order: nextOrder })
    .select()
    .single()
  if (error) throw error
  return data
}

// עדכון פרק
export async function updateSection(id, updates) {
  const { data, error } = await supabase
    .from('sections')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// מחיקת פרק
export async function deleteSection(id) {
  const { error } = await supabase
    .from('sections')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// סידור מחדש של פרקים
export async function reorderSections(tradeId, orderedIds) {
  const updates = orderedIds.map((id, index) =>
    supabase.from('sections').update({ order: index }).eq('id', id)
  )
  await Promise.all(updates)
}
