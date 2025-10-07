import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SUBSCRIPTION_PLANS } from '@/lib/stripe/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();

    // Find the plan
    const plan = Object.values(SUBSCRIPTION_PLANS).find((p) => p.id === planId);

    if (!plan || !plan.stripePriceId) {
      return NextResponse.json(
        { error: 'Invalid plan or price ID not configured' },
        { status: 400 }
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
      metadata: {
        planId: plan.id,
      },
      subscription_data: {
        metadata: {
          planId: plan.id,
        },
      },
      locale: 'de',
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
