import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import SchemaMarkup from "@/components/SchemaMarkup";
import SkipLink from "@/components/SkipLink";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";
// MANUS: Implementación solicitada - MotionProvider für prefers-reduced-motion
import MotionProvider from "@/components/providers/MotionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IT-Support für Privatkunden & Kleinunternehmen in Köln | Tech Hilfe Pro",
    template: "%s | Tech Hilfe Pro",
  },
  description:
    "Professioneller IT-Support in Köln, Düsseldorf und NRW. Persönliche Betreuung für Senioren, Privatkunden und Kleinunternehmen. Remote & Vor-Ort-Service. ☎ +49 15565029989",
  keywords: [
    "IT-Support Köln",
    "Computer-Hilfe Köln",
    "IT-Service Düsseldorf",
    "PC-Hilfe Neuss",
    "IT-Beratung NRW",
    "Senioren PC-Hilfe",
    "Kleinunternehmen IT-Support",
    "Remote IT-Support",
    "Vor-Ort IT-Service",
    "Digitalisierung Köln",
    "Cybersecurity NRW",
    "Cloud-Services Köln"
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://techhilfepro.de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://techhilfepro.de",
    title: "IT-Support für Privatkunden & Kleinunternehmen in Köln | Tech Hilfe Pro",
    description: "Professioneller IT-Support in Köln, Düsseldorf und NRW. Persönliche Betreuung für Senioren, Privatkunden und Kleinunternehmen.",
    siteName: "Tech Hilfe Pro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://techhilfepro.de",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <SchemaMarkup />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="font-sans min-h-screen antialiased">
        {/* MANUS: Implementación solicitada - HARD-SOLUTION: JS + hard-visible classes vor Hydration */}
        <Script 
          id="hard-visible" 
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js','hard-visible')" }} 
        />
        {/* MANUS: Implementación solicitada - no-anim query parameter für Notfälle */}
        <Script 
          id="no-anim" 
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: "if (location.search.includes('noanim')) document.documentElement.classList.add('no-anim')" }} 
        />
        {/* MANUS: Implementación solicitada - MotionProvider umhüllt alle Inhalte */}
        <MotionProvider>
          <SkipLink />
          {children}
          <CookieConsentBanner />
          <FloatingWhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
