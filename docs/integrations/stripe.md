# Stripe Integration Documentation

## Overview

Stripe is integrated for subscription payments and checkout management.

## Environment Variables

```bash
# Public key (client-side)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Secret key (server-side only)
STRIPE_SECRET_KEY=sk_test_...

# Webhook secret (for signature verification)
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Routes Affected

### 1. Checkout Session Creation
**Route:** `/api/create-checkout-session`  
**Runtime:** Edge  
**Method:** POST  
**Purpose:** Create Stripe checkout session for subscriptions

### 2. Webhook Handler
**Route:** `/api/webhooks/stripe`  
**Runtime:** Edge  
**Method:** POST  
**Purpose:** Handle Stripe webhook events

**Supported Events:**
- `checkout.session.completed` - New subscription created
- `customer.subscription.updated` - Subscription modified
- `customer.subscription.deleted` - Subscription canceled

## Security

### Webhook Signature Verification
All webhook requests are verified using `stripe.webhooks.constructEvent()`:

```typescript
const event = stripe.webhooks.constructEvent(
  rawBody,
  signature,
  webhookSecret
);
```

**Important:** The webhook uses `req.text()` to get the raw body, which is required for signature verification.

### Edge Runtime
Both API routes run on Edge Runtime for optimal performance and Cloudflare Pages compatibility.

## Testing

### Local Testing with Stripe CLI

1. **Install Stripe CLI:**
   ```bash
   brew install stripe/stripe-cli/stripe
   # or download from https://stripe.com/docs/stripe-cli
   ```

2. **Login:**
   ```bash
   stripe login
   ```

3. **Forward webhooks to local:**
   ```bash
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```

4. **Trigger test events:**
   ```bash
   # Test checkout completion
   stripe trigger checkout.session.completed

   # Test subscription update
   stripe trigger customer.subscription.updated

   # Test subscription deletion
   stripe trigger customer.subscription.deleted
   ```

### Expected Responses

**Valid signature:** `200 OK` with `{ received: true }`  
**Invalid signature:** `400 Bad Request` with error message  
**Missing signature:** `400 Bad Request`

## Production Setup

### 1. Configure Webhook Endpoint

In Stripe Dashboard:
1. Go to Developers → Webhooks
2. Add endpoint: `https://techhilfepro.de/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook signing secret
5. Add to Cloudflare Pages environment variables as `STRIPE_WEBHOOK_SECRET`

### 2. Test Production Webhook

```bash
# Send test webhook from Stripe Dashboard
# Check Cloudflare Pages logs for processing confirmation
```

## Database Integration

Webhook events automatically sync to Supabase `subscriptions` table:

```sql
-- Subscription record structure
{
  user_id: string,
  plan_id: string,
  stripe_subscription_id: string,
  stripe_customer_id: string,
  status: string,
  current_period_start: timestamp,
  current_period_end: timestamp
}
```

## Troubleshooting

### Webhook Signature Verification Failed
- Check that `STRIPE_WEBHOOK_SECRET` matches the webhook endpoint secret
- Verify raw body is used (not parsed JSON)
- Check Stripe CLI version is up to date

### Subscription Not Created in Database
- Check Supabase service role key is correct
- Verify `subscriptions` table exists
- Check Cloudflare Pages logs for errors

### Edge Runtime Errors
- Ensure all Stripe operations are async
- Verify environment variables are set in Cloudflare Pages
- Check that no Node.js-specific APIs are used

## References

- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)
- [Next.js Edge Runtime](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)
