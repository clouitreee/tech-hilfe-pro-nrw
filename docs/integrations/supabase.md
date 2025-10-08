# Supabase Integration Documentation

## Overview

Supabase is used for database storage with Row Level Security (RLS) enabled.

## Environment Variables

```bash
# Public URL (client-side safe)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co

# Anonymous key (client-side safe, limited by RLS)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Service role key (server-side only, bypasses RLS)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

## Security Architecture

### Row Level Security (RLS)

All tables have RLS enabled with **deny-by-default** policies:

```sql
-- Enable RLS on leads table
alter table public.leads enable row level security;

-- Deny all operations by default
-- Only service role can perform operations
```

### Client Types

#### 1. Anonymous Client (Client-Side)
**File:** `lib/supabase/client.ts`  
**Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
**Access:** Limited by RLS policies  
**Usage:** Read-only operations (if any)

#### 2. Admin Client (Server-Side Only)
**File:** `lib/server/supabase-admin.ts`  
**Key:** `SUPABASE_SERVICE_ROLE_KEY`  
**Access:** Bypasses RLS  
**Usage:** All write operations

```typescript
import { supabaseAdmin } from '@/lib/server/supabase-admin';

// Server action or API route only
const db = supabaseAdmin();
await db.from('leads').insert({ ... });
```

## Routes Affected

### 1. Contact Form Submission
**Route:** Server Action `app/actions/contact.ts`  
**Client:** Admin (service role)  
**Operations:**
- Insert new leads into `leads` table
- Send email notification via Resend

### 2. Stripe Webhook Handler
**Route:** `/api/webhooks/stripe`  
**Client:** Admin (service role)  
**Operations:**
- Insert/update subscription records
- Sync Stripe subscription status

## Database Schema

### Leads Table

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service_interest text,
  message text not null,
  status text default 'new',
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.leads enable row level security;

-- Deny all access (service role only)
create policy "leads_no_read" on public.leads
  for select using (false);
```

### Subscriptions Table

```sql
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  plan_id text not null,
  stripe_subscription_id text unique not null,
  stripe_customer_id text not null,
  status text not null,
  current_period_start timestamp with time zone not null,
  current_period_end timestamp with time zone not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.subscriptions enable row level security;
```

## Testing

### Test RLS Policies

#### 1. Test Anonymous Insert (Should Fail)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// This should fail with RLS error
const { error } = await supabase.from('leads').insert({
  name: 'Test',
  email: 'test@example.com',
  message: 'Test message'
});

console.log(error); // Expected: RLS policy violation
```

#### 2. Test Service Role Insert (Should Succeed)
```typescript
import { supabaseAdmin } from '@/lib/server/supabase-admin';

const db = supabaseAdmin();

// This should succeed
const { error } = await db.from('leads').insert({
  name: 'Test',
  email: 'test@example.com',
  message: 'Test message',
  status: 'new'
});

console.log(error); // Expected: null
```

### Test Contact Form

```bash
# Test via API
curl -X POST http://localhost:3000/api/contact \
  -H "Origin: http://localhost:3000" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message",
    "serviceInterest": "general"
  }'
```

**Expected Response:** `{ "success": true }`

## Production Setup

### 1. Run Migrations

In Supabase Dashboard or CLI:

```bash
# Apply RLS migration
supabase migration up
```

Or manually execute SQL from `supabase/migrations/001_rls_leads.sql`

### 2. Verify RLS

In Supabase Dashboard:
1. Go to Table Editor → `leads`
2. Check "RLS enabled" badge
3. Go to Policies tab
4. Verify policies are active

### 3. Test Service Role Access

```bash
# In Cloudflare Pages logs, verify:
# - Leads are created successfully
# - No RLS errors
# - Email notifications sent
```

## Security Best Practices

### ✅ DO
- Use `supabaseAdmin()` only in server-side code
- Validate all input before database operations
- Check origin/referer in server actions
- Log all database errors for monitoring

### ❌ DON'T
- Never expose service role key to client
- Never import `supabase-admin.ts` in client components
- Never disable RLS in production
- Never trust client-side validation alone

## Troubleshooting

### RLS Policy Violation
**Symptom:** `new row violates row-level security policy`  
**Solution:** Verify you're using `supabaseAdmin()` not anonymous client

### Missing Environment Variables
**Symptom:** `Missing Supabase environment variables`  
**Solution:** Check Cloudflare Pages environment variables are set

### Connection Errors
**Symptom:** `Failed to connect to Supabase`  
**Solution:**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check Supabase project is not paused
- Verify network connectivity

## References

- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Service Role](https://supabase.com/docs/guides/api/api-keys)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
