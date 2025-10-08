/**
 * i18n Configuration for Tech Hilfe Pro NRW
 * 
 * Supported languages: DE (default), EN, ES
 * Default currency: EUR
 */

export const defaultLocale = 'de' as const;

export const locales = ['de', 'en', 'es'] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
};

export const defaultCurrency = 'EUR' as const;

export const currencies = ['EUR', 'USD', 'GBP'] as const;

export type Currency = (typeof currencies)[number];

export const currencySymbols: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
};

/**
 * Format price according to locale and currency
 */
export function formatPrice(
  amount: number,
  currency: Currency = defaultCurrency,
  locale: Locale = defaultLocale
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Get locale from request headers or default
 */
export function getLocale(acceptLanguage?: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const preferredLocale = acceptLanguage
    .split(',')[0]
    .split('-')[0]
    .toLowerCase();

  return locales.includes(preferredLocale as Locale)
    ? (preferredLocale as Locale)
    : defaultLocale;
}

/**
 * Stripe Price IDs by locale (for future multi-currency support)
 */
export const stripePriceIds = {
  basis: {
    EUR: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIS_EUR || 'price_basis_eur',
    USD: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIS_USD || 'price_basis_usd',
    GBP: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIS_GBP || 'price_basis_gbp',
  },
  premium: {
    EUR: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_EUR || 'price_premium_eur',
    USD: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_USD || 'price_premium_usd',
    GBP: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM_GBP || 'price_premium_gbp',
  },
  // Add other plans as needed
} as const;
