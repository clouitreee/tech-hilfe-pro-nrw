# Resend Email Setup - Production Readiness

## Übersicht

Dieses Dokument beschreibt die notwendigen Schritte zur Konfiguration von Resend für den Produktionseinsatz mit der Domain `techhilfepro.de`.

---

## Voraussetzungen

- Zugriff auf DNS-Einstellungen von `techhilfepro.de`
- Resend-Account (https://resend.com)
- API-Key bereits in `.env.local` konfiguriert

---

## Schritt 1: Domain in Resend hinzufügen

1. Einloggen bei https://resend.com/domains
2. Klick auf "Add Domain"
3. Domain eingeben: `techhilfepro.de`
4. Region auswählen: **EU (Frankfurt)** für DSGVO-Konformität

---

## Schritt 2: DNS-Einträge konfigurieren

Resend zeigt nach dem Hinzufügen der Domain die erforderlichen DNS-Einträge an. Diese müssen im DNS-Provider (z.B. Cloudflare, Namecheap, etc.) eingetragen werden.

### Erforderliche DNS-Einträge

#### 2.1 SPF (Sender Policy Framework)
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
TTL: 3600
```

**Zweck:** Autorisiert Resend, E-Mails von Ihrer Domain zu senden.

#### 2.2 DKIM (DomainKeys Identified Mail)
```
Type: TXT
Name: resend._domainkey
Value: [Wird von Resend bereitgestellt - eindeutiger Schlüssel]
TTL: 3600
```

**Zweck:** Signiert E-Mails kryptografisch, um Authentizität zu beweisen.

**Beispiel-Wert:**
```
v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
```

#### 2.3 DMARC (Domain-based Message Authentication)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@techhilfepro.de
TTL: 3600
```

**Zweck:** Definiert, wie E-Mail-Provider mit nicht-authentifizierten E-Mails umgehen sollen.

**Optionen:**
- `p=none` - Nur Monitoring (empfohlen für Start)
- `p=quarantine` - Verdächtige E-Mails in Spam
- `p=reject` - Verdächtige E-Mails ablehnen (nach erfolgreicher Testphase)

#### 2.4 Return-Path (optional, aber empfohlen)
```
Type: CNAME
Name: bounce
Value: feedback.resend.com
TTL: 3600
```

**Zweck:** Behandlung von Bounce-E-Mails (nicht zustellbare Nachrichten).

---

## Schritt 3: DNS-Propagation abwarten

- **Dauer:** 5 Minuten bis 48 Stunden (typisch: 1-2 Stunden)
- **Prüfen:** `dig TXT techhilfepro.de` oder https://mxtoolbox.com

---

## Schritt 4: Verifizierung in Resend

1. Zurück zu https://resend.com/domains
2. Klick auf "Verify" bei `techhilfepro.de`
3. Resend prüft automatisch die DNS-Einträge
4. Status sollte auf **"Verified"** wechseln

**Hinweis:** Falls Fehler auftreten, DNS-Einträge nochmals überprüfen.

---

## Schritt 5: Test-E-Mail senden

### Via Resend Dashboard
1. Gehe zu https://resend.com/emails
2. Klick auf "Send Test Email"
3. **From:** `info@techhilfepro.de`
4. **To:** Deine Test-E-Mail-Adresse
5. Senden und Inbox prüfen

### Via Code (lokal testen)
```bash
cd /home/ubuntu/tech-hilfe-pro-nrw
npm run dev
```

Dann Kontaktformular ausfüllen und absenden. Prüfe:
- E-Mail kommt in Inbox (nicht Spam)
- Absender zeigt korrekt: `Tech Hilfe Pro <info@techhilfepro.de>`
- Alle Links funktionieren

---

## Schritt 6: Monitoring einrichten

### Resend Dashboard
- **Sent Emails:** https://resend.com/emails
- **Bounces:** https://resend.com/bounces
- **Spam Reports:** https://resend.com/spam-reports

### Metriken überwachen
- **Delivery Rate:** > 95% (Ziel: 98%+)
- **Bounce Rate:** < 2%
- **Spam Rate:** < 0.1%

---

## Troubleshooting

### Problem: Domain nicht verifiziert

**Lösung:**
1. DNS-Einträge mit `dig` oder MXToolbox prüfen
2. TTL abwarten (Cache-Zeit)
3. DNS-Provider-Dokumentation konsultieren
4. Resend-Support kontaktieren: support@resend.com

### Problem: E-Mails landen im Spam

**Lösung:**
1. DMARC-Policy auf `p=none` setzen (anfangs)
2. Warm-up-Phase: Langsam Volumen steigern (10-50-100 E-Mails/Tag)
3. Content prüfen: Keine Spam-Trigger-Wörter
4. SPF/DKIM/DMARC-Alignment prüfen

### Problem: Hohe Bounce-Rate

**Lösung:**
1. E-Mail-Adressen validieren (Syntax-Check)
2. Double-Opt-In für Newsletter
3. Bounce-Liste regelmäßig bereinigen
4. Alte/inaktive Adressen entfernen

---

## Sicherheits-Best-Practices

### 1. API-Key-Rotation
- API-Keys alle 90 Tage rotieren
- Alte Keys nach Rotation löschen
- Niemals Keys in Git committen

### 2. Rate Limiting
- Resend Free Tier: 100 E-Mails/Tag
- Resend Pro: 50.000 E-Mails/Monat
- Eigenes Rate Limiting implementieren (siehe `AUDIT_FIXES.md`)

### 3. Webhook-Signatur-Verifizierung
Wenn Webhooks verwendet werden (z.B. für Bounce-Handling):
```typescript
import { verifySignature } from 'resend';

export async function POST(req: Request) {
  const signature = req.headers.get('resend-signature');
  const body = await req.text();
  
  const isValid = verifySignature(body, signature, process.env.RESEND_WEBHOOK_SECRET);
  if (!isValid) return new Response('Invalid signature', { status: 401 });
  
  // Process webhook...
}
```

---

## Compliance (DSGVO)

### Datenspeicherung
- Resend speichert E-Mail-Metadaten für 30 Tage
- EU-Region (Frankfurt) für DSGVO-Konformität
- Keine Weitergabe an Dritte

### Empfänger-Rechte
- **Auskunft:** Resend Dashboard zeigt gesendete E-Mails
- **Löschung:** E-Mails werden nach 30 Tagen automatisch gelöscht
- **Widerspruch:** Unsubscribe-Link in Newsletter-E-Mails

### Datenschutzerklärung aktualisieren
In `/app/datenschutz/page.tsx` bereits erwähnt:
- Resend als E-Mail-Provider
- Zweck: Transaktionale E-Mails (Lead-Benachrichtigungen)
- Speicherdauer: 30 Tage

---

## Checkliste: Production-Ready

- [ ] Domain in Resend hinzugefügt
- [ ] SPF-Eintrag im DNS
- [ ] DKIM-Eintrag im DNS
- [ ] DMARC-Eintrag im DNS (p=none für Start)
- [ ] Return-Path (bounce) konfiguriert
- [ ] DNS-Propagation abgewartet (1-2 Stunden)
- [ ] Domain in Resend verifiziert (Status: "Verified")
- [ ] Test-E-Mail gesendet und in Inbox erhalten
- [ ] Kontaktformular getestet (Lead + E-Mail)
- [ ] Monitoring-Dashboard geprüft
- [ ] API-Key in Cloudflare Pages Environment Variables gesetzt
- [ ] Datenschutzerklärung aktualisiert

---

## Support

**Resend-Dokumentation:** https://resend.com/docs  
**Resend-Support:** support@resend.com  
**DNS-Tools:**
- https://mxtoolbox.com/SuperTool.aspx
- https://www.dmarcanalyzer.com/dmarc-check/

---

**Status:** ⚠️ **Manuelle Konfiguration erforderlich**  
**Nächster Schritt:** DNS-Einträge im Provider konfigurieren  
**Zeitaufwand:** 15-30 Minuten + DNS-Propagation
