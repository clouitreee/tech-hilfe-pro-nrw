'use client';

import { InlineWidget } from 'react-calendly';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import { motion } from 'framer-motion';

export default function TerminBuchenPage() {
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
                Buchen Sie Ihr kostenloses Erstgespräch
              </h1>
              <p className="text-body max-w-2xl mx-auto mb-8">
                Wählen Sie einen passenden Termin für ein unverbindliches 15-minütiges 
                IT-Kennenlerngespräch. Wir besprechen Ihre Anforderungen und zeigen Ihnen, 
                wie wir Ihnen helfen können.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="flex items-center gap-2 text-neutral-600">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">15 Minuten</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Kostenlos & unverbindlich</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Video oder Telefon</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Calendly Widget Section */}
        <section className="section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <InlineWidget
                  url="https://calendly.com/your-calendly-username/15min"
                  styles={{
                    height: '700px',
                    minWidth: '320px',
                  }}
                  pageSettings={{
                    backgroundColor: 'ffffff',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: '4CAF50',
                    textColor: '0A2A4E',
                  }}
                />
              </div>

              {/* Additional Info */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-primary mb-2">Flexible Termine</h3>
                  <p className="text-sm text-neutral-600">
                    Wählen Sie einen Termin, der zu Ihrem Zeitplan passt
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-primary mb-2">Video-Call oder Telefon</h3>
                  <p className="text-sm text-neutral-600">
                    Sie erhalten automatisch einen Link oder wir rufen Sie an
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-primary mb-2">Sofortige Bestätigung</h3>
                  <p className="text-sm text-neutral-600">
                    Sie erhalten eine E-Mail-Bestätigung mit allen Details
                  </p>
                </div>
              </div>

              {/* Contact Alternative */}
              <div className="mt-12 p-6 bg-primary/5 rounded-xl text-center">
                <p className="text-neutral-600 mb-4">
                  Lieber direkt anrufen oder eine E-Mail schreiben?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+4915565029989"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    +49 15565029989
                  </a>
                  <a
                    href="mailto:info@techhilfepro.de"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    E-Mail schreiben
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
