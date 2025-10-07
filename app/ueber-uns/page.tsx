'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import Button from '@/components/ui/Button';

export default function UeberUnsPage() {
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
                Über Tech Hilfe Pro
              </h1>
              <p className="text-body max-w-2xl mx-auto">
                Ihr persönlicher IT-Partner in NRW. Wir machen Technologie verständlich, 
                sicher und zugänglich für alle.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="heading-2 mb-6 text-center">Unsere Mission</h2>
                <p className="text-body mb-6">
                  Bei Tech Hilfe Pro glauben wir, dass jeder Mensch und jedes Unternehmen Zugang 
                  zu professioneller IT-Unterstützung verdient – unabhängig von technischem 
                  Vorwissen oder Unternehmensgröße.
                </p>
                <p className="text-body mb-6">
                  Wir haben uns auf die <strong>"Missing Middle"</strong> spezialisiert: 
                  Privatkunden, Senioren und Kleinunternehmen mit 1-10 Mitarbeitern, die oft 
                  zwischen "zu klein für große IT-Dienstleister" und "zu komplex für reine 
                  Consumer-Support" fallen.
                </p>
                <p className="text-body">
                  Unser Ansatz ist einfach: Persönlich, verständlich und immer für Sie da. 
                  Keine Fachbegriffe, keine versteckten Kosten, keine Vertragslaufzeiten.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section bg-neutral-50">
          <div className="container-custom">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-2 mb-4">Unsere Werte</h2>
              <p className="text-body max-w-2xl mx-auto">
                Diese Prinzipien leiten uns bei jeder Kundeninteraktion
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-soft text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="heading-3 mb-3">Vertrauen</h3>
                <p className="text-neutral-600">
                  Transparente Kommunikation, faire Preise und ehrliche Beratung. 
                  Wir empfehlen nur, was Sie wirklich brauchen.
                </p>
              </motion.div>

              {/* Value 2 */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-soft text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💡</span>
                </div>
                <h3 className="heading-3 mb-3">Verständlichkeit</h3>
                <p className="text-neutral-600">
                  Keine Fachbegriffe, keine Überforderung. Wir erklären Technologie 
                  so, dass jeder sie versteht.
                </p>
              </motion.div>

              {/* Value 3 */}
              <motion.div
                className="bg-white p-8 rounded-xl shadow-soft text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔒</span>
                </div>
                <h3 className="heading-3 mb-3">Sicherheit</h3>
                <p className="text-neutral-600">
                  100% DSGVO-konform, verschlüsselte Kommunikation und höchste 
                  Datenschutz-Standards.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="heading-2 mb-6">Ihr Ansprechpartner</h2>
                <div className="bg-white p-8 rounded-xl shadow-soft">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">👨‍💼</span>
                  </div>
                  <h3 className="heading-3 mb-2">José Carlos Martin Lache</h3>
                  <p className="text-secondary font-medium mb-4">Inhaber & IT-Berater</p>
                  <p className="text-neutral-600 mb-6">
                    Mit über 10 Jahren Erfahrung in der IT-Branche unterstütze ich 
                    Privatkunden und Kleinunternehmen bei allen digitalen Herausforderungen. 
                    Mein Fokus liegt auf persönlicher Betreuung und nachhaltigen Lösungen.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button href="/termin-buchen" variant="primary">
                      Termin buchen
                    </Button>
                    <Button href="mailto:info@techhilfepro.de" variant="outline">
                      E-Mail schreiben
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Local Section */}
        <section className="section bg-primary text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="heading-2 mb-6 text-white">Lokal in NRW</h2>
                <p className="text-xl mb-6 text-white/90">
                  Wir sind in Köln ansässig und betreuen Kunden in der gesamten Region 
                  Nordrhein-Westfalen – sowohl remote als auch vor Ort.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="bg-white/10 px-4 py-2 rounded-full">
                    <span className="font-medium">📍 Köln</span>
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-full">
                    <span className="font-medium">📍 Düsseldorf</span>
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-full">
                    <span className="font-medium">📍 Neuss</span>
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-full">
                    <span className="font-medium">📍 Bonn</span>
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-full">
                    <span className="font-medium">📍 Leverkusen</span>
                  </div>
                </div>
                <Button href="/kontakt" variant="secondary" size="lg">
                  Kontakt aufnehmen
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
