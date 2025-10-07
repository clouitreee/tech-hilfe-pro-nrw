'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="container-custom py-16">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success Icon */}
        <motion.div
          className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="heading-hero mb-6">
            Herzlich willkommen!
          </h1>
          <p className="text-body mb-8">
            Vielen Dank für Ihr Vertrauen in Tech Hilfe Pro NRW. Ihre Abonnement-Bestellung wurde erfolgreich abgeschlossen.
          </p>

          <div className="bg-white rounded-xl shadow-soft p-8 mb-8 text-left">
            <h2 className="text-xl font-display font-semibold text-primary mb-4">
              Was passiert jetzt?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-secondary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    Bestätigungs-E-Mail
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Sie erhalten in Kürze eine E-Mail mit allen Details zu Ihrem Abonnement und den nächsten Schritten.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-secondary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    Persönlicher Kontakt
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Innerhalb von 24 Stunden meldet sich Ihr persönlicher Ansprechpartner bei Ihnen, um die Einrichtung zu besprechen.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-secondary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    Einrichtung & Start
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Wir richten alle notwendigen Systeme ein und starten mit der Betreuung Ihrer IT-Infrastruktur.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {sessionId && (
            <p className="text-sm text-neutral-500 mb-8">
              Ihre Bestell-ID: <code className="bg-neutral-100 px-2 py-1 rounded">{sessionId}</code>
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-accent text-white hover:bg-accent-dark hover:shadow-glow-accent focus:ring-accent">
              Zur Startseite
            </a>
            <a href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary">
              Kontakt aufnehmen
            </a>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 p-6 bg-primary/5 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-sm text-neutral-600">
            <strong>Haben Sie Fragen?</strong> Unser Support-Team ist für Sie da:<br />
            <a href="tel:+49123456789" className="text-secondary hover:underline">
              +49 (0) 123 456789
            </a>
            {' oder '}
            <a href="mailto:info@techhilfepro-nrw.de" className="text-secondary hover:underline">
              info@techhilfepro-nrw.de
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/5 to-primary/5">
        <Suspense fallback={<div>Laden...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
