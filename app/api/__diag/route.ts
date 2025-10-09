import { NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * Diagnostic endpoint for troubleshooting
 * Only shows safe, non-sensitive information
 * Should be disabled or protected in production
 */
export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    runtime: 'edge',
    environment: {
      // Only check if variables are set, never expose values
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ? 'set' : 'missing',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'missing',
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'set' : 'missing',
      NEXT_PUBLIC_CALENDLY_URL: process.env.NEXT_PUBLIC_CALENDLY_URL ? 'set' : 'missing',
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'set' : 'missing',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'set' : 'missing',
    },
    csp: {
      enabled: true,
      mode: 'whitelist',
    },
    build: {
      nextVersion: '15.5.2',
      adapter: '@cloudflare/next-on-pages',
    },
  };

  return NextResponse.json(diagnostics, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

