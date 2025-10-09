import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tech Hilfe Pro - IT-Support für NRW',
    short_name: 'Tech Hilfe Pro',
    description: 'Professioneller IT-Support für Privatkunden und Kleinunternehmen in NRW',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0A2A4E',
    icons: [
      {
        src: '/logo-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

