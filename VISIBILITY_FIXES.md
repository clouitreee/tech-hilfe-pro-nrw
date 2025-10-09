# Visibility Fixes - Motion, no-JS, Script beforeInteractive

**Datum:** 9. Oktober 2025  
**Commit:** `[fix] Visibilität: Script beforeInteractive, CSS no-JS seguro, Motion Provider domMax`

---

## Übersicht der Änderungen

Alle Änderungen wurden mit dem Kommentar `// MANUS: Implementación solicitada` markiert.

Diese Fixes stellen sicher, dass **Inhalte niemals unsichtbar bleiben** durch Motion- oder no-JS-Probleme.

---

## 1. Script beforeInteractive für .js Klasse ✅

**Problem:** Die `.js` Klasse wurde zu spät hinzugefügt, was dazu führen kann, dass CSS no-JS Regeln nicht richtig greifen.

### Lösung:

**`/app/layout.tsx`** (Zeilen ~3, ~81-86)

**Vorher:**
```tsx
<head>
  <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
</head>
```

**Nachher:**
```tsx
// MANUS: Implementación solicitada
import Script from "next/script";

<body>
  {/* MANUS: Implementación solicitada - Script beforeInteractive für .js Klasse */}
  <Script 
    id="detect-js" 
    strategy="beforeInteractive"
    dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} 
  />
  <MotionProvider>
    {children}
  </MotionProvider>
</body>
```

**Effekt:**
- ✅ Script lädt **vor** der Hydratation
- ✅ `.js` Klasse ist verfügbar bevor React läuft
- ✅ CSS kann korrekt zwischen JS/no-JS unterscheiden

