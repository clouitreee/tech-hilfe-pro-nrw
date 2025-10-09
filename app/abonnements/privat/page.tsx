'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import Button from '@/components/ui/Button';
import { SUBSCRIPTION_PLANS } from '@/lib/stripe/client';
import { getStripe } from '@/lib/stripe/client';

const privatePlans = [
  SUBSCRIPTION_PLANS.PRIVATE_BASIS,
  SUBSCRIPTION_PLANS.PRIVATE_PREMIUM,
];

export default function PrivateSubscriptionsPage() {
  const handleSubscribe = async (planId: string) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (!url) {
        throw new Error('No checkout URL received');
      }
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  };

  return (
    <>
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="heading-hero mb-6">
                Digital-Sorglos-Pakete für Privatkunden
              </h1>
              <p className="text-body max-w-3xl mx-auto mb-8">
                Wählen Sie das passende Paket für Ihre Bedürfnisse. Alle Pakete sind monatlich kündbar und ohne versteckte Kosten.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Keine Vertragslaufzeit</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Monatlich kündbar</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% DSGVO-konform</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {privatePlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-soft hover:shadow-hard transition-all duration-300 overflow-hidden ${
                    'popular' in plan && plan.popular ? 'ring-2 ring-secondary scale-105' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }} // MANUS: Scroll-Animationen reaktivieren
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {'popular' in plan && plan.popular && (
                    <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                      Beliebtestes Paket
                    </div>
                  )}

                  <div className="p-8 flex flex-col h-full">
                    {/* Plan Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-display font-bold text-primary mb-2 min-h-[64px] flex items-center">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-4 min-h-[60px]">
                        <span className="text-5xl font-bold text-primary">
                          €{plan.price?.toFixed(2)}
                        </span>
                        <span className="text-neutral-500">/ Monat</span>
                      </div>
                      <p className="text-neutral-600 text-sm leading-relaxed min-h-[60px]">
                        {plan.id === 'private_basis'
                          ? 'Die Grundsicherung für Ihren digitalen Alltag. Wir halten Ihre Technik im Hintergrund fit und sicher.'
                          : 'Das Rundum-sorglos-Paket für die ganze Familie. Maximale Sicherheit und persönlicher Service, wann immer Sie ihn brauchen.'}
                      </p>
                    </div>

                    {/* Features - flex-grow to push button to bottom */}
                    <div className="mb-8 flex-grow">
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-neutral-700 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button - always at bottom */}
                    {/* MANUS: Implementación solicitada - Direkter Stripe-Link */}
                    <div className="mt-auto">
                      {'stripeCheckoutUrl' in plan && plan.stripeCheckoutUrl ? (
                        <a
                          href={plan.stripeCheckoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center w-full rounded-xl px-6 py-3 text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            'popular' in plan && (plan as any).popular
                              ? 'bg-accent text-white hover:bg-accent/90 focus:ring-accent'
                              : 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary'
                          }`}
                          aria-label={`Abonnieren – ${plan.price?.toFixed(2)} Euro pro Monat`}
                        >
                          Jetzt abonnieren – €{plan.price?.toFixed(2)}/Monat
                        </a>
                      ) : (
                        <Button
                          variant={'popular' in plan && (plan as any).popular ? 'primary' : 'outline'}
                          fullWidth
                          onClick={() => handleSubscribe((plan as any).id)}
                        >
                          Jetzt abonnieren
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section bg-neutral-50">
          <div className="container-custom">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-2 mb-4">Häufig gestellte Fragen</h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: 'Gibt es eine Vertragslaufzeit?',
                  answer:
                    'Nein, alle unsere Pakete sind monatlich kündbar. Sie gehen keine langfristige Verpflichtung ein und können jederzeit zum Ende des Monats kündigen.',
                },
                {
                  question: 'Was bedeutet "proaktives Monitoring"?',
                  answer:
                    'Proaktives Monitoring bedeutet, dass wir Ihre Geräte kontinuierlich überwachen und potenzielle Probleme erkennen, bevor sie zu echten Störungen werden. So können wir oft eingreifen, bevor Sie überhaupt merken, dass etwas nicht stimmt.',
                },
                {
                  question: 'Wie funktioniert der Remote-Support?',
                  answer:
                    'Per Remote-Support können wir uns – mit Ihrer Erlaubnis – sicher auf Ihren Computer aufschalten und Probleme direkt beheben, als säßen wir neben Ihnen. Das spart Zeit und ist oft schneller als ein Vor-Ort-Termin.',
                },
                {
                  question: 'Sind meine Daten sicher?',
                  answer:
                    'Absolut. Wir arbeiten zu 100% DSGVO-konform, nutzen verschlüsselte Verbindungen und speichern Ihre Daten ausschließlich auf Servern in Deutschland. Ihre Privatsphäre und Datensicherheit haben für uns höchste Priorität.',
                },
                {
                  question: 'Kann ich das Paket wechseln?',
                  answer:
                    'Ja, Sie können jederzeit zwischen den Paketen wechseln. Ein Upgrade ist sofort möglich, bei einem Downgrade erfolgt die Änderung zum nächsten Abrechnungszeitraum.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-soft"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <h3 className="text-lg font-display font-semibold text-primary mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-neutral-600 mb-4">
                Haben Sie weitere Fragen? Wir helfen Ihnen gerne weiter.
              </p>
              <Button href="/kontakt" variant="secondary">
                Kontakt aufnehmen
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Kleinunternehmer Notice */}
        <section className="section bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg border-l-4 border-secondary shadow-sm">
              <p className="text-sm text-neutral-600 text-center">
                <strong className="text-primary">Hinweis zur Umsatzsteuer:</strong> Alle angegebenen Preise sind Endpreise. Gemäß § 19 UStG erheben wir keine Umsatzsteuer und weisen diese daher auch nicht aus.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
