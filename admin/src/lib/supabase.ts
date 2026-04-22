import { createClient } from "@supabase/supabase-js";

// NOTE: these are the same public values shipped in the static site's
// supabase-config.js. The anon key is safe for public use.
export const SUPABASE_URL = "https://axigvpikurpqhmuwajkm.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4aWd2cGlrdXJwcWhtdXdhamttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MDk0NDgsImV4cCI6MjA3NDE4NTQ0OH0.1_N7k6F1TQCjQCtNtmkNV5aMxdGG_Ci9akXfdhyLl9g";

export const TABLES = {
  USERS: "step_tracker_users",
  STEPS: "daily_steps",
  ACTIVITIES: "recent_activities",
  ADMIN_USERS: "admin_users",
} as const;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
