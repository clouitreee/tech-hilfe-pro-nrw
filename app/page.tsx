'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Home() {
  return (
    <>
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary pt-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-xl"
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="container-custom relative z-10 py-32">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                  Ihre persönliche IT-Hilfe in NRW
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Sicher, verständlich und immer für Sie da.<br />
                  Für Privatkunden und Unternehmen.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button href="/abonnements/privat" variant="primary" size="lg">
                    Für Privatkunden
                  </Button>
                  <Button href="/abonnements/unternehmen" variant="secondary" size="lg">
                    Für Unternehmen
                  </Button>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="mt-16 flex flex-wrap justify-center gap-8 text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% DSGVO-konform</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Keine Vertragslaufzeit</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Lokal in NRW</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="section bg-neutral-50">
          <div className="container-custom">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-2 mb-4">Kennen Sie das?</h2>
              <p className="text-body max-w-2xl mx-auto">
                Technische Probleme können frustrierend sein. Wir sind hier, um Ihnen zu helfen.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🐌',
                  title: 'Langsamer PC?',
                  description: 'Ihr Computer braucht ewig zum Starten und Programme reagieren träge? Wir optimieren Ihr System und machen es wieder schnell.',
                },
                {
                  icon: '🔒',
                  title: 'Unsicher im Netz?',
                  description: 'Sie sind sich nicht sicher, ob Ihre Daten geschützt sind? Wir sorgen für umfassende Sicherheit und erklären alles verständlich.',
                },
                {
                  icon: '💼',
                  title: 'Technik-Chaos im Büro?',
                  description: 'Ihre IT-Infrastruktur ist unübersichtlich und ineffizient? Wir bringen Ordnung in Ihre digitale Welt und optimieren Ihre Prozesse.',
                },
              ].map((problem, index) => (
                <Card key={index} delay={index * 0.1}>
                  <div className="p-8 text-center">
                    <div className="text-5xl mb-4">{problem.icon}</div>
                    <h3 className="text-xl font-display font-semibold text-primary mb-3">
                      {problem.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Nischen Section */}
        <section className="section">
          <div className="container-custom">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-2 mb-4">Spezialisiert auf Ihre Bedürfnisse</h2>
              <p className="text-body max-w-2xl mx-auto">
                Wir verstehen, dass jeder unterschiedliche Anforderungen hat. Deshalb haben wir uns auf drei Bereiche spezialisiert.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Senioren-Support */}
              <Card delay={0}>
                <div className="relative h-64 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-t-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl">👴</div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-semibold text-primary mb-3">
                    Geduld & Technik
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    Wir erklären alles in Ruhe und ohne Fachchinesisch. Bei Ihnen zu Hause.
                  </p>
                  <Button href="/services#senioren" variant="outline" fullWidth>
                    Mehr erfahren
                  </Button>
                </div>
              </Card>

              {/* Home-Office */}
              <Card delay={0.1}>
                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl">🏠</div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-semibold text-primary mb-3">
                    Ihr Büro. Sicher. Schnell.
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    Sorgen Sie für professionelle Technik und Sicherheit in Ihren eigenen vier Wänden.
                  </p>
                  <Button href="/services#home-office" variant="outline" fullWidth>
                    Mehr erfahren
                  </Button>
                </div>
              </Card>

              {/* KMU */}
              <Card delay={0.2}>
                <div className="relative h-64 bg-gradient-to-br from-accent/20 to-accent/5 rounded-t-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl">🔧</div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-semibold text-primary mb-3">
                    Digitalisierung für Macher
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    Wir machen Ihr Unternehmen fit für die Zukunft – oft mit staatlicher Förderung.
                  </p>
                  <Button href="/services#kmu" variant="outline" fullWidth>
                    Mehr erfahren
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gradient-primary text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Bereit für sorgenfreie IT?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Entdecken Sie unsere Abonnement-Pakete und finden Sie die perfekte Lösung für Ihre Bedürfnisse.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/abonnements/privat" variant="secondary" size="lg">
                  Privatkunden-Pakete
                </Button>
                <Button href="/abonnements/unternehmen" variant="primary" size="lg">
                  Business-Pakete
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
