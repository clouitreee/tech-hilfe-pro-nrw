import { NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * Stripe-specific diagnostic endpoint
 * Shows configuration status without exposing sensitive values
 */
export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    stripe: {
      publishableKey: {
        present: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        prefix: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 7) || 'missing',
      },
      secretKey: {
        present: !!process.env.STRIPE_SECRET_KEY,
        prefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7) || 'missing',
      },
      webhookSecret: {
        present: !!process.env.STRIPE_WEBHOOK_SECRET,
        prefix: process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 6) || 'missing',
      },
      priceIds: {
        privateBasis: {
          present: !!process.env.NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_BASIS,
          prefix: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_BASIS?.substring(0, 6) || 'missing',
        },
        privatePremium: {
          present: !!process.env.NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_PREMIUM,
          prefix: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_PREMIUM?.substring(0, 6) || 'missing',
        },
        businessGrundschutz: {
          present: !!process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_GRUNDSCHUTZ,
          prefix: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_GRUNDSCHUTZ?.substring(0, 6) || 'missing',
        },
        businessWachstum: {
          present: !!process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_WACHSTUM,
          prefix: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_WACHSTUM?.substring(0, 6) || 'missing',
        },
      },
    },
    urls: {
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'not set',
    },
    note: 'Only prefixes shown for security. Never expose full keys.',
  };

  return NextResponse.json(diagnostics, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

