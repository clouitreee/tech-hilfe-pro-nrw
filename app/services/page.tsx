'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import Button from '@/components/ui/Button';

export default function ServicesPage() {
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
                Unsere IT-Services
              </h1>
              <p className="text-body max-w-2xl mx-auto mb-8">
                Professionelle IT-Unterstützung für Privatkunden, Senioren und Kleinunternehmen 
                in Köln, Düsseldorf und ganz NRW. Persönlich, verständlich und zuverlässig.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/termin-buchen" variant="primary" size="lg">
                  Kostenloses Erstgespräch buchen
                </Button>
                <Button href="/abonnements/privat" variant="secondary" size="lg">
                  Unsere Pakete ansehen
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="section">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">👴</span>
                </div>
                <h3 className="heading-3 mb-3">IT-Hilfe für Senioren</h3>
                <p className="text-neutral-600 mb-4">
                  Geduldig, verständlich und persönlich. Wir helfen Ihnen bei allen digitalen Herausforderungen.
                </p>
                <Button href="/abonnements/privat" variant="outline" fullWidth>
                  Mehr erfahren
                </Button>
              </motion.div>

              {/* Service 2 */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="heading-3 mb-3">Home-Office Support</h3>
                <p className="text-neutral-600 mb-4">
                  Netzwerk-Setup, VPN-Konfiguration und sichere Remote-Arbeit für Selbstständige.
                </p>
                <Button href="/kontakt" variant="outline" fullWidth>
                  Beratung anfragen
                </Button>
              </motion.div>

              {/* Service 3 */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="heading-3 mb-3">IT für Kleinunternehmen</h3>
                <p className="text-neutral-600 mb-4">
                  Umfassende IT-Betreuung für Unternehmen mit 1-10 Mitarbeitern. DSGVO-konform und sicher.
                </p>
                <Button href="/abonnements/unternehmen" variant="outline" fullWidth>
                  Business-Pakete ansehen
                </Button>
              </motion.div>

              {/* Service 4 */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="heading-3 mb-3">Cybersecurity</h3>
                <p className="text-neutral-600 mb-4">
                  Schutz vor Ransomware, Phishing und Datenverlust. NIS2-Beratung für betroffene Unternehmen.
                </p>
                <Button href="/blog/nis2-einfach-erklaert" variant="outline" fullWidth>
                  NIS2-Artikel lesen
                </Button>
              </motion.div>

              {/* Service 5 */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">☁️</span>
                </div>
                <h3 className="heading-3 mb-3">Cloud-Migration</h3>
                <p className="text-neutral-600 mb-4">
                  Sichere Umstellung auf Cloud-Lösungen. Microsoft 365, Google Workspace und mehr.
                </p>
                <Button href="/kontakt" variant="outline" fullWidth>
                  Beratung anfragen
                </Button>
              </motion.div>

              {/* Service 6 */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">💾</span>
                </div>
                <h3 className="heading-3 mb-3">Datensicherung & Backup</h3>
                <p className="text-neutral-600 mb-4">
                  Automatische Backups und Disaster Recovery. Ihre Daten sind immer sicher.
                </p>
                <Button href="/abonnements/unternehmen" variant="outline" fullWidth>
                  Pakete vergleichen
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-primary text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-2 mb-6 text-white">
                Bereit für professionelle IT-Unterstützung?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Buchen Sie jetzt Ihr kostenloses 15-minütiges Erstgespräch und erfahren Sie, 
                wie wir Ihnen helfen können.
              </p>
              <Button href="/termin-buchen" variant="secondary" size="lg">
                Termin buchen
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
