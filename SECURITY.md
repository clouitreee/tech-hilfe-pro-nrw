# Security & GDPR Compliance Documentation

**Version:** 1.0  
**Datum:** 07. Oktober 2025  
**Status:** Production-Ready

---

## Übersicht

Diese Dokumentation beschreibt die implementierten Sicherheitsmaßnahmen und DSGVO-Compliance-Features für die Tech Hilfe Pro Website.

---

## 1. Security Headers

### Implementierung
Datei: `next.config.ts`

### Konfigurierte Headers

#### Content-Security-Policy (CSP)
```
default-src 'self'
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://va.vercel-scripts.com
style-src 'self' 'unsafe-inline'
img-src 'self' data: https: blob:
font-src 'self' data:
connect-src 'self' https://*.supabase.co https://api.stripe.com https://vitals.vercel-insights.com
frame-src 'self' https://js.stripe.com
object-src 'none'
base-uri 'self'
form-action 'self'
frame-ancestors 'self'
upgrade-insecure-requests
```

**Zweck:** Verhindert XSS-Angriffe und unerwünschte externe Ressourcen

#### Strict-Transport-Security (HSTS)
```
max-age=63072000; includeSubDomains; preload
```

**Zweck:** Erzwingt HTTPS-Verbindungen für 2 Jahre

#### X-Frame-Options
```
SAMEORIGIN
```

**Zweck:** Verhindert Clickjacking-Angriffe

#### X-Content-Type-Options
```
nosniff
```

**Zweck:** Verhindert MIME-Type-Sniffing

#### Referrer-Policy
```
origin-when-cross-origin
```

**Zweck:** Kontrolliert, welche Referrer-Informationen gesendet werden

#### Permissions-Policy
```
camera=(), microphone=(), geolocation=()
```

**Zweck:** Deaktiviert unnötige Browser-Features

---

## 2. GDPR Cookie Consent Banner

### Implementierung
- **Library:** `vanilla-cookieconsent` v3.x
- **Komponente:** `components/CookieConsentBanner.tsx`
- **Integration:** `app/layout.tsx`

### Features

#### ✅ DSGVO-konform
- **Opt-in-Prinzip:** Nutzer müssen aktiv zustimmen
- **Granulare Kontrolle:** Kategorien einzeln wählbar
- **Widerrufsmöglichkeit:** Jederzeit änderbar
- **Deutsche Sprache:** Vollständig lokalisiert

#### Cookie-Kategorien

1. **Notwendige Cookies** (immer aktiv)
   - Session-Management
   - Sicherheits-Tokens
   - CSRF-Schutz

2. **Analyse-Cookies** (optional)
   - Google Analytics
   - Anonymisierte Nutzungsstatistiken

3. **Marketing-Cookies** (optional)
   - Werbe-Tracking
   - Conversion-Tracking

### Konfiguration

```typescript
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
}
```

### Links
- **Datenschutzerklärung:** `/datenschutz`
- **Impressum:** `/impressum`

---

## 3. Spam-Schutz (Honeypot)

### Implementierung
Datei: `components/forms/ContactForm.tsx`

### Funktionsweise

#### Honeypot-Feld
```tsx
<div className="hidden" aria-hidden="true">
  <input
    type="text"
    id="website"
    name="website"
    value={formData.website}
    onChange={handleChange}
    tabIndex={-1}
    autoComplete="off"
  />
</div>
```

**Eigenschaften:**
- `className="hidden"` - Unsichtbar für Menschen
- `aria-hidden="true"` - Ignoriert von Screenreadern
- `tabIndex={-1}` - Nicht per Tab erreichbar
- `autoComplete="off"` - Keine Browser-Autofill

#### Server-Side Validation
```typescript
// Honeypot spam protection - if filled, silently reject
if (formData.website) {
  // Pretend success to the bot
  setStatus('success');
  return;
}
```

**Verhalten:**
- Wenn Feld ausgefüllt → Spam erkannt
- Keine Fehlermeldung → Bot denkt, es hat funktioniert
- Keine Datenbank-Speicherung
- Keine E-Mail-Benachrichtigung

### Vorteile
- ✅ Keine CAPTCHA-Frustration für Nutzer
- ✅ Barrierefrei (Screenreader-kompatibel)
- ✅ Effektiv gegen automatisierte Bots
- ✅ Keine externen Services erforderlich

---

## 4. Datenschutz-Compliance

### DSGVO-Anforderungen

#### ✅ Rechtliche Seiten
- **Impressum:** `/impressum` - § 5 TMG konform
- **Datenschutzerklärung:** `/datenschutz` - Art. 13 DSGVO konform
- **AGB:** `/agb` - Geschäftsbedingungen

