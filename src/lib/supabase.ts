import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://uxbfahumhkguuddrmlfu.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || "";

export function getSupabaseServer() {
  return createClient(supabaseUrl, supabaseServiceKey);
}
