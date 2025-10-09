"use client";

import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';

const faqs = [
  {
    category: 'Allgemein',
    questions: [
      {
        q: 'Gibt es eine Vertragslaufzeit?',
        a: 'Nein, alle unsere Pakete sind monatlich kündbar. Sie gehen keine langfristige Verpflichtung ein und können jederzeit zum Ende des Monats kündigen.',
      },
      {
        q: 'Sind meine Daten sicher?',
        a: 'Absolut. Wir arbeiten zu 100% DSGVO-konform, nutzen verschlüsselte Verbindungen und speichern Ihre Daten ausschließlich auf Servern in Deutschland. Ihre Privatsphäre und Datensicherheit haben für uns höchste Priorität.',
      },
      {
        q: 'Kann ich das Paket wechseln?',
        a: 'Ja, Sie können jederzeit zwischen den Paketen wechseln. Ein Upgrade ist sofort möglich, bei einem Downgrade erfolgt die Änderung zum nächsten Abrechnungszeitraum.',
      },
    ],
  },
  {
    category: 'Privatkunden',
    questions: [
      {
        q: 'Was bedeutet "proaktives Monitoring"?',
        a: 'Proaktives Monitoring bedeutet, dass wir Ihre Geräte kontinuierlich überwachen und potenzielle Probleme erkennen, bevor sie zu echten Störungen werden. So können wir oft eingreifen, bevor Sie überhaupt merken, dass etwas nicht stimmt.',
      },
      {
        q: 'Wie funktioniert der Remote-Support?',
        a: 'Per Remote-Support können wir uns – mit Ihrer Erlaubnis – sicher auf Ihren Computer aufschalten und Probleme direkt beheben, als säßen wir neben Ihnen. Das spart Zeit und ist oft schneller als ein Vor-Ort-Termin.',
      },
      {
        q: 'Bieten Sie auch Hilfe für Smartphones und Tablets an?',
        a: 'Ja, unser "Digital-Sorglos-Paket Premium" deckt bis zu 4 Geräte ab, einschließlich PCs, Macs, Smartphones und Tablets.',
      },
    ],
  },
  {
    category: 'Unternehmen',
    questions: [
      {
        q: 'Was ist NIS2 und betrifft es mein Unternehmen?',
        a: 'NIS2 ist eine EU-Richtlinie zur Cybersicherheit, die ab Oktober 2024 gilt. Sie betrifft viele Branchen, insbesondere kritische Infrastrukturen und deren Zulieferer. Wir prüfen gerne kostenlos, ob Ihr Unternehmen betroffen ist.',
      },
      {
        q: 'Wie funktioniert die Fördermittelberatung?',
        a: 'Wir analysieren Ihre Situation und prüfen, welche Förderprogramme für Sie in Frage kommen. Dann unterstützen wir Sie bei der Antragstellung und der Umsetzung der geförderten Maßnahmen.',
      },
      {
        q: 'Was passiert bei einem IT-Notfall?',
        a: 'Je nach Paket garantieren wir Ihnen eine Reaktionszeit von 1 bis 8 Stunden. In kritischen Fällen sind wir auch außerhalb der Geschäftszeiten für Sie erreichbar.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <Navigation />

      <main className="pt-20">
        <section className="section bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="heading-hero mb-6">Häufig gestellte Fragen (FAQ)</h1>
              <p className="text-body max-w-2xl mx-auto">
                Hier finden Sie Antworten auf die häufigsten Fragen zu unseren Dienstleistungen und Paketen.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto space-y-12">
              {faqs.map((category, catIndex) => (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                >
                  <h2 className="heading-2 mb-8 border-b-2 border-secondary pb-4">
                    {category.category}
                  </h2>
                  <div className="space-y-6">
                    {category.questions.map((faq, qIndex) => (
                      <details
                        key={qIndex}
                        className="bg-white rounded-xl p-6 shadow-soft group"
                      >
                        <summary className="font-display font-semibold text-primary text-lg cursor-pointer list-none flex justify-between items-center">
                          {faq.q}
                          <svg
                            className="w-5 h-5 text-secondary transform transition-transform duration-300 group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </summary>
                        <div className="text-neutral-600 leading-relaxed mt-4">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-16 p-8 bg-neutral-50 rounded-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2 className="heading-2 mb-4">Ihre Frage wurde nicht beantwortet?</h2>
              <p className="text-body mb-6 max-w-xl mx-auto">
                Kein Problem. Unser Team ist bereit, Ihnen persönlich weiterzuhelfen. Zögern Sie nicht, uns zu kontaktieren.
              </p>
              <a href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-accent text-white hover:bg-accent-dark hover:shadow-glow-accent focus:ring-accent">
                Kontakt aufnehmen
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