#### ✅ Datenverarbeitung
- **Zweckbindung:** Nur für angefragten Service
- **Datenminimierung:** Nur notwendige Daten
- **Speicherbegrenzung:** Automatische Löschung nach 2 Jahren
- **Transparenz:** Klare Information über Datennutzung

#### ✅ Nutzerrechte
- **Auskunftsrecht:** Art. 15 DSGVO
- **Löschrecht:** Art. 17 DSGVO
- **Widerspruchsrecht:** Art. 21 DSGVO
- **Datenportabilität:** Art. 20 DSGVO

### Kontaktformular-Consent
```tsx
<input
  type="checkbox"
  id="gdprConsent"
  name="gdprConsent"
  checked={formData.gdprConsent}
  onChange={handleChange}
  required
/>
<label htmlFor="gdprConsent">
  Ich habe die Datenschutzerklärung gelesen und bin damit 
  einverstanden, dass meine Daten zur Bearbeitung meiner 
  Anfrage gespeichert werden. *
</label>
```

**Eigenschaften:**
- Pflichtfeld (`required`)
- Link zur Datenschutzerklärung
- Explizite Zustimmung erforderlich

---

## 5. Externe Services & Datenschutz

### Stripe (Zahlungsabwicklung)
- **Datenübertragung:** Nur bei Checkout
- **PCI-DSS-konform:** Stripe-zertifiziert
- **Keine Kartendaten:** Direkt an Stripe
- **Webhook-Verifizierung:** Signatur-Prüfung

### Supabase (Datenbank)
- **EU-Hosting:** Frankfurt/Amsterdam
- **Verschlüsselung:** TLS 1.3
- **Row Level Security (RLS):** Aktiviert
- **Backup:** Automatisch täglich

### Self-Hosted Fonts
- **Google Fonts:** Via `next/font` self-hosted
- **Keine CDN-Anfragen:** DSGVO-konform
- **Keine Tracking-Cookies:** Datenschutz gewährleistet

---

## 6. Best Practices

### Implementiert

#### ✅ Input-Validierung
- Client-side: HTML5 + React
- Server-side: Supabase RLS
- Sanitization: Automatisch

#### ✅ CSRF-Schutz
- Next.js: Automatisch
- Supabase: API-Keys
- Stripe: Webhook-Signaturen

#### ✅ Rate Limiting
- Cloudflare: DDoS-Schutz
- Supabase: API-Limits
- Stripe: Automatisch

#### ✅ Error Handling
- Keine sensiblen Daten in Fehlermeldungen
- Generische Fehlertexte für Nutzer
- Detaillierte Logs nur server-side

---

## 7. Monitoring & Wartung

### Empfohlene Checks

#### Monatlich
- [ ] Security Headers testen (securityheaders.com)
- [ ] SSL/TLS-Zertifikat prüfen (ssllabs.com)
- [ ] Cookie-Banner-Funktionalität testen
- [ ] Spam-Submissions prüfen

#### Quartalsweise
- [ ] Dependency-Updates (`npm audit`)
- [ ] CSP-Policy überprüfen und anpassen
- [ ] Datenschutzerklärung aktualisieren
- [ ] Penetration-Test durchführen

#### Jährlich
- [ ] DSGVO-Compliance-Audit
- [ ] Sicherheits-Audit durch Experten
- [ ] Datenschutz-Folgenabschätzung
- [ ] Mitarbeiter-Schulung

---

## 8. Incident Response

### Bei Sicherheitsvorfall

1. **Sofortmaßnahmen:**
   - Betroffene Systeme isolieren
   - Zugriffe sperren
   - Logs sichern

2. **Analyse:**
   - Umfang ermitteln
   - Betroffene Daten identifizieren
   - Ursache feststellen

3. **Meldepflicht (DSGVO):**
   - Aufsichtsbehörde: Innerhalb 72h
   - Betroffene Nutzer: Unverzüglich
   - Dokumentation: Vollständig

4. **Behebung:**
   - Sicherheitslücke schließen
   - Systeme wiederherstellen
   - Monitoring verstärken

---

## 9. Kontakt

### Datenschutzbeauftragter
**E-Mail:** info@techhilfepro.de  
**Telefon:** +49 15565029989

### Technischer Support
**GitHub:** https://github.com/clouitreee/tech-hilfe-pro-nrw  
**Issues:** Sicherheitsprobleme bitte privat melden

---

## 10. Changelog

### Version 1.0 (07.10.2025)
- ✅ Security Headers implementiert
- ✅ GDPR Cookie Banner integriert
- ✅ Honeypot Spam-Schutz aktiviert
- ✅ Self-Hosted Fonts (DSGVO-konform)
- ✅ Dokumentation erstellt

---

**Status:** ✅ Production-Ready  
**Compliance:** DSGVO, BDSG, TMG  
**Letzte Überprüfung:** 07. Oktober 2025
