'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import Button from '@/components/ui/Button';
import { SUBSCRIPTION_PLANS } from '@/lib/stripe/client';
import { getStripe } from '@/lib/stripe/client';

const businessPlans = [
  SUBSCRIPTION_PLANS.BUSINESS_GRUNDSCHUTZ,
  SUBSCRIPTION_PLANS.BUSINESS_WACHSTUM,
  SUBSCRIPTION_PLANS.BUSINESS_PREMIUM,
];

export default function BusinessSubscriptionsPage() {
  const handleSubscribe = async (planId: string) => {
    if (planId === 'business_premium') {
      // Redirect to contact form for custom pricing
      window.location.href = '/kontakt?interest=business_premium';
      return;
    }

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
                Business-Pakete für Kleinunternehmen
              </h1>
              <p className="text-body max-w-3xl mx-auto mb-8">
                Professionelle IT-Betreuung für Ihr Unternehmen. Skalierbar, transparent und auf Ihre Bedürfnisse zugeschnitten.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Garantierte Reaktionszeiten</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>NIS2-konform</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Fördermittelberatung inklusive</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {businessPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-soft hover:shadow-hard transition-all duration-300 overflow-hidden flex flex-col ${
                    'popular' in plan && plan.popular ? 'ring-2 ring-secondary lg:scale-105' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {'popular' in plan && plan.popular && (
                    <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 text-sm font-medium rounded-bl-lg z-10">
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
                        {plan.price ? (
                          <>
                            <span className="text-5xl font-bold text-primary">
                              €{plan.price}
                            </span>
                            <span className="text-neutral-500">/ Monat</span>
                          </>
                        ) : (
                          <span className="text-3xl font-bold text-primary">
                            Auf Anfrage
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-600 text-sm leading-relaxed min-h-[80px]">
                        {plan.id === 'business_grundschutz' &&
                          'Der "MSP-Lite"-Einstieg für Selbstständige und Kleinstunternehmen. Wir sichern Ihre grundlegenden IT-Prozesse ab.'}
                        {plan.id === 'business_wachstum' &&
                          'Ihr externer IT-Partner für Wachstum. Wir optimieren Ihre digitalen Prozesse und beraten Sie strategisch.'}
                        {plan.id === 'business_premium' &&
                          'Die vollständige Auslagerung Ihrer IT-Abteilung. Wir übernehmen die komplette Verantwortung für Ihre digitale Infrastruktur und NIS2-Konformität.'}
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
                    <div className="mt-auto">
                      <Button
                        variant={'popular' in plan && plan.popular ? 'primary' : 'outline'}
                        fullWidth
                        onClick={() => handleSubscribe(plan.id)}
                      >
                        {'custom' in plan && plan.custom ? 'Angebot anfordern' : 'Jetzt abonnieren'}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section bg-neutral-50">
          <div className="container-custom">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-2 mb-4">Warum Tech Hilfe Pro NRW?</h2>
              <p className="text-body max-w-2xl mx-auto">
                Wir verstehen die besonderen Herausforderungen von Kleinunternehmen
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Spezialisiert auf KMU',
                  description:
                    'Wir kennen die Bedürfnisse von Kleinunternehmen und bieten maßgeschneiderte Lösungen.',
                },
                {
                  icon: '💰',
                  title: 'Fördermittel-Expertise',
                  description:
                    'Wir helfen Ihnen bei der Beantragung von Digitalisierungsförderungen wie "Digital Jetzt".',
                },
                {
                  icon: '🔒',
                  title: 'NIS2-konform',
                  description:
                    'Wir sorgen dafür, dass Ihr Unternehmen alle gesetzlichen Anforderungen erfüllt.',
                },
                {
                  icon: '📞',
                  title: 'Persönlicher Ansprechpartner',
                  description:
                    'Sie haben immer einen festen Ansprechpartner, der Ihr Unternehmen kennt.',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-display font-semibold text-primary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
          <div className="container-custom">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-2 mb-4">Häufig gestellte Fragen</h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: 'Was ist NIS2 und betrifft es mein Unternehmen?',
                  answer:
                    'NIS2 ist eine EU-Richtlinie zur Cybersicherheit, die ab Oktober 2024 gilt. Sie betrifft viele Branchen, insbesondere kritische Infrastrukturen und deren Zulieferer. Wir prüfen gerne kostenlos, ob Ihr Unternehmen betroffen ist.',
                },
                {
                  question: 'Wie funktioniert die Fördermittelberatung?',
                  answer:
                    'Wir analysieren Ihre Situation und prüfen, welche Förderprogramme für Sie in Frage kommen. Dann unterstützen wir Sie bei der Antragstellung und der Umsetzung der geförderten Maßnahmen.',
                },
                {
                  question: 'Können Sie auch vor Ort sein?',
                  answer:
                    'Ja, je nach Paket bieten wir regelmäßige oder bedarfsgerechte Vor-Ort-Termine an. Viele Probleme können wir jedoch bereits remote lösen, was Zeit und Kosten spart.',
                },
                {
                  question: 'Was passiert bei einem IT-Notfall?',
                  answer:
                    'Je nach Paket garantieren wir Ihnen eine Reaktionszeit von 1 bis 8 Stunden. In kritischen Fällen sind wir auch außerhalb der Geschäftszeiten für Sie erreichbar.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-soft"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-neutral-600 mb-4">
                Bereit für professionelle IT-Betreuung?
              </p>
              <Button href="/kontakt" variant="primary" size="lg">
                Kostenlose Beratung vereinbaren
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
