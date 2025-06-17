import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('supabaseUrl is required.');
}
if (!supabaseServiceRoleKey) {
  throw new Error('supabaseServiceRoleKey is required.');
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);