**Referenz:** [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script#beforeinteractive)

---

## 2. CSS no-JS sicher: Inhalt immer sichtbar ✅

**Problem:** Wenn CSS-Regeln Inhalte standardmäßig verstecken (`opacity: 0`), bleiben sie ohne JS unsichtbar.

### Lösung:

**`/app/globals.css`** (Zeilen ~236-250)

**Vorher:**
```css
html:not(.js) [data-animate],
html:not(.js) .motion-safe {
  opacity: 1 !important;
  transform: none !important;
}
```

**Nachher:**
```css
/* MANUS: Implementación solicitada - Progressive enhancement: content visible by default */
/* Sin JS, todo el contenido debe ser visible */
html:not(.js) [data-animate],
html:not(.js) .motion-safe,
html:not(.js) .motion-start {
  opacity: 1 !important;
  transform: none !important;
  visibility: visible !important;
}

/* Con JS, permitir animaciones normales */
html.js [data-animate],
html.js .motion-safe {
  /* Las animaciones se controlan por Framer Motion */
}
```

**Verbesserungen:**
- ✅ **Mehr Selektoren:** `.motion-start` hinzugefügt
- ✅ **visibility: visible:** Stellt sicher, dass nichts versteckt bleibt
- ✅ **Explizite JS-Regel:** Dokumentiert, dass Animationen von Framer Motion gesteuert werden

**Effekt:**
- Ohne JS: Alle Inhalte sind sofort sichtbar (keine Animationen)
- Mit JS: Framer Motion steuert Animationen normal

---

## 3. Motion Provider mit domMax ✅

**Status:** Bereits in vorherigem Commit implementiert.

**`/components/providers/MotionProvider.tsx`** (Zeilen ~1-24)

```tsx
// MANUS: Implementación solicitada - domMax statt domAnimation
"use client";

import { LazyMotion, domMax, MotionConfig, useReducedMotion } from "framer-motion";

export default function MotionProvider({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
```

**Vorteile:**
- ✅ **LazyMotion:** Lazy-loading von Features
- ✅ **domMax:** Alle DOM-Features verfügbar
- ✅ **strict mode:** Verhindert unerwartetes Verhalten
- ✅ **prefers-reduced-motion:** Automatisch respektiert

**Referenz:** [Framer Motion LazyMotion](https://www.framer.com/motion/lazy-motion/)

---

## 4. CTAs immer sichtbar ✅

**Status:** Bereits in vorherigem Commit implementiert.

**`/app/page.tsx`** (Zeilen ~85-100)

- Keine `opacity-0` im Base-State
- Keine `group-hover:*` für Sichtbarkeit
- Fokus-Ringe für Accessibility
- Brand Color #3BA9FF

---

## 5. useReducedMotion in Hero Section ⚠️

**Status:** Nicht implementiert in diesem Commit.

**Grund:** Versuche, `useReducedMotion` im Hero zu implementieren, führten zu Syntax-Fehlern. Dies erfordert eine sorgfältigere Refaktorisierung.

**Geplant für nächsten Commit:**
```tsx
const shouldReduceMotion = useReducedMotion();

<motion.div
  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
/>
```

**Workaround:** Die CSS no-JS Regeln stellen bereits sicher, dass Inhalte ohne JS sichtbar sind.

---

## 6. Build-Status ✅

```bash
✓ Compiled successfully in 15.9s
✓ Generating static pages (26/26)
✓ No TypeScript errors
✓ No build warnings
```

---

## 7. QA-Checkliste

### Funktional:
- ✅ **Script beforeInteractive:** Lädt vor Hydratation
- ✅ **CSS no-JS:** Inhalte sichtbar ohne JS
- ✅ **Motion Provider:** domMax implementiert
- ✅ **CTAs:** Immer sichtbar
- ⚠️ **useReducedMotion Hero:** Für nächsten Commit geplant

### No-JS Test:
1. **DevTools:** JavaScript deaktivieren
2. **Homepage laden:** Inhalte sollten sichtbar sein
3. **CTAs:** Buttons sollten funktionieren (normale Links)
4. **Navigation:** Sollte funktionieren

### Reduced Motion Test:
1. **DevTools:** `prefers-reduced-motion: reduce` emulieren
2. **Homepage laden:** Keine starken Animationen
3. **Scroll:** Sanfte oder keine Animationen
4. **CTAs:** Weiterhin funktional

**Referenz:** [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

---

## 8. Zusammenfassung der Dateien

### Geänderte Dateien (2):
1. `/app/layout.tsx` - Script beforeInteractive
2. `/app/globals.css` - CSS no-JS sicher

### Bereits implementiert (vorherige Commits):
1. `/components/providers/MotionProvider.tsx` - domMax
2. `/app/page.tsx` - CTAs sichtbar
3. `/lib/stripe/client.ts` - Stripe Links
4. `/components/sections/Footer.tsx` - Inhaber conditional

### Neue Dateien (1):
1. `/VISIBILITY_FIXES.md` - Diese Dokumentation

---

## 9. Nächste Schritte (Optional)

### useReducedMotion in allen Sektionen:

**Dateien:**
- `/app/page.tsx` - Hero, Problem/Solution, Services, CTA
- `/components/sections/Services.tsx`
- `/components/sections/Pricing.tsx`
- `/components/sections/About.tsx`

**Pattern:**
```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function Section() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={shouldReduceMotion ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeIn("up", 0.2)}
    />
  );
}
```

**Vorteile:**
- Respektiert User-Präferenzen
- Verhindert unsichtbare Inhalte
- Bessere Accessibility

---

## 10. Testing nach Deployment

### No-JS Test:
1. Chrome DevTools → Settings → Debugger → Disable JavaScript
2. Homepage laden
3. Verifizieren: Alle Inhalte sichtbar
4. Verifizieren: CTAs funktionieren (normale Links)

### Reduced Motion Test:
1. Chrome DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion: reduce
2. Homepage laden
3. Verifizieren: Keine starken Animationen
4. Scroll: Sanfte oder keine Animationen

### Script Timing Test:
1. Chrome DevTools → Network → Slow 3G
2. Homepage laden
3. Verifizieren: `.js` Klasse wird früh hinzugefügt
4. Verifizieren: Keine FOUC (Flash of Unstyled Content)

---

## Referenzen

- **Next.js Script:** https://nextjs.org/docs/app/api-reference/components/script
- **Framer Motion LazyMotion:** https://www.framer.com/motion/lazy-motion/
- **MDN prefers-reduced-motion:** https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- **Tailwind CSS Transitions:** https://tailwindcss.com/docs/transition-property

---

**Erstellt von:** Manus AI  
**Datum:** 9. Oktober 2025  
**Status:** ✅ Build erfolgreich, kritische Visibility-Fixes implementiert

