import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';
import { SUBSCRIPTION_PLANS } from '@/lib/stripe/client';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    // Initialize Stripe inside handler for Cloudflare Workers compatibility
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-09-30.clover',
    });

    const { planId, customer_email } = await req.json();

    // Find the plan
    const plan = Object.values(SUBSCRIPTION_PLANS).find((p) => p.id === planId);

    if (!plan || !plan.stripePriceId) {
      return NextResponse.json(
        { error: 'Invalid plan or price ID not configured' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_SITE_URL not configured' },
        { status: 500 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card', 'sepa_debit'],
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/abonnements/${plan.target}`,
      customer_email: customer_email || undefined,
      allow_promotion_codes: true,
      metadata: {
        planId: planId,
      },
    });

    // Return session URL for redirect
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
