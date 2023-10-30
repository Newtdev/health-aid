import { createClient } from "@supabase/supabase-js";

const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const url = import.meta.env.VITE_SUPABASE_PROJECT_URL;

export const supabase = createClient(url, key);