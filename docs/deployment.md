# Cloudflare Pages Deployment Guide

## Build Configuration

### Build Command
```bash
npm run pages:build
```

### Build Output Directory
```
.vercel/output/static
```

### Node Version
```
NODE_VERSION=22
```

### Environment Variables (Required)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/15min
```

## Deployment Steps

### 1. Connect GitHub Repository
1. Login to Cloudflare Dashboard
2. Go to Pages → Create a project
3. Connect to Git → Select `clouitreee/tech-hilfe-pro-nrw`
4. Branch: `main`

### 2. Configure Build Settings
- **Framework preset:** None (manual configuration)
- **Build command:** `npm run pages:build`
- **Build output directory:** `.vercel/output/static`
- **Root directory:** `/`
- **Node version:** `22` (set via environment variable)

### 3. Add Environment Variables
Add all variables listed above in:
Settings → Environment variables → Production

### 4. Deploy
Click "Save and Deploy"

## Post-Deployment

### Verify Deployment
- [ ] Homepage loads
- [ ] Navigation works (no 404s)
- [ ] Calendly widget loads on `/termin-buchen`
- [ ] Contact form submits successfully
- [ ] Blog articles load
- [ ] CSP headers present (check DevTools)

### Custom Domain Setup
1. Go to Custom domains
2. Add `techhilfepro.de`
3. Update DNS records as instructed
4. Enable "Always Use HTTPS"

### Webhook Configuration (Stripe)
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://techhilfepro.de/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook secret → Add to Environment Variables
5. Redeploy

## Troubleshooting

### Build Fails
- Check Node version is 22
- Verify all dependencies in package.json
- Check build logs for specific errors

### CSP Blocks Resources
- Check middleware.ts CSP configuration
- Add missing domains to CSP directives

### API Routes Don't Work
- Verify `export const runtime = 'edge'` in all API routes
- Check environment variables are set

### Calendly Widget Doesn't Load
- Verify CSP allows `https://assets.calendly.com`
- Check `NEXT_PUBLIC_CALENDLY_URL` is set correctly

## Monitoring

### Cloudflare Analytics
- Real User Monitoring (RUM)
- Performance metrics
- Error tracking

### Logs
- Real-time logs: Cloudflare Dashboard → Pages → Logs
- Build logs: Available after each deployment

## CI/CD

Automatic deployments trigger on:
- Push to `main` branch
- Pull request (preview deployment)

## Rollback

To rollback to previous version:
1. Go to Deployments
2. Find working deployment
3. Click "Rollback to this deployment"
