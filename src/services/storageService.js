import { supabase } from '../lib/supabase'

const BUCKET = 'trade-images'

// העלאת תמונה
export async function uploadImage(file, path) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true })
  if (error) throw error

  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(data.path)

  return urlData.publicUrl
}

// מחיקת תמונה
export async function deleteImage(path) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path])
  if (error) throw error
}
