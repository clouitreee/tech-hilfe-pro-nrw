-- Enable Row Level Security on leads table
alter table public.leads enable row level security;

-- Drop any existing anon insert policy
drop policy if exists leads_insert_anon on public.leads;

-- Deny all read access (only service role can read)
create policy "leads_no_read" on public.leads
  for select
  using (false);

-- Deny all insert access from anon (only service role can insert)
-- No policy needed - deny by default

-- Deny all update access
create policy "leads_no_update" on public.leads
  for update
  using (false);

-- Deny all delete access
create policy "leads_no_delete" on public.leads
  for delete
  using (false);
