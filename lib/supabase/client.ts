import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const { data: lead, error } = await supabase
    .from('leads')
    .insert([{ ...data, status: 'new' }])
    .select()
    .single();

  if (error) throw error;
  return lead;
}

export async function getBlogPosts(published = true) {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (published) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) throw error;
  return data;
}
