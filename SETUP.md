# Tech Hilfe Pro NRW - Setup-Anleitung

## Übersicht

Diese Anleitung führt Sie durch die Einrichtung der Backend-Services (Supabase und Stripe) für die Tech Hilfe Pro NRW Website.

---

## 1. Supabase Setup

### 1.1. Projekt erstellen

1. Gehen Sie zu [supabase.com](https://supabase.com) und erstellen Sie ein kostenloses Konto
2. Erstellen Sie ein neues Projekt
3. Wählen Sie eine Region (Frankfurt für Deutschland empfohlen)
4. Notieren Sie sich die Projekt-URL und die API-Keys

### 1.2. Datenbank-Schema einrichten

1. Öffnen Sie den SQL-Editor in Ihrem Supabase-Dashboard
2. Kopieren Sie den Inhalt der Datei `supabase-schema.sql`
3. Führen Sie das SQL-Skript aus
4. Überprüfen Sie, ob die Tabellen `leads`, `subscriptions` und `blog_posts` erstellt wurden

### 1.3. Environment Variables setzen

Kopieren Sie die folgenden Werte aus Ihrem Supabase-Dashboard in die `.env.local` Datei:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Wichtig:** Der `SUPABASE_SERVICE_ROLE_KEY` sollte niemals im Frontend verwendet oder öffentlich gemacht werden!

---

## 2. Stripe Setup (Test-Modus)

### 2.1. Stripe-Konto erstellen

1. Gehen Sie zu [stripe.com](https://stripe.com) und erstellen Sie ein Konto
2. Aktivieren Sie den **Test-Modus** (Toggle oben rechts)
3. Navigieren Sie zu "Entwickler" → "API-Schlüssel"
4. Kopieren Sie den **Publishable Key** und **Secret Key**

### 2.2. Produkte und Preise erstellen

Erstellen Sie für jedes Abonnement-Paket ein Produkt mit wiederkehrender Zahlung:

#### Privatkunden-Pakete:

1. **Digital-Sorglos-Paket Basis**
   - Preis: €12,99 / Monat
   - Wiederkehrend: Monatlich
   - Kopieren Sie die Price-ID (beginnt mit `price_`)

2. **Digital-Sorglos-Paket Premium**
   - Preis: €29,99 / Monat
   - Wiederkehrend: Monatlich
   - Kopieren Sie die Price-ID

#### Business-Pakete:

3. **Business-Grundschutz**
   - Preis: €79 / Monat
   - Wiederkehrend: Monatlich
   - Kopieren Sie die Price-ID

4. **Business-Wachstum**
   - Preis: €199 / Monat
   - Wiederkehrend: Monatlich
   - Kopieren Sie die Price-ID

### 2.3. Environment Variables setzen

Fügen Sie die Stripe-Konfiguration zu `.env.local` hinzu:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_BASIS=price_...
NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_PREMIUM=price_...
NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_GRUNDSCHUTZ=price_...
NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_WACHSTUM=price_...
```

### 2.4. Webhook einrichten

1. Gehen Sie zu "Entwickler" → "Webhooks" im Stripe-Dashboard
2. Klicken Sie auf "Endpunkt hinzufügen"
3. URL: `https://ihre-domain.de/api/webhooks/stripe`
4. Wählen Sie folgende Events aus:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Kopieren Sie den **Webhook-Signing-Secret** (beginnt mit `whsec_`)
6. Fügen Sie ihn zu `.env.local` hinzu:

```
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Für lokale Entwicklung:** Verwenden Sie die Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 3. Lokale Entwicklung starten

### 3.1. Dependencies installieren

```bash
npm install
```

### 3.2. Development Server starten

```bash
npm run dev
```

Die Website ist nun unter `http://localhost:3000` erreichbar.

### 3.3. Testen der Stripe-Integration

1. Navigieren Sie zu `/abonnements/privat` oder `/abonnements/unternehmen`
2. Klicken Sie auf "Jetzt abonnieren"
3. Verwenden Sie die Stripe-Test-Kartennummer: `4242 4242 4242 4242`
4. Beliebiges zukünftiges Ablaufdatum und beliebiger CVC
5. Nach erfolgreicher "Zahlung" sollten Sie zur Erfolgsseite weitergeleitet werden
6. Überprüfen Sie in Supabase, ob ein Eintrag in der `subscriptions`-Tabelle erstellt wurde

---

## 4. Deployment-Vorbereitung

### 4.1. Vercel

1. Verbinden Sie Ihr GitHub-Repository mit Vercel
2. Fügen Sie alle Environment Variables im Vercel-Dashboard hinzu
3. Aktualisieren Sie `NEXT_PUBLIC_SITE_URL` auf Ihre Produktions-URL
4. Aktualisieren Sie die Stripe-Webhook-URL auf Ihre Produktions-URL

### 4.2. Cloudflare Pages

1. Verbinden Sie Ihr GitHub-Repository mit Cloudflare Pages
2. Build-Befehl: `npm run build`
3. Output-Verzeichnis: `.next`
4. Fügen Sie alle Environment Variables hinzu
5. Aktualisieren Sie die URLs entsprechend

---

## 5. Produktions-Checkliste

Vor dem Live-Gang:

- [ ] Alle Environment Variables in der Produktionsumgebung gesetzt
- [ ] Supabase Row Level Security (RLS) Policies überprüft
- [ ] Stripe im **Live-Modus** aktiviert
- [ ] Neue Produkte und Preise im Stripe Live-Modus erstellt
- [ ] Webhook im Stripe Live-Modus konfiguriert
- [ ] Impressum, Datenschutzerklärung und AGB vollständig ausgefüllt
- [ ] SSL-Zertifikat aktiv
- [ ] Google Analytics (mit IP-Anonymisierung) eingerichtet
- [ ] Google Search Console verifiziert
- [ ] Sitemap eingereicht

---

## 6. Troubleshooting

### Stripe Checkout funktioniert nicht

- Überprüfen Sie, ob alle Price-IDs korrekt in `.env.local` eingetragen sind
- Stellen Sie sicher, dass Sie im Test-Modus sind
- Prüfen Sie die Browser-Konsole auf Fehlermeldungen

### Supabase-Verbindung schlägt fehl

- Überprüfen Sie die URL und API-Keys
- Stellen Sie sicher, dass die RLS-Policies korrekt konfiguriert sind
- Prüfen Sie, ob die Tabellen existieren

### Webhooks werden nicht empfangen

- Für lokale Entwicklung: Verwenden Sie die Stripe CLI
- Für Produktion: Überprüfen Sie die Webhook-URL und das Signing-Secret
- Prüfen Sie die Webhook-Logs im Stripe-Dashboard

---

## Support

Bei Fragen oder Problemen:
- Supabase-Dokumentation: [supabase.com/docs](https://supabase.com/docs)
- Stripe-Dokumentation: [stripe.com/docs](https://stripe.com/docs)
- Next.js-Dokumentation: [nextjs.org/docs](https://nextjs.org/docs)
