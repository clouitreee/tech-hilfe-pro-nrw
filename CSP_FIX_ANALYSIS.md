# CSP Fix Analysis - UI Blank Screen Issue

**Date:** 2025-01-08  
**Issue:** Pantalla en blanco con solo footer visible en producción  
**Root Cause:** CSP con nonce no aplicada correctamente a scripts de Next.js

---

## 🔍 Diagnosis

### Current State

**Middleware (`middleware.ts`):**
- ✅ Genera nonce por request
- ✅ Envía header `Content-Security-Policy` con `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`
- ✅ Envía header `x-nonce`
- ⚠️ Matcher excluye `_next/static/*`

**Homepage (`app/page.tsx`):**
- ✅ Usa Framer Motion con `motion.div`
- ⚠️ Animaciones con `initial={{ opacity: 0 }}` → UI oculta si JS no carga
- ✅ Navigation y Footer incluidos

**Layout (`app/layout.tsx`):**
- ✅ Estructura simple: `<body>{children}</body>`
- ❌ NO inyecta nonce en tags `<script>`

### Problem

Next.js 15 con App Router requiere que:
1. El CSP header tenga nonce
2. Los tags `<script>` en el HTML tengan el mismo nonce
3. Con `'strict-dynamic'`, scripts cargados por scripts con nonce también se permiten

**Actualmente:**
- Middleware genera nonce y lo envía en header
- Pero Next.js NO inyecta automáticamente el nonce en los `<script>` tags
- Resultado: CSP bloquea todos los scripts → Framer Motion no ejecuta → UI con `opacity: 0` permanece invisible

---

## ✅ Solution

### Option 1: Disable CSP Nonce (Recommended for Cloudflare Pages)

**Rationale:**
- Cloudflare Pages con static generation no soporta nonce dinámico fácilmente
- `'strict-dynamic'` requiere nonce en cada `<script>`, lo cual es complejo con SSG
- Alternativa: CSP sin nonce pero con whitelist estricta

**Implementation:**

```typescript
// middleware.ts
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",  // Required for Next.js inline scripts
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.calendly.com https://*.supabase.co https://api.stripe.com https://api.resend.com",
  "frame-src https://calendly.com https://js.stripe.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests"
].join('; ');

// Remove x-nonce header
```

**Pros:**
- ✅ Compatible con static generation
- ✅ Simple implementation
- ✅ Funciona inmediatamente

**Cons:**
- ⚠️ Menos seguro que nonce (pero aún muy seguro con whitelist)
- ⚠️ Permite inline scripts (mitigado por Cloudflare WAF)

### Option 2: Fix Nonce Injection (Complex)

**Rationale:**
- Mantener nonce-based CSP
- Requiere modificar Next.js rendering

**Implementation:**

```typescript
// app/layout.tsx
import { headers } from 'next/headers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce');

  return (
    <html lang="de">
      <head>
        <script nonce={nonce || undefined} dangerouslySetInnerHTML={{ __html: '' }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

**Problems:**
- ❌ `headers()` es async en Next.js 15 → layout debe ser async
- ❌ Async layout hace todas las páginas dinámicas → no SSG
- ❌ Incompatible con Cloudflare Pages static generation

---

## 🎯 Recommended Solution

**Use Option 1: Disable nonce, use `'unsafe-inline'` with strict whitelist**

**Justification:**
1. Cloudflare Pages optimizado para static generation
2. `'unsafe-inline'` con whitelist estricta es suficientemente seguro
3. Cloudflare WAF proporciona protección adicional
4. Trade-off aceptable: seguridad vs. funcionalidad

**Security Layers:**
- ✅ CSP con whitelist estricta (solo dominios confiables)
- ✅ Cloudflare WAF (bloquea XSS patterns)
- ✅ HSTS, X-Frame-Options, X-Content-Type-Options
- ✅ Supabase RLS (backend security)
- ✅ Form validation + honeypot

---

## 📝 Implementation Plan

1. **Update middleware.ts:**
   - Remove nonce generation
   - Change `script-src` to `'self' 'unsafe-inline'`
   - Remove `x-nonce` header

2. **Test locally:**
   ```bash
   npm run dev
   # Verify: UI loads correctly
   # Verify: Framer Motion animations work
   # Verify: No CSP violations in console
   ```

3. **Build and deploy:**
   ```bash
   npm run pages:build
   # Verify: Build succeeds
   # Deploy to Cloudflare Pages
   # Test production: UI visible, no errors
   ```

---

## ✅ Expected Results

**Before:**
- ❌ Pantalla en blanco (solo footer visible)
- ❌ CSP violations en console
- ❌ Framer Motion no ejecuta

**After:**
- ✅ UI completa visible
- ✅ Animaciones funcionan
- ✅ Sin errores CSP
- ✅ Calendly y Stripe funcionan

---

## 📊 Security Comparison

| Feature | Nonce-based CSP | Whitelist CSP |
|---------|----------------|---------------|
| XSS Protection | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Static Generation | ❌ | ✅ |
| Complexity | High | Low |
| Cloudflare Pages | ⚠️ | ✅ |
| Inline Scripts | ❌ | ✅ |
| External Scripts | Whitelist | Whitelist |

**Verdict:** Whitelist CSP es mejor para este proyecto.

---

## 🚀 Next Steps

1. Apply fix to `middleware.ts`
2. Test locally
3. Build for Cloudflare Pages
4. Deploy and verify
5. Update documentation

**Status:** ✅ Ready to implement
