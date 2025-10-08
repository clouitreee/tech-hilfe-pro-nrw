import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Client for browser/public operations (read-only)
export function getSupabase() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Server-side client with service role for write operations
export function getSupabaseAdmin() {
  if (!supabaseServiceRoleKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// Database Types
export type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  service_interest: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
};

export type Subscription = {
  id: string;
  user_id: string;
  plan_id: string;
  stripe_subscription_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  start_date: string;
  end_date?: string;
};

export type BlogPost = {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  content_md: string;
  author: string;
  category: string;
  tags: string[];
  is_published: boolean;
};

// Helper functions
export async function createLead(data: Omit<Lead, 'id' | 'created_at' | 'status'>) {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    throw new Error('Supabase service role key not configured');
  }
  const { data: lead, error } = await supabaseAdmin
    .from('leads')
    .insert([{ ...data, status: 'new' }])
    .select()
    .single();

  if (error) throw error;
  return lead;
}
