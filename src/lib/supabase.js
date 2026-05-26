import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jlbdamuvpflnkzsyxqme.supabase.co'
const supabaseAnonKey = 'sb_publishable_dz8BVVZAJDewYYaGzLQD5A_-83Pf7f4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
