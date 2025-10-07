export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">TH</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight">
                  Tech Hilfe Pro
                </span>
                <span className="text-secondary text-xs font-medium">NRW</span>
              </div>
            </div>
            <p className="text-neutral-200 text-sm mb-4">
              Ihr persönlicher IT-Partner für ein sicheres digitales Leben und Arbeiten.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons - Placeholder */}
              <a
                href="#"
                className="w-8 h-8 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <span className="text-sm">f</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-sm">in</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Schnellzugriff</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-neutral-200 hover:text-secondary transition-colors">
                  Start
                </a>
              </li>
              <li>
                <a href="/services" className="text-neutral-200 hover:text-secondary transition-colors">
                  Leistungen
                </a>
              </li>
              <li>
                <a href="/abonnements" className="text-neutral-200 hover:text-secondary transition-colors">
                  Abonnements
                </a>
              </li>
              <li>
                <a href="/blog" className="text-neutral-200 hover:text-secondary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/ueber-uns" className="text-neutral-200 hover:text-secondary transition-colors">
                  Über uns
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Leistungen</h3>
            <ul className="space-y-2">
              <li>
                <a href="/services#privat" className="text-neutral-200 hover:text-secondary transition-colors">
                  Für Privatkunden
                </a>
              </li>
              <li>
                <a href="/services#unternehmen" className="text-neutral-200 hover:text-secondary transition-colors">
                  Für Unternehmen
                </a>
              </li>
              <li>
                <a href="/services#senioren" className="text-neutral-200 hover:text-secondary transition-colors">
                  Senioren-Support
                </a>
              </li>
              <li>
                <a href="/services#home-office" className="text-neutral-200 hover:text-secondary transition-colors">
                  Home-Office
                </a>
              </li>
              <li>
                <a href="/services#nis2" className="text-neutral-200 hover:text-secondary transition-colors">
                  NIS2-Compliance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3 text-neutral-200">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm">
                  Nordrhein-Westfalen<br />
                  Köln, Düsseldorf, Neuss
                </span>
              </li>
              <li>
                <a
                  href="tel:+49123456789"
                  className="flex items-center hover:text-secondary transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm">+49 (0) 123 456789</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@techhilfepro-nrw.de"
                  className="flex items-center hover:text-secondary transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">info@techhilfepro-nrw.de</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-300 text-sm">
              © {currentYear} Tech Hilfe Pro NRW. Alle Rechte vorbehalten.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="/impressum" className="text-neutral-300 hover:text-secondary transition-colors">
                Impressum
              </a>
              <a href="/datenschutz" className="text-neutral-300 hover:text-secondary transition-colors">
                Datenschutz
              </a>
              <a href="/agb" className="text-neutral-300 hover:text-secondary transition-colors">
                AGB
              </a>
              <a href="/faq" className="text-neutral-300 hover:text-secondary transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
