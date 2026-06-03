import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fhkxvbscudfflbewbbwo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoa3h2YnNjdWRmZmxiZXdiYndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0Nzk5NDIsImV4cCI6MjA5NjA1NTk0Mn0.40hfysl4QLMP9R0QCdB3VSfZ7GFYKP9iRwa-14TdT5I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
