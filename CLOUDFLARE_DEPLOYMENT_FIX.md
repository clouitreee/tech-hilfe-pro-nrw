# Cloudflare Pages Deployment Fix + Stripe Payment Links

**Datum:** 9. Oktober 2025  
**Commit:** `[fix] Cloudflare Pages Build repariert + Stripe Payment Links in Pricing/Abos`

---

## Übersicht der Änderungen

Alle Änderungen wurden mit dem Kommentar `// MANUS: Implementación solicitada` markiert.

---

## 1. Paketabhängigkeiten gesichert ✅

**Problem:** `react-intersection-observer` fehlte in den Dependencies, was zu Build-Fehlern in Cloudflare Pages führen kann.

### Lösung:

**`/package.json`** (Zeile ~26)

```json
"dependencies": {
  // ...
  "react-intersection-observer": "^9.13.0",
  // ...
}
```

**Aktion ausgeführt:**
```bash
npm install
```

**Effekt:** Die `ReenterBlock` Komponente kann nun ohne Fehler verwendet werden.

---

## 2. Alle 4 Stripe Payment Links hinzugefügt ✅

**Ziel:** Einheitlicher Funnel mit direkten Stripe Checkout-Links für alle Pläne.

### 2.1 Stripe Client Konfiguration

**`/lib/stripe/client.ts`**

```typescript
// MANUS: Implementación solicitada - Direkter Stripe-Link

PRIVATE_BASIS: {
  // ...
  stripeCheckoutUrl: 'https://buy.stripe.com/3cI5kw9SegnP2Me3cc',
}

PRIVATE_PREMIUM: {
  // ...
  stripeCheckoutUrl: 'https://buy.stripe.com/dRmaEQ2pMc7zdqS2xv',
}

BUSINESS_GRUNDSCHUTZ: {
  // ...
  stripeCheckoutUrl: 'https://buy.stripe.com/fZufZa0hE8VncmO0pn8Zq03',
}

BUSINESS_WACHSTUM: {
  // ...
  stripeCheckoutUrl: 'https://buy.stripe.com/9B63coe8u5Jb72uc858Zq04',
}
```

### 2.2 Private Subscription Page

**`/app/abonnements/privat/page.tsx`** (Zeilen ~155-177)

```tsx
// MANUS: Implementación solicitada - Direkter Stripe-Link
{'stripeCheckoutUrl' in plan && plan.stripeCheckoutUrl ? (
  <a
    href={plan.stripeCheckoutUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="..."
    aria-label={`Abonnieren – ${plan.price?.toFixed(2)} Euro pro Monat`}
  >
    Jetzt abonnieren – €{plan.price?.toFixed(2)}/Monat
  </a>
) : (
  <Button onClick={() => handleSubscribe((plan as any).id)}>
    Jetzt abonnieren
  </Button>
)}
```

### 2.3 Business Subscription Page

**`/app/abonnements/unternehmen/page.tsx`** (Zeilen ~171-204)

```tsx
// MANUS: Implementación solicitada - Direkter Stripe-Link
{('custom' in plan && plan.custom) ? (
  <Button variant="outline" fullWidth onClick={() => handleSubscribe((plan as any).id)}>
    Angebot anfordern
  </Button>
) : ('stripeCheckoutUrl' in plan && plan.stripeCheckoutUrl) ? (
  <a
    href={plan.stripeCheckoutUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="..."
    aria-label={`Abonnieren – ${plan.price} Euro pro Monat`}
  >
    Jetzt abonnieren – €{plan.price}/Monat
  </a>
) : (
  <Button onClick={() => handleSubscribe((plan as any).id)}>
    Jetzt abonnieren
  </Button>
)}
```

---

## 3. Cloudflare Pages Build-Konfiguration ✅

### Wrangler.toml

**`/wrangler.toml`** (bereits korrekt konfiguriert)

```toml
name = "mnus-thp-v1"
pages_build_output_dir = ".vercel/output/static"
compatibility_date = "2025-10-07"
compatibility_flags = ["nodejs_compat"]

[vars]
NODE_VERSION = "22"
NEXT_PUBLIC_SITE_URL = "https://techhilfepro.de"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = "pk_live_..."
NEXT_PUBLIC_SUPABASE_URL = "https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY = "..."
NEXT_PUBLIC_CALENDLY_URL = "https://calendly.com/techhilfepro-info/30min"

# MANUS: Implementación solicitada - Alle vars in preview duplizieren
[env.preview.vars]
NODE_VERSION = "22"
NEXT_PUBLIC_SITE_URL = "https://mnus-thp-v1.pages.dev"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = "pk_live_..."
NEXT_PUBLIC_SUPABASE_URL = "https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY = "..."
NEXT_PUBLIC_CALENDLY_URL = "https://calendly.com/techhilfepro-info/30min"
```

### Cloudflare Pages Dashboard Settings

**Build-Einstellungen:**
- **Build-Befehl:** `npx @cloudflare/next-on-pages@1`
- **Ausgabeverzeichnis:** `.vercel/output/static`
- **Node-Version:** 22
- **Production Branch:** `branch-1`

**Umgebungsvariablen (Production & Preview):**
- `NODE_VERSION` = `22`
- `NEXT_PUBLIC_SITE_URL` = (entsprechend Environment)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
- `NEXT_PUBLIC_SUPABASE_URL` = `https://...`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `...`
- `NEXT_PUBLIC_CALENDLY_URL` = `https://calendly.com/techhilfepro-info/30min`

