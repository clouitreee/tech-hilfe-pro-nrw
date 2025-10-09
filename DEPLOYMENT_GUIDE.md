# Tech Hilfe Pro NRW - Deployment Guide

**Version:** 1.2.0  
**Date:** October 9, 2025  
**Status:** ✅ Production Ready

---

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Variables Setup](#environment-variables-setup)
3. [Cloudflare Pages Deployment](#cloudflare-pages-deployment)
4. [Post-Deployment Configuration](#post-deployment-configuration)
5. [Testing Checklist](#testing-checklist)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Pre-Deployment Checklist

Before deploying to production, ensure you have completed the following:

### Required Accounts & Services

- [ ] **Cloudflare Account** - https://dash.cloudflare.com
- [ ] **Stripe Account** (Live Mode) - https://stripe.com
- [ ] **Supabase Project** - https://supabase.com
- [ ] **Calendly Account** - https://calendly.com
- [ ] **Domain Name** - Registered and DNS configured

### Required Credentials

- [ ] Stripe Live API Keys (pk_live_*, sk_live_*)
- [ ] Stripe Live Price IDs (4 products)
- [ ] Stripe Live Webhook Secret (whsec_*)
- [ ] Supabase URL and Keys
- [ ] Calendly Booking URL
- [ ] GitHub Repository Access

---

## 🔐 Environment Variables Setup

### Step 1: Stripe Configuration

Follow the detailed guide: `docs/integrations/stripe-setup.md`

**Required Stripe Environment Variables:**

```env
# Stripe API Keys (Live Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Stripe Price IDs (Live Mode)
NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_BASIS=price_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_PREMIUM=price_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_GRUNDSCHUTZ=price_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_WACHSTUM=price_xxxxxxxxxxxxx
```

### Step 2: Supabase Configuration

Follow the detailed guide: `docs/integrations/supabase.md`

**Required Supabase Environment Variables:**

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Site Configuration

**Required Site Environment Variables:**

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://techhilfepro.de
NEXT_PUBLIC_SITE_NAME="Tech Hilfe Pro NRW"

# Calendly Configuration
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/15min

# Contact Email
CONTACT_EMAIL=info@techhilfepro-nrw.de
```

---

## 🚀 Cloudflare Pages Deployment

### Method 1: GitHub Integration (Recommended)

#### Step 1: Push to GitHub

```bash
# Ensure all changes are committed
git add .
git commit -m "Production ready deployment"
git push origin main
```

#### Step 2: Create Cloudflare Pages Project

1. Go to https://dash.cloudflare.com
2. Navigate to **Workers & Pages** → **Create application** → **Pages**
3. Click **Connect to Git**
4. Select your GitHub repository: `clouitreee/tech-hilfe-pro-nrw`
5. Configure build settings:

**Build Configuration:**
```yaml
Production branch: main
Build command: npm run pages:build
Build output directory: .vercel/output/static
Root directory: /
Node version: 22
```

#### Step 3: Add Environment Variables

In Cloudflare Pages project settings → **Settings** → **Environment variables**:

**Add all environment variables from Step 1-3 above.**

**Important:** Mark sensitive variables as **Encrypted**:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`

#### Step 4: Deploy

1. Click **Save and Deploy**
2. Wait for build to complete (~2-3 minutes)
3. Your site will be available at: `https://your-project.pages.dev`

#### Step 5: Configure Custom Domain

1. Go to **Custom domains** → **Set up a custom domain**
2. Enter your domain: `techhilfepro.de`
3. Follow DNS configuration instructions
4. Wait for DNS propagation (~5-10 minutes)
5. SSL certificate will be automatically provisioned

---

### Method 2: Wrangler CLI (Alternative)

```bash
# Install Wrangler globally (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run pages:build
wrangler pages deploy .vercel/output/static --project-name=tech-hilfe-pro-nrw
```

---

## ⚙️ Post-Deployment Configuration

### 1. Configure Stripe Webhook

**Important:** You must configure the webhook in Stripe Dashboard after deployment.

1. Go to https://dashboard.stripe.com/webhooks
2. Click **+ Add endpoint**
3. Enter webhook URL:
   ```
   https://techhilfepro.de/api/webhooks/stripe
   ```
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** (whsec_*)
6. Update `STRIPE_WEBHOOK_SECRET` in Cloudflare Pages environment variables
7. **Redeploy** to apply the new webhook secret

### 2. Update Calendly URL

1. Edit `app/termin-buchen/page.tsx`
2. Replace the placeholder URL:
   ```tsx
   url="https://calendly.com/your-calendly-username/15min"
   ```
   With your actual Calendly URL:
   ```tsx
   url="https://calendly.com/techhilfepro/erstgespraech"
   ```
3. Commit and push changes

### 3. Verify Supabase RLS

Run the RLS migration if not already done:

```bash
# Connect to your Supabase project
supabase db push

# Or manually run the migration
# File: supabase/migrations/001_rls_leads.sql
```

### 4. Configure Cloudflare WAF (Optional but Recommended)

1. Go to **Security** → **WAF**
2. Enable **Managed Rules**
3. Create custom rules:

**Rate Limiting Rule:**
```
Rule name: Contact Form Rate Limit
Expression: (http.request.uri.path eq "/api/contact")
Action: Block
Rate: 5 requests per 60 seconds
```

**Bot Protection:**
```
Rule name: Bot Protection
Expression: (cf.bot_management.score lt 30)
Action: Challenge
```

### 5. Enable Analytics

1. Go to **Analytics & Logs** → **Web Analytics**
2. Enable **Web Analytics**
3. Copy the analytics token
4. Add to your site (optional)

---

## ✅ Testing Checklist

### Immediate Tests (5 minutes)

After deployment, test the following:

#### Navigation
- [ ] Homepage loads correctly
- [ ] All navigation links work (no 404 errors)
- [ ] Footer links work
- [ ] Mobile menu works

#### Core Features
- [ ] Hero section displays correctly
- [ ] Trust indicators visible
- [ ] WhatsApp button appears (bottom right)
- [ ] Contact form works
- [ ] Calendly embed loads on `/termin-buchen`

#### Subscription Flow
- [ ] Navigate to `/abonnements`
- [ ] Click on a subscription plan
- [ ] Click "Jetzt abonnieren"
- [ ] Stripe Checkout opens
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Complete payment
- [ ] Redirect to success page
- [ ] Check Supabase for subscription record

#### Blog
- [ ] Navigate to `/blog`
- [ ] Click on a blog article
- [ ] Article loads correctly
- [ ] Images display (if any)
- [ ] Navigation works

#### Legal Pages
- [ ] `/impressum` loads
- [ ] `/datenschutz` loads
- [ ] `/agb` loads
- [ ] Cookie consent banner appears

### Browser Console Tests

Open DevTools (F12) and check:

- [ ] **No JavaScript errors** in Console
- [ ] **No CSP violations** in Console
- [ ] **No 404 errors** in Network tab
- [ ] **No hydration errors**

### Performance Tests

Use Lighthouse (DevTools → Lighthouse):

- [ ] **Performance:** ≥ 90
- [ ] **Accessibility:** ≥ 95
- [ ] **Best Practices:** ≥ 90
- [ ] **SEO:** ≥ 95

### Security Tests

- [ ] HTTPS enabled (green padlock)
- [ ] Security headers present (check in Network tab)
- [ ] Cookie consent banner works
- [ ] Forms validate input
- [ ] No sensitive data in client-side code

### Mobile Tests

Test on mobile devices or DevTools mobile emulation:

- [ ] Responsive design works
- [ ] Touch targets are large enough
- [ ] Text is readable without zooming
- [ ] Forms are easy to fill
- [ ] WhatsApp button doesn't overlap content

---

## 🐛 Troubleshooting

### Issue: Stripe Checkout Returns Error

**Symptoms:** "Something went wrong" message when clicking "Jetzt abonnieren"

**Causes:**
1. Invalid Stripe price IDs
2. Stripe API keys not set
3. Price IDs are from test mode but using live keys (or vice versa)

**Solution:**
1. Verify all Stripe environment variables are set correctly
2. Ensure price IDs match the mode (test vs live)
3. Check browser console for specific error messages
4. Verify Stripe Dashboard shows the products and prices

### Issue: Webhook Not Receiving Events

**Symptoms:** Payments succeed but no record in Supabase

**Causes:**
1. Webhook URL not configured in Stripe
2. Webhook secret is incorrect
3. Webhook endpoint is not accessible

**Solution:**
1. Verify webhook URL in Stripe Dashboard: `https://techhilfepro.de/api/webhooks/stripe`
2. Check webhook secret matches in both Stripe and Cloudflare
3. Test webhook endpoint: `curl -X POST https://techhilfepro.de/api/webhooks/stripe`
4. Check Stripe Dashboard → Webhooks → Recent deliveries for errors

### Issue: Calendly Embed Not Loading

**Symptoms:** Blank space where Calendly should appear

**Causes:**
1. CSP blocking Calendly
2. Calendly URL is incorrect
3. Network issue

**Solution:**
1. Verify CSP includes: `frame-src https://calendly.com` and `connect-src https://api.calendly.com`
2. Check browser console for CSP violations
3. Verify Calendly URL is correct and accessible
4. Try opening Calendly URL directly in browser

### Issue: Build Fails on Cloudflare

**Symptoms:** Build fails with error messages

**Common Errors:**

**Error: "Module not found"**
```bash
# Solution: Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**Error: "Type error"**
```bash
# Solution: Check TypeScript errors
npm run build
# Fix any type errors shown
```

**Error: "Out of memory"**
```bash
# Solution: Increase Node memory (in package.json)
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

### Issue: Environment Variables Not Working

**Symptoms:** Features not working, errors about missing env vars

**Solution:**
1. Verify all environment variables are set in Cloudflare Pages
2. Check variable names match exactly (case-sensitive)
3. Ensure `NEXT_PUBLIC_*` prefix for client-side variables
4. Redeploy after adding/changing environment variables

### Issue: WhatsApp Button Not Appearing

**Symptoms:** No WhatsApp button visible on pages

**Solution:**
1. Check browser console for JavaScript errors
2. Verify `FloatingWhatsAppButton` is imported in `app/layout.tsx`
3. Check if button is hidden behind other elements (z-index)
4. Verify phone number is correct in component

### Issue: CSP Violations

**Symptoms:** Console shows CSP violation warnings

**Solution:**
1. Identify the blocked resource in console
2. Add the domain to appropriate CSP directive in `middleware.ts`
3. Redeploy
4. Common additions:
   - Images: `img-src 'self' https://domain.com`
   - Scripts: `script-src 'self' https://domain.com`
   - Frames: `frame-src https://domain.com`

---

## 📊 Monitoring & Maintenance

### Daily Checks

- [ ] Check Cloudflare Analytics for traffic
- [ ] Monitor Stripe Dashboard for payments
- [ ] Check Supabase for new leads/subscriptions

### Weekly Checks

- [ ] Review error logs in Cloudflare
- [ ] Check webhook delivery success rate in Stripe
- [ ] Monitor site performance (Lighthouse)
- [ ] Review and respond to contact form submissions

### Monthly Checks

- [ ] Update dependencies: `npm outdated`
- [ ] Review and update blog content
- [ ] Check SEO rankings
- [ ] Review and optimize performance
- [ ] Backup Supabase database

---

## 🔄 Continuous Deployment

Every push to `main` branch will automatically trigger a deployment on Cloudflare Pages.

**Workflow:**
1. Make changes locally
2. Test locally: `npm run dev`
3. Build locally: `npm run build`
4. Commit: `git commit -m "Description"`
5. Push: `git push origin main`
6. Cloudflare automatically builds and deploys
7. Test production site

---

## 📞 Support Resources

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages
- **Next.js Docs:** https://nextjs.org/docs
- **Stripe Docs:** https://stripe.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Project Documentation:** See `PROJECT_DOCUMENTATION.md`

---

## ✅ Deployment Complete!

Once all steps are completed and tests pass, your site is live! 🎉

**Next Steps:**
1. Monitor analytics and user feedback
2. Respond to contact form submissions
3. Create more blog content
4. Optimize based on user behavior
5. Consider A/B testing for conversion optimization

---

**Prepared by:** Manus AI  
**Last Updated:** October 9, 2025  
**Version:** 1.2.0

