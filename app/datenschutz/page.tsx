'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';

export default function DatenschutzPage() {
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
              <h1 className="heading-1 mb-8">Datenschutzerklärung</h1>

              <div className="prose prose-lg max-w-none text-neutral-700">
                <p>
                  Wir freuen uns sehr über Ihr Interesse an unserem Unternehmen. Datenschutz hat einen besonders hohen Stellenwert für die Geschäftsleitung der Tech Hilfe Pro NRW. Eine Nutzung der Internetseiten der Tech Hilfe Pro NRW ist grundsätzlich ohne jede Angabe personenbezogener Daten möglich. Sofern eine betroffene Person besondere Services unseres Unternehmens über unsere Internetseite in Anspruch nehmen möchte, könnte jedoch eine Verarbeitung personenbezogener Daten erforderlich werden. Ist die Verarbeitung personenbezogener Daten erforderlich und besteht für eine solche Verarbeitung keine gesetzliche Grundlage, holen wir generell eine Einwilligung der betroffenen Person ein.
                </p>

                <h2 className="text-primary">1. Name und Anschrift des für die Verarbeitung Verantwortlichen</h2>
                <p>
                  Verantwortlicher im Sinne der Datenschutz-Grundverordnung, sonstiger in den Mitgliedstaaten der Europäischen Union geltenden Datenschutzgesetze und anderer Bestimmungen mit datenschutzrechtlichem Charakter ist die:
                </p>
                <p>
                  Tech Hilfe Pro NRW (Arbeitstitel)<br />
                  [Name des Inhabers/Geschäftsführers]<br />
                  [Straße und Hausnummer]<br />
                  [PLZ und Ort, z.B. 41460 Neuss]<br />
                  E-Mail: [Ihre E-Mail-Adresse]
                </p>

                <h2 className="text-primary">2. Erfassung von allgemeinen Daten und Informationen (Server-Logfiles)</h2>
                <p>
                  Die Internetseite der Tech Hilfe Pro NRW erfasst mit jedem Aufruf der Internetseite durch eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert. Erfasst werden können die (1) verwendeten Browsertypen und Versionen, (2) das vom zugreifenden System verwendete Betriebssystem, (3) die Internetseite, von welcher ein zugreifendes System auf unsere Internetseite gelangt (sogenannte Referrer), (4) die Unterwebseiten, welche über ein zugreifendes System auf unserer Internetseite angesteuert werden, (5) das Datum und die Uhrzeit eines Zugriffs auf die Internetseite, (6) eine Internet-Protokoll-Adresse (IP-Adresse), (7) der Internet-Service-Provider des zugreifenden Systems und (8) sonstige ähnliche Daten und Informationen, die der Gefahrenabwehr im Falle von Angriffen auf unsere informationstechnologischen Systeme dienen.
                </p>

                <h2 className="text-primary">3. Kontaktmöglichkeit über die Internetseite (Kontaktformular)</h2>
                <p>
                  Die Internetseite der Tech Hilfe Pro NRW enthält aufgrund von gesetzlichen Vorschriften Angaben, die eine schnelle elektronische Kontaktaufnahme zu unserem Unternehmen sowie eine unmittelbare Kommunikation mit uns ermöglichen, was ebenfalls eine allgemeine Adresse der sogenannten elektronischen Post (E-Mail-Adresse) umfasst. Sofern eine betroffene Person per E-Mail oder über ein Kontaktformular den Kontakt mit dem für die Verarbeitung Verantwortlichen aufnimmt, werden die von der betroffenen Person übermittelten personenbezogenen Daten automatisch gespeichert. Solche auf freiwilliger Basis von einer betroffenen Person an den für die Verarbeitung Verantwortlichen übermittelten personenbezogenen Daten werden für Zwecke der Bearbeitung oder der Kontaktaufnahme zur betroffenen Person gespeichert. Es erfolgt keine Weitergabe dieser personenbezogenen Daten an Dritte.
                </p>

                <h2 className="text-primary">4. Einbindung von Diensten und Inhalten Dritter</h2>
                
                <h3>Stripe (Zahlungsabwicklung)</h3>
                <p>
                  Wir nutzen den Zahlungsdienstleister Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland. Wenn Sie sich für ein kostenpflichtiges Abonnement entscheiden, werden Ihre Zahlungsdaten (z.B. Kreditkartennummer, IBAN) direkt von Stripe verarbeitet. Wir speichern keine vollständigen Zahlungsdaten auf unseren Systemen. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Weitere Informationen zum Datenschutz bei Stripe finden Sie unter: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer">https://stripe.com/de/privacy</a>.
                </p>

                <h3>Google Maps</h3>
                <p>
                  Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung. Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: <a href="https://www.google.de/intl/de/policies/privacy/" target="_blank" rel="noopener noreferrer">https://www.google.de/intl/de/policies/privacy/</a>.
                </p>

                <h3>Vercel (Hosting)</h3>
                <p>
                  Unsere Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet. Vercel erfasst Nutzungsdaten, einschließlich IP-Adressen, Systeminformationen und Besuchszeiten, um den Dienst bereitzustellen und zu sichern. Diese Verarbeitung ist für den Betrieb der Website erforderlich und basiert auf unserem berechtigten Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">https://vercel.com/legal/privacy-policy</a>.
                </p>

                <h2 className="text-primary">5. SSL- bzw. TLS-Verschlüsselung</h2>
                <p>
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>

                <h2 className="text-primary">6. Ihre Rechte als betroffene Person</h2>
                <p>
                  Sie haben das Recht:
                </p>
                <ul>
                  <li>gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen;</li>
                  <li>gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;</li>
                  <li>gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;</li>
                  <li>gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen;</li>
                  <li>gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesebaren Format zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu verlangen;</li>
                  <li>gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu widerrufen;</li>
                  <li>gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren.</li>
                </ul>

                <h2 className="text-primary">7. Aktualität und Änderung dieser Datenschutzerklärung</h2>
                <p>
                  Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Oktober 2025. Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
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
