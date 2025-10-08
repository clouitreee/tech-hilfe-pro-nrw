import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Admin Client (Service Role)
 * 
 * WARNING: This client bypasses Row Level Security (RLS).
 * Only use in server-side code (API routes, server actions).
 * Never expose to client-side code.
 */
export function supabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
