import { createClient } from "@supabase/supabase-js"

export default createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
)
