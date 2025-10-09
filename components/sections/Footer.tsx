// MANUS: Implementación solicitada - Footer bereinigen auf Homepage
"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

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
              {/* WhatsApp */}
              <a
                href="https://wa.me/4915565029989"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
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
                  Schirmerstr. 7, 50823 Köln, Deutschland
                </span>
              </li>
              <li>
                <a
                  href="tel:+4915565029989"
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
                  <span className="text-sm">+49 15565029989</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@techhilfepro.de"
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
                  <span className="text-sm">info@techhilfepro.de</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* MANUS: Implementación solicitada - Inhaber nur auf Unterseiten */}
            <p className="text-neutral-300 text-sm">
              © {currentYear} Tech Hilfe Pro{pathname !== "/" && " - Inhaber: José Carlos Martin Lache"}. Alle Rechte vorbehalten.
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
