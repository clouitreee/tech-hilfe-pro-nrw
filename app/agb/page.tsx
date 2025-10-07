"use client";

import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';

export default function AGBPage() {
  return (
    <>
      <Navigation />

      <main className="pt-20">
        <section className="section">
          <div className="container-custom">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="heading-1 mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

              <div className="prose prose-lg max-w-none text-neutral-700">
                <p>Stand: Oktober 2025</p>

                <h2 className="text-primary">1. Geltungsbereich</h2>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der Tech Hilfe Pro NRW (nachfolgend "Anbieter") und ihren Kunden (nachfolgend "Kunde") über die Erbringung von IT-Dienstleistungen und den Abschluss von Abonnement-Verträgen.
                </p>

                <h2 className="text-primary">2. Vertragsgegenstand</h2>
                <p>
                  Gegenstand des Vertrages ist die Erbringung von IT-Dienstleistungen im Rahmen der auf der Webseite beschriebenen Service-Pakete (Abonnements). Der genaue Leistungsumfang ergibt sich aus der jeweiligen Paketbeschreibung zum Zeitpunkt des Vertragsschlusses.
                </p>

                <h2 className="text-primary">3. Zustandekommen des Vertrages</h2>
                <p>
                  Die Darstellung der Abonnements auf der Webseite stellt kein rechtlich bindendes Angebot dar, sondern eine Aufforderung zur Abgabe einer Bestellung. Durch Anklicken des Buttons "Jetzt abonnieren" und Abschluss des Zahlungsvorgangs gibt der Kunde ein verbindliches Angebot zum Abschluss eines Abonnement-Vertrages ab. Der Vertrag kommt zustande, wenn der Anbieter die Bestellung durch eine Bestätigungs-E-Mail annimmt.
                </p>

                <h2 className="text-primary">4. Preise und Zahlungsbedingungen</h2>
                <p>
                  Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung für Abonnements erfolgt monatlich im Voraus über den Zahlungsdienstleister Stripe. Der Kunde ermächtigt den Anbieter, die fälligen Beträge über die gewählte Zahlungsmethode einzuziehen.
                </p>

                <h2 className="text-primary">5. Laufzeit und Kündigung der Abonnements</h2>
                <p>
                  Die Abonnement-Verträge haben keine Mindestlaufzeit und können von beiden Parteien jederzeit mit einer Frist von 14 Tagen zum Ende des jeweiligen monatlichen Abrechnungszeitraums gekündigt werden. Die Kündigung bedarf der Textform (z.B. E-Mail).
                </p>

                <h2 className="text-primary">6. Pflichten des Kunden</h2>
                <p>
                  Der Kunde ist verpflichtet, dem Anbieter alle für die Leistungserbringung notwendigen Informationen und Zugänge (z.B. zu Systemen) zur Verfügung zu stellen. Der Kunde ist für die regelmäßige Sicherung seiner Daten selbst verantwortlich, sofern nicht explizit ein Backup-Service Teil des gebuchten Pakets ist. Der Kunde verpflichtet sich, Passwörter sicher aufzubewahren und nicht an Dritte weiterzugeben.
                </p>

                <h2 className="text-primary">7. Haftung</h2>
                <p>
                  Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht). In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Der Anbieter haftet nicht für Datenverlust, sofern dieser nicht durch grob fahrlässiges oder vorsätzliches Handeln des Anbieters verursacht wurde. Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.
                </p>

                <h2 className="text-primary">8. Datenschutz</h2>
                <p>
                  Der Anbieter verarbeitet personenbezogene Daten des Kunden zweckgebunden und gemäß den gesetzlichen Bestimmungen. Die Einzelheiten der Datenverarbeitung sind in der Datenschutzerklärung auf der Webseite des Anbieters geregelt.
                </p>

                <h2 className="text-primary">9. Schlussbestimmungen</h2>
                <p>
                  Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist, soweit gesetzlich zulässig, der Sitz des Anbieters. Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
