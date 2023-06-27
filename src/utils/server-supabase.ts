import { createClient, SupabaseClient } from "@supabase/supabase-js"
let SupabaseAdmin: SupabaseClient | null = null
if (!SupabaseAdmin) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseServerKey = process.env.SUPABASE_SERVICE_KEY || ""
  SupabaseAdmin = createClient(supabaseUrl, supabaseServerKey)
}
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default SupabaseAdmin!
