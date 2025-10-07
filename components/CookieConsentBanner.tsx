'use client';

import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

export default function CookieConsentBanner() {
  useEffect(() => {
    CookieConsent.run({
      // Grundkonfiguration
      guiOptions: {
        consentModal: {
          layout: 'box inline',
          position: 'bottom left',
          equalWeightButtons: true,
          flipButtons: false
        },
        preferencesModal: {
          layout: 'box',
          position: 'right',
          equalWeightButtons: true,
          flipButtons: false
        }
      },

      // Cookie-Kategorien
      categories: {
        necessary: {
          readOnly: true,
          enabled: true
        },
        analytics: {
          enabled: false,
          readOnly: false
        },
        marketing: {
          enabled: false,
          readOnly: false
        }
      },

      // Deutsche Sprache (DSGVO-konform)
      language: {
        default: 'de',
        translations: {
          de: {
            consentModal: {
              title: '🍪 Cookie-Einstellungen',
              description: 'Wir verwenden Cookies, um Ihnen die bestmögliche Nutzung unserer Website zu ermöglichen. Einige Cookies sind für den Betrieb der Website notwendig, während andere uns helfen, die Website zu verbessern. Sie können selbst entscheiden, welche Kategorien Sie zulassen möchten.',
              acceptAllBtn: 'Alle akzeptieren',
              acceptNecessaryBtn: 'Nur notwendige',
              showPreferencesBtn: 'Einstellungen verwalten',
              footer: '<a href="/datenschutz">Datenschutzerklärung</a>\n<a href="/impressum">Impressum</a>'
            },
            preferencesModal: {
              title: 'Cookie-Einstellungen verwalten',
              acceptAllBtn: 'Alle akzeptieren',
              acceptNecessaryBtn: 'Nur notwendige',
              savePreferencesBtn: 'Einstellungen speichern',
              closeIconLabel: 'Schließen',
              serviceCounterLabel: 'Dienst|Dienste',
              sections: [
                {
                  title: 'Cookie-Nutzung',
                  description: 'Wir verwenden Cookies, um grundlegende Funktionen der Website zu ermöglichen und Ihr Erlebnis zu verbessern. Sie können für jede Kategorie wählen, ob Sie sie aktivieren/deaktivieren möchten. Weitere Informationen finden Sie in unserer <a href="/datenschutz" class="cc-link">Datenschutzerklärung</a>.'
                },
                {
                  title: 'Notwendige Cookies <span class="pm__badge">Immer aktiviert</span>',
                  description: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Ohne diese Cookies würde die Website nicht richtig funktionieren.',
                  linkedCategory: 'necessary'
                },
                {
                  title: 'Analyse-Cookies',
                  description: 'Diese Cookies sammeln Informationen darüber, wie Sie unsere Website nutzen. Alle Daten werden anonymisiert und können nicht verwendet werden, um Sie zu identifizieren.',
                  linkedCategory: 'analytics',
                  cookieTable: {
                    headers: {
                      name: 'Cookie',
                      domain: 'Domain',
                      expiration: 'Ablauf',
                      description: 'Beschreibung'
                    },
                    body: [
                      {
                        name: '_ga',
                        domain: location.hostname,
                        expiration: '2 Jahre',
                        description: 'Google Analytics Cookie zur Unterscheidung von Benutzern'
                      },
                      {
                        name: '_gid',
                        domain: location.hostname,
                        expiration: '24 Stunden',
                        description: 'Google Analytics Cookie zur Unterscheidung von Benutzern'
                      }
                    ]
                  }
                },
                {
                  title: 'Marketing-Cookies',
                  description: 'Diese Cookies werden verwendet, um Werbung anzuzeigen, die für Sie und Ihre Interessen relevant ist. Sie werden auch verwendet, um die Anzahl der Anzeigen zu begrenzen und die Effektivität von Werbekampagnen zu messen.',
                  linkedCategory: 'marketing'
                },
                {
                  title: 'Weitere Informationen',
                  description: 'Bei Fragen zu unserer Cookie-Richtlinie und Ihren Auswahlmöglichkeiten wenden Sie sich bitte an uns unter <a class="cc-link" href="mailto:info@techhilfepro.de">info@techhilfepro.de</a>.'
                }
              ]
            }
          }
        }
      }
    });
  }, []);

  return null;
}
