'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';

export default function ImpressumPage() {
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
              <h1 className="heading-1 mb-8">Impressum</h1>

              <div className="prose prose-lg max-w-none text-neutral-700">
                <h2 className="text-primary">Angaben gemäß § 5 TMG</h2>
                <p>
                  Tech Hilfe Pro<br />
                  Inhaber: José Carlos Martin Lache<br />
                  [Bitte trage hier deine vollständige Geschäftsadresse ein]
                </p>

                <h2 className="text-primary">Kontakt</h2>
                <p>
                  Telefon: <a href="tel:+4915565029989" className="text-secondary hover:underline">+49 15565029989</a><br />
                  E-Mail: <a href="mailto:info@techhilfepro.de" className="text-secondary hover:underline">info@techhilfepro.de</a><br />
                  Webseite: <a href="https://techhilfepro.de" className="text-secondary hover:underline">https://techhilfepro.de</a>
                </p>

                <h2 className="text-primary">Umsatzsteuer</h2>
                <p>
                  Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet und ausgewiesen.
                </p>

                <h2 className="text-primary">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                <p>
                  José Carlos Martin Lache<br />
                  [Bitte trage hier deine vollständige Geschäftsadresse ein]
                </p>

                <h2 className="text-primary">Haftungsausschluss (Disclaimer)</h2>

                <h3>Haftung für Inhalte</h3>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>

                <h3>Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>

                <h3>Urheberrecht</h3>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
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
