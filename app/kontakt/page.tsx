'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import ContactForm from '@/components/forms/ContactForm';

export default function ContactPage() {
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
              <h1 className="heading-hero mb-6">Kontakt aufnehmen</h1>
              <p className="text-body max-w-2xl mx-auto">
                Wir sind für Sie da. Schreiben Sie uns Ihr Anliegen und wir melden uns schnellstmöglich bei Ihnen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="heading-2 mb-6">Senden Sie uns eine Nachricht</h2>
                <ContactForm />
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="heading-2 mb-6">Weitere Kontaktmöglichkeiten</h2>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-primary mb-1">
                        Telefon
                      </h3>
                      <a
                        href="tel:+4915565029989"
                        className="text-neutral-600 hover:text-secondary transition-colors"
                      >
                        +49 15565029989
                      </a>
                      <p className="text-sm text-neutral-500 mt-1">
                        Mo-Fr: 9:00 - 18:00 Uhr
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-primary mb-1">
                        E-Mail
                      </h3>
                      <a
                        href="mailto:info@techhilfepro.de"
                        className="text-neutral-600 hover:text-secondary transition-colors"
                      >
                        info@techhilfepro.de
                      </a>
                      <p className="text-sm text-neutral-500 mt-1">
                        Antwort innerhalb von 24 Stunden
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-primary mb-1">
                        Einsatzgebiet
                      </h3>
                      <p className="text-neutral-600">
                        Nordrhein-Westfalen<br />
                        Köln, Düsseldorf, Neuss<br />
                        und Umgebung
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="mt-8 p-6 bg-primary/5 rounded-xl">
                  <h3 className="font-display font-semibold text-primary mb-3">
                    Schnelle Hilfe benötigt?
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    Bei dringenden Problemen erreichen Sie uns telefonisch. Für allgemeine Anfragen nutzen Sie bitte das Kontaktformular.
                  </p>
                  <a
                    href="tel:+4915565029989"
                    className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Jetzt anrufen
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section (Placeholder) */}
        <section className="section bg-neutral-50">
          <div className="container-custom">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-2 mb-4">Unser Einsatzgebiet</h2>
              <p className="text-body max-w-2xl mx-auto">
                Wir sind in ganz Nordrhein-Westfalen für Sie da, mit Fokus auf die Region Köln, Düsseldorf und Neuss.
              </p>
            </motion.div>

            <motion.div
              className="bg-neutral-200 rounded-xl h-96 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-neutral-500">
                [Google Maps Integration - Einsatzgebiet NRW]
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
