import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tech Hilfe Pro NRW - Ihr persönlicher IT-Partner",
    template: "%s | Tech Hilfe Pro NRW",
  },
  description:
    "Professioneller IT-Support für Privatkunden und Kleinunternehmen in NRW. Sicher, verständlich und immer für Sie da.",
  keywords: [
    "IT-Support NRW",
    "Computer-Hilfe Köln",
    "IT-Service Düsseldorf",
    "Senioren PC-Hilfe",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    title: "Tech Hilfe Pro NRW - Ihr persönlicher IT-Partner",
    siteName: "Tech Hilfe Pro NRW",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
