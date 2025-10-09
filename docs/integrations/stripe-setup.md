# Stripe Setup Guide

This guide will help you set up Stripe for the Tech Hilfe Pro NRW website.

## Prerequisites

- A Stripe account (https://stripe.com)
- Access to your Stripe Dashboard
- The `.env.local` file in your project root

---

## Step 1: Get Your API Keys

### Test Mode Keys (for development)

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy the **Publishable key** (starts with `pk_test_`)
3. Copy the **Secret key** (starts with `sk_test_`)
4. Add them to `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

### Live Mode Keys (for production)

1. Go to https://dashboard.stripe.com/apikeys
2. Copy the **Publishable key** (starts with `pk_live_`)
3. Copy the **Secret key** (starts with `sk_live_`)
4. Add them to your production environment variables (Cloudflare Pages)

---

## Step 2: Create Subscription Products

### 2.1 Create Products

1. Go to https://dashboard.stripe.com/test/products
2. Click **+ Add product**
3. Create the following products:

#### Product 1: Digital-Sorglos-Paket Basis
- **Name**: Digital-Sorglos-Paket Basis
- **Description**: Proaktives Monitoring, Antivirenschutz, Cloud-Backup, Remote-Support
- **Pricing model**: Recurring
- **Price**: €12.99 EUR
- **Billing period**: Monthly
- Click **Save product**
- Copy the **Price ID** (starts with `price_`)

#### Product 2: Digital-Sorglos-Paket Premium
- **Name**: Digital-Sorglos-Paket Premium
- **Description**: Alle Basis-Leistungen + bis zu 4 Geräte + Priorisierter Support + Technik-Check
- **Pricing model**: Recurring
- **Price**: €29.99 EUR
- **Billing period**: Monthly
- Click **Save product**
- Copy the **Price ID**

#### Product 3: Business-Grundschutz
- **Name**: Business-Grundschutz
- **Description**: Monitoring für 5 Workstations, Business-Antivirus, Backups, M365 Support
- **Pricing model**: Recurring
- **Price**: €79.00 EUR
- **Billing period**: Monthly
- Click **Save product**
- Copy the **Price ID**

#### Product 4: Business-Wachstum
- **Name**: Business-Wachstum
- **Description**: Alle Grundschutz-Leistungen + 10 Workstations + Digitalisierungs-Beratung
- **Pricing model**: Recurring
- **Price**: €199.00 EUR
- **Billing period**: Monthly
- Click **Save product**
- Copy the **Price ID**

### 2.2 Add Price IDs to Environment Variables

Add all four price IDs to `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_BASIS=price_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_PREMIUM=price_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_GRUNDSCHUTZ=price_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_WACHSTUM=price_xxxxxxxxxxxxx
```

---

## Step 3: Configure Webhooks

Webhooks allow Stripe to notify your application about events (e.g., successful payments).

### 3.1 Local Development (using Stripe CLI)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login to Stripe:
   ```bash
   stripe login
   ```
3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy the webhook signing secret (starts with `whsec_`)
5. Add it to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

### 3.2 Production (Cloudflare Pages)

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click **+ Add endpoint**
3. Enter your production URL:
   ```
   https://your-domain.pages.dev/api/webhooks/stripe
   ```
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it to Cloudflare Pages environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

---

## Step 4: Configure Payment Methods

1. Go to https://dashboard.stripe.com/test/settings/payment_methods
2. Enable the following payment methods:
   - **Card** (Visa, Mastercard, Amex)
   - **SEPA Direct Debit** (for German customers)
3. Click **Save**

---

## Step 5: Test the Integration

### 5.1 Test Cards

Use these test cards in test mode:

| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0025 0000 3155` | Requires authentication (3D Secure) |
| `4000 0000 0000 9995` | Declined payment |

**Expiry**: Any future date  
**CVC**: Any 3 digits  
**ZIP**: Any 5 digits

### 5.2 Test SEPA

- **IBAN**: `DE89370400440532013000`
- **Name**: Any name

### 5.3 Test the Checkout Flow

1. Start your local development server:
   ```bash
   npm run dev
   ```
2. Navigate to http://localhost:3000/abonnements/privat
3. Click **Jetzt abonnieren** on any plan
4. You should be redirected to Stripe Checkout
5. Use a test card to complete the payment
6. You should be redirected to `/erfolg?session_id=...`

### 5.4 Verify Webhook

1. Check your terminal where `stripe listen` is running
2. You should see the `checkout.session.completed` event
3. Check your Supabase database for the new subscription record

---

## Step 6: Switch to Live Mode

Once you've tested everything in test mode:

1. **Create products in live mode** (repeat Step 2 in live mode)
2. **Update environment variables** with live keys:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...`
   - `STRIPE_SECRET_KEY=sk_live_...`
   - `NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_BASIS=price_live_...`
   - `NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_PREMIUM=price_live_...`
   - `NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_GRUNDSCHUTZ=price_live_...`
   - `NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_WACHSTUM=price_live_...`
3. **Create production webhook** (repeat Step 3.2 in live mode)
4. **Test with real payment methods** (small amounts first!)

---

## Troubleshooting

### Error: "Invalid plan or price ID not configured"

**Cause**: The price ID in `.env.local` doesn't match the plan ID in the code.

**Solution**: 
1. Check that all 4 price IDs are set in `.env.local`
2. Verify the price IDs match the ones in your Stripe Dashboard
3. Restart your development server after changing `.env.local`

### Error: "No such price: price_test_basis"

**Cause**: You're using placeholder price IDs instead of real ones.

**Solution**: Follow Step 2 to create products and get real price IDs.

### Webhook not receiving events

**Cause**: Webhook secret is incorrect or endpoint is not configured.

**Solution**:
1. For local development, make sure `stripe listen` is running
2. For production, verify the webhook endpoint URL is correct
3. Check that the webhook secret matches in both Stripe and your environment variables

### Payment succeeds but no record in database

**Cause**: Webhook is not configured or Supabase credentials are incorrect.

**Solution**:
1. Check webhook logs in Stripe Dashboard
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
3. Check that RLS policies allow service role to insert records

---

## Security Checklist

Before going live:

- [ ] Live mode API keys are stored securely (not in git)
- [ ] Webhook secret is configured correctly
- [ ] HTTPS is enabled on production domain
- [ ] Webhook endpoint validates signatures
- [ ] Supabase RLS is enabled
- [ ] Service role key is only used server-side
- [ ] Test all payment flows with real cards (small amounts)
- [ ] Set up Stripe Radar for fraud prevention
- [ ] Configure email receipts in Stripe Dashboard

---

## Additional Resources

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Testing**: https://stripe.com/docs/testing
- **Stripe CLI**: https://stripe.com/docs/stripe-cli
- **Webhooks Guide**: https://stripe.com/docs/webhooks
- **SEPA Direct Debit**: https://stripe.com/docs/payments/sepa-debit

---

## Support

If you encounter issues:

1. Check the Stripe Dashboard logs
2. Check your application logs (console.error)
3. Review the webhook event logs in Stripe
4. Contact Stripe Support: https://support.stripe.com

