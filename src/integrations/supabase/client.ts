
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lpgyhplbwbcyalqeuivx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZ3locGxid2JjeWFscWV1aXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NjA4OTMsImV4cCI6MjA2NDAzNjg5M30.jJJFSN4c-PXeeTry3GAGPcwuHrlbjqDzhxi3pf3UgK4'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
