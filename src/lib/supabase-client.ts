import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://uxbfahumhkguuddrmlfu.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4YmZhaHVtaGtndXVkZHJtbGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNTI5OTIsImV4cCI6MjA3MDcyODk5Mn0.Pgw4338wWXyX-CUEayY4_kYJ7MS0L-oWiLLsAqOo9LI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
