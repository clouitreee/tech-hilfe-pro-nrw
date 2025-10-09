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
          <motion.div
            className="absolute bottom-32 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"
            animate={{
              y: [0, 40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          <div className="container-custom relative z-10 py-32">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                data-animate
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Badge */}
                <motion.div
                  data-animate
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white text-sm font-medium">Vertrauenswürdiger IT-Partner seit 2020</span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight">
                  Ihre persönliche<br />
                  <span className="text-secondary">IT-Hilfe</span> in NRW
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
                  Professioneller IT-Support für Privatkunden und Unternehmen.<br />
                  <span className="text-white/80 text-lg">Sicher, verständlich und immer für Sie da.</span>
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button href="/kontakt" variant="primary" size="lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Kostenloses Erstgespräch
                  </Button>
                  <Button href="/abonnements" variant="secondary" size="lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Abonnements ansehen
                  </Button>
                </div>

                {/* Contact Info */}
                <motion.div
                  data-animate
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-white font-medium">+49 15565029989</span>
                  <span className="text-white/60">|</span>
                  <span className="text-white/80 text-sm">Mo-Fr 9-18 Uhr</span>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                data-animate
                className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-center">
                    <div className="text-white font-semibold mb-1">100% DSGVO-konform</div>
                    <div className="text-white/60 text-sm">Ihre Daten sind sicher</div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div className="text-center">
                    <div className="text-white font-semibold mb-1">Keine Vertragslaufzeit</div>
                    <div className="text-white/60 text-sm">Monatlich kündbar</div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-center">
                    <div className="text-white font-semibold mb-1">Lokal in NRW</div>
                    <div className="text-white/60 text-sm">Persönlich vor Ort</div>
                  </div>
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
