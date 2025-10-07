# Rate Limiting Implementation Guide

## Overview

Rate limiting is recommended for production to prevent abuse of API endpoints. This document provides implementation guidance for Cloudflare Pages.

## Prerequisites

- Cloudflare Pages deployment
- Cloudflare KV namespace (for storing rate limit data)

## Setup

### 1. Create KV Namespace

```bash
# Create KV namespace
wrangler kv:namespace create "RATE_LIMIT"

# Note the ID returned, e.g., { id: "abc123..." }
```

### 2. Bind KV to wrangler.toml

```toml
[[kv_namespaces]]
binding = "RATE_LIMIT"
id = "abc123..."  # Replace with your KV namespace ID
```

### 3. Update API Routes

Add rate limiting middleware to sensitive endpoints:

#### Example: `/app/api/create-checkout-session/route.ts`

```typescript
import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'edge';

// Rate limit: 10 requests per minute per IP
const RATE_LIMIT = 10;
const RATE_WINDOW = 60; // seconds

async function checkRateLimit(
  request: NextRequest,
  kv: KVNamespace
): Promise<boolean> {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const key = `ratelimit:checkout:${ip}`;
  
  const current = await kv.get(key);
  const count = current ? parseInt(current) : 0;
  
  if (count >= RATE_LIMIT) {
    return false; // Rate limit exceeded
  }
  
  await kv.put(key, (count + 1).toString(), {
    expirationTtl: RATE_WINDOW
  });
  
  return true; // OK
}

export async function POST(req: NextRequest) {
  // Origin check
  const origin = req.headers.get('origin') || '';
  const allowedOrigins = [
    'https://techhilfepro.de',
    'https://www.techhilfepro.de',
    'http://localhost:3000'
  ];
  
  if (!allowedOrigins.some(allowed => origin.startsWith(allowed))) {
    return new Response('Forbidden', { status: 403 });
  }

  // Rate limiting (requires KV binding)
  // @ts-ignore - KV binding injected by Cloudflare
  if (typeof RATE_LIMIT !== 'undefined') {
    // @ts-ignore
    const allowed = await checkRateLimit(req, RATE_LIMIT);
    if (!allowed) {
      return new Response('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': '60'
        }
      });
    }
  }

  // ... Stripe logic
}
```

## Alternative: Cloudflare Rate Limiting Rules

For simpler setup, use Cloudflare's built-in rate limiting:

1. Go to Cloudflare Dashboard → Security → WAF
2. Create Rate Limiting Rule:
   - **Name:** "API Rate Limit"
   - **If incoming requests match:** 
     - URI Path contains `/api/`
   - **Then:**
     - Block for 60 seconds
     - When rate exceeds 10 requests per 60 seconds

## Testing

```bash
# Test rate limit (should fail after 10 requests)
for i in {1..15}; do
  curl -X POST https://techhilfepro.de/api/create-checkout-session \
    -H "Content-Type: application/json" \
    -d '{"planId":"basis"}' \
    -w "\n%{http_code}\n"
done
```

Expected output:
- First 10 requests: `200 OK`
- Remaining 5 requests: `429 Too Many Requests`

## Monitoring

- **Cloudflare Analytics:** View rate limit hits
- **KV Insights:** Monitor KV operations
- **Logs:** Check Workers logs for rate limit events

## Recommended Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/create-checkout-session` | 10 | 60s |
| `/api/webhooks/stripe` | 100 | 60s |
| Contact form submission | 5 | 300s |

## Cost Considerations

- **KV Operations:** $0.50 per million reads, $5.00 per million writes
- **Workers Requests:** 100,000 free per day, $0.50 per million after
- **Rate Limiting Rules:** Free with Cloudflare Pro plan

## Status

⚠️ **Not implemented** - Requires KV namespace setup post-deployment

**Priority:** P1 (Important, implement within first week of production)

**Implementation Time:** ~30 minutes
