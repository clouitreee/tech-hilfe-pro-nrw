import type { Locale } from './config';

export const translations = {
  de: {
    common: {
      readMore: 'Mehr erfahren',
      contactUs: 'Kontakt aufnehmen',
      bookAppointment: 'Termin buchen',
      learnMore: 'Mehr erfahren',
      getStarted: 'Jetzt starten',
    },
    nav: {
      home: 'Start',
      services: 'Leistungen',
      subscriptions: 'Abonnements',
      blog: 'Blog',
      about: 'Über uns',
      contact: 'Kontakt',
    },
    pricing: {
      perMonth: 'pro Monat',
      selectPlan: 'Plan wählen',
      popular: 'Beliebteste',
      allPricesEndPrices: 'Alle Preise sind Endpreise. Gemäß § 19 UStG wird keine Umsatzsteuer erhoben.',
    },
  },
  en: {
    common: {
      readMore: 'Read more',
      contactUs: 'Contact us',
      bookAppointment: 'Book appointment',
      learnMore: 'Learn more',
      getStarted: 'Get started',
    },
    nav: {
      home: 'Home',
      services: 'Services',
      subscriptions: 'Subscriptions',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
    },
    pricing: {
      perMonth: 'per month',
      selectPlan: 'Select plan',
      popular: 'Most popular',
      allPricesEndPrices: 'All prices are final prices. No VAT charged according to § 19 UStG.',
    },
  },
  es: {
    common: {
      readMore: 'Leer más',
      contactUs: 'Contáctanos',
      bookAppointment: 'Reservar cita',
      learnMore: 'Saber más',
      getStarted: 'Comenzar',
    },
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      subscriptions: 'Suscripciones',
      blog: 'Blog',
      about: 'Sobre nosotros',
      contact: 'Contacto',
    },
    pricing: {
      perMonth: 'por mes',
      selectPlan: 'Seleccionar plan',
      popular: 'Más popular',
      allPricesEndPrices: 'Todos los precios son finales. No se cobra IVA según § 19 UStG.',
    },
  },
} as const;

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  return typeof value === 'string' ? value : key;
}
