# Deployment-Anleitung: Tech Hilfe Pro NRW auf Cloudflare Pages

Diese Anleitung führt Sie Schritt für Schritt durch das Deployment Ihrer Next.js-Anwendung auf Cloudflare Pages.

## Voraussetzungen

- ✅ GitHub-Repository: `clouitreee/tech-hilfe-pro-nrw`
- ✅ Cloudflare-Account (kostenlos unter https://dash.cloudflare.com/sign-up)
- ✅ Stripe-Account (Test-Modus Keys)
- ✅ Supabase-Projekt (API Keys)

---

## Schritt 1: Cloudflare Pages-Projekt erstellen

### 1.1 Cloudflare Dashboard öffnen
1. Gehen Sie zu https://dash.cloudflare.com
2. Melden Sie sich mit Ihrem Account an
3. Klicken Sie in der linken Seitenleiste auf **"Workers & Pages"**

### 1.2 Neues Pages-Projekt erstellen
1. Klicken Sie auf den Button **"Create application"**
2. Wählen Sie den Tab **"Pages"**
3. Klicken Sie auf **"Connect to Git"**

### 1.3 GitHub-Repository verbinden
1. Wenn Sie GitHub noch nicht verbunden haben:
   - Klicken Sie auf **"Connect GitHub"**
   - Autorisieren Sie Cloudflare für Ihr GitHub-Konto
   - Wählen Sie, ob Sie Zugriff auf alle Repositories oder nur auf ausgewählte geben möchten

2. Wählen Sie das Repository **`clouitreee/tech-hilfe-pro-nrw`** aus der Liste
3. Klicken Sie auf **"Begin setup"**

---

## Schritt 2: Build-Konfiguration

### 2.1 Projekt-Einstellungen
Cloudflare sollte Next.js automatisch erkennen. Überprüfen Sie folgende Einstellungen:

| Einstellung | Wert |
|------------|------|
| **Project name** | `tech-hilfe-pro-nrw` (oder Ihr Wunschname) |
| **Production branch** | `main` |
| **Framework preset** | `Next.js` (automatisch erkannt) |
| **Build command** | `npm run build` oder `npx @cloudflare/next-on-pages@1` |
| **Build output directory** | `.vercel/output/static` |
| **Root directory** | `/` (leer lassen) |

### 2.2 Wichtiger Hinweis zu Next.js auf Cloudflare
Cloudflare Pages unterstützt Next.js durch den `@cloudflare/next-on-pages` Adapter. Dieser wurde bereits in Ihrem Projekt vorbereitet.

**Falls der Build fehlschlägt**, müssen Sie möglicherweise das Package installieren:
```bash
npm install --save-dev @cloudflare/next-on-pages
```

Und in der `package.json` das Build-Script anpassen:
```json
{
  "scripts": {
    "build": "npx @cloudflare/next-on-pages@1"
  }
}
```

---

## Schritt 3: Umgebungsvariablen konfigurieren

### 3.1 Umgebungsvariablen hinzufügen
1. Scrollen Sie auf der Setup-Seite nach unten zu **"Environment variables"**
2. Klicken Sie auf **"Add variable"** für jede Variable

### 3.2 Erforderliche Variablen

Fügen Sie folgende Umgebungsvariablen hinzu:

#### Stripe-Konfiguration
| Variable Name | Beschreibung | Beispielwert |
|--------------|--------------|--------------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Public Key (Test-Modus) | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Stripe Secret Key (Test-Modus) | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Secret (wird später erstellt) | `whsec_...` |

**Stripe Keys finden:**
- Gehen Sie zu https://dashboard.stripe.com/test/apikeys
- Kopieren Sie den **Publishable key** und **Secret key**

#### Stripe Price IDs (Optional, für die 5 Pakete)
| Variable Name | Beschreibung |
|--------------|--------------|
| `NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_BASIS` | Price ID für "Digital-Sorglos-Paket Basis" |
| `NEXT_PUBLIC_STRIPE_PRICE_PRIVATE_PREMIUM` | Price ID für "Digital-Sorglos-Paket Premium" |
| `NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_GRUNDSCHUTZ` | Price ID für "Business-Grundschutz" |
| `NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_WACHSTUM` | Price ID für "Business-Wachstum" |

**Stripe Price IDs erstellen:**
1. Gehen Sie zu https://dashboard.stripe.com/test/products
2. Erstellen Sie für jedes Paket ein Produkt mit dem entsprechenden Preis
3. Kopieren Sie die Price ID (beginnt mit `price_...`)

#### Supabase-Konfiguration
| Variable Name | Beschreibung | Beispielwert |
|--------------|--------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Projekt-URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anonymous Key | `eyJhbGci...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key | `eyJhbGci...` |

**Supabase Keys finden:**
1. Gehen Sie zu https://app.supabase.com
2. Wählen Sie Ihr Projekt
3. Klicken Sie auf **Settings** → **API**
4. Kopieren Sie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Geheim halten!)

### 3.3 Variablen für Production und Preview
- Setzen Sie alle Variablen für **"Production"** UND **"Preview"** Umgebungen
- Für Preview können Sie die gleichen Test-Keys verwenden

---

## Schritt 4: Deployment starten

### 4.1 Erstes Deployment
1. Nachdem alle Einstellungen konfiguriert sind, klicken Sie auf **"Save and Deploy"**
2. Cloudflare beginnt mit dem Build-Prozess
3. Der erste Build dauert ca. 2-5 Minuten

### 4.2 Build-Prozess beobachten
- Sie sehen einen Live-Log des Build-Prozesses
- Bei Erfolg erscheint: ✅ **"Success! Your site is live!"**
- Bei Fehlern werden detaillierte Logs angezeigt

### 4.3 Live-URL erhalten
Nach erfolgreichem Deployment erhalten Sie eine URL im Format:
```
https://tech-hilfe-pro-nrw.pages.dev
```

oder mit einem zufälligen Suffix:
```
https://tech-hilfe-pro-nrw-abc.pages.dev
```

---

## Schritt 5: Cloudflare Functions (Serverseitige API-Routes)

### 5.1 Automatische Funktionsweise
Ihre Next.js API-Routes werden automatisch als **Cloudflare Functions** deployed:
- `/app/api/create-checkout-session/route.ts` → Cloudflare Function
- `/app/api/webhooks/stripe/route.ts` → Cloudflare Function

Diese laufen auf Cloudflares Edge-Netzwerk und sind global verfügbar.

### 5.2 Funktions-Limits (Free Plan)
- **100.000 Requests/Tag** (mehr als ausreichend für den Start)
- **10ms CPU-Zeit pro Request**
- Automatisches Scaling

---

## Schritt 6: Stripe Webhook konfigurieren

### 6.1 Webhook-Endpunkt erstellen
1. Gehen Sie zu https://dashboard.stripe.com/test/webhooks
2. Klicken Sie auf **"Add endpoint"**
3. Geben Sie die URL ein:
   ```
   https://ihre-domain.pages.dev/api/webhooks/stripe
   ```
4. Wählen Sie folgende Events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`

### 6.2 Webhook Secret kopieren
1. Nach dem Erstellen des Webhooks, klicken Sie auf den Webhook
2. Klicken Sie auf **"Reveal"** beim **Signing secret**
3. Kopieren Sie den Secret (beginnt mit `whsec_...`)

### 6.3 Webhook Secret zu Cloudflare hinzufügen
1. Gehen Sie zurück zu Cloudflare Pages
2. Wählen Sie Ihr Projekt → **Settings** → **Environment variables**
3. Fügen Sie hinzu:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_...` (Ihr kopierter Secret)
   - **Environment:** Production
4. Klicken Sie auf **"Save"**
5. Gehen Sie zu **Deployments** und klicken Sie auf **"Retry deployment"**

---

## Schritt 7: Supabase-Datenbank einrichten

### 7.1 SQL-Schema ausführen
1. Gehen Sie zu https://app.supabase.com
2. Wählen Sie Ihr Projekt
3. Klicken Sie auf **SQL Editor**
4. Öffnen Sie die Datei `supabase-schema.sql` aus Ihrem Repository
5. Kopieren Sie den gesamten Inhalt
6. Fügen Sie ihn in den SQL Editor ein
7. Klicken Sie auf **"Run"**

Dies erstellt die Tabellen:
- `leads` - Für Kontaktformular-Einträge
- `subscriptions` - Für Abonnement-Verwaltung
- `blog_posts` - Für Blog-Artikel (optional)

### 7.2 Row Level Security (RLS) aktivieren
Die Tabellen haben bereits RLS-Policies konfiguriert. Überprüfen Sie:
1. Gehen Sie zu **Authentication** → **Policies**
2. Stellen Sie sicher, dass die Policies aktiv sind

---

## Schritt 8: Custom Domain einrichten (Optional)

### 8.1 Domain hinzufügen
1. Gehen Sie zu Ihrem Cloudflare Pages-Projekt
2. Klicken Sie auf **"Custom domains"**
3. Klicken Sie auf **"Set up a custom domain"**
4. Geben Sie Ihre Domain ein (z.B. `techhilfepro-nrw.de`)
5. Folgen Sie den Anweisungen zur DNS-Konfiguration

### 8.2 SSL/TLS
- Cloudflare stellt automatisch ein kostenloses SSL-Zertifikat bereit
- HTTPS ist standardmäßig aktiviert

---

## Schritt 9: Testen der Deployment

### 9.1 Funktionalitäts-Checkliste
Testen Sie folgende Funktionen auf der Live-Site:

- [ ] **Homepage** lädt korrekt
- [ ] **Navigation** funktioniert (alle Links)
- [ ] **Blog-Übersicht** zeigt alle 5 Artikel
- [ ] **Blog-Artikel** öffnen sich korrekt
- [ ] **Kontaktformular** sendet Daten (prüfen Sie Supabase)
- [ ] **Abonnement-Seiten** laden
- [ ] **Stripe Checkout** öffnet sich beim Klick auf "Jetzt abonnieren"
- [ ] **Erfolgsseite** wird nach Checkout angezeigt
- [ ] **Rechtliche Seiten** (Impressum, Datenschutz, AGB, FAQ) laden

### 9.2 Test-Zahlung durchführen
1. Gehen Sie zu `/abonnements/privat`
2. Klicken Sie auf "Jetzt abonnieren" bei einem Paket
3. Verwenden Sie Stripe Test-Kreditkarte:
   - **Nummer:** `4242 4242 4242 4242`
   - **Ablaufdatum:** Beliebiges zukünftiges Datum
   - **CVC:** Beliebige 3 Ziffern
4. Schließen Sie den Checkout ab
5. Prüfen Sie:
   - Weiterleitung zur Erfolgsseite
   - Eintrag in Supabase `subscriptions`-Tabelle

---

## Schritt 10: Automatische Deployments

### 10.1 Git-basierte Deployments
Cloudflare Pages deployed automatisch bei jedem Push:
- **Push zu `main`** → Production Deployment
- **Push zu anderen Branches** → Preview Deployment
- **Pull Requests** → Preview Deployment mit eigener URL

### 10.2 Deployment-Benachrichtigungen
1. Gehen Sie zu **Settings** → **Notifications**
2. Aktivieren Sie E-Mail-Benachrichtigungen für:
   - Erfolgreiche Deployments
   - Fehlgeschlagene Deployments

---

## Fehlerbehebung

### Problem: Build schlägt fehl
**Lösung:**
1. Überprüfen Sie die Build-Logs in Cloudflare
2. Stellen Sie sicher, dass `@cloudflare/next-on-pages` installiert ist
3. Prüfen Sie, ob alle Umgebungsvariablen gesetzt sind

### Problem: API-Routes funktionieren nicht
**Lösung:**
1. Überprüfen Sie, ob die Umgebungsvariablen korrekt gesetzt sind
2. Prüfen Sie die Cloudflare Functions-Logs unter **Analytics** → **Functions**
3. Stellen Sie sicher, dass Stripe/Supabase Keys gültig sind

### Problem: Stripe Webhook schlägt fehl
**Lösung:**
1. Überprüfen Sie die Webhook-URL in Stripe
2. Stellen Sie sicher, dass `STRIPE_WEBHOOK_SECRET` gesetzt ist
3. Prüfen Sie die Logs in Stripe Dashboard → Webhooks

### Problem: Supabase-Verbindung schlägt fehl
**Lösung:**
1. Überprüfen Sie die Supabase-URL und Keys
2. Stellen Sie sicher, dass die Datenbank-Tabellen erstellt wurden
3. Prüfen Sie die RLS-Policies in Supabase

---

## Nächste Schritte nach dem Deployment

### 1. Monitoring einrichten
- Aktivieren Sie Cloudflare Analytics
- Überwachen Sie die Performance und Fehlerrate

### 2. SEO optimieren
- Fügen Sie eine `robots.txt` hinzu
- Erstellen Sie eine `sitemap.xml`
- Konfigurieren Sie Google Search Console

### 3. Performance-Optimierung
- Aktivieren Sie Cloudflare Caching
- Optimieren Sie Bilder mit Cloudflare Images
- Nutzen Sie Cloudflare CDN für statische Assets

### 4. Sicherheit
- Aktivieren Sie Cloudflare WAF (Web Application Firewall)
- Konfigurieren Sie Rate Limiting
- Aktivieren Sie Bot-Schutz

---

## Support und Ressourcen

### Cloudflare Pages Dokumentation
- https://developers.cloudflare.com/pages/

### Next.js auf Cloudflare
- https://developers.cloudflare.com/pages/framework-guides/nextjs/

### Stripe Dokumentation
- https://stripe.com/docs

### Supabase Dokumentation
- https://supabase.com/docs

---

## Zusammenfassung

Sie haben erfolgreich:
✅ Ein GitHub-Repository mit Cloudflare Pages verbunden  
✅ Build-Einstellungen für Next.js konfiguriert  
✅ Umgebungsvariablen für Stripe und Supabase gesetzt  
✅ Cloudflare Functions für API-Routes aktiviert  
✅ Stripe Webhooks konfiguriert  
✅ Supabase-Datenbank eingerichtet  
✅ Die Website live deployed  

**Ihre Live-URL:** `https://tech-hilfe-pro-nrw.pages.dev`

Bei Fragen oder Problemen stehe ich Ihnen gerne zur Verfügung!

---

**Erstellt am:** 07. Oktober 2025  
**Version:** 1.0  
**Projekt:** Tech Hilfe Pro NRW