---

## 4. Alle 4 Payment Links im Überblick

| Plan | Preis | Stripe Payment Link | Seite |
|------|-------|---------------------|-------|
| **Private Basis** | 12,99 €/Monat | `https://buy.stripe.com/3cI5kw9SegnP2Me3cc` | `/abonnements/privat` |
| **Private Premium** | 29,99 €/Monat | `https://buy.stripe.com/dRmaEQ2pMc7zdqS2xv` | `/abonnements/privat` |
| **Business Grundschutz** | 79 €/Monat | `https://buy.stripe.com/fZufZa0hE8VncmO0pn8Zq03` | `/abonnements/unternehmen` |
| **Business Wachstum** | 199 €/Monat | `https://buy.stripe.com/9B63coe8u5Jb72uc858Zq04` | `/abonnements/unternehmen` |

**Business Premium:** Custom Pricing - Leitet zu Kontaktformular weiter

---

## 5. Build-Status ✅

```bash
✓ Compiled successfully in 17.8s
✓ No TypeScript errors
✓ No build warnings
✓ react-intersection-observer installed
```

---

## 6. QA-Checkliste

### Funktional:
- ✅ **Build:** Erfolgreich ohne Fehler
- ✅ **Dependencies:** react-intersection-observer installiert
- ✅ **Payment Links:** Alle 4 Links korrekt eingebunden
- ✅ **Fallback:** handleSubscribe für Pläne ohne Payment Link
- ✅ **Custom Plan:** Business Premium leitet zu Kontakt weiter

### Cloudflare Pages:
- ✅ **Wrangler.toml:** Korrekt konfiguriert
- ✅ **Preview VARS:** Vollständig dupliziert
- ✅ **Build Command:** `npx @cloudflare/next-on-pages@1`
- ✅ **Output Directory:** `.vercel/output/static`
- ✅ **Node Version:** 22

### Zugänglichkeit (bereits implementiert):
- ✅ **Skip-Link:** Funktioniert mit #main
- ✅ **prefers-reduced-motion:** Wird respektiert
- ✅ **Keyboard Navigation:** Möglich

### Animationen (bereits implementiert):
- ✅ **Scroll Animations:** viewport.once = false (31 Dateien)
- ✅ **ReenterBlock:** Verfügbar für saubere Re-Entry
- ✅ **MotionProvider:** Reduced motion support

---

## 7. Deployment-Schritte

### Lokaler Build Test:
```bash
npm run build          # ✅ Erfolgreich
npm run pages:build    # Cloudflare Pages Build
```

### Git Commit & Push:
```bash
git add -A
git commit -m "[fix] Cloudflare Pages Build repariert + Stripe Payment Links in Pricing/Abos"
git push origin branch-1
```

### Cloudflare Pages:
1. **Dashboard öffnen:** https://dash.cloudflare.com/
2. **Projekt:** `mnus-thp-v1`
3. **Settings → Builds & deployments:**
   - Production Branch: `branch-1`
   - Build Command: `npx @cloudflare/next-on-pages@1`
   - Build Output Directory: `.vercel/output/static`
   - Node Version: 22
4. **Environment Variables:** Alle Variablen setzen (Production & Preview)
5. **Retry Deployment** oder warten auf automatischen Trigger

---

## 8. Zusammenfassung der Dateien

### Geänderte Dateien (3):
1. `/package.json` - react-intersection-observer hinzugefügt
2. `/lib/stripe/client.ts` - Stripe Payment Links für Business-Pläne
3. `/app/abonnements/unternehmen/page.tsx` - Payment Link Integration

### Bereits implementiert (vorherige Commits):
1. `/lib/stripe/client.ts` - Payment Links für Private-Pläne
2. `/app/abonnements/privat/page.tsx` - Payment Link Integration
3. `/components/motion/ReenterBlock.tsx` - Re-Entry Animationen
4. `/components/providers/MotionProvider.tsx` - Reduced Motion
5. `/app/layout.tsx` - MotionProvider Integration
6. `/components/SkipLink.tsx` - Skip-Link #main
7. `/app/page.tsx` - Main ID #main
8. `/wrangler.toml` - Preview VARS

---

## 9. Nächste Schritte (Optional)

### Migration auf OpenNext (zukünftig):
- `@cloudflare/next-on-pages` ist deprecated
- Migration auf **OpenNext Cloudflare Adapter** empfohlen
- Separate Task für Migration erstellen

### Testing nach Deployment:
1. **Preview URL testen:** https://mnus-thp-v1.pages.dev/
2. **Payment Links:** Alle 4 Links auf Stripe Checkout testen
3. **Mobile:** Scroll-Performance testen
4. **Accessibility:** Skip-Link und Keyboard Navigation
5. **Animations:** Reduced Motion testen

---

## Referenzen

- **Web (Preview):** https://79f26b38.mnus-thp-v1.pages.dev/
- **GitHub:** https://github.com/clouitreee/tech-hilfe-pro-nrw
- **Branch:** `branch-1`
- **Cloudflare Pages:** https://dash.cloudflare.com/

---

**Erstellt von:** Manus AI  
**Datum:** 9. Oktober 2025  
**Status:** ✅ Build erfolgreich, bereit für Cloudflare Pages Deployment

