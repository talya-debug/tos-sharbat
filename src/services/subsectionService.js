import { supabase } from '../lib/supabase'

// שליפת תת-קטגוריות לפרק
export async function getSubsections(sectionId) {
  const { data, error } = await supabase
    .from('subsections')
    .select('*')
    .eq('section_id', sectionId)
    .order('order', { ascending: true })
  if (error) throw error
  return data
}

// יצירת תת-קטגוריה חדשה
export async function createSubsection(sectionId, { title, title_en = '' }) {
  const { data: existing } = await supabase
    .from('subsections')
    .select('order')
    .eq('section_id', sectionId)
    .order('order', { ascending: false })
    .limit(1)
  const nextOrder = existing && existing.length > 0 ? existing[0].order + 1 : 0

  const { data, error } = await supabase
    .from('subsections')
    .insert({ section_id: sectionId, title, title_en, order: nextOrder })
    .select()
    .single()
  if (error) throw error
  return data
}

// עדכון תת-קטגוריה
export async function updateSubsection(id, updates) {
  const { data, error } = await supabase
    .from('subsections')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// מחיקת תת-קטגוריה
export async function deleteSubsection(id) {
  const { error } = await supabase
    .from('subsections')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// סידור מחדש של תת-קטגוריות
export async function reorderSubsections(sectionId, orderedIds) {
  const updates = orderedIds.map((id, index) =>
    supabase.from('subsections').update({ order: index }).eq('id', id)
  )
  await Promise.all(updates)
}
