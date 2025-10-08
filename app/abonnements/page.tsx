'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import Button from '@/components/ui/Button';
import { Metadata } from 'next';

export default function AbonnementsPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Unsere Abonnements
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Wählen Sie das passende IT-Support-Paket für Ihre Bedürfnisse. 
              Egal ob Privatperson oder Unternehmen – wir haben die richtige Lösung für Sie.
            </p>
          </motion.div>
        </section>

        {/* Abonnement Options */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Privat Card */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 lg:p-10 border border-gray-100"
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                  Für Privatkunden
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Privat-Abonnements
                </h2>
                <p className="text-gray-600 text-lg">
                  Zuverlässiger IT-Support für Privatpersonen und Senioren. 
                  Wir helfen Ihnen bei allen technischen Fragen – verständlich und geduldig.
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Persönlicher Ansprechpartner</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Fernwartung & Vor-Ort-Service</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Verständliche Erklärungen</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Flexible Laufzeiten</span>
                </li>
              </ul>

              <Button href="/abonnements/privat" variant="primary" className="w-full">
                Privat-Pakete ansehen
              </Button>
            </motion.div>

            {/* Unternehmen Card */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 lg:p-10 border border-gray-100 relative"
            >
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-2xl rounded-tr-2xl text-sm font-medium">
                Empfohlen
              </div>
              
              <div className="mb-6">
                <span className="inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
                  Für Unternehmen
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Business-Abonnements
                </h2>
                <p className="text-gray-600 text-lg">
                  Professioneller IT-Support für Kleinunternehmen und Selbstständige. 
                  Wir sorgen dafür, dass Ihre IT reibungslos läuft.
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Dedizierter IT-Partner</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Proaktive Wartung & Monitoring</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Schnelle Reaktionszeiten</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Skalierbare Lösungen</span>
                </li>
              </ul>

              <Button href="/abonnements/unternehmen" variant="primary" className="w-full">
                Business-Pakete ansehen
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Nicht sicher, welches Paket passt?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Vereinbaren Sie ein kostenloses Erstgespräch und wir finden gemeinsam die beste Lösung für Sie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/termin-buchen" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
                Kostenloses Erstgespräch
              </Button>
              <Button href="/kontakt" variant="outline" className="border-white text-white hover:bg-white/10">
                Kontakt aufnehmen
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
