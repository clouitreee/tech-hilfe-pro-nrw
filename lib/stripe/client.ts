import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }
  return stripePromise;
};

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  // Private Plans
  PRIVATE_BASIS: {
    id: 'private_basis',
    name: 'Digital-Sorglos-Paket Basis',
    price: 12.99,
    currency: 'EUR',
    interval: 'month',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_BASIS,
    // MANUS: Implementación solicitada - Direkter Stripe-Link
    stripeCheckoutUrl: 'https://buy.stripe.com/3cI5kw9SegnP2Me3cc',
    features: [
      'Proaktives Monitoring für 1 PC oder Mac',
      'Verwalteter Antivirenschutz',
      'Automatische Systemwartung (Updates, Bereinigung)',
      'Sicheres Cloud-Backup (bis 50 GB)',
      'Unbegrenzter Remote-Support (E-Mail & Chat)',
    ],
    target: 'private',
  },
  PRIVATE_PREMIUM: {
    id: 'private_premium',
    name: 'Digital-Sorglos-Paket Premium',
    price: 29.99,
    currency: 'EUR',
    interval: 'month',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_PREMIUM,
    // MANUS: Implementación solicitada - Direkter Stripe-Link
    stripeCheckoutUrl: 'https://buy.stripe.com/dRmaEQ2pMc7zdqS2xv',
    features: [
      'Alle Leistungen des Basis-Pakets',
      'Abdeckung für bis zu 4 Geräte',
      'Priorisierter Remote- & Telefon-Support',
      '1x jährlicher Technik-Check vor Ort',
      'Kindersicherungs-Einrichtung und Beratung',
      'Hilfe bei der Einrichtung von Smart-Home-Geräten',
    ],
    target: 'private',
    popular: true,
  },
  // Business Plans
  BUSINESS_GRUNDSCHUTZ: {
    id: 'business_grundschutz',
    name: 'Business-Grundschutz',
    price: 79,
    currency: 'EUR',
    interval: 'month',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_GRUNDSCHUTZ,
    // MANUS: Implementación solicitada - Direkter Stripe-Link
    stripeCheckoutUrl: 'https://buy.stripe.com/fZufZa0hE8VncmO0pn8Zq03',
    features: [
      'Proaktives Monitoring für bis zu 5 Workstations/Server',
      'Business-Antivirus & Firewall-Management',
      'Verwaltete Backups für kritische Geschäftsdaten (bis 250 GB)',
      'Microsoft 365 / Google Workspace Support',
      'Garantierte Reaktionszeit (8 Geschäftsstunden)',
    ],
    target: 'business',
  },
  BUSINESS_WACHSTUM: {
    id: 'business_wachstum',
    name: 'Business-Wachstum',
    price: 199,
    currency: 'EUR',
    interval: 'month',
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_WACHSTUM,
    // MANUS: Implementación solicitada - Direkter Stripe-Link
    stripeCheckoutUrl: 'https://buy.stripe.com/9B63coe8u5Jb72uc858Zq04',
    features: [
      'Alle Leistungen des Grundschutz-Pakets',
      'Abdeckung für bis zu 10 Workstations/Server',
      'Garantierte Reaktionszeit (4 Geschäftsstunden)',
      'Beratung & Unterstützung bei Digitalisierungs-Fördermitteln',
      'Netzwerk-Management und -Optimierung',
      'Monatlicher IT-Report und Strategiegespräch',
    ],
    target: 'business',
    popular: true,
  },
  BUSINESS_PREMIUM: {
    id: 'business_premium',
    name: 'Business-Partner Premium',
    price: null, // Custom pricing
    currency: 'EUR',
    interval: 'month',
    stripePriceId: null,
    features: [
      'Alle Leistungen des Wachstums-Pakets',
      'Unbegrenzte Geräteanzahl',
      '24/7-Support mit 1-Stunde-Reaktionszeit-Garantie',
      'Vollständige NIS2-Compliance-Audits und Implementierung',
      'Strategische IT-Jahresplanung & Budgetierung',
      'Vor-Ort-Support nach Bedarf',
    ],
    target: 'business',
    custom: true,
  },
} as const;

export type PlanId = keyof typeof SUBSCRIPTION_PLANS;
