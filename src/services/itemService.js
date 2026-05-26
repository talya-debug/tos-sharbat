import { supabase } from '../lib/supabase'

// שליפת פריטים לפרק
export async function getItems(sectionId) {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('section_id', sectionId)
    .order('order', { ascending: true })
  if (error) throw error
  return data
}

// יצירת פריט חדש
export async function createItem(sectionId, { text, text_en = '' }) {
  const { data: existing } = await supabase
    .from('items')
    .select('order')
    .eq('section_id', sectionId)
    .order('order', { ascending: false })
    .limit(1)
  const nextOrder = existing && existing.length > 0 ? existing[0].order + 1 : 0

  const { data, error } = await supabase
    .from('items')
    .insert({ section_id: sectionId, text, text_en, order: nextOrder })
    .select()
    .single()
  if (error) throw error
  return data
}

// עדכון פריט
export async function updateItem(id, updates) {
  const { data, error } = await supabase
    .from('items')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// מחיקת פריט
export async function deleteItem(id) {
  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// סידור מחדש של פריטים
export async function reorderItems(sectionId, orderedIds) {
  const updates = orderedIds.map((id, index) =>
    supabase.from('items').update({ order: index }).eq('id', id)
  )
  await Promise.all(updates)
}